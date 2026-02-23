'use client'

import { useWithdrawToken } from '@/hooks/useWithdrawToken'
import { LoaderLayout } from './LoaderLayout'
import { TokenStatus } from './TokenStatus'
import { TokenBalanceBox } from './TokenBalanceBox'
import { useProfile } from '@/hooks'

export const WithdrawForm = () => {
  const { userBalance } = useProfile()
  const {
    amount,
    loading,
    error,
    changeAmount,
    handleWithdrawToken
  } = useWithdrawToken()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleWithdrawToken()
  }

  return (
    <LoaderLayout isLoading={loading} message="Processing transaction...">
      <div className="mb-8 mt-2 w-full">
        <TokenBalanceBox
          userWalletBalance={userBalance as unknown as number}
          tokenSymbol="ETH"
          onRefresh={() => window.location.reload()}
        />
      </div>
      <div className="mb-8 mt-2 w-full">
        <TokenStatus showTotalSupply={false} showAvailableToBuy={false} />
      </div>
      <form onSubmit={handleSubmit} className="w-full  flex flex-col gap-[30px]">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-[10px] p-4">
            <p className="font-epilogue font-normal text-[14px] leading-[22px] text-red-400">
              {error}
            </p>
          </div>
        )}

        <div>
          <label className="flex-1 w-full flex flex-col">
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
              Token Amount *
            </span>
            <input
              type="number"
              step="0.000001"
              placeholder="Enter amount of tokens to withdraw"
              value={amount}
              onChange={(e) => changeAmount(e.target.value)}
              className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
            />
          </label>
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <button
            type="submit"
            disabled={loading}
            className="font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-[#1dc071] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Withdraw Tokens
          </button>
        </div>
      </form>
    </LoaderLayout>
  )
}

