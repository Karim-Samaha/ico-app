'use client'
import { MintTokenForm } from '@/Components/MintTokenForm'
import { BurnTokenForm } from '@/Components/BurnTokenForm'
import { useIsOwner } from '@/hooks/useIsOwner'
import { LoaderLayout } from '@/Components/LoaderLayout'

export default function UpdateTokenPage() {
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
            Update Token
          </h1>
          <p className="font-epilogue font-normal text-[16px] leading-[26px] text-[#808191] mt-3 text-center">
            Mint or burn tokens for the current contract address
          </p>

          <div className="w-full flex flex-col gap-12 mt-8">
            <div className="bg-[#1c1c24] border border-[#3a3a43] rounded-[10px] p-6">
              <h2 className="font-epilogue font-semibold text-[20px] leading-[30px] text-white mb-4">
                Mint Tokens
              </h2>
              <p className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191] mb-4">
                Create new tokens and send them to a specified address
              </p>
              <MintTokenForm />
            </div>

            <div className="bg-[#1c1c24] border border-[#3a3a43] rounded-[10px] p-6">
              <h2 className="font-epilogue font-semibold text-[20px] leading-[30px] text-white mb-4">
                Burn Tokens
              </h2>
              <p className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191] mb-4">
                Destroy tokens from your balance
              </p>
              <BurnTokenForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
