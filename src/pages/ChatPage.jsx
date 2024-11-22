import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/chat/MessageBubble';
import { ChatInput } from '../components/chat/ChatInput';
import { Modal } from '../components/common/Modal';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
import { ProfessorDetailModal } from '../components/dashboard/ProfessorDetailModal';
import { ChatSummaryCard } from '../components/dashboard/ChatSummaryCard'; 
import { useWebSocket } from '../hooks/useWebSocket';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { 
      id: Date.now(),
      text: "안녕하세요! 저는 진로와 관련된 모든 고민을 상담해드리는 IN!PICK AI입니다. 어떤 진로나 직무에 관심이 있으신가요?", 
      time: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }), 
      isUser: false 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showProfessorDetail, setShowProfessorDetail] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  // 세션 정보
  const [sessionId] = useState(`session_${Date.now()}`);
  const [userId] = useState('user_' + Math.random().toString(36).substr(2, 9));
  
  const { socket, isConnected, sendMessage } = useWebSocket(
    `wss://lu6wbizt4e.execute-api.ap-northeast-1.amazonaws.com/production?userId=${userId}&sessionId=${sessionId}`
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !isConnected || sessionEnded) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      time: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    sendMessage({
      action: 'sendMessage',
      sessionId,
      userId,
      message: inputText
    });
  };

  // WebSocket 메시지 수신 처리
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        if (!event.data) return;

        try {
          const response = JSON.parse(event.data);
          console.log('Received WebSocket message:', response);

          if (response.type === 'message' && response.data?.message) {
            const aiMessage = {
              id: Date.now(),
              text: response.data.message,
              time: new Date(response.data.timestamp).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              }),
              isUser: false
            };
            setMessages(prev => [...prev, aiMessage]);
          } 
          else if (response.type === 'analysis-complete' && response.data) {
            setAnalysisResult(response.data);
            setIsAnalyzing(false);
          }
          else if (response.type === 'error') {
            console.error('Server error:', response.data?.message);
            setIsAnalyzing(false);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsAnalyzing(false);
      };

      socket.onclose = () => {
        console.log('WebSocket disconnected');
        setSessionEnded(true);
      };
    }
  }, [socket]);

  const handleEndChat = async () => {
    try {
      setIsAnalyzing(true);
      setShowMatchModal(true);

      const response = await fetch('https://c4lnp44051.execute-api.ap-northeast-1.amazonaws.com/ChatAnalysisMainLambda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sessionId })
      });

      if (!response.ok) {
        throw new Error('분석 요청 실패');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('분석 요청 오류:', error);
      alert('분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleModalClose = () => {
    if (isAnalyzing) return;

    if (socket && isConnected) {
      sendMessage({
        action: 'disconnectSession',
        sessionId,
        userId
      });
      socket.close();
    }

    setShowMatchModal(false);
    setSessionEnded(true);
  };

  const handleShowProfessorDetail = (professor) => {
    setSelectedProfessor(professor);
    setShowProfessorDetail(true);
  };

  const handleProfessorSelect = (professor) => {
    console.log('Selected professor:', professor);
    handleModalClose();
  };

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
        date: new Date().toLocaleDateString(),
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

  return (
    <div className="flex flex-col min-h-[calc(100vh-136px)]">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="relative bg-white rounded-[32px] shadow-lg h-[calc(100vh-200px)] flex flex-col">
          {/* 채팅 제목 & 연결 상태 */}
          <div className="flex justify-between items-center px-8 py-6 border-b">
            <h1 className="text-2xl font-bold">
              <span className="text-[#4B9FD6]">진로 상담</span>에 대해 인픽과 대화하세요
            </h1>
            <div className="flex items-center gap-4">
              <span className={`w-2 h-2 rounded-full ${isConnected && !sessionEnded ? 'bg-green-500' : 'bg-red-500'}`} />
              <button
                onClick={handleEndChat}
                disabled={isAnalyzing || sessionEnded}
                className={`text-gray-400 hover:text-gray-600 px-4 py-2 ${(isAnalyzing || sessionEnded) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAnalyzing ? '분석중...' : sessionEnded ? '상담종료' : '종료하기'}
              </button>
            </div>
          </div>

          {/* 채팅 메시지 영역 */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isUser={message.isUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className="p-6 border-t">
            <ChatInput
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onSubmit={handleSend}
              disabled={!isConnected || isAnalyzing || sessionEnded}
              placeholder={sessionEnded ? "상담이 종료되었습니다" : "메시지를 입력하세요..."}
            />
          </div>
        </div>
      </main>

      {/* 매칭 결과 모달 */}
      <Modal 
        isOpen={showMatchModal} 
        onClose={handleModalClose}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">⚡ 상담 분석 결과</h2>
            <button 
              onClick={handleModalClose}
              className={`text-gray-500 hover:text-gray-700 ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isAnalyzing}
            >
              상담 종료하기
            </button>
          </div>

          <div className="space-y-6">
            {isAnalyzing ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">분석 중입니다...</p>
              </div>
            ) : analysisResult ? (
              <>
                {/* 챗 분석 요약 */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">💬 상담 내용 분석</h3>
                  <ChatSummaryCard 
                    chat={formatAnalysisResult(analysisResult).summary}
                  />
                </div>

                {/* 교수 매칭 결과 */}
                {formatAnalysisResult(analysisResult).professor && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">🎯 추천 교수님</h3>
                    <div className="space-y-4">
                      <ProfessorMatchCard
                        professor={formatAnalysisResult(analysisResult).professor}
                        onSelect={handleProfessorSelect}
                        onShowDetail={handleShowProfessorDetail}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">분석 결과를 불러올 수 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* 교수 상세정보 모달 */}
      <ProfessorDetailModal
        isOpen={showProfessorDetail}
        onClose={() => setShowProfessorDetail(false)}
        professor={selectedProfessor}
      />
    </div>
  );
};

export default ChatPage;