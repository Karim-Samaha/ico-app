import { getTokenDeails } from '@/web3/useCases'
import { useState, useEffect } from 'react'

interface TokenDetails {
  name: string
  symbol: string
  balance: bigint
  supply: bigint
  tokenPrice: bigint
  tokenAdress: string
}

export const useGetTokenDetails = () => {
  const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTokenDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const details = await getTokenDeails()
      setTokenDetails(details)
    } catch (err: any) {
      console.error('Error getting token details:', err)
      const errorMessage = err.message || 'Failed to get token details'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTokenDetails()
  }, [])

  return {
    tokenDetails,
    loading,
    error,
    refetch: fetchTokenDetails
  }
}

