// src/components/dashboard/ChatSummaryCard.jsx
export const ChatSummaryCard = ({ chat }) => {
    return (
      <div className="bg-white rounded-2xl p-6 space-y-4 border shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={chat.professorImage || "/api/placeholder/40/40"} 
              alt={chat.professorName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-bold">{chat.professorName}</h3>
              <p className="text-sm text-gray-500">{chat.department}</p>
            </div>
          </div>
          <span className="text-sm text-gray-500">{chat.date}</span>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">주요 대화 내용</h4>
          <p className="text-gray-600 text-sm line-clamp-3">
            {chat.summary}
          </p>
        </div>
      </div>
    );
  };