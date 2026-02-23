import { buyToken } from '@/web3/useCases'
import { useState } from 'react'

interface UsePurchaseTokenProps {
  onSuccess?: () => void
}

export const usePurchaseToken = ({ onSuccess }: UsePurchaseTokenProps = {}) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeAmount = (value: string) => {
    setAmount(value)
    setError(null)
  }

  const handlePurchaseToken = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // Convert ether to wei (assuming 18 decimals)
      const valueInWei = parseFloat(amount) * 1e18

      await buyToken(valueInWei)
      setAmount('')
      onSuccess?.()
    } catch (err: any) {
      console.error('Error purchasing token:', err)
      const errorMessage = err.message || 'Failed to purchase token'
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
    handlePurchaseToken
  }
}

