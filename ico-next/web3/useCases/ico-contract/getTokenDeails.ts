import { getIcoContract } from '../utils';

/**
 * Get token details from the ICO contract
 * @returns Object containing name, symbol, balance, supply, tokenPrice, and tokenAdress
 */
export const getTokenDeails = async () => {
  const icoContract = await getIcoContract();
  
  const result = await icoContract.getTokenDeails();
  return {
    name: result[0],
    symbol: result[1],
    balance: result[2],
    supply: result[3],
    tokenPrice: result[4],
    tokenAdress: result[5],
    tokensSold: result[6]
  };
};

