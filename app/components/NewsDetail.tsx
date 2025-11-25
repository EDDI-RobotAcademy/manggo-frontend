"use client";

import React from "react";

export default function NewsDetail() {
  // 샘플 컨텐츠
  const leftContent = Array.from(
    { length: 30 },
    (_, i) => `왼쪽 컨텐츠 ${i + 1}`,
  );
  const rightContent = Array.from(
    { length: 40 },
    (_, i) => `오른쪽 컨텐츠 ${i + 1}`,
  );

  return (
    <div className="flex h-full w-full bg-gray-100">
      {/* 왼쪽 패널 */}
      <div className="w-1/2 h-full overflow-y-auto border-r-2 border-gray-300 bg-white">
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              왼쪽 페이지
            </h2>

            {/* 이미지 영역 */}
            <div className="mb-6 bg-blue-100 rounded-lg p-4">
              <div className="aspect-video bg-blue-200 rounded flex items-center justify-center">
                <span className="text-blue-600 font-semibold">이미지 영역</span>
              </div>
            </div>

            {/* 제목 */}
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              20명 한꺼번에 덮친 의사당 <br />
              두루미, 철새 내일 긴급 방역
            </h3>

            {/* 본문 내용 */}
            {leftContent.map((text, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {text}: 이것은 샘플 텍스트입니다. 실제 PDF 내용을 여기에
                넣으시면 됩니다. 각 패널은 독립적으로 스크롤됩니다. 긴 컨텐츠를
                자유롭게 추가할 수 있습니다.
              </p>
            ))}

            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">기사입력</p>
              <p className="text-sm text-gray-500">2025.01.15 오전 8:27</p>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 패널 */}
      <div className="w-1/2 h-full overflow-y-auto bg-white">
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              오른쪽 페이지
            </h2>

            <div className="space-y-6">
              {rightContent.map((text, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{text}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    무언 충가다당성 충가다당성 충가다당성 충가다당성 충가다당성
                    충가다당성 충가다당성 충가다당성 충가다당성 충가다당성
                    충가다당성 충가다당성 충가다당성 충가다당성 충가다당성
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">페이지 끝</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
