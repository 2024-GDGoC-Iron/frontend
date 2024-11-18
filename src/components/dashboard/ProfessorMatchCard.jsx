// src/components/dashboard/ProfessorMatchCard.jsx
import { Button } from '../ui/button';

export const ProfessorMatchCard = ({ professor, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4 border shadow-sm">
      <div className="flex items-start gap-4">
        <img 
          src={professor.image || "/api/placeholder/80/80"} 
          alt={professor.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{professor.name} 교수</h3>
              <p className="text-gray-600">{professor.department}</p>
            </div>
            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
              매칭률 {professor.matchScore}%
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">면담 진행 기간</span>
          <span>{professor.period}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">인원 여부</span>
          <span className={professor.availability ? "text-green-600" : "text-red-600"}>
            {professor.availability ? "가능" : "마감"}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => window.open(professor.profile)}
        >
          자세한 정보 보기
        </Button>
        <Button 
          className="flex-1"
          onClick={() => onSelect(professor)}
          disabled={!professor.availability}
        >
          매칭 신청하기
        </Button>
      </div>
    </div>
  );
};