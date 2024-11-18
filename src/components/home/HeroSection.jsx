// src/components/home/HeroSection.jsx
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tight">
                오늘 대학원 시작은
                <span className="block text-blue-600 mt-2">IN!PICK</span>
              </h1>
              <p className="text-xl text-gray-600">
                매칭도, 컨택도 인픽과 함께
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  variant="outline"
                  className="h-12 px-6 text-lg"
                >
                  맵싱 매칭이 필요해요
                </Button>
                <Button 
                  className="h-12 px-6 text-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  컨택할 팀을 검정해봐요
                </Button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative h-[400px] bg-slate-50 rounded-xl overflow-hidden">
              <img 
                src="/api/placeholder/800/400" 
                alt="Hero" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>IRON@INIPICK.GDG on Campus Inha University 2024</p>
        </div>
      </footer>
    </div>
  );
};