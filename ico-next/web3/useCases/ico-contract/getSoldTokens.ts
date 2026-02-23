import { getIcoContract } from '../utils';

/**
 * Get the number of sold tokens
 * @returns Number of sold tokens
 */
export const getSoldTokens = async () => {
  const icoContract = await getIcoContract();
  
  return await icoContract.soldTokens();
};

