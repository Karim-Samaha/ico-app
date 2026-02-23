import { getIcoContract } from '../utils';

/**
 * Get the token sale price
 * @returns Token sale price
 */
export const getTokenSalePrice = async () => {
  const icoContract = await getIcoContract();
  
  return await icoContract.tokenSalePrice();
};

