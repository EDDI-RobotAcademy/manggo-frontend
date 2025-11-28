"use client";

const recentItems = ["2025.11.22 사회", "2025.11.21 정치", "2025.11.21 IT"];

export default function RecentViews() {
  return (
    <>
      {/* 사이드바 */}
      <aside className={`min-w-64 bg-white border-l overflow-y-auto w-[15%]`}>
        <div className="p-4 h-[50%]">
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
        <div className="p-4 h-[50%]">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg mb-4 font-medium transition-colors shadow-sm text-sm">
            요번 주 날씨
          </button>
        </div>
      </aside>
    </>
  );
}
