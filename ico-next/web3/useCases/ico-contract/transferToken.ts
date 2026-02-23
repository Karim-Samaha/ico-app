import { getIcoContract, getTokenContract } from '../utils';
import { contractAddress } from '../../config';
import { parseUnits } from 'ethers';

/**
 * Transfer tokens
 * @param to - Address to transfer tokens to
 * @param amount - Amount of tokens to transfer (in human-readable format, e.g., 100.5)
 * @returns Transaction receipt
 */
export const transferToken = async (
  to: string,
  amount: number,
) => {
  const tokenContract = await getTokenContract();
  const icoContract = await getIcoContract();
  
  
  
  // Approve the ICO contract to spend tokens on behalf of the user
  const approveTx = await tokenContract.approve(contractAddress, amount);
  await approveTx.wait();
  
  // Transfer tokens through the ICO contract
  const tx = await icoContract.transferToken(to, amount);
  return await tx.wait();
};

