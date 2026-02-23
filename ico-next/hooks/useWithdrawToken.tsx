import { withdrawToken } from '@/web3/useCases'
import { useState } from 'react'

interface UseWithdrawTokenProps {
  onSuccess?: () => void
}

export const useWithdrawToken = ({ onSuccess }: UseWithdrawTokenProps = {}) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeAmount = (value: string) => {
    setAmount(value)
    setError(null)
  }

  const handleWithdrawToken = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await withdrawToken(parseFloat(amount))
      setAmount('')
      onSuccess?.()
      window.location.reload()
    } catch (err: any) {
      console.error('Error withdrawing token:', err)
      const errorMessage = err.message || 'Failed to withdraw token'
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
    handleWithdrawToken
  }
}

