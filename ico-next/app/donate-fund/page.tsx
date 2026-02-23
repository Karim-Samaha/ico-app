import { DonateFundForm } from '@/Components/DonateFundForm'

export default function DonateFundPage() {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full md:w-4/5 lg:w-3/5">
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white text-center">
            Donate Fund
          </h1>
          <p className="font-epilogue font-normal text-[16px] leading-[26px] text-[#808191] mt-3 text-center">
            Buy tokens by donating funds
          </p>

          <DonateFundForm />
        </div>
      </div>
    </div>
  )
}

