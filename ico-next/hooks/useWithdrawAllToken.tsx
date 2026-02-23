import { withdrowAllToken } from '@/web3/useCases'
import { useState } from 'react'

interface UseWithdrawAllTokenProps {
  onSuccess?: () => void
}

export const useWithdrawAllToken = ({ onSuccess }: UseWithdrawAllTokenProps = {}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleWithdrawAllToken = async () => {
    try {
      setLoading(true)
      setError(null)
      await withdrowAllToken()
      onSuccess?.()
      window.location.reload()
    } catch (err: any) {
      console.error('Error withdrawing all tokens:', err)
      const errorMessage = err.message || 'Failed to withdraw all tokens'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handleWithdrawAllToken
  }
}

