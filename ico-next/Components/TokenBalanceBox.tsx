'use client'

interface TokenBalanceBoxProps {
    userTokenBalance?: bigint | null
    userWalletBalance?: number | null
    tokenSymbol?: string
    onRefresh: () => void
}

export const TokenBalanceBox = ({
    userTokenBalance,
    userWalletBalance,
    tokenSymbol,
    onRefresh
}: TokenBalanceBoxProps) => {
    const formatBalance = (balance: bigint | null) => {
        if (balance === null) return '-'
        // Convert from wei to ether (assuming 18 decimals)
        const etherValue = Number(balance) / 1e18
        return etherValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
        })
    }

    return (
        <div className="bg-[#2c2f32] p-6 rounded-[10px]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-epilogue font-medium text-[16px] leading-[22px] text-white">
                    Your Token Balance
                </h3>
                <button
                    type="button"
                    onClick={onRefresh}
                    className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191] hover:text-white transition-colors"
                >
                    Refresh
                </button>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-epilogue font-semibold text-[32px] leading-[40px] text-[#1dc071]">
                    {userWalletBalance && userWalletBalance}
                    {userTokenBalance && formatBalance(userTokenBalance)}
                </span>
                {tokenSymbol && (
                    <span className="font-epilogue font-normal text-[18px] leading-[28px] text-[#808191]">
                        {tokenSymbol}
                    </span>
                )}
            </div>
        </div>
    )
}

