import { Contract } from 'ethers';
import { getProvider, getSigner } from '../utils';
import { ethers } from 'ethers';

// Standard ERC20 ABI for balanceOf function
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "type": "function"
  }
];

/**
 * Get user's token balance from the ERC20 token contract
 * @param tokenAddress - The address of the ERC20 token contract
 * @param userAddress - The address of the user
 * @returns User's token balance
 */
export const getUserTokenBalance = async (
  tokenAddress: string,
  userAddress: string
): Promise<bigint> => {
  const provider = getProvider();
  if (!provider) {
    throw new Error('No provider found. Please install MetaMask or another Web3 wallet.');
  }

  const tokenContract = new Contract(
    tokenAddress,
    ERC20_ABI,
    provider
  );

  const balance = await tokenContract.balanceOf(userAddress);
  return balance;
};

