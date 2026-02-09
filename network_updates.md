# Added Somnia & Monad Network Support

We have expanded the network support to include **Somnia** and **Monad**, alongside the existing Omega Network.

## New Networks

### 1. Somnia Network
- **Chain ID**: `5031` (0x13a7)
- **RPC**: `https://api.infra.mainnet.somnia.network/`
- **Explorer**: `https://explorer.somnia.network`
- **Currency**: `SOMI`

### 2. Monad Mainnet
- **Chain ID**: `143` (0x8f)
- **RPC**: `https://rpc.monad.xyz`
- **Explorer**: `https://monadscan.com`
- **Currency**: `MON`

## Improved Connection Logic
The `connect()` function has been upgraded to be **dynamic**:
- It respects the network currently selected in the DApp Forge UI.
- If you select **Somnia** in the dropdown and click Connect, it will switch/add Somnia.
- If you select **Monad**, it will switch/add Monad.
- If no specific network is selected (or generic Ethereum), it defaults to **Omega Network**.

## How to Switch Networks
1.  In the DApp Forge UI (top right), click on the network dropdown (e.g., where it shows the current chain icon).
2.  Select **Somnia** or **Monad**.
3.  If you are not connected, click **Connect**.
4.  MetaMask will prompt to switch to the chosen network.
