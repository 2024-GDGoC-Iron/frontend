// src/components/common/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';

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
         <img src="/images/inpick-logo.svg" alt="INPICK" className="h-8" />
       </Link>
       <div className="flex items-center gap-8">
         {navItems.map(({ path, label }) => (
           <Link
             key={path}
             to={path}
             className={`${
               location.pathname === path
                 ? 'text-[#4B9FD6] font-medium'
                 : 'text-gray-600 hover:text-gray-900'
             }`}
           >
             {label}
           </Link>
         ))}
         <Button className="rounded-full bg-[#5B7BA3] hover:bg-[#4A6A92] text-white px-6">
           로그인
         </Button>
       </div>
     </nav>
   </header>
 );
};