# Deploying Your First Omega Token

## 1. Open the IDE
Go to the main page and click **"Open IDE"**.

## 2. Open `OmegaToken.sol`
In the file explorer on the left, you will see a file named **`OmegaToken.sol`**. Click it to open.

It contains a ready-to-deploy ERC20 token:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OmegaToken is ERC20, Ownable {
    constructor() ERC20("Omega Token", "OMN") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

## 3. Compile
Click the **Compile** button in the top right.
Wait for the green checkmark: `✓ Compiled`.

## 4. Connect Wallet
Click **Connect** in the top right.
- It will ask to switch to **Omega Network**.
- Approve the switch/add network request in MetaMask.

## 5. Deploy
Click **Deploy**.
- MetaMask will pop up asking to confirm the transaction.
- Once confirmed, wait a few seconds.
- You will see `✓ Deployed OmegaToken at 0x...` in the console!

**Congratulations! You have launched your first token on Omega Network!** 🚀
