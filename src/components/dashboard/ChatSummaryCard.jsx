export const ChatSummaryCard = ({ chat }) => {
  if (!chat) return null;

  const formatDisplay = (value) => {
    if (!value || value === 'undefined' || value === 'null') {
      return <span className="text-gray-400">정보 없음</span>;
    }
    return value;
  };

  return (
    <div className="bg-white rounded-2xl border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-500 text-xl">AI</span>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">{chat.professorName}</h3>
            <p className="text-gray-600">{chat.department}</p>
          </div>
          <span className="text-sm text-gray-500 ml-auto">{chat.date}</span>
        </div>
        
        <div className="space-y-3 text-gray-600 text-sm">
          {Object.entries(chat.data || {}).map(([key, value]) => (
            <div key={key} className="flex">
              <span className="font-medium min-w-[80px]">{key}]</span>
              <span className="ml-2">
                {formatDisplay(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};