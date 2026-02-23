'use client'

import { TokenPriceForm } from '@/Components/TokenPriceForm'
import { useIsOwner } from '@/hooks/useIsOwner'
import { LoaderLayout } from '@/Components/LoaderLayout'

export default function TokenPricePage() {
  const { isOwner, loading } = useIsOwner()

  if (loading) {
    return (
      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-full md:w-4/5 lg:w-3/5">
          <LoaderLayout isLoading={true} message="Checking permissions...">
            <div></div>
          </LoaderLayout>
        </div>
      </div>
    )
  }

  if (!isOwner) {
    return (
      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-full md:w-4/5 lg:w-3/5">
          <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            <div className="bg-red-500/10 border border-red-500/50 rounded-[10px] p-6 w-full">
              <p className="font-epilogue font-semibold text-[18px] leading-[26px] text-red-400 text-center">
                Only contract owner can perform this action
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full md:w-4/5 lg:w-3/5">
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white text-center">
            Token Price
          </h1>
          <p className="font-epilogue font-normal text-[16px] leading-[26px] text-[#808191] mt-3 text-center">
            View and update token sale price
          </p>

          <TokenPriceForm />
        </div>
      </div>
    </div>
  )
}

