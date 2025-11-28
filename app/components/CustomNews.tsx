"use client";

import React, { useState } from "react";
import { Upload, ArrowUp } from "lucide-react";

export interface MessageType {
  text: string;
  type: string;
}

export default function CustomNews() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, type: "user" }]);
      setMessage("");

      // 시뮬레이션: AI 응답
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "안녕하세요! 무엇을 도와드릴까요?",
            type: "assistant",
          },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <h2 className="text-2xl font-light mb-2">
                  대화를 시작해보세요
                </h2>
                <p className="text-sm">무엇이든 물어보세요</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-2xl ${msg.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="relative flex items-end bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            {/* 파일 업로드 버튼 */}
            <button
              className="absolute left-3 bottom-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="파일 업로드"
            >
              <Upload size={20} />
            </button>

            {/* 텍스트 입력 */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="What would you like to know?"
              className="flex-1 px-12 py-3 bg-transparent border-none outline-none resize-none text-gray-900 placeholder-gray-400"
              rows={1}
              style={{
                maxHeight: "200px",
                minHeight: "44px",
              }}
            />

            {/* 전송 버튼 */}
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`absolute right-3 bottom-2 p-2 rounded-full transition-all ${message.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              aria-label="전송"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
