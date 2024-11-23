// src/components/common/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import logoImg from '../../assets/logo.png';

export const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/chat', label: '채팅' },
    { path: '/dashboard', label: '대시보드' }
  ];

  return (
    <header className="bg-white py-4 px-6 border-b">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="IN!PICK" className="h-10" />
        </Link>
        <div className="flex items-center gap-8">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`${location.pathname === path
                  ? 'text-[#4682A9] font-medium font-sans'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {label}
            </Link>
          ))}
          <Button className="rounded-full bg-[#4682A9] hover:bg-[#386887] text-white px-6 font-sans">
            프로필
          </Button>
        </div>
      </nav>
    </header>
  );
};