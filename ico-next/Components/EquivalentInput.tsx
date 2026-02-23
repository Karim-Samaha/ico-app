'use client'

import { formatEther } from 'ethers'
import { useMemo } from 'react'

interface EquivalentInputProps {
  amount: string
  tokenSalePrice: number | null
  label: string
  placeholder: string
  calculationType: 'eth-to-token' | 'token-to-eth'
}

export const EquivalentInput = ({
  amount,
  tokenSalePrice,
  label,
  placeholder,
  calculationType
}: EquivalentInputProps) => {
    
  const equivalent = useMemo(() => {
    if (!amount || !tokenSalePrice ) {
      return ''
    }
    console.log(amount, Number(tokenSalePrice))

    const tokenPriceInWei = Number(amount) * Number(tokenSalePrice)
    const valueInEth = formatEther(BigInt(Math.floor(tokenPriceInWei)))
    return valueInEth

  }, [amount, tokenSalePrice, calculationType])

  return (
    <div>
      <label className="flex-1 w-full flex flex-col">
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {label}
        </span>
        <input
          type="text"
          value={equivalent || ''}
          disabled
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-[#1a1a1f] font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </label>
    </div>
  )
}

