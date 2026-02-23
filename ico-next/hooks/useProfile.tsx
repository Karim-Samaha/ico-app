import { getUserTokenBalance, getTokenDeails, getCurrentAccount, getWalletBalance } from '@/web3/useCases'
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
      console.log({ walletBalance, account })
      
      // Get token details (includes token address)
      const tokenDetails = await getTokenDeails()
      // Get user's token balance
      let userBalance: bigint | null = null
      if (tokenDetails.tokenAdress) {
        userBalance = await getUserTokenBalance(tokenDetails.tokenAdress, account)
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

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    profileData,
    loading,
    error,
    refetch: fetchProfile
  }
}

