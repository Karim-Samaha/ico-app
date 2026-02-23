import { donateToken } from '@/web3/useCases'
import { useState } from 'react'

interface UseDonateTokenProps {
  onSuccess?: () => void
}

export const useDonateToken = ({ onSuccess }: UseDonateTokenProps = {}) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeAmount = (value: string) => {
    setAmount(value)
    setError(null)
  }

  const handleDonateToken = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await donateToken(parseFloat(amount))
      setAmount('')
      onSuccess?.()
    } catch (err: any) {
      console.error('Error donating token:', err)
      const errorMessage = err.message || 'Failed to donate token'
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
    handleDonateToken
  }
}

