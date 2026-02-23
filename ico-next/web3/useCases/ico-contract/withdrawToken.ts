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
  
  
  // Approve the ICO contract to spend tokens on behalf of the user
  const approveTx = await tokenContract.approve(contractAddress, amount);
  await approveTx.wait();
  
  // Withdraw tokens from the contract
  const tx = await icoContract.withdrowToken(amount);
  return await tx.wait();
};

