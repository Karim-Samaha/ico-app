# Deployment Guide for Sepolia Testnet

This guide will help you deploy your smart contracts to the Sepolia testnet.

## Prerequisites

1. **Get Sepolia ETH**: You'll need Sepolia ETH to pay for gas fees. Get it from:
   - https://sepoliafaucet.com/
   - https://faucet.quicknode.com/ethereum/sepolia
   - https://www.alchemy.com/faucets/ethereum-sepolia

2. **Get an RPC URL**: You need an RPC endpoint for Sepolia. Get one from:
   - [Alchemy](https://www.alchemy.com/)
   - [Infura](https://infura.io/)
   - [QuickNode](https://www.quicknode.com/)

3. **Get your private key**: Export your wallet's private key (make sure it's a test wallet with Sepolia ETH)

## Setup Environment Variables

You need to set two environment variables:

### Option 1: Using Environment Variables (Recommended)

Create a `.env` file in the project root (or export them in your shell):

```bash
export SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"
export SEPOLIA_PRIVATE_KEY="your_private_key_here_without_0x_prefix"
```

Or create a `.env` file:
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
SEPOLIA_PRIVATE_KEY=your_private_key_here_without_0x_prefix
```

**Important**: Never commit your `.env` file to version control! It's already in `.gitignore`.

### Option 2: Using Hardhat Keystore

Alternatively, you can use Hardhat's keystore plugin:

```bash
npx hardhat keystore set SEPOLIA_RPC_URL
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

## Deploy Contracts

### Deploy Both Contracts Together (Recommended)

The `IcoTokenModule` deploys both `MyToken` and `IcoToken` contracts:

```bash
npx hardhat ignition deploy ignition/modules/IcoToken.ts --network sepolia
```

### Deploy Contracts Separately

If you want to deploy them separately:

1. Deploy Token first:
```bash
npx hardhat ignition deploy ignition/modules/Token.ts --network sepolia
```

2. Then deploy IcoToken (you'll need to modify the module to use the deployed token address):
```bash
npx hardhat ignition deploy ignition/modules/IcoToken.ts --network sepolia
```

## Post-Deployment Steps

After deploying, you may want to:

1. **Mint tokens to the IcoToken contract** for sale:
   - The IcoToken contract needs tokens to sell
   - You can do this by calling the `mint` function on the MyToken contract

2. **Set the token sale price**:
   ```bash
   npx hardhat run scripts/setTokenPrice.ts --network sepolia
   ```
   (You may need to create this script)

3. **Verify contracts on Etherscan** (optional):
   - Go to https://sepolia.etherscan.io/
   - Verify your contracts for transparency

## Troubleshooting

- **"Insufficient funds"**: Make sure your wallet has enough Sepolia ETH
- **"Invalid RPC URL"**: Double-check your RPC URL is correct
- **"Invalid private key"**: Ensure your private key doesn't have the `0x` prefix
- **"Contract not found"**: Make sure you've compiled the contracts first with `npx hardhat compile`
