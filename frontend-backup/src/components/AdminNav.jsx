import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/mainlogo.png';
import { Settings } from 'lucide-react';

function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const linkClasses = (path) => {
    const isActive = location.pathname === path;

    return `cursor-pointer px-4 py-2 rounded-md transition-all duration-200 
      ${isActive 
        ? 'bg-[#D90A14] text-white font-semibold shadow-md' 
        : 'hover:text-[#D90A14] hover:bg-white/10'
      }`;
  };

  return (
    <nav className="fixed top-0 left-0 h-screen w-48 bg-[#0F0505] p-4 flex flex-col items-center z-50 justify-between">
      <div className="flex flex-col items-center mb-auto">
        {/* Logo */}
        <div className="mb-8">
            <img 
            src={logo} 
            alt="Brand Logo" 
            className="h-16 w-auto hover:drop-shadow-[0_0_10px_#CD4E17]" 
            />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 text-white text-base md:text-lg w-full items-center">
            {[
            { path: '/admindashboard', label: 'Dashboard' },
            { path: '/usermanagement', label: 'Users' },
            { path: '/exercisemanagement', label: 'Exercises' },
            { path: '/recipemanagement', label: 'Recipes' }
            ].map(({ path, label }) => (
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
      {/* Settings Icon */}
      <div>
        <Settings className="hover:text-[#D90A14] cursor-pointer"/>
      </div>
    </nav>
  );
}

export default AdminNav;
