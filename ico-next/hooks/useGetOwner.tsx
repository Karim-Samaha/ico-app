import { getOwner } from '@/web3/useCases'
import { useState, useEffect } from 'react'

export const useGetOwner = () => {
  const [owner, setOwner] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOwner = async () => {
    try {
      setLoading(true)
      setError(null)
      const ownerAddress = await getOwner()
      setOwner(ownerAddress)
    } catch (err: any) {
      console.error('Error getting owner:', err)
      const errorMessage = err.message || 'Failed to get owner'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOwner()
  }, [])

  return {
    owner,
    loading,
    error,
    refetch: fetchOwner
  }
}

