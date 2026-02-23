import { contractAddress } from '@/web3/config';
import { getTokenContract } from '../utils';

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
  
  
  // Mint tokens to the specified address
  const tx = await tokenContract.mint(contractAddress, amount);
  return await tx.wait();
};

