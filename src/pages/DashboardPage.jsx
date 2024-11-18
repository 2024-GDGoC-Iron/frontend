import React, { useState } from 'react';
import { Modal } from '../components/common/Modal';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
import { ChatSummaryCard } from '../components/dashboard/ChatSummaryCard';

const DashboardPage = () => {
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [showMatchResults, setShowMatchResults] = useState(false); // 초기값을 false로 변경
    
  const matchResults = [
    {
      id: 1,
      name: "김익명",
      department: "컴퓨터공학과 및 로보틱스 연구실",
      period: "06/01~08/29",
      availability: true,
      image: "/api/placeholder/80/80",
      profile: "#"
    },
    // ... more professors
  ];

  const chatHistory = [
    {
      id: 1,
      professorName: "김익명",
      department: "컴퓨터공학과",
      date: "2024.03.18",
      summary: "로보틱스 연구실에서 진행 중인 프로젝트와 연구 방향에 대해 논의. 교수님의 주요 연구 분야인 인공지능 기반 로봇 제어 시스템에 대한 상세 설명 청취.",
      professorImage: "/api/placeholder/40/40"
    },
    // ... more chat summaries
  ];

  const handleCardClick = (chat) => {
    setSelectedProfessor({
      id: chat.id,
      name: chat.professorName,
      department: chat.department,
      // 필요한 경우 추가 정보를 여기에 매핑
    });
    setShowMatchResults(true);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* 매칭 결과 모달 */}
      <Modal 
        isOpen={showMatchResults} 
        onClose={() => setShowMatchResults(false)}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">⚡ 검색결과</h2>
          <div className="grid grid-cols-1 gap-6">
            {matchResults.map(professor => (
              <ProfessorMatchCard
                key={professor.id}
                professor={professor}
                onSelect={(prof) => {
                  setSelectedProfessor(prof);
                  setShowMatchResults(false);
                }}
              />
            ))}
          </div>
        </div>
      </Modal>

      {/* 대시보드 메인 컨텐츠 */}
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">상담 내역</h1>
        <div className="grid grid-cols-1 gap-6">
          {chatHistory.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => handleCardClick(chat)}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <ChatSummaryCard chat={chat} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;