import { getIcoContract } from '../utils';

/**
 * Purchase tokens by sending ether
 * @param amount - Amount in wei to send as msg.value
 * @returns Transaction receipt
 */
export const buyToken = async (
  amount: number,  
) => {
  const icoContract = await getIcoContract();
  
  // For payable functions, options.value is used as msg.value
  const tx = await icoContract.buyToken({ value: amount });
  return await tx.wait();
};
