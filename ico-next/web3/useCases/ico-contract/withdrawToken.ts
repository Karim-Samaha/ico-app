import { getIcoContract } from '../utils';
import { getTokenContract } from '../utils';
import { contractAddress } from '../../config';
import { parseUnits } from 'ethers';

/**
 * Withdraw tokens from the contract
 * @param amount - Amount of tokens to withdraw (in human-readable format, e.g., 100.5)
 * @returns Transaction receipt
 */
export const withdrawToken = async (
  amount: number,
) => {
  const icoContract = await getIcoContract();
  const tokenContract = await getTokenContract();
  
  // Get token decimals to convert amount to smallest unit
  const decimals = await tokenContract.decimals();
  
  // Convert amount to smallest unit (e.g., 1 token -> 1 * 10^18 wei)
  const amountInSmallestUnit = parseUnits(amount.toString(), decimals);
  
  // Approve the ICO contract to spend tokens on behalf of the user
  const approveTx = await tokenContract.approve(contractAddress, amountInSmallestUnit);
  await approveTx.wait();
  
  // Withdraw tokens from the contract
  const tx = await icoContract.withdrowToken(amountInSmallestUnit);
  return await tx.wait();
};

