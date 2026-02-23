import { getCurrentAccount } from '@/web3/useCases'
import { useState, useEffect } from 'react'

export const useGetCurrentAccount = () => {
  const [account, setAccount] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAccount = async () => {
    try {
      setLoading(true)
      setError(null)
      const currentAccount = await getCurrentAccount()
      setAccount(currentAccount)
    } catch (err: any) {
      console.error('Error getting current account:', err)
      const errorMessage = err.message || 'Failed to get current account'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccount()
  }, [])

  return {
    account,
    loading,
    error,
    refetch: fetchAccount
  }
}

