import { getIcoContract } from '../utils';

/**
 * Update the token sale price
 * @param tokenSalePrice - New token sale price
 * @returns Transaction receipt
 */
export const updateTokenSalePrice = async (
  tokenSalePrice: number,
) => {
  const icoContract = await getIcoContract();
  
  const tx = await icoContract.updateTokenSalePrice(tokenSalePrice);
  return await tx.wait();
};

