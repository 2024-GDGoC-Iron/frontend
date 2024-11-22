import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
import { ProfessorDetailModal } from '../components/dashboard/ProfessorDetailModal';
import { ChatSummaryCard } from '../components/dashboard/ChatSummaryCard';
import { Loader2 } from 'lucide-react';

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

  const formatAnalysisResult = (result) => {
    if (!result?.analysis) return null;
  
    // DynamoDB AttributeValue 형식을 일반 객체로 변환하는 함수
    const convertDDBItem = (item) => {
      if (!item) return null;
      if (item.S) return item.S;
      if (item.N) return Number(item.N);
      if (item.L) return item.L.map(convertDDBItem);
      if (item.M) {
        const obj = {};
        Object.entries(item.M).forEach(([key, value]) => {
          obj[key] = convertDDBItem(value);
        });
        return obj;
      }
      return item;
    };
  
    const analysis = convertDDBItem(result.analysis);
    const matchData = convertDDBItem(result.match)?.match || {};
  
    return {
      summary: {
        professorName: "상담 분석 결과",
        department: analysis.학업상황?.전공 || "전공 정보 없음",
        date: new Date(result.timestamp).toLocaleDateString(),
        summary: [
          `[학업상황] ${analysis.학업상황?.학교}, ${analysis.학업상황?.전공}, ${analysis.학업상황?.학년}, ${analysis.학업상황?.학점}`,
          `[희망진로] ${analysis.희망진로?.목표직무}, ${analysis.희망진로?.관심분야}`,
          `[보유역량] ${[
            analysis.보유역량?.자격증?.join(', '),
            analysis.보유역량?.어학능력?.join(', '),
            analysis.보유역량?.프로젝트?.join(', ')
          ].filter(Boolean).join(' / ')}`,
          `[주요고민] ${analysis.주요고민사항?.join(', ')}`
        ].join('\n')
      },
      professor: matchData.matchedProfessor && {
        ...convertDDBItem(matchData.matchedProfessor),
        matchReason: convertDDBItem(matchData.matchReason),
        recommendedActions: convertDDBItem(matchData.recommendedActions),
        developmentAreas: convertDDBItem(matchData.developmentAreas)
      }
    };
  };

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

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">상담 내역</h1>
      </div>
  
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatHistory.map(chat => (
            <ChatSummaryCard 
              key={chat.sessionId}
              chat={formatAnalysisResult(chat).summary}
              onClick={() => handleChatClick(chat)}
            />
          ))}
        </div>
      )}

      {/* 매칭 결과 모달 - 채팅 페이지와 동일한 형식 */}
      <Dialog open={showMatchResults} onOpenChange={setShowMatchResults}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">⚡</span>
              <h2 className="text-xl font-bold">매칭 분석 결과</h2>
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
                {/* 대화 내용 분석 */}
                <section>
                  <h3 className="text-lg font-semibold mb-4">💬 대화 내용 분석</h3>
                  <ChatSummaryCard chat={formatAnalysisResult(selectedChat).summary} />
                </section>

                {/* 교수 매칭 결과 */}
                {formatAnalysisResult(selectedChat).professor && (
                  <section>
                    <h3 className="text-lg font-semibold mb-4">🎯 추천 교수님</h3>
                    <div className="space-y-4">
                      <ProfessorMatchCard
                        professor={formatAnalysisResult(selectedChat).professor}
                        onSelect={handleProfessorSelect}
                        onShowDetail={handleShowProfessorDetail}
                      />
                    </div>
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

      {/* 매칭 완료 모달 */}
      <Dialog open={matchConfirmation} onOpenChange={setMatchConfirmation}>
        <DialogContent>
          <div className="p-6 text-center space-y-4">
            <div className="text-5xl">✨</div>
            <h2 className="text-xl font-bold">매칭 신청이 완료되었습니다</h2>
            <p className="text-gray-600">
              교수님의 확인 후 매칭이 확정됩니다
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;