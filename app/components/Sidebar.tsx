'use client'

import { useState } from 'react'

const categories = [
    { id: 'social', label: '사회' },
    { id: 'politics', label: '정치' },
    { id: 'economy', label: '경제' },
    { id: 'entertainment', label: '연예' },
    { id: 'sports', label: '스포츠' },
    { id: 'it', label: 'IT' },
    { id: 'customNews', label: '맞춤뉴스요약' },
]

export default function Sidebar() {
    const [selectedCategory, setSelectedCategory] = useState('social')
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* 모바일 햄버거 버튼 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed bottom-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* 오버레이 (모바일) */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 사이드바 */}
            <aside
                className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 md:w-40 bg-white border-r
          flex flex-col gap-2 p-4 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
            >
                <div className="flex justify-between items-center mb-2 md:hidden">
                    <h2 className="font-bold text-lg">카테고리</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => {
                            setSelectedCategory(category.id)
                            setIsOpen(false)
                        }}
                        className={`px-4 py-3 rounded-lg text-center font-medium transition-all ${
                            selectedCategory === category.id
                                ? 'bg-gray-700 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {category.label}
                    </button>
                ))}
            </aside>
        </>
    )
}