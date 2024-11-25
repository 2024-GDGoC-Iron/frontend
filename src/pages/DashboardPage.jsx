import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
import { ProfessorDetailModal } from '../components/dashboard/ProfessorDetailModal';
import { ChatSummaryCard } from '../components/dashboard/ChatSummaryCard';
import { Loader2, MessageCircle, Calendar, X } from 'lucide-react';

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

  const ChatCard = ({ chat }) => {
    const getTimestamp = (chat) => {
      return chat.timestamp || new Date().toISOString();
    };

    return (
      <div 
        onClick={() => handleChatClick(chat)}
        className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 
                   hover:shadow-lg transition-all duration-200 cursor-pointer group"
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center
                          group-hover:bg-blue-100 transition-colors duration-200">
              <MessageCircle className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 
                            transition-colors duration-200">
                진로 상담
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(getTimestamp(chat)).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const formatAnalysisResult = (result) => {
    if (!result) return null;
  
    const formatValue = (value) => {
      if (!value) return '정보 없음';
      if (typeof value === 'object') {
        if (value.L) return value.L.map(item => item.S || '').filter(Boolean).join(', ') || '정보 없음';
        if (Array.isArray(value)) return value.join(', ') || '정보 없음';
        return Object.values(value).filter(Boolean).join(', ') || '정보 없음';
      }
      return String(value);
    };

    const analysis = result.analysis || {};
    const interests = analysis.studentProfile?.interests;
    const formattedInterests = interests ? formatValue(interests) : '정보 없음';
  
    return {
      summary: {
        title: "상담 분석 요약",
        date: new Date(result.timestamp).toLocaleDateString(),
        data: {
          "기본 정보": `${formatValue(analysis.studentProfile?.year)}학년 ${formatValue(analysis.studentProfile?.major)} (GPA: ${formatValue(analysis.studentProfile?.gpa)})`,
          "관심 분야": formattedInterests,
          "진로 목표": `${formatValue(analysis.careerGoals?.pathType)} - ${formatValue(analysis.careerGoals?.targetField)}`,
          "준비 현황": formatValue(analysis.careerGoals?.preparation),
          "상담 목적": formatValue(analysis.consultingNeeds?.mainPurpose),
          "주요 고민": formatValue(analysis.consultingNeeds?.specificQuestions)
        }
      },
      professor: result.match?.match?.professor && {
        professorId: result.match.match.professor.professorId,
        name: result.match.match.professor.name,
        department: result.match.match.professor.department,
        position: result.match.match.professor.position,
        email: result.match.match.professor.email,
        location: result.match.match.professor.location,
        researchAreas: formatValue(result.match.match.professor.researchAreas),
        availableSlots: result.match.match.professor.availableSlots,
        matchScore: result.match.match.professor.matchScore,
        matchReason: result.match.match.matchReason,
        nextSteps: result.match.match.nextSteps
      }
    };
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-8">상담 내역</h1>
  
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <p className="text-gray-500 animate-pulse">상담 내역을 불러오는 중...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatHistory.map(chat => (
            <ChatCard 
              key={chat.sessionId} 
              chat={chat} 
            />
          ))}
        </div>
      )}

      {/* 매칭 결과 모달 */}
      <Dialog open={showMatchResults} onOpenChange={setShowMatchResults}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-between p-6 border-b bg-gray-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 
                           bg-clip-text text-transparent">
                상담 결과
              </h2>
            </div>
            <button 
              onClick={() => setShowMatchResults(false)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {selectedChat && (
              <>
                <section>
                  <h3 className="text-lg font-semibold mb-4">💬 상담 내용 분석</h3>
                  <ChatSummaryCard 
                    chat={formatAnalysisResult(selectedChat).summary}
                  />
                </section>

                {formatAnalysisResult(selectedChat).professor && (
                  <section>
                    <h3 className="text-lg font-semibold mb-4">🎯 추천 교수님</h3>
                    <ProfessorMatchCard
                      professor={formatAnalysisResult(selectedChat).professor}
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

      {/* 교수 상세정보 모달 */}
      <ProfessorDetailModal 
        professor={selectedProfessor}
        isOpen={showProfessorDetail}
        onClose={() => setShowProfessorDetail(false)}
      />

      {/* 매칭 확인 모달 */}
      <Dialog open={matchConfirmation} onOpenChange={setMatchConfirmation}>
        <DialogContent className="max-w-md">
          <div className="p-8 text-center space-y-6">
            <div className="text-6xl animate-bounce">✨</div>
            <h2 className="text-2xl font-bold text-gray-900">
              매칭 신청이 완료되었습니다
            </h2>
            <p className="text-gray-600">
              교수님의 확인 후 매칭이 확정되며, <br/>
              결과는 알림을 통해 안내드립니다
            </p>
            <div className="pt-4">
              <button 
                onClick={() => setMatchConfirmation(false)}
                className="px-6 py-2 bg-blue-500 text-white rounded-full
                         hover:bg-blue-600 transition-colors duration-200"
              >
                확인
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default DashboardPage;