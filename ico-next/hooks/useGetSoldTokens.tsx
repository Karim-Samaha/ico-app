import { getSoldTokens } from '@/web3/useCases'
import { useState, useEffect } from 'react'

export const useGetSoldTokens = () => {
  const [soldTokens, setSoldTokens] = useState<bigint | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSoldTokens = async () => {
    try {
      setLoading(true)
      setError(null)
      const tokens = await getSoldTokens()
      setSoldTokens(tokens)
    } catch (err: any) {
      console.error('Error getting sold tokens:', err)
      const errorMessage = err.message || 'Failed to get sold tokens'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSoldTokens()
  }, [])

  return {
    soldTokens,
    loading,
    error,
    refetch: fetchSoldTokens
  }
}

