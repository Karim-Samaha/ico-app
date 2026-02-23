import { connectMetamask } from '@/web3/useCases'
import { useState } from 'react'

interface UseConnectMetamaskProps {
  onSuccess?: (account: string) => void
}

export const useConnectMetamask = ({ onSuccess }: UseConnectMetamaskProps = {}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [account, setAccount] = useState<string | null>(null)

  const handleConnect = async () => {
    try {
      setLoading(true)
      setError(null)
      const connectedAccount = await connectMetamask()
      setAccount(connectedAccount)
      onSuccess?.(connectedAccount)
    } catch (err: any) {
      console.error('Error connecting to MetaMask:', err)
      const errorMessage = err.message || 'Failed to connect to MetaMask'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    account,
    loading,
    error,
    handleConnect
  }
}

