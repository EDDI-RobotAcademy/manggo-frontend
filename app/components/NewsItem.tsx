'use client'

interface NewsItemProps {
    news: {
        id: number
        title: string
        images: { url: string }[]
    }
}

export default function NewsItem({ news }: NewsItemProps) {
    return (
        <li className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-100">
      <span className="text-sm md:text-base text-gray-700 font-medium md:min-w-[120px]">
        {news.id}. {news.title}
      </span>

            <div className="flex gap-3 md:gap-4 w-full md:w-auto md:ml-auto overflow-x-auto pb-2 md:pb-0">
                {news.images.map((img, idx) => (
                    <div
                        key={idx}
                        className="w-32 h-20 md:w-36 md:h-24 bg-gray-200 rounded overflow-hidden flex-shrink-0"
                    >
                        <img
                            src={img.url}
                            alt={`뉴스 ${news.id} 이미지 ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </li>
    )
}