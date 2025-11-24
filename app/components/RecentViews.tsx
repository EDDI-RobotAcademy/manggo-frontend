'use client'

import { useState } from 'react'

const recentItems = [
    '2025.11.22 사회',
    '2025.11.21 정치',
    '2025.11.21 IT'
]

export default function RecentViews() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* 모바일 버튼 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>

            {/* 오버레이 */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 사이드바 */}
            <aside
                className={`
          fixed lg:static inset-y-0 right-0 z-40
          w-64 bg-white border-l overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          hidden lg:block
        `}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4 lg:hidden">
                        <h2 className="font-bold text-lg">최근 본 항목</h2>
                        <button onClick={() => setIsOpen(false)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg mb-4 font-medium transition-colors shadow-sm text-sm">
                        최근 본 항목
                    </button>

                    <div className="space-y-3">
                        {recentItems.map((item, idx) => (
                            <div key={idx} className="pb-3 border-b border-gray-100">
                                <p className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    )
}