// src/components/chat/MessageBubble.jsx
export const MessageBubble = ({ message, isUser }) => {
    return (
      <div className={`flex items-start gap-3 ${isUser ? '' : 'justify-end'}`}>
        {isUser && (
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
              <img src="/api/placeholder/40/40" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1">
          {isUser && (
            <div className="flex items-center gap-2">
              <span className="font-bold">{message.userName}</span>
              <span className="text-sm text-gray-500">{message.time}</span>
            </div>
          )}
          <div className={`max-w-xs rounded-lg p-3 ${
            isUser ? 'bg-gray-100' : 'bg-blue-500 text-white'
          }`}>
            {message.text}
          </div>
        </div>
      </div>
    );
  };