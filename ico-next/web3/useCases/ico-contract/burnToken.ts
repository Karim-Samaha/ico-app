import { contractAddress } from '@/web3/config';
import { getTokenContract } from '../utils';
import { parseUnits } from 'ethers';

/**
 * Burn tokens from the contract address
 * @param amount - Amount of tokens to burn (in human-readable format, e.g., 100.5)
 * @returns Transaction receipt
 */
export const burnToken = async (
  amount: number,
) => {
  const tokenContract = await getTokenContract();
  

  const burnFunction = tokenContract.getFunction("burn(address,uint256)");
  const tx = await burnFunction(contractAddress, amount);
  return await tx.wait();
};

