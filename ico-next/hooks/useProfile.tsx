import { getUserTokenBalance, getTokenDeails, getCurrentAccount, getWalletBalance } from '@/web3/useCases'
import { formatEther } from 'ethers'
import { useState, useEffect } from 'react'

interface TokenDetails {
  name: string
  symbol: string
  balance: bigint
  supply: bigint
  tokenPrice: bigint
  tokenAdress: string
  tokensSold: bigint

}

interface ProfileData {
  account: string | null
  walletBalance: bigint | null
  userTokenBalance: bigint | null
  tokenDetails: TokenDetails | null
}

export const useProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    account: null,
    walletBalance: null,
    userTokenBalance: null,
    tokenDetails: null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get current account
      const account = await getCurrentAccount()
      console.log({ account })
      if (!account) {
        setError('Please connect your wallet')
        setLoading(false)
        return
      }

      // Get wallet balance in ETH
      const walletBalance = await getWalletBalance(account)
      
      // Get token details (includes token address)
      const tokenDetails = await getTokenDeails()
      // Get user's token balance
      let userBalance: bigint | null = null
      if (tokenDetails.tokenAdress) {
        userBalance = await getUserTokenBalance(tokenDetails.tokenAdress, account)
        console.log({userBalance})
      }
      console.log({tokenDetails})
      setProfileData({
        account,
        walletBalance,
        userTokenBalance: userBalance,
        tokenDetails: tokenDetails
      })
    } catch (err: any) {
      console.error('Error getting profile data:', err)
      const errorMessage = err.message || 'Failed to get profile data'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  const formatWalletBalance = (balance: bigint | null) => {
    if (balance === null || balance === undefined) return '-'
    try {
      // Convert from wei to ether using ethers utility (handles large bigints properly)
      const etherValue = formatEther(balance)
      // Return the full decimal representation
      return etherValue
    } catch (error) {
      console.error('Error formatting wallet balance:', error)
      return '-'
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    profileData,
    loading,
    error,
    userBalance: formatWalletBalance(profileData.walletBalance),
    refetch: fetchProfile
  }
}

