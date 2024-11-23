import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
import { ProfessorDetailModal } from '../components/dashboard/ProfessorDetailModal';
import { Loader2, MessageCircle, Calendar } from 'lucide-react';

const DashboardPage = () => {
  const [showMatchResults, setShowMatchResults] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [showProfessorDetail, setShowProfessorDetail] = useState(false);
  const [matchConfirmation, setMatchConfirmation] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChatHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://c4lnp44051.execute-api.ap-northeast-1.amazonaws.com/chat-results');
        if (!response.ok) throw new Error('Failed to fetch chat history');
        const data = await response.json();
        setChatHistory(data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setShowMatchResults(true);
  };

  const handleProfessorSelect = (professor) => {
    setMatchConfirmation(true);
    setTimeout(() => {
      setMatchConfirmation(false);
      setShowMatchResults(false);
    }, 2000);
  };

  const handleShowProfessorDetail = (professor) => {
    setSelectedProfessor(professor);
    setShowProfessorDetail(true);
  };

  // 채팅 요약 카드 컴포넌트
  const ChatCard = ({ chat }) => (
    <div 
      onClick={() => handleChatClick(chat)}
      className="bg-white rounded-2xl border hover:shadow-md transition-all cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">진로 상담</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {new Date(chat.timestamp).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 분석 결과 컴포넌트
  const AnalysisContent = () => (
    <div className="bg-white rounded-2xl border p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-500 text-xl">AI</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">상담 분석 결과</h3>
          <p className="text-gray-600">전공 정보</p>
        </div>
        <span className="text-sm text-gray-500 ml-auto">
          {new Date(selectedChat.timestamp).toLocaleDateString()}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <span className="font-medium">학업상황]</span>
          <span className="ml-2 text-gray-600">
            {selectedChat.analysis?.학업상황?.학년}, {selectedChat.analysis?.학업상황?.전공}
          </span>
        </div>
        <div>
          <span className="font-medium">희망진로]</span>
          <span className="ml-2 text-gray-600">
            {selectedChat.analysis?.희망진로 || '정보 없음'}
          </span>
        </div>
        <div>
          <span className="font-medium">보유역량]</span>
          <span className="ml-2 text-gray-600">
            {selectedChat.analysis?.보유역량 ? 
              Object.entries(selectedChat.analysis.보유역량)
                .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                .join(' | ') 
              : '정보 없음'
            }
          </span>
        </div>
        <div>
          <span className="font-medium">주요고민]</span>
          <span className="ml-2 text-gray-600">
            {selectedChat.analysis?.주요고민 || '정보 없음'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-8">상담 내역</h1>
  
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatHistory.map(chat => (
            <ChatCard key={chat.sessionId} chat={chat} />
          ))}
        </div>
      )}

      {/* 매칭 결과 모달 */}
      <Dialog open={showMatchResults} onOpenChange={setShowMatchResults}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">⚡</span>
              <h2 className="text-xl font-bold">상담 분석 결과</h2>
            </div>
            <button 
              onClick={() => setShowMatchResults(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              닫기
            </button>
          </div>

          <div className="p-6 space-y-8">
            {selectedChat && (
              <>
                <section>
                  <h3 className="text-lg font-semibold mb-4">💬 상담 내용 분석</h3>
                  <AnalysisContent />
                </section>

                {selectedChat.match?.match?.matchedProfessor && (
                  <section>
                    <h3 className="text-lg font-semibold mb-4">🎯 추천 교수님</h3>
                    <ProfessorMatchCard
                      professor={selectedChat.match.match.matchedProfessor}
                      matchReason={selectedChat.match.match.matchReason}
                      recommendedActions={selectedChat.match.match.recommendedActions}
                      onSelect={handleProfessorSelect}
                      onShowDetail={handleShowProfessorDetail}
                    />
                  </section>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ProfessorDetailModal 
        professor={selectedProfessor}
        isOpen={showProfessorDetail}
        onClose={() => setShowProfessorDetail(false)}
      />

      <Dialog open={matchConfirmation} onOpenChange={setMatchConfirmation}>
        <DialogContent>
          <div className="p-6 text-center space-y-4">
            <div className="text-5xl">✨</div>
            <h2 className="text-xl font-bold">매칭 신청이 완료되었습니다</h2>
            <p className="text-gray-600">교수님의 확인 후 매칭이 확정됩니다</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;