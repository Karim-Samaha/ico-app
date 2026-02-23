import Image from "next/image";
import Link from "next/link";
import { payment, money, withdraw, tagType, profile } from "@/assets";
import { TokenStatus } from "@/Components/TokenStatus";

export default function Home() {
  const features = [
    {
      title: "Purchase Token",
      description: "Purchase tokens using ether",
      route: "/purchase-token",
      image: payment,
      color: "bg-gradient-to-br from-teal-500 to-teal-700",
    },
    {
      title: "Token Transfer",
      description: "Transfer tokens to another address",
      route: "/token-transfer",
      image: money,
      color: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      title: "Transfer Fund",
      description: "Transfer funds between addresses",
      route: "/transfer-fund",
      image: tagType,
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
  
    {
      title: "Donate Fund",
      description: "Donate funds to support the project",
      route: "/donate-fund",
      image: payment,
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
    },
    {
      title: "Withdraw",
      description: "Withdraw tokens from your account",
      route: "/withdraw",
      image: withdraw,
      color: "bg-gradient-to-br from-orange-500 to-orange-700",
    },
    {
      title: "Update Token",
      description: "Update token information and settings",
      route: "/update-token",
      image: tagType,
      color: "bg-gradient-to-br from-cyan-500 to-cyan-700",
    },
    {
      title: "Token Price",
      description: "View and manage token pricing",
      route: "/token-price",
      image: money,
      color: "bg-gradient-to-br from-pink-500 to-pink-700",
    },
    {
      title: "Profile",
      description: "View your token balance and token information",
      route: "/profile",
      image: profile,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-700",
    },
 
  ];

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full max-w-[1400px]">
        <div className="mb-12 text-center">
          <h1 className="font-epilogue font-bold sm:text-[40px] text-[28px] leading-[48px] text-white mb-4">
            ICO Dashboard
          </h1>
          <p className="font-epilogue font-normal text-[18px] leading-[28px] text-[#808191]">
            Manage your tokens and funds with ease
          </p>
        </div>

        <div className="mb-8">
          <TokenStatus />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.route}
              className="group block"
            >
              <div className="bg-[#1c1c24] rounded-[20px] p-8 hover:bg-[#252530] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-[#3a3a43] hover:border-[#1dc071] cursor-pointer h-full flex flex-col">
                <div className={`${feature.color} rounded-[15px] p-6 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={80}
                    height={80}
                    className="filter brightness-0 invert"
                  />
                </div>
                
                <h2 className="font-epilogue font-bold text-[24px] leading-[32px] text-white mb-3 group-hover:text-[#1dc071] transition-colors duration-300">
                  {feature.title}
                </h2>
                
                <p className="font-epilogue font-normal text-[16px] leading-[26px] text-[#808191] flex-grow">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center text-[#1dc071] group-hover:translate-x-2 transition-transform duration-300">
                  <span className="font-epilogue font-semibold text-[16px] mr-2">
                    Explore
                  </span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
