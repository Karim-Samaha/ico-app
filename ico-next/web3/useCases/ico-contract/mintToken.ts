import { contractAddress } from '@/web3/config';
import { getTokenContract } from '../utils';
import { parseUnits } from 'ethers';

/**
 * Mint tokens to a specified address
 * @param to - Address to mint tokens to
 * @param amount - Amount of tokens to mint (in human-readable format, e.g., 100.5)
 * @returns Transaction receipt
 */
export const mintToken = async (
  amount: number,
) => {
  const tokenContract = await getTokenContract();
  
  // Get token decimals to convert amount to smallest unit
  const decimals = await tokenContract.decimals();
  
  // Convert amount to smallest unit (e.g., 100 tokens -> 100 * 10^decimals)
  const amountInSmallestUnit = parseUnits(amount.toString(), decimals);
  
  // Mint tokens to the specified address
  const tx = await tokenContract.mint(contractAddress, amountInSmallestUnit);
  return await tx.wait();
};

