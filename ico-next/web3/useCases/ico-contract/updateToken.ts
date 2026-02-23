import { getIcoContract } from '../utils';

/**
 * Update token information
 * @returns Transaction receipt
 */
export const updateToken = async () => {
  const icoContract = await getIcoContract();
  
  const tx = await icoContract.updateToken();
  return await tx.wait();
};

