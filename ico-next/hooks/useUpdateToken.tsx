import { updateToken } from '@/web3/useCases'
import { useState } from 'react'

interface UseUpdateTokenProps {
  onSuccess?: () => void
}

export const useUpdateToken = ({ onSuccess }: UseUpdateTokenProps = {}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpdateToken = async () => {
    try {
      setLoading(true)
      setError(null)
      await updateToken()
      onSuccess?.()
      window.location.reload()
    } catch (err: any) {
      console.error('Error updating token:', err)
      const errorMessage = err.message || 'Failed to update token'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handleUpdateToken
  }
}

