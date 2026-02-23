import { burnToken } from '@/web3/useCases'
import { useState } from 'react'

interface UseBurnTokenProps {
  onSuccess?: () => void
}

export const useBurnToken = ({ onSuccess }: UseBurnTokenProps = {}) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeAmount = (value: string) => {
    setAmount(value)
    setError(null)
  }

  const handleBurnToken = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await burnToken(parseFloat(amount))
      setAmount('')
      onSuccess?.()
    } catch (err: any) {
      console.error('Error burning token:', err)
      const errorMessage = err.message || 'Failed to burn token'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    amount,
    loading,
    error,
    changeAmount,
    handleBurnToken
  }
}

