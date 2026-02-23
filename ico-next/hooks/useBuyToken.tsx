import { buyToken } from '@/web3/useCases'
import { useState } from 'react'

interface UseBuyTokenProps {
  onSuccess?: () => void
}

export const useBuyToken = ({ onSuccess }: UseBuyTokenProps = {}) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeAmount = (value: string) => {
    setAmount(value)
    setError(null)
  }

  const handleBuyToken = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await buyToken(+amount)
      setAmount('')
      onSuccess?.()
    } catch (err: any) {
      console.error('Error buying token:', err)
      const errorMessage = err.message || 'Failed to buy token'
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
    handleBuyToken
  }
}

