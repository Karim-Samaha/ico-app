import { getIcoContract } from '../utils';

/**
 * Transfer ether to a specified address
 * @param to - Address to transfer ether to
 * @param amount - Amount of ether to transfer in wei (as bigint)
 * @returns Transaction receipt
 */
export const transferEther = async (
  to: string,
  amount: bigint,
) => {
  const icoContract = await getIcoContract();
  
  // transferEther is a payable function, so we need to pass the value as msg.value
  const tx = await icoContract.transferEther(to, amount, { value: amount });
  return await tx.wait();
};

