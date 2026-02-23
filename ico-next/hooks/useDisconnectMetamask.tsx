import { disconnectMetamask } from '@/web3/useCases'
import { useState } from 'react'

interface UseDisconnectMetamaskProps {
  onSuccess?: () => void
}

export const useDisconnectMetamask = ({ onSuccess }: UseDisconnectMetamaskProps = {}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDisconnect = async () => {
    try {
      setLoading(true)
      setError(null)
      await disconnectMetamask()
      onSuccess?.()
    } catch (err: any) {
      console.error('Error disconnecting from MetaMask:', err)
      const errorMessage = err.message || 'Failed to disconnect from MetaMask'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handleDisconnect
  }
}

