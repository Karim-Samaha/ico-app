'use client'
import { getTokenDeails } from '@/web3/useCases'
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

interface TokenStatusProps {
  showTotalSupply?: boolean
  showTokensSold?: boolean
  showAvailableToBuy?: boolean
  showTokenPrice?: boolean
}

export const TokenStatus = ({
  showTotalSupply = true,
  showTokensSold = true,
  showAvailableToBuy = true,
  showTokenPrice = true
}: TokenStatusProps = {}) => {
  const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTokenStatus = async () => {
    try {
      setLoading(true)
      setError(null)
      const details = await getTokenDeails()
      setTokenDetails(details)
    } catch (err: any) {
      console.error('Error getting token status:', err)
      const errorMessage = err.message || 'Failed to get token status'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTokenStatus()
  }, [])

  const formatSupply = (supply: bigint | null) => {
    if (supply === null) return '-'
    const supplyValue = Number(supply)
    return supplyValue.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const formatTokensSold = (tokensSold: bigint | null) => {
    if (tokensSold === null) return '-'
    const tokensSoldValue = Number(tokensSold)
    return tokensSoldValue.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const formatAvailable = (supply: bigint | null, tokensSold: bigint | null) => {
    if (supply === null || tokensSold === null) return '-'
    const supplyValue = Number(supply) 
    const soldValue = Number(tokensSold) 
    return (supplyValue - soldValue).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const formatPrice = (price: bigint | null) => {
    if (price === null) return '-'
    return price.toString()
  }

  if (loading) {
    return (
      <div className="bg-[#1c1c24] rounded-[20px] p-6 border border-[#3a3a43]">
        <div className="flex items-center justify-center">
          <span className="font-epilogue font-normal text-[16px] text-[#808191]">
            Loading token status...
          </span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#1c1c24] rounded-[20px] p-6 border border-red-500/50">
        <div className="flex items-center justify-center">
          <span className="font-epilogue font-normal text-[14px] text-red-400">
            {error}
          </span>
        </div>
      </div>
    )
  }

  if (!tokenDetails) {
    return null
  }

  return (
    <div className="bg-[#1c1c24] rounded-[20px] p-6 border border-[#3a3a43] w-full">
      <div className="flex  items-center justify-between gap-4 md:gap-6">
        {showTotalSupply && (
          <div className="flex items-center gap-2">
            <span className="font-epilogue font-normal text-[14px] text-[#808191]">
              Total Supply:
            </span>
            <span className="font-epilogue font-semibold text-[16px] text-white">
              {formatSupply(tokenDetails.supply)} {tokenDetails.symbol}
            </span>
          </div>
        )}

        {showTokensSold && (
          <div className="flex items-center gap-2">
            <span className="font-epilogue font-normal text-[14px] text-[#808191]">
              Tokens Sold:
            </span>
            <span className="font-epilogue font-semibold text-[16px] text-white">
              {formatTokensSold(tokenDetails.tokensSold)} {tokenDetails.symbol}
            </span>
          </div>
        )}

        {showAvailableToBuy && (
          <div className="flex items-center gap-2">
            <span className="font-epilogue font-normal text-[14px] text-[#808191]">
              Available to Buy:
            </span>
            <span className="font-epilogue font-semibold text-[16px] text-[#1dc071]">
              {formatAvailable(tokenDetails.supply, tokenDetails.tokensSold)} {tokenDetails.symbol}
            </span>
          </div>
        )}

        {showTokenPrice && (
          <div className="flex items-center gap-2">
            <span className="font-epilogue font-normal text-[14px] text-[#808191]">
              Token Price:
            </span>
            <span className="font-epilogue font-semibold text-[16px] text-[#1dc071]">
              {formatPrice(tokenDetails.tokenPrice)} Wei
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

