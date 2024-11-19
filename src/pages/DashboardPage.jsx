import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { ProfessorMatchCard } from '../components/dashboard/ProfessorMatchCard';
import { ProfessorDetailModal } from '../components/common/ProfessorDetailModal';
import { ChatSummaryCard } from '../components/dashboard/ChatSummaryCard';

const DashboardPage = () => {
  const [showMatchResults, setShowMatchResults] = useState(false);
  const [showChatDetail, setShowChatDetail] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [showProfessorDetail, setShowProfessorDetail] = useState(false);
  const [matchConfirmation, setMatchConfirmation] = useState(false);

  // 채팅 분석 결과 데이터
  const chatSummary = {
    professorImage: "/api/placeholder/40/40",
    professorName: "매칭 분석 결과",
    department: "관심 분야 기반 추천",
    date: new Date().toLocaleDateString(),
    summary: "AI/ML 관련 연구를 진행하시는 교수님을 찾고 계시네요. 연구실 문화와 프로젝트 경험에 대해 관심이 있으신 것 같습니다."
  };

  const matchResults = [
    {
      id: 1,
      name: "김도현",
      department: "컴퓨터공학과",
      period: "2024.03 - 2024.06",
      availability: true,
      matchScore: 95,
      image: "/api/placeholder/80/80",
      researchAreas: ["AI/ML", "컴퓨터비전", "자연어처리"],
      availableSlots: 3,
      labLocation: "공과대학 7호관 517호",
      labMembers: {
        phd: 3,
        masters: 5
      },
      researchDetails: [
        {
          title: "머신러닝 기반 이미지 처리",
          description: "컴퓨터 비전과 딥러닝을 활용한 이미지 분석 연구"
        }
      ],
      recentPublications: [
        {
          title: "Deep Learning for Computer Vision",
          journal: "IEEE Conference on Computer Vision",
          year: "2024"
        }
      ]
    },
    {
      id: 2,
      name: "이지원",
      department: "인공지능학과",
      period: "2024.03 - 2024.06",
      availability: true,
      matchScore: 88,
      image: "/api/placeholder/80/80",
      researchAreas: ["강화학습", "로보틱스", "AI"],
      availableSlots: 2
    }
  ];

  const chatHistory = [
    {
      id: 1,
      professorName: "김익명",
      department: "컴퓨터공학과",
      date: "2024.03.18",
      summary: "로보틱스 연구실에서 진행 중인 프로젝트와 연구 방향에 대해 논의. 교수님의 주요 연구 분야인 인공지능 기반 로봇 제어 시스템에 대한 상세 설명 청취.",
      professorImage: "/api/placeholder/40/40"
    }
  ];

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

  const handleShowDetail = (professor) => {
    setSelectedProfessor(professor);
    setShowProfessorDetail(true);
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">상담 내역</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowMatchResults(true)}
          >
            새로운 매칭 찾기
          </Button>
        </div>
      </div>
  
      {/* 3열 그리드로 변경 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatHistory.map(chat => (
          <ChatSummaryCard 
            key={chat.id} 
            chat={chat}
            onClick={() => handleChatClick(chat)}
          />
        ))}
      </div>

      <Dialog open={showMatchResults} onOpenChange={setShowMatchResults}>
        <DialogContent className="max-w-2xl">
          {/* 타이틀 영역 */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">⚡</span>
              <h2 className="text-xl font-bold">매칭 분석 결과</h2>
            </div>
            <button 
              className="text-gray-500"
              onClick={() => setShowMatchResults(false)}
            >
              닫기
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* 대화 내용 분석 섹션 */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span role="img" aria-label="chat">💬</span>
                <h3>대화 내용 분석</h3>
              </div>
              
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={chatSummary.professorImage}
                    alt="분석 결과"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="text-lg font-medium">매칭 분석 결과</div>
                    <div className="text-sm text-gray-500">관심 분야 기반 추천</div>
                  </div>
                  <span className="text-sm text-gray-500">{chatSummary.date}</span>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">주요 대화 내용</h4>
                  <p className="text-gray-600 text-sm">{chatSummary.summary}</p>
                </div>
              </div>
            </section>

            {/* 추천 교수님 섹션 */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span role="img" aria-label="target">🎯</span>
                <h3>추천 교수님</h3>
              </div>

              <div className="space-y-4">
                {matchResults.map((professor) => (
                  <div key={professor.id} className="bg-white rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={professor.image}
                          alt={professor.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="text-lg font-medium">{professor.name} 교수</div>
                          <div className="text-gray-600">{professor.department}</div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        매칭률 {professor.matchScore}%
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {professor.researchAreas.map((area) => (
                        <span 
                          key={area}
                          className="px-3 py-1 bg-gray-50 rounded-full text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <span>면담 진행 기간</span>
                      <span>{professor.period}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm mb-4">
                      <span className="text-gray-600">잔여 인원</span>
                      <span className={professor.availableSlots > 0 ? 'text-green-600' : 'text-red-600'}>
                        {professor.availableSlots > 0 
                          ? `${professor.availableSlots}명 가능` 
                          : '마감'}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                        onClick={() => handleShowDetail(professor)}
                      >
                        자세한 정보 보기
                      </button>
                      <button 
                        className="flex-1 px-4 py-2 bg-[#4461F2] text-white rounded-lg hover:bg-blue-700"
                        onClick={() => handleProfessorSelect(professor)}
                        disabled={professor.availableSlots === 0}
                      >
                        매칭 신청하기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      {selectedProfessor && (
        <ProfessorDetailModal 
          professor={selectedProfessor}
          isOpen={showProfessorDetail}
          onClose={() => setShowProfessorDetail(false)}
        />
      )}

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