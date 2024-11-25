export const ChatSummaryCard = ({ chat }) => {
  if (!chat) return null;
 
  const formatDisplay = (value) => {
    if (!value || value === 'undefined' || value === 'null') {
      return <span className="text-gray-400 italic">정보 없음</span>;
    }
    return value;
  };
 
  const formatKey = (key) => key.replace(']', '').trim();

  const summaryFields = [
    { key: '기본 정보', icon: '👤' },
    { key: '관심 분야', icon: '🎯' },
    { key: '진로 목표', icon: '🎓' },
    { key: '준비 현황', icon: '📝' },
    { key: '상담 목적', icon: '💡' },
    { key: '주요 고민', icon: '❓' }
  ];
 
  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-blue-100 
                    hover:shadow-lg transition-all duration-200">
      <div className="p-6">
        {/* 헤더 영역 */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 
                        flex items-center justify-center shadow-sm">
            <span className="text-white text-xl font-semibold">AI</span>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-gray-900">
              {chat.title || "상담 분석 요약"}
            </h3>
            <p className="text-gray-500 text-sm">{chat.date}</p>
          </div>
        </div>
        
        {/* 내용 영역 */}
        <div className="space-y-4">
          {summaryFields.map(({ key, icon }) => (
            chat.data[key] && (
              <div key={key} className="group p-3 rounded-lg hover:bg-gray-50 
                                      transition-colors duration-200">
                <div className="flex items-start">
                  <span className="mr-3 text-lg group-hover:scale-110 
                                 transition-transform duration-200">
                    {icon}
                  </span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-500 block mb-1">
                      {formatKey(key)}
                    </span>
                    <span className="text-gray-900">
                      {formatDisplay(chat.data[key])}
                    </span>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};