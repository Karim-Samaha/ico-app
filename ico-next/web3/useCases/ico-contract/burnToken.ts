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
  
  // Get token decimals to convert amount to smallest unit
  const decimals = await tokenContract.decimals();
  
  // Convert amount to smallest unit (e.g., 100 tokens -> 100 * 10^decimals)
  const amountInSmallestUnit = parseUnits(amount.toString(), decimals);
  
  // Burn tokens from the specified address (requires burner/minter role)
  // Using burn(address, uint256) instead of burnFrom which requires approval
  // Explicitly specify the overload to avoid ambiguity
  const burnFunction = tokenContract.getFunction("burn(address,uint256)");
  const tx = await burnFunction(contractAddress, amountInSmallestUnit);
  return await tx.wait();
};

