import { transferToken } from '@/web3/useCases'
import { useState } from 'react'

interface UseTransferTokenProps {
  onSuccess?: () => void
}

export const useTransferToken = ({ onSuccess }: UseTransferTokenProps = {}) => {
  const [amount, setAmount] = useState('')
  const [to, setTo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeAmount = (value: string) => {
    setAmount(value)
    setError(null)
  }
  const changeTo = (value: string) => {
    setTo(value)
    setError(null)
  }

  const handleTransferToken = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await transferToken(to, parseFloat(amount))
      setAmount('')
      onSuccess?.()
      window.location.reload()
    } catch (err: any) {
      console.error('Error transferring token:', err)
      const errorMessage = err.message || 'Failed to transfer token'
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
    to,
    changeTo,
    changeAmount,
    handleTransferToken
  }
}

