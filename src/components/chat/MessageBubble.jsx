import React from 'react';

export const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex items-start gap-2">
          <img
            src="/api/placeholder/24/24"
            alt="프로필"
            className="w-6 h-6 rounded-full"
          />
          <div className="text-sm">
            민혁
            <div className="text-xs text-gray-400">11:35 AM</div>
          </div>
        </div>
      )}
      <div className={`max-w-[70%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div className={`rounded-[20px] px-4 py-2 ${
          isUser 
            ? 'bg-[#4461F2] text-white' 
            : 'bg-[#F8F9FB]'
        }`}>
          {message.text}
        </div>
      </div>
    </div>
  );
};