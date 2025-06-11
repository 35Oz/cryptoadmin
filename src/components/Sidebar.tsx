import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  TrendingUp,
  ArrowLeftRight,
  X,
  Bitcoin
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const { hasPermission } = useAuth();

  const navItems = [
    { 
      path: '/', 
      name: 'Dashboard', 
      icon: <LayoutDashboard size={20} />,
      permission: 'dashboard.view'
    },
    { 
      path: '/analytics', 
      name: 'Analytics', 
      icon: <TrendingUp size={20} />,
      permission: 'analytics.view'
    },
    { 
      path: '/transactions', 
      name: 'Transactions', 
      icon: <ArrowLeftRight size={20} />,
      permission: 'transactions.view'
    },
    { 
      path: '/users', 
      name: 'Users', 
      icon: <Users size={20} />,
      permission: 'users.view'
    },
    { 
      path: '/settings', 
      name: 'Settings', 
      icon: <Settings size={20} />,
      permission: 'settings.view'
    },
  ];

  // Filter nav items based on user permissions
  const allowedNavItems = navItems.filter(item => hasPermission(item.permission));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-[#0F1015] bg-white/10 bg-opacity-50 lg:hidden"
          onClick={toggle}
        />
      )}
    
      {/* Sidebar */}
      <aside
        className={` fixed top-0 left-0 z-30 h-full w-64 transform bg-[#0F1015] to-gray-800 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500  flex items-center justify-center mr-3">
                <Bitcoin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CryptoAdmin</span>
            </div>
            <button
              onClick={toggle}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-12 space-y-1">
            {allowedNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-3 text-sm rounded-lg font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500  text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
                end={item.path === '/'}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </NavLink>
            ))}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="text-xs text-gray-400 text-center">
              © 2024 CryptoAdmin | Made by Ezequiel Díaz
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;