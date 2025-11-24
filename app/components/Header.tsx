'use client'


import {CircleArrowRight} from "lucide-react";

export default function Header() {

    const today = new Date().toISOString().split('T')[0]
    const options: string[] = [
        'YTN', 'MBC', 'SBS', 'KBS'
    ]

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_PATH}`;
    };

    return (
        <header
            className="bg-white border-b px-4 md:px-6 py-3 md:py-4 flex flex-col items-start md:items-center justify-between gap-[0.5rem] shadow-sm">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Manggo AI News</h1>
                <div className="flex items-center gap-[0.5rem]">
                    <span className="text-xs md:text-sm text-gray-500">{today}</span>
                    <select
                        className="px-3 md:px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {options && options.map((item,idx)=> {

                            return <option key={idx}>{item}</option>
                        })}
                    </select>
                    <button
                        onClick={handleGoogleLogin}
                        className="bg-blue-600 text-white px-2 py-1 rounded"
                    >
                        Google Login
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 w-full">
                <div className="flex-1">
                    <p
                        className="w-[90%] cursor-pointer px-2 py-1 wrap-normal border rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 items-center flex justify-between"
                    >
                        <span>1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</span>
                    <CircleArrowRight/>
                    </p>
                </div>


            </div>
        </header>
    )
}