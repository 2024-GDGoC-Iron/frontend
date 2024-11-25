import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { BadgeCheck, Star, Lightbulb, ChevronRight, Mail, MapPin } from 'lucide-react';

export const ProfessorMatchCard = ({ professor, onSelect, onShowDetail }) => {
  if (!professor) return null;
  
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-gray-100 hover:border-blue-200">
      <div className="p-6 space-y-6">
        {/* 상단 프로필 섹션 */}
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 
                         flex items-center justify-center shadow-lg transform 
                         hover:scale-105 transition-transform duration-200">
            <span className="text-white text-2xl font-bold">
              {professor.name?.[0] || 'P'}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                  {professor.name} 교수
                  {professor.matchScore >= 90 && (
                    <BadgeCheck className="text-blue-500 animate-pulse" size={20} />
                  )}
                </h3>
                <p className="text-gray-600">{professor.department}</p>
                
                {/* 연락처 정보 추가 */}
                <div className="mt-2 space-y-1 text-sm text-gray-500">
                  {professor.email && (
                    <div className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                      <Mail size={14} />
                      <a href={`mailto:${professor.email}`} className="hover:underline">
                        {professor.email}
                      </a>
                    </div>
                  )}
                  {professor.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {professor.location}
                    </div>
                  )}
                </div>
              </div>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full 
                             text-sm font-medium shadow-sm hover:shadow-md 
                             transition-all duration-200">
                매칭률 {professor.matchScore}%
              </span>
            </div>
            
            {/* 전문 분야 태그 */}
            {professor.expertiseMatch && professor.expertiseMatch.length > 0 && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {professor.expertiseMatch.map((expertise, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 text-sm rounded-full bg-gray-50 text-gray-700 
                             border border-gray-200 flex items-center gap-1.5 
                             hover:bg-blue-50 hover:border-blue-200 transition-colors 
                             duration-200 cursor-default"
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
          <div className="space-y-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 
                         transition-colors duration-200 group">
            <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lightbulb size={16} className="text-yellow-500 group-hover:scale-110 
                                            transition-transform duration-200" />
              매칭 이유
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">{professor.matchReason}</p>
          </div>
        )}
        
        {/* 추천 행동 & 발전 영역 */}
        <div className="grid grid-cols-1 gap-4">
          {professor.recommendedActions && professor.recommendedActions.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Star size={16} className="text-blue-500" />
                추천 행동
              </h4>
              <ul className="space-y-2">
                {professor.recommendedActions.slice(0, 3).map((action, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2 
                                           p-2 rounded-lg hover:bg-gray-50 transition-colors 
                                           duration-200">
                    <ChevronRight size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                    <span className="leading-relaxed">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-3 pt-3">
          <Button 
            variant="outline" 
            className="flex-1 hover:bg-gray-50 border-gray-200 hover:border-blue-200
                      transition-all duration-200"
            onClick={() => onShowDetail(professor)}
          >
            상세 정보 보기
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 
                      hover:from-blue-700 hover:to-blue-600 text-white shadow-md 
                      hover:shadow-lg transition-all duration-200"
            onClick={() => onSelect(professor)}
          >
            상담 신청하기
          </Button>
        </div>
      </div>
    </Card>
  );
};