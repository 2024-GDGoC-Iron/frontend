// src/components/common/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import logoImg from '../../assets/logo.png';
import { useState } from 'react';

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/chat', label: '채팅' },
    { path: '/dashboard', label: '대시보드' }
  ];

  return (
    <header className="bg-white py-4 px-6 border-b sticky top-0 z-50">
      <nav className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoImg} alt="IN!PICK" className="h-10 hover:opacity-80 transition-opacity" />
          </Link>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`
                  relative px-2 py-1 transition-colors duration-200
                  ${location.pathname === path
                    ? 'text-[#4682A9] font-medium'
                    : 'text-gray-600 hover:text-[#4682A9]'
                  }
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:w-full after:h-0.5 after:bg-[#4682A9]
                  after:scale-x-0 after:transition-transform
                  ${location.pathname === path ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
                `}
              >
                {label}
              </Link>
            ))}
            <Button className="
              rounded-full bg-[#4682A9] hover:bg-[#386887] text-white px-6
              transition-all duration-200 transform hover:scale-105
              shadow-md hover:shadow-lg
            ">
              프로필
            </Button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={`
            md:hidden absolute left-0 right-0 bg-white border-b
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`
                  block py-2 px-4 rounded-lg transition-colors
                  ${location.pathname === path
                    ? 'bg-[#4682A9] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Button className="
              w-full rounded-lg bg-[#4682A9] hover:bg-[#386887] text-white
              transition-colors duration-200
            ">
              프로필
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};