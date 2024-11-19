// src/pages/ChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/chat/MessageBubble';
import { ChatInput } from '../components/chat/ChatInput';
import { Modal } from '../components/common/Modal';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
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
  if (!inputText.trim() || !isConnected) return;

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

  // WebSocket으로 메시지 전송 - 중첩된 구조 제거
  sendMessage({
      action: 'sendMessage',
      sessionId,
      userId,
      message: inputText   // 중첩된 구조 제거
  });
};

 // WebSocket 메시지 수신 처리
 useEffect(() => {
  if (socket) {
      socket.onmessage = (event) => {
          if (!event.data) {
              console.log('Empty message received');
              return;
          }

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
              } else if (response.type === 'error') {
                  console.error('Server error:', response.data?.message);
              }
          } catch (error) {
              // 빈 메시지가 아닐 경우만 에러 로그 출력
              if (event.data) {
                  console.error('Error parsing WebSocket message:', error);
                  console.log('Raw message:', event.data);
              }
          }
      };

      socket.onerror = (error) => {
          console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
          console.log('WebSocket disconnected');
      };
  }
}, [socket]);

 // 채팅 종료 처리
 const handleEndChat = async () => {
   setShowMatchModal(true);
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
             <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
             <button
               onClick={handleEndChat}
               className="text-gray-400 hover:text-gray-600 px-4 py-2"
             >
               종료하기
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
             disabled={!isConnected}
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
           <h2 className="text-2xl font-bold">⚡ 상담 분석 결과</h2>
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
             <h3 className="text-lg font-semibold mb-4">💬 상담 내용 분석</h3>
             <ChatSummaryCard 
               chat={{
                 professorImage: "/api/placeholder/40/40",
                 professorName: "상담 분석 결과",
                 department: "관심 분야 기반 분석",
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
               계속 상담하기
             </button>
           </div>
         </div>
       </div>
     </Modal>
   </div>
 );
};

export default ChatPage;