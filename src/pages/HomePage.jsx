// src/pages/HomePage.jsx
import React from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
 const navigate = useNavigate();

 return (
   <div className="container mx-auto px-4 py-16">
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
       {/* Left Image Section */}
       <div className="bg-[#F8F9FB] rounded-[32px] aspect-square overflow-hidden">
         <div className="flex items-center justify-center h-full">
           <img 
             src="/api/placeholder/800/800"
             alt="Hero" 
             className="w-3/4 h-3/4 object-contain"
           />
         </div>
       </div>
       
       {/* Right Content */}
       <div className="space-y-6">
         <div className="space-y-2">
           <h1 className="text-[40px] font-bold">
             오늘 대학원 시작은
           </h1>
           <div className="text-[#4B9FD6] text-[40px] font-bold">
             IN!PICK
           </div>
         </div>
         <p className="text-gray-600 text-lg">
           매칭도, 컨택도 인픽과 함께
         </p>
         <div className="flex flex-col sm:flex-row gap-4 pt-4">
           <Button 
             className="rounded-full h-12 px-6 bg-[#5B7BA3] hover:bg-[#4A6A92] text-white text-lg"
             onClick={() => navigate('/chat')}
           >
            AI와 채팅하기
           </Button>
         </div>
       </div>
     </div>
   </div>
 );
};

export default HomePage;