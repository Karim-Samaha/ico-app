import { getIcoContract } from '../utils';
import { getTokenContract } from '../utils';
import { contractAddress } from '../../config';
import { parseUnits } from 'ethers';

/**
 * Donate tokens to the contract
 * @param amount - Amount of tokens to donate (in human-readable format, e.g., 100.5)
 * @returns Transaction receipt
 */
export const donateToken = async (
  amount: number,
) => {
  const icoContract = await getIcoContract();
  const tokenContract = await getTokenContract();
  
  
  // Approve the ICO contract to spend tokens on behalf of the user
  const approveTx = await tokenContract.approve(contractAddress, amount);
  await approveTx.wait();
  
  // Donate tokens to the contract
  const tx = await icoContract.donateToken(amount);
  return await tx.wait();
};

