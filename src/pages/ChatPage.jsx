// src/pages/ChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
import { ChatSummaryCard } from '../components/dashboard/ChatSummaryCard';

const ChatMessage = ({ message, isUser }) => {
  if (isUser) {
    return (
      <div className="flex flex-row-reverse gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            <img 
              src="/api/placeholder/40/40" 
              alt="User"
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-500">{message.time}</span>
            <span className="font-medium">민혁</span>
          </div>
          <div className="bg-[#4461F2] text-white rounded-2xl p-3 max-w-md">
            {message.text}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
          <img 
            src="/api/placeholder/40/40" 
            alt="Bot"
            className="w-full h-full object-cover bg-blue-100" 
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">IN!PICK</span>
          <span className="text-sm text-gray-500">{message.time}</span>
        </div>
        <div className="bg-gray-100 rounded-2xl p-3 max-w-md">
          {message.text}
        </div>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "안녕하세요! 교수님에 대해 무엇이든 물어보세요.", 
      time: "11:30 AM",
      isUser: false 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const messagesEndRef = useRef(null);

  // 채팅 요약 데이터
  const [chatSummary, setChatSummary] = useState({
    professorImage: "/api/placeholder/40/40",
    professorName: "매칭 분석 결과",
    department: "관심 분야 기반 추천",
    date: new Date().toLocaleDateString(),
    summary: "AI/ML 관련 연구를 진행하시는 교수님을 찾고 계시네요. 연구실 문화와 프로젝트 경험에 대해 관심이 있으신 것 같습니다."
  });

  // 추천 교수 데이터
  const [matchedProfessors, setMatchedProfessors] = useState([
    {
      id: 1,
      name: "김도현",
      department: "컴퓨터공학과",
      period: "2024.03 - 2024.06",
      availability: true,
      image: "/api/placeholder/80/80",
      profile: "#",
      matchScore: 95
    },
    {
      id: 2,
      name: "이지원",
      department: "인공지능학과",
      period: "2024.03 - 2024.06",
      availability: true,
      image: "/api/placeholder/80/80",
      profile: "#",
      matchScore: 88
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getTime = () => {
    return new Date().toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const generateBotResponse = (userMessage) => {
    const responses = {
      '교수': [
        '어떤 교수님에 대해 알고 싶으신가요?',
        '교수님의 연구 분야나 특정 정보를 알려주시면 더 자세히 안내해드릴 수 있습니다.',
      ],
      '연구': [
        '관심 있으신 연구 분야가 어떤 것인가요?',
        '특정 연구실이나 프로젝트에 대해 알고 싶으신가요?',
      ],
      '상담': [
        '교수님과 상담을 원하시나요?',
        '상담 신청을 도와드릴 수 있습니다.',
      ],
      'default': [
        '더 자세한 정보를 알려주시면 도움을 드릴 수 있습니다.',
        '특정 학과나 교수님에 대해 궁금하신가요?',
      ]
    };

    const keyword = Object.keys(responses).find(key => 
      userMessage.toLowerCase().includes(key)
    );

    const responseArray = responses[keyword] || responses.default;
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      time: getTime(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputText),
        time: getTime(),
        isUser: false
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleEndChat = () => {
    analyzeChat();
    setShowMatchModal(true);
  };

  const analyzeChat = () => {
    // 실제 구현시에는 여기서 채팅 내용을 분석하여
    // chatSummary와 matchedProfessors를 업데이트
  };

  const handleProfessorSelect = (professor) => {
    console.log("Selected professor:", professor);
    // 여기에 매칭 신청 로직 추가
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="bg-white rounded-[32px] shadow-lg min-h-[80vh] p-8 relative">
        <button
          onClick={handleEndChat}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        >
          종료하기
        </button>

        <h1 className="text-[32px] font-bold mb-12">
          <span className="text-[#4B9FD6]">교수님</span>에 대해 인픽과 대화하세요
        </h1>
        
        <div className="space-y-8 mb-8 h-[500px] overflow-y-auto px-4">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id}
              message={message}
              isUser={message.isUser}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="bg-[#F8F9FB] rounded-full p-4 flex items-center gap-3">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="구체적으로 물어보세요?"
            className="flex-1 bg-transparent outline-none px-2"
          />
          <button 
            type="submit" 
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            disabled={!inputText.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

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
              {/* 채팅 요약 */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">💬 대화 내용 분석</h3>
                <ChatSummaryCard chat={chatSummary} />
              </div>

              {/* 교수 매칭 결과 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">🎯 추천 교수님</h3>
                <div className="space-y-4">
                  {matchedProfessors.map((professor) => (
                    <ProfessorMatchCard
                    key={professor.id}
                    professor={professor}
                    onSelect={handleProfessorSelect}
                  />
                ))}
              </div>
            </div>

            {/* 추가 액션 버튼 */}
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
  </div>
);
};

export default ChatPage;