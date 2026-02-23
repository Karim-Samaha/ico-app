import { updateTokenSalePrice } from '@/web3/useCases'
import { useState } from 'react'

interface UseUpdateTokenSalePriceProps {
  onSuccess?: () => void
}

export const useUpdateTokenSalePrice = ({ onSuccess }: UseUpdateTokenSalePriceProps = {}) => {
  const [tokenSalePrice, setTokenSalePrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeTokenSalePrice = (value: string) => {
    setTokenSalePrice(value)
    setError(null)
  }

  const handleUpdateTokenSalePrice = async () => {
    if (!tokenSalePrice || parseFloat(tokenSalePrice) <= 0) {
      setError('Please enter a valid token sale price')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await updateTokenSalePrice(+tokenSalePrice)
      setTokenSalePrice('')
      onSuccess?.()
      window.location.reload()
    } catch (err: any) {
      console.error('Error updating token sale price:', err)
      const errorMessage = err.message || 'Failed to update token sale price'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    tokenSalePrice,
    loading,
    error,
    changeTokenSalePrice,
    handleUpdateTokenSalePrice
  }
}

