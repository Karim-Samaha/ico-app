'use client'

import { useUpdateTokenSalePrice } from '@/hooks/useUpdateTokenSalePrice'
import { useGetTokenSalePrice } from '@/hooks/useGetTokenSalePrice'
import { LoaderLayout } from './LoaderLayout'

export const TokenPriceForm = () => {
  const { tokenSalePrice, loading: priceLoading, refetch } = useGetTokenSalePrice()
  const {
    tokenSalePrice: newPrice,
    loading,
    error,
    changeTokenSalePrice,
    handleUpdateTokenSalePrice
  } = useUpdateTokenSalePrice({
    onSuccess: () => {
      refetch()
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleUpdateTokenSalePrice()
  }

  const formatPrice = (price: bigint | null) => {
    if (!price) return '-'
    return price.toString()
  }

  return (
    <LoaderLayout isLoading={priceLoading || loading} message="Processing transaction...">
      <div className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="bg-[#2c2f32] p-6 rounded-[10px]">
          <h3 className="font-epilogue font-medium text-[16px] leading-[22px] text-white mb-4">
            Current Token Sale Price
          </h3>
          <div className="flex items-center gap-4">
            <span className="font-epilogue font-semibold text-[20px] leading-[30px] text-[#1dc071]">
              {formatPrice(tokenSalePrice)}
            </span>
            <button
              type="button"
              onClick={refetch}
              className="font-epilogue font-normal text-[14px] leading-[22px] text-[#808191] hover:text-white"
            >
              Refresh Price
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
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
                New Token Sale Price *
              </span>
              <input
                type="number"
                step="0.000001"
                placeholder="Enter new token sale price"
                value={newPrice}
                onChange={(e) => changeTokenSalePrice(e.target.value)}
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
              Update Token Price
            </button>
          </div>
        </form>
      </div>
    </LoaderLayout>
  )
}

