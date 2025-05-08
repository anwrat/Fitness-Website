import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/mainlogo.png';
import { Settings, Menu } from 'lucide-react';
import { useState } from "react";

function UserNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = (path) => {
    const isActive = location.pathname === path;
    return `cursor-pointer px-4 py-2 rounded-md transition-all duration-200 
      ${isActive 
        ? 'bg-[#D90A14] text-white font-semibold shadow-md' 
        : 'hover:text-[#D90A14] hover:bg-white/10'
      }`;
  };

  const navLinks = [
    { path: '/dashboard', label: 'Home' },
    { path: '/exercises', label: 'Exercises' },
    { path: '/recipes', label: 'Recipes' },
    { path: '/tools', label: 'Tools' }
  ];

  return (
    <nav className="w-full bg-[#0F0505] p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center space-x-4">
          <img 
            src={logo} 
            alt="Brand Logo" 
            className="h-12 md:h-16 w-auto hover:drop-shadow-[0_0_10px_#CD4E17]" 
          />
          {/* Hamburger for small screens */}
          <div className="md:hidden">
            <Menu 
              className="text-white cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 mb-2 rounded-md bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#D90A14]"
        />
        {/* Center: Search bar and links */}
        <div className="hidden md:flex flex-col items-center">
          <div className="flex gap-6 text-white text-lg">
            {navLinks.map(({ path, label }) => (
              <a
                key={path}
                onClick={() => navigate(path)}
                className={linkClasses(path)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Settings Icon */}
        <Settings className="hover:text-[#D90A14] cursor-pointer text-white" />
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 text-white text-base space-y-2 flex flex-col items-center">
          {navLinks.map(({ path, label }) => (
            <a
              key={path}
              onClick={() => {
                navigate(path);
                setMenuOpen(false);
              }}
              className={linkClasses(path) + " w-full text-center"}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default UserNav;
