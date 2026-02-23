'use client'

import { useProfile } from '@/hooks'
import { LoaderLayout } from './LoaderLayout'
import { TokenBalanceBox } from './TokenBalanceBox'

export const Profile = () => {
  const { profileData, userBalance, loading, error, refetch } = useProfile()

  const formatAddress = (address: string | null) => {
    if (!address) return '-'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }



  const formatPrice = (price: bigint | null) => {
    if (price === null) return '-'
    return price.toString()
  }

  const formatSupply = (supply: bigint | null) => {
    if (supply === null) return '-'
    const supplyValue = Number(supply) / 1e18
    return supplyValue.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  return (
    <LoaderLayout isLoading={loading} message="Loading profile...">
      <div className="w-full mt-[65px] flex flex-col gap-[30px]">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-[10px] p-4">
            <p className="font-epilogue font-normal text-[14px] leading-[22px] text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* User Wallet Section */}
        <div className="bg-[#2c2f32] p-6 rounded-[10px]">
          <h3 className="font-epilogue font-medium text-[16px] leading-[22px] text-white mb-4">
            Your Wallet
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191]">
              Address:
            </span>
            <span className="font-epilogue font-semibold text-[16px] leading-[26px] text-white">
              {formatAddress(profileData.account)}
            </span>
          </div>
          {profileData.account && (
            <div className="mt-2 text-right">
              <span className="font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] break-all">
                {profileData.account}
              </span>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191]">
              Balance:
            </span>
            <span className="font-epilogue font-semibold text-[16px] leading-[26px] text-white">
              {userBalance} ETH
            </span>
          </div>
        </div>

        {/* Token Balance Section */}
        <TokenBalanceBox
          userTokenBalance={profileData.userTokenBalance}
          tokenSymbol={profileData.tokenDetails?.symbol}
          onRefresh={refetch}
        />

        {/* Token Information Section */}
        {profileData.tokenDetails && (
          <div className="bg-[#2c2f32] p-6 rounded-[10px]">
            <h3 className="font-epilogue font-medium text-[16px] leading-[22px] text-white mb-6">
              Token Information
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191]">
                  Name:
                </span>
                <span className="font-epilogue font-semibold text-[16px] leading-[26px] text-white">
                  {profileData.tokenDetails.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191]">
                  Symbol:
                </span>
                <span className="font-epilogue font-semibold text-[16px] leading-[26px] text-white">
                  {profileData.tokenDetails.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191]">
                  Token Price:
                </span>
                <span className="font-epilogue font-semibold text-[16px] leading-[26px] text-[#1dc071]">
                  {formatPrice(profileData.tokenDetails.tokenPrice)} Wei
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191]">
                  Total Supply:
                </span>
                <span className="font-epilogue font-semibold text-[16px] leading-[26px] text-white">
                  {formatSupply(profileData.tokenDetails.supply)} {profileData.tokenDetails.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191]">
                  Tokens Sold:
                </span>
                <span className="font-epilogue font-semibold text-[16px] leading-[26px] text-white">
                  {profileData.tokenDetails.tokensSold} {profileData.tokenDetails?.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191]">
                  Available Tokens to buy:
                </span>
                <span className="font-epilogue font-semibold text-[16px] leading-[26px] text-white">
                  {Number(formatSupply(profileData.tokenDetails.supply)) - Number(profileData.tokenDetails.tokensSold)} {profileData.tokenDetails?.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191]">
                  Token Address:
                </span>
                <span className="font-epilogue font-normal text-[12px] leading-[18px] text-white break-all text-right max-w-[60%]">
                  {profileData.tokenDetails.tokenAdress}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </LoaderLayout>
  )
}

