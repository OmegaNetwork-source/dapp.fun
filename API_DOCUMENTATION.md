# Dapp.Fun API Documentation

The Dapp.Fun API is a powerful, production-ready solution for programmatically compiling and deploying smart contracts to any EVM-compatible blockchain and Solana. It is designed for AI agents, bots, and developers who need headless deployment capabilities.

## Base URL
Production: `https://dapp-fun-api.onrender.com`

---

## Supported Networks

You can deploy to **any EVM network** by providing its `rpcUrl`. For convenience, the following Chain IDs are pre-configured:

| Chain ID | Network Name | Gas Strategy | Explorer |
| :--- | :--- | :--- | :--- |
| `omega-mainnet` | Omega Mainnet | **Gasless** (Free) | [Explorer](https://0x4e4542bc.explorer.aurora-cloud.dev) |
| `omega-testnet` | Omega Testnet | **Gasless** (Free) | [Explorer](https://explorer.omeganetwork.co) |
| `solana` | Solana Devnet | Standard (SOL) | [Explorer](https://explorer.solana.com) |
| `base` | Base Mainnet | Standard (ETH) | [Explorer](https://basescan.org) |
| `ethereum` | Ethereum Mainnet | Standard (ETH) | [Explorer](https://etherscan.io) |
| `monad` | Monad Testnet | Standard (MON) | [Explorer](https://monadscan.com) |
| `somnia` | Somnia Network | Standard (SOM) | [Explorer](https://explorer.somnia.network) |

---

## Endpoints

### 1. Compile Solidity Code
Compiles Solidity source code and returns the ABI and Bytecode without deploying.

**POST** `/compile`

**Body:**
```json
{
  "sources": {
    "MyContract.sol": {
      "content": "contract MyContract { ... }"
    }
  }
}
```

---

### 2. Deploy Smart Contract
Compiles and deploys a smart contract to the specified network.

**POST** `/deploy`

**Body Parameters:**
- `chainId` (string): Target network ID (e.g., "omega-mainnet", "ethereum", "base").
- `privateKey` (string): The wallet private key to deploy from.
- `sources` (object): The solidity source code (filename -> content).
- `contractName` (string, optional): The specific contract to deploy if multiple serve defined. **Recommended**.
- `constructorArgs` (array, optional): Arguments for the contract constructor.
- `rpcUrl` (string, optional): Custom RPC URL if deploying to a network not in the presets.

---

## Examples for AI Agents

Here are specific JSON payloads for common deployment scenarios.

### Example 1: Deploying an ERC-20 Token
Standard fungible token (like USDC, PEPE).

**Task:** "Deploy a meme token called 'LobsterCoin' (LOB) with 1 million supply."

**Request:**
```json
{
  "chainId": "omega-mainnet",
  "privateKey": "YOUR_PRIVATE_KEY_HERE",
  "contractName": "LobsterCoin",
  "constructorArgs": ["LobsterCoin", "LOB", "1000000000000000000000000"], 
  "sources": {
    "LobsterCoin.sol": {
      "content": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport \"@openzeppelin/contracts/token/ERC20/ERC20.sol\";\n\ncontract LobsterCoin is ERC20 {\n    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {\n        _mint(msg.sender, initialSupply);\n    }\n}"
    }
  }
}
```

### Example 2: Deploying an NFT Collection (ERC-721)
Non-fungible token collection.

**Task:** "Deploy an NFT collection called 'CyberLobsters'."

**Request:**
```json
{
  "chainId": "base",
  "privateKey": "YOUR_PRIVATE_KEY_HERE",
  "contractName": "CyberLobsters",
  "constructorArgs": ["CyberLobsters", "CLOB"],
  "sources": {
    "CyberLobsters.sol": {
      "content": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport \"@openzeppelin/contracts/token/ERC721/ERC721.sol\";\n\ncontract CyberLobsters is ERC721 {\n    uint256 private _nextTokenId;\n    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}\n    \n    function mint(address to) public {\n        uint256 tokenId = _nextTokenId++;\n        _safeMint(to, tokenId);\n    }\n}"
    }
  }
}
```

### Example 3: Deploying a DEX (Uniswap-style AMM)
Deploys a Factory contract that can create trading pairs.

**Task:** "Deploy a DEX Factory contract."

**Request:**
```json
{
  "chainId": "monad",
  "privateKey": "YOUR_PRIVATE_KEY_HERE",
  "contractName": "SimpleDEXFactory",
  "constructorArgs": ["0xYourFeeToSetterAddress"],
  "sources": {
    "SimpleDEX.sol": {
      "content": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract SimpleDEXFactory {\n    address public feeToSetter;\n    mapping(address => mapping(address => address)) public getPair;\n    address[] public allPairs;\n\n    event PairCreated(address indexed token0, address indexed token1, address pair, uint256);\n\n    constructor(address _feeToSetter) {\n        feeToSetter = _feeToSetter;\n    }\n\n    function createPair(address tokenA, address tokenB) external returns (address pair) {\n        // Simplified factory logic for demo purposes\n        // In a real DEX, this would deploy a new Pair contract using create2\n        pair = address(new SimplePair());\n        getPair[tokenA][tokenB] = pair;\n        getPair[tokenB][tokenA] = pair;\n        allPairs.push(pair);\n        emit PairCreated(tokenA, tokenB, pair, allPairs.length);\n    }\n}\n\ncontract SimplePair {\n    // Minimal placeholder pair contract\n    function swap() external {}\n}"
    }
  }
}
```

### Example 4: Deploying an NFT Marketplace
A contract to buy and sell NFTs.

**Task:** "Deploy a marketplace for trading ERC-721 tokens."

**Request:**
```json
{
  "chainId": "omega-mainnet",
  "privateKey": "YOUR_PRIVATE_KEY_HERE",
  "contractName": "LobsterMarket",
  "constructorArgs": ["0xFeeRecipientAddress", 250], 
  "sources": {
    "Marketplace.sol": {
      "content": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\nimport \"@openzeppelin/contracts/token/ERC721/IERC721.sol\";\nimport \"@openzeppelin/contracts/security/ReentrancyGuard.sol\";\n\ncontract LobsterMarket is ReentrancyGuard {\n    struct Listing {\n        address seller;\n        uint256 price;\n        bool active;\n    }\n    mapping(address => mapping(uint256 => Listing)) public listings;\n    address public feeRecipient;\n    uint256 public feeBps; // 250 = 2.5%\n\n    constructor(address _feeRecipient, uint256 _feeBps) {\n        feeRecipient = _feeRecipient;\n        feeBps = _feeBps;\n    }\n\n    function list(address token, uint256 tokenId, uint256 price) external {\n        IERC721(token).transferFrom(msg.sender, address(this), tokenId);\n        listings[token][tokenId] = Listing(msg.sender, price, true);\n    }\n\n    function buy(address token, uint256 tokenId) external payable nonReentrant {\n        Listing memory item = listings[token][tokenId];\n        require(item.active, \"Not for sale\");\n        require(msg.value >= item.price, \"Insufficient price\");\n\n        item.active = false;\n        listings[token][tokenId] = item;\n\n        uint256 fee = (msg.value * feeBps) / 10000;\n        payable(feeRecipient).transfer(fee);\n        payable(item.seller).transfer(msg.value - fee);\n        IERC721(token).transferFrom(address(this), msg.sender, tokenId);\n    }\n}"
    }
  }
}
```
