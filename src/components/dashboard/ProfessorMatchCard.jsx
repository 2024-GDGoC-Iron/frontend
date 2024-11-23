// ProfessorMatchCard.jsx
import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { BadgeCheck, Star, Lightbulb, ChevronRight } from 'lucide-react';

export const ProfessorMatchCard = ({ professor, onSelect, onShowDetail }) => {
  if (!professor) return null;
  
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <div className="p-6 space-y-6">
        {/* 상단 프로필 섹션 */}
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
            <span className="text-blue-500 text-2xl font-bold">
              {professor.name?.[0] || 'P'}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {professor.name} 교수
                  {professor.matchScore >= 90 && (
                    <BadgeCheck className="text-blue-500" size={20} />
                  )}
                </h3>
                <p className="text-gray-600">{professor.department}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                매칭률 {professor.matchScore}%
              </span>
            </div>
            
            {/* 전문 분야 태그 */}
            {professor.expertiseMatch && professor.expertiseMatch.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {professor.expertiseMatch.map((expertise, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 flex items-center gap-1"
                  >
                    <Star size={12} className="text-yellow-500" />
                    {expertise}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 매칭 이유 */}
        {professor.matchReason && (
          <div className="space-y-2 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lightbulb size={16} className="text-yellow-500" />
              매칭 이유
            </h4>
            <p className="text-sm text-gray-600">{professor.matchReason}</p>
          </div>
        )}
        
        {/* 추천 행동 & 발전 영역 */}
        <div className="grid grid-cols-1 gap-4">
          {professor.recommendedActions && professor.recommendedActions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Star size={16} className="text-blue-500" />
                추천 행동
              </h4>
              <ul className="space-y-2">
                {professor.recommendedActions.slice(0, 3).map((action, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <ChevronRight size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            className="flex-1 hover:bg-gray-50"
            onClick={() => onShowDetail(professor)}
          >
            상세 정보
          </Button>
          <Button 
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => onSelect(professor)}
          >
            상담 신청하기
          </Button>
        </div>
      </div>
    </Card>
  );
};