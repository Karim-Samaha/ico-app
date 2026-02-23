import { Contract } from 'ethers';
import { contractAddress, IcoContractABI } from '../../config';
import { IcoContractInstance } from '../types';
import { ethers } from 'ethers';

/**
 * Get an instance of the Factory contract
 */

export const getProvider = (): ethers.BrowserProvider | null => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

// Get signer from provider
export const getSigner = async (): Promise<ethers.JsonRpcSigner | null> => {
  const provider = getProvider();
  if (!provider) {
    throw new Error('No provider found. Please install MetaMask or another Web3 wallet.');
  }
  return await provider.getSigner();
};

export const getIcoContract = async (
): Promise<any> => {
  const signer = await getSigner();
  if (!signer) {
    throw new Error('No signer found. Please install MetaMask or another Web3 wallet.');
  }

  return new Contract(
    contractAddress,
    IcoContractABI,
    signer
  ) as IcoContractInstance;
};




