import React from 'react';
import bgImg from '../assets/test.jpeg';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F9FB]">
      <div className="container mx-auto px-4 py-16" style={{ marginTop: '10%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-[#F8F9FB] rounded-[32px] w-[535px] h-[395px] overflow-hidden flex justify-center items-center">
            <img
              src={bgImg}
              alt="Hero"
              className="w-full h-full object-cover rounded-[32px]"
            />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-[75px] font-bold font-gmarket text-right">요즘 대학원 시작은</h1>
              <div className="text-[#19A7CE] text-[75px] font-bold font-gmarket text-right">IN!PICK</div>
            </div>
            <p className="text-[25px] text-[#666666] font-medium text-lg text-right">매칭도, 컨택도 인픽과 함께</p>
            <div className="text-right">
              <button
                className="rounded-full h-12 px-6 bg-[#4682A9] hover:bg-[#386887] text-white text-lg"
                onClick={() => navigate('/chat')}
              >
                AI와 채팅하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">매칭의 새로운 기준</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "정확한 분석",
                description: "Claude 3 기반 AI가 분석하여 최적의 교수님을 매칭"
              },
              {
                icon: "⚡",
                title: "실시간 매칭",
                description: "연구 분야와 관심사가 일치하는 교수님 추천"
              },
              {
                icon: "📊",
                title: "체계적인 관리",
                description: "매칭 결과와 교수님 정보를 한눈에 확인"
              }
            ].map((item, index) => (
              <div key={index} className="bg-[#F8F9FB] rounded-2xl p-6 text-center space-y-4">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">시스템 아키텍처</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                icon: "💻",
                items: ["React", "TailwindCSS", "AWS Amplify"]
              },
              {
                title: "Backend",
                icon: "⚙️",
                items: ["API Gateway", "Lambda", "WebSocket"]
              },
              {
                title: "Data & AI",
                icon: "🧠",
                items: ["Bedrock (Claude 3)", "DynamoDB", "S3"]
              }
            ].map((section, index) => (
              <div key={index} className="bg-[#F8F9FB] rounded-2xl p-8 space-y-4">
                <div className="text-2xl mb-2">{section.icon}</div>
                <h3 className="text-xl font-bold">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#19A7CE]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">매칭 프로세스</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: "01", title: "정보 입력", desc: "학업 현황과 관심사 입력" },
              { number: "02", title: "AI 분석", desc: "Claude 3 기반 데이터 분석" },
              { number: "03", title: "교수 매칭", desc: "최적의 교수님 추천" },
              { number: "04", title: "결과 확인", desc: "매칭 결과 및 상세 정보 제공" }
            ].map((step, index) => (
              <div key={index} className="relative p-6">
                <div className="text-4xl font-bold text-[#19A7CE] mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-8 h-0.5 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold">지금 바로 시작하세요</h2>
          <p className="text-xl text-gray-600">AI 기반 맞춤형 교수 매칭</p>
          <button
            className="rounded-full h-12 px-6 bg-[#4682A9] hover:bg-[#386887] text-white text-lg"
            onClick={() => navigate('/chat')}
          >
            시작하기
          </button>
        </div>
      </section>
    </div>
  );
}