import { mintToken } from '@/web3/useCases'
import { useState } from 'react'

interface UseMintTokenProps {
  onSuccess?: () => void
}

export const useMintToken = ({ onSuccess }: UseMintTokenProps = {}) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)



  const changeAmount = (value: string) => {
    setAmount(value)
    setError(null)
  }

  const handleMintToken = async () => {
 

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await mintToken(parseFloat(amount))
      setAmount('')
      onSuccess?.()
    } catch (err: any) {
      console.error('Error minting token:', err)
      const errorMessage = err.message || 'Failed to mint token'
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
    handleMintToken
  }
}

