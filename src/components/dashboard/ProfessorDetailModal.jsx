// ProfessorDetailModal.jsx
import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  X, 
  Award, 
  BookOpen, 
  Star, 
  Briefcase, 
  Target, 
  GraduationCap,
  ChevronRight 
} from 'lucide-react';

export const ProfessorDetailModal = ({ professor, isOpen, onClose }) => {
  if (!professor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold">교수 상세 정보</h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        
        <div className="space-y-8 p-6">
          {/* 기본 프로필 */}
          <div className="flex gap-6">
            <img 
              src="/api/placeholder/128/128"
              alt={professor.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">{professor.name} 교수</h2>
                <Badge variant="blue" className="ml-2">
                  매칭률 {professor.matchScore}%
                </Badge>
              </div>
              <p className="text-gray-600 mb-4">{professor.department}</p>
              
              {/* 전문성 매칭 */}
              {professor.expertiseMatch && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    전문 분야 매칭
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {professor.expertiseMatch.map((expertise, idx) => (
                      <Badge key={idx} variant="outline">{expertise}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 매칭 상세 정보 */}
          <Card className="p-6 space-y-6">
            {/* 매칭 이유 */}
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Target size={18} className="text-blue-500" />
                매칭 이유
              </h3>
              <p className="text-gray-700">{professor.matchReason}</p>
            </div>

            {/* 경력 관련성 */}
            {professor.careerRelevance && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Briefcase size={18} className="text-blue-500" />
                  경력 관련성
                </h3>
                <p className="text-gray-700">{professor.careerRelevance}</p>
              </div>
            )}

            {/* 추천 행동 */}
            {professor.recommendedActions && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Award size={18} className="text-blue-500" />
                  추천 행동
                </h3>
                <ul className="space-y-2">
                {professor.recommendedActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <ChevronRight size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 발전 필요 영역 */}
            {professor.developmentAreas && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <GraduationCap size={18} className="text-blue-500" />
                  발전 필요 영역
                </h3>
                <ul className="space-y-2">
                  {professor.developmentAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <ChevronRight size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          {/* 교수 상세 정보 */}
          <Card className="p-6 space-y-6">
            {/* 연구 분야 */}
            {professor.researchAreas && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-500" />
                  연구 분야
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {professor.researchAreas.map((area, idx) => (
                    <Badge key={idx} variant="secondary">{area}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 주요 논문 */}
            {professor.publications && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-500" />
                  주요 논문
                </h3>
                <ul className="space-y-2">
                  {professor.publications.map((pub, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      • {pub}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 경력 사항 */}
            {professor.experience && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Briefcase size={18} className="text-blue-500" />
                  경력 사항
                </h3>
                <ul className="space-y-2">
                  {professor.experience.map((exp, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      • {exp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};