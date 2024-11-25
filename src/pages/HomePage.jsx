import React from 'react';
import bgImg from '../assets/service.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  const navigate = useNavigate();

  // 애니메이션 variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F9FB]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16" style={{ marginTop: '5%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="bg-[#F8F9FB] rounded-3xl w-[535px] h-[395px] overflow-hidden 
                       flex justify-center items-center shadow-lg hover:shadow-xl 
                       transition-shadow duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={bgImg}
              alt="Hero"
              className="w-full h-full object-cover rounded-3xl transform 
                         hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <p className="text-[25px] text-gray-600 font-medium text-right">
                매칭도, 컨택도 인픽과 함께
              </p>
              <h1 className="text-[75px] font-bold font-gmarket text-right 
                           bg-gradient-to-r from-[#4682A9] to-[#19A7CE] 
                           bg-clip-text text-transparent">
                요즘 대학원 시작은
              </h1>
              <motion.div 
                className="flex justify-end"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={logo}
                  alt="InPick"
                  className="h-[125px] object-contain"
                />
              </motion.div>
            </div>
            <div className="text-right">
              <motion.button
                className="rounded-full h-12 px-8 bg-gradient-to-r from-[#4682A9] 
                           to-[#19A7CE] text-white text-lg shadow-lg hover:shadow-xl 
                           transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/chat')}
              >
                AI와 채팅하기
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Service Features */}
      <section className="py-16 bg-white">
        <motion.div 
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-center mb-12 
                         bg-gradient-to-r from-[#4682A9] to-[#19A7CE] 
                         bg-clip-text text-transparent">
            매칭의 새로운 기준
          </h2>
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
              <motion.div
                key={index}
                className="bg-[#F8F9FB] rounded-2xl p-8 text-center space-y-4 
                           hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl mb-4 transform hover:scale-110 
                               transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Architecture Section */}
      <section className="py-16">
        <motion.div 
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r 
                        from-[#4682A9] to-[#19A7CE] bg-clip-text text-transparent">
            시스템 아키텍처
          </h2>
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
              <motion.div
                key={index}
                className="bg-[#F8F9FB] rounded-2xl p-8 space-y-4 hover:shadow-lg 
                          transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-2xl mb-2 transform hover:scale-110 
                              transition-transform duration-200">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#19A7CE]"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <motion.div 
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r 
                        from-[#4682A9] to-[#19A7CE] bg-clip-text text-transparent">
            매칭 프로세스
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: "01", title: "정보 입력", desc: "학업 현황과 관심사 입력" },
              { number: "02", title: "AI 분석", desc: "Claude 3 기반 데이터 분석" },
              { number: "03", title: "교수 매칭", desc: "최적의 교수님 추천" },
              { number: "04", title: "결과 확인", desc: "매칭 결과 및 상세 정보 제공" }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl font-bold text-[#19A7CE] mb-4 
                              transform hover:scale-110 transition-transform duration-200">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-8 h-0.5 
                                bg-gradient-to-r from-[#4682A9] to-[#19A7CE]">
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4682A9] to-[#19A7CE]">
        <motion.div 
          className="container mx-auto px-4 text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white">지금 바로 시작하세요</h2>
          <p className="text-xl text-white/80">AI 기반 맞춤형 교수 매칭</p>
          <motion.button
            className="rounded-full h-12 px-8 bg-white text-[#4682A9] text-lg 
                       shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/chat')}
          >
            시작하기
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}