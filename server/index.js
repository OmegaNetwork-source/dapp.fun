import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { compileSolidity } from './utils/compiler.js';
import { deployEVM, deploySolanaToken } from './utils/deployer.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * @api {post} /compile Compile Solidity Code
 * @apiParam {Object} sources Key-value pair of filename -> { content: "code" }
 */
app.post('/compile', async (req, res) => {
    try {
        const { sources } = req.body;
        if (!sources) return res.status(400).json({ error: 'No sources provided' });

        const artifacts = await compileSolidity(sources);
        res.json({ success: true, artifacts });
    } catch (error) {
        console.error('Compilation Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * @api {post} /deploy Deploy Contract or Token
 * @apiParam {string} chainId "omega-mainnet", "omega-testnet", "solana", etc.
 * @apiParam {Object} config Deployment configuration (name, symbol, supply, etc.)
 * @apiParam {string} [privateKey] Wallet private key (optional if system key exists)
 * @apiParam {Object} [sources] Source code to compile and deploy (optional if sending bytecode)
 * @apiParam {Object} [artifact] Pre-compiled artifact (optional if sending sources)
 */
app.post('/deploy', async (req, res) => {
    try {
        const { chainId, config, privateKey, sources, artifact, constructorArgs } = req.body;

        const pk = privateKey || process.env.DEFAULT_PRIVATE_KEY;
        if (!pk) return res.status(401).json({ error: 'No private key provided and no default key set' });

        const explorerBases = {
            'omega-mainnet': '0x4e4542bc.explorer.aurora-cloud.dev',
            'omega-testnet': 'explorer.omeganetwork.co',
            'solana': 'explorer.solana.com',
            'somnia': 'explorer.somnia.network',
            'monad': 'monadscan.com'
        };

        // 1. Handle Solana
        if (chainId === 'solana') {
            const rpc = req.body.rpcUrl || process.env.SOLANA_RPC || 'https://api.devnet.solana.com';
            const result = await deploySolanaToken(config, rpc, pk);
            const explorerUrl = `https://explorer.solana.com/tx/${result.signature}?cluster=devnet`;
            return res.json({ success: true, result: { ...result, explorerUrl } });
        }

        // 2. Handle EVM
        let targetArtifact = artifact;
        if (sources && !artifact) {
            const artifacts = await compileSolidity(sources);

            if (req.body.contractName) {
                targetArtifact = artifacts.find(a => a.name === req.body.contractName);
            } else {
                // Heuristic: Filter out interfaces/abstracts (empty bytecode)
                const deployable = artifacts.filter(a => a.bytecode && a.bytecode !== '0x' && a.bytecode.length > 2);

                if (deployable.length > 0) {
                    // Pick the one with the largest bytecode, assuming it's the main contract
                    targetArtifact = deployable.reduce((prev, current) =>
                        (prev.bytecode.length > current.bytecode.length) ? prev : current
                    );
                } else {
                    targetArtifact = artifacts[0]; // Fallback
                }
            }
        }

        if (!targetArtifact) return res.status(400).json({ error: 'No artifact or sources provided' });

        const chains = {
            'omega-mainnet': 'https://0x4e4542bc.rpc.aurora-cloud.dev',
            'omega-testnet': 'https://0x4e454228.rpc.aurora-cloud.dev',
            'somnia': 'https://api.infra.mainnet.somnia.network/',
            'monad': 'https://rpc.monad.xyz'
        };

        const rpcUrl = req.body.rpcUrl || chains[chainId] || process.env.DEFAULT_RPC;
        if (!rpcUrl) return res.status(400).json({ error: 'Invalid chainId or RPC URL' });

        // Set gasless options only for Omega Networks
        const deployOptions = (chainId && chainId.startsWith('omega')) ? { gasPrice: 0 } : {};

        const result = await deployEVM(targetArtifact, rpcUrl, pk, constructorArgs || [], deployOptions);
        const explorerBase = explorerBases[chainId];
        const explorerUrl = explorerBase ? `https://${explorerBase}/tx/${result.hash}` : null;

        res.json({ success: true, result: { ...result, explorerUrl } });

    } catch (error) {
        console.error('Deployment Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Dapp.Fun API Server running on port ${PORT}`);
});
