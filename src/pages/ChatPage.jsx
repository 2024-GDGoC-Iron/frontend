import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/chat/MessageBubble';
import { ChatInput } from '../components/chat/ChatInput';
import { Modal } from '../components/common/Modal';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
import { ProfessorDetailModal } from '../components/dashboard/ProfessorDetailModal';
import { ChatSummaryCard } from '../components/dashboard/ChatSummaryCard'; 
import { useWebSocket } from '../hooks/useWebSocket';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent
} from "../components/ui/dialog";

const ChatPage = () => {
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([
    { 
      id: Date.now(),
      text: "인픽에게 반갑게 인사해주세요~!", 
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
  const [matchConfirmation, setMatchConfirmation] = useState(false);
  
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

    // 페이지 새로고침
    window.location.reload();
  };

  const handleShowProfessorDetail = (professor) => {
    setSelectedProfessor(professor);
    setShowProfessorDetail(true);
  };

  const handleProfessorSelect = (professor) => {
    console.log('Selected professor:', professor);
    setMatchConfirmation(true); // 매칭 확인 모달 표시
    
    // 3초 후에 모달을 닫고 대시보드로 이동
    setTimeout(() => {
      setMatchConfirmation(false);
      handleModalClose();
      navigate('/dashboard');
    }, 3000);
  };

  const formatAnalysisResult = (result) => {
    if (!result) return null;
  
    // 객체를 문자열로 변환하는 헬퍼 함수
    const formatValue = (value) => {
        if (value === undefined || value === null) return '정보 없음';
        if (typeof value === 'object') {
            // DynamoDB List 타입 처리
            if (value.L) {
                return value.L.map(item => item.S || '').filter(Boolean).join(', ') || '정보 없음';
            }
            // 일반 배열 처리
            if (Array.isArray(value)) {
                return value.join(', ') || '정보 없음';
            }
            // 일반 객체 처리
            return Object.values(value).filter(Boolean).join(', ') || '정보 없음';
        }
        return String(value);
    };
  
    const analysis = result.analysis || {};

    // interests가 있는지 확인하고 안전하게 처리
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
    <div className="flex flex-col min-h-[calc(100vh-136px)]">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="relative bg-white rounded-3xl shadow-lg h-[calc(100vh-200px)] flex flex-col">
          {/* 헤더 영역 */}
          <div className="flex justify-between items-center px-8 py-6 border-b bg-gray-50/50">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                진로 상담
              </span>
              <span className="text-gray-700">에 대해 인픽과 대화하세요</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  isConnected && !sessionEnded 
                    ? 'bg-green-500 animate-pulse' 
                    : 'bg-red-500'
                }`} />
                <span className="text-sm text-gray-500">
                  {isConnected && !sessionEnded ? '연결됨' : '연결 끊김'}
                </span>
              </div>
              <button
                onClick={handleEndChat}
                disabled={isAnalyzing || sessionEnded}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isAnalyzing || sessionEnded
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isAnalyzing ? '분석중...' : sessionEnded ? '상담종료' : '종료하기'}
              </button>
            </div>
          </div>
  
          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scroll-smooth">
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
          <div className="p-6 bg-white border-t">
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
      <Dialog open={showMatchModal} onOpenChange={setShowMatchModal}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-between p-6 border-b bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 
                           bg-clip-text text-transparent">
                상담 분석 결과
              </h2>
            </div>
            <button 
              onClick={handleModalClose}
              disabled={isAnalyzing}
              className={`p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 
                        ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              상담 종료하기
            </button>
          </div>
  
          <div className="p-6 space-y-8">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent 
                              rounded-full animate-spin" />
                <p className="text-gray-600 animate-pulse">분석 중입니다...</p>
              </div>
            ) : analysisResult ? (
              <>
                <section>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span>💬</span> 상담 내용 분석
                  </h3>
                  <ChatSummaryCard 
                    chat={formatAnalysisResult(analysisResult).summary}
                  />
                </section>
  
                {formatAnalysisResult(analysisResult).professor && (
                  <section>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span>🎯</span> 추천 교수님
                    </h3>
                    <ProfessorMatchCard
                      professor={formatAnalysisResult(analysisResult).professor}
                      onSelect={handleProfessorSelect}
                      onShowDetail={handleShowProfessorDetail}
                    />
                  </section>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">분석 결과를 불러올 수 없습니다.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
  
      {/* 나머지 모달들은 그대로 유지 */}
      <ProfessorDetailModal
        isOpen={showProfessorDetail}
        onClose={() => setShowProfessorDetail(false)}
        professor={selectedProfessor}
      />
  
      <Dialog open={matchConfirmation} onOpenChange={setMatchConfirmation}>
        <DialogContent className="sm:max-w-md">
          <div className="p-8 text-center space-y-6">
            <div className="text-6xl animate-bounce">✨</div>
            <h2 className="text-2xl font-bold text-gray-900">
              매칭 신청이 완료되었습니다
            </h2>
            <p className="text-gray-600">
              교수님의 확인 후 매칭이 확정되며, <br/>
              결과는 알림을 통해 안내드립니다
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatPage;