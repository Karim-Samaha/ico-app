import { Contract } from 'ethers';
import { tokenAddress, tokenABI } from '../../config';
import { getSigner } from './getContract';

/**
 * Get an instance of the Token contract
 * @returns Token contract instance with signer
 */
export const getTokenContract = async (): Promise<Contract> => {
  const signer = await getSigner();
  if (!signer) {
    throw new Error('No signer found. Please install MetaMask or another Web3 wallet.');
  }

  return new Contract(
    tokenAddress,
    tokenABI,
    signer
  );
};




