import { getIcoContract } from '../utils';

/**
 * Get the owner address of the ICO contract
 * @returns Owner address
 */
export const getOwner = async () => {
  const icoContract = await getIcoContract();
  
  return await icoContract.owner();
};

