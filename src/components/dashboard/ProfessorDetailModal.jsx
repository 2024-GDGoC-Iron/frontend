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
  ChevronRight,
  Mail,
  MapPin
} from 'lucide-react';

export const ProfessorDetailModal = ({ professor, isOpen, onClose }) => {
  if (!professor) return null;

  const getArrayData = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.L) return data.L.map(item => item.S);
    if (typeof data === 'string') return [data];
    return [];
  };

  const researchAreas = getArrayData(professor.researchAreas);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b p-6 bg-gray-50 rounded-t-lg sticky top-0 z-10">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            교수 상세 정보
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-8 p-6">
          {/* 기본 프로필 */}
          <div className="flex gap-6 items-start">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 
                          flex items-center justify-center shadow-lg transform hover:scale-105 
                          transition-transform duration-200">
              <span className="text-white text-3xl font-bold">
                {professor.name?.[0] || 'P'}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold text-gray-900">{professor.name} 교수</h2>
                {professor.matchScore && (
                  <Badge variant="blue" className="animate-pulse">
                    매칭률 {professor.matchScore}%
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 text-lg mb-4">{professor.department}</p>
              
              {/* 연락처 정보 */}
              <div className="space-y-3 text-sm text-gray-600">
                {professor.email && (
                  <div className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <Mail size={16} />
                    <a href={`mailto:${professor.email}`} className="hover:underline">
                      {professor.email}
                    </a>
                  </div>
                )}
                {professor.location && (
                  <div className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <MapPin size={16} />
                    {professor.location}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 매칭 상세 정보 */}
          <Card className="p-6 space-y-6 hover:shadow-lg transition-shadow duration-200">
            {/* 매칭 이유 */}
            {professor.matchReason && (
              <div className="space-y-3 group">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  매칭 이유
                </h3>
                <p className="text-gray-700 leading-relaxed">{professor.matchReason}</p>
              </div>
            )}

            {/* 연구 분야 */}
            {researchAreas.length > 0 && (
              <div className="space-y-3 group">
                <h3 className="font-semibold flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  연구 분야
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {researchAreas.map((area, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary"
                      className="hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-default"
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 다음 단계 */}
            {professor.nextSteps && (
              <div className="space-y-3 group">
                <h3 className="font-semibold flex items-center gap-2">
                  <Award size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  다음 단계
                </h3>
                <ul className="space-y-3">
                  {getArrayData(professor.nextSteps).map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 p-2 rounded-lg
                                          hover:bg-gray-50 transition-colors">
                      <ChevronRight size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          {/* 상담 정보 */}
          <Card className="p-6 space-y-3 hover:shadow-lg transition-shadow duration-200">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Briefcase size={18} className="text-blue-500" />
                상담 정보
              </h3>
              {professor.availableSlots > 0 ? (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  현재 상담 가능한 시간이 있습니다.
                </div>
              ) : (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  현재 상담 가능한 시간이 없습니다.
                </div>
              )}
              <p className="text-sm text-gray-600 italic">
                * 상담 예약은 학과 사무실을 통해 진행됩니다.
              </p>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};