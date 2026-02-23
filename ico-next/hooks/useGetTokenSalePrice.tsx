import { getTokenSalePrice } from '@/web3/useCases'
import { useState, useEffect } from 'react'

export const useGetTokenSalePrice = () => {
  const [tokenSalePrice, setTokenSalePrice] = useState<bigint | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTokenSalePrice = async () => {
    try {
      setLoading(true)
      setError(null)
      const price = await getTokenSalePrice()
      setTokenSalePrice(price)
    } catch (err: any) {
      console.error('Error getting token sale price:', err)
      const errorMessage = err.message || 'Failed to get token sale price'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTokenSalePrice()
  }, [])

  return {
    tokenSalePrice,
    loading,
    error,
    refetch: fetchTokenSalePrice
  }
}

