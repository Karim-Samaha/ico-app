import { getIcoContract } from '../utils';

/**
 * Withdraw all tokens from the contract
 * @returns Transaction receipt
 */
export const withdrowAllToken = async () => {
  const icoContract = await getIcoContract();
  
  const tx = await icoContract.withdrowAllToken();
  return await tx.wait();
};

