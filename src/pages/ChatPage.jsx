import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/chat/MessageBubble';
import { ChatInput } from '../components/chat/ChatInput';
import { Modal } from '../components/common/Modal';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
import { ChatSummaryCard } from '../components/dashboard/ChatSummaryCard';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "안녕하세요! 교수님에 대해 무엇이든 물어보세요.", 
      time: "11:35 AM",
      isUser: false 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      time: new Date().toLocaleTimeString('ko-KR', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // 봇 응답
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "더 자세한 정보를 알려주시면 도움을 드릴 수 있습니다.",
        time: new Date().toLocaleTimeString('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        }),
        isUser: false
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleEndChat = () => {
    setShowMatchModal(true);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-136px)]">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="relative bg-white rounded-[32px] shadow-lg h-[calc(100vh-200px)] flex flex-col">
          {/* 채팅 제목 & 종료 버튼 */}
          <div className="flex justify-between items-center px-8 py-6 border-b">
            <h1 className="text-2xl font-bold">
              <span className="text-[#4B9FD6]">교수님</span>에 대해 인픽과 대화하세요
            </h1>
            <button
              onClick={handleEndChat}
              className="text-gray-400 hover:text-gray-600 px-4 py-2"
            >
              종료하기
            </button>
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
            />
          </div>
        </div>
      </main>

      {/* 매칭 결과 모달 */}
      <Modal 
        isOpen={showMatchModal} 
        onClose={() => setShowMatchModal(false)}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">⚡ 매칭 분석 결과</h2>
            <button 
              onClick={() => setShowMatchModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              닫기
            </button>
          </div>

          <div className="space-y-6">
            {/* 챗 분석 요약 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">💬 대화 내용 분석</h3>
              <ChatSummaryCard 
                chat={{
                  professorImage: "/api/placeholder/40/40",
                  professorName: "매칭 분석 결과",
                  department: "관심 분야 기반 추천",
                  date: new Date().toLocaleDateString(),
                  summary: "AI/ML 관련 연구를 진행하시는 교수님을 찾고 계시네요. 연구실 문화와 프로젝트 경험에 대해 관심이 있으신 것 같습니다."
                }}
              />
            </div>

            {/* 교수 매칭 결과 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">🎯 추천 교수님</h3>
              <div className="space-y-4">
                <ProfessorMatchCard
                  professor={{
                    id: 1,
                    name: "김도현",
                    department: "컴퓨터공학과",
                    period: "2024.03 - 2024.06",
                    availability: true,
                    matchScore: 95,
                    image: "/api/placeholder/80/80",
                    researchAreas: ["AI/ML", "컴퓨터비전", "자연어처리"]
                  }}
                  onSelect={() => setShowMatchModal(false)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
              <button 
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowMatchModal(false)}
              >
                계속 대화하기
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChatPage;