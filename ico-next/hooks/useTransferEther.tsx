import { transferEther } from '@/web3/useCases'
import { parseEther } from 'ethers'
import { useState } from 'react'

interface UseTransferEtherProps {
  onSuccess?: () => void
}

export const useTransferEther = ({ onSuccess }: UseTransferEtherProps = {}) => {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeTo = (value: string) => {
    setTo(value)
    setError(null)
  }

  const changeAmount = (value: string) => {
    setAmount(value)
    setError(null)
  }

  const handleTransferEther = async () => {
    if (!to || !to.trim()) {
      setError('Please enter a valid address')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const amountInWei = parseEther(amount)
      await transferEther(to.trim(), amountInWei)
      setTo('')
      setAmount('')
      onSuccess?.()
    } catch (err: any) {
      console.error('Error transferring ether:', err)
      const errorMessage = err.message || 'Failed to transfer ether'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    to,
    amount,
    loading,
    error,
    changeTo,
    changeAmount,
    handleTransferEther
  }
}

