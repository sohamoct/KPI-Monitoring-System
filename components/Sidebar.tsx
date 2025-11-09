import React from 'react';
import { LayoutDashboard, Briefcase, BarChart2 } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true, beta: false },
    { name: 'Ad Network', icon: Briefcase, active: false, beta: true },
    { name: 'Analytics', icon: BarChart2, active: false, beta: false },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 p-4 hidden lg:flex flex-col flex-shrink-0 min-h-screen">
      <nav className="flex-1 space-y-2 pt-16"> {/* Pushed down to be below the main header */}
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors duration-200 ${
              item.active
                ? 'bg-sky-500 text-white'
                : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center">
              <item.icon className="mr-3" size={20} />
              <span className="font-medium text-sm">{item.name}</span>
            </div>
            {item.beta && <span className="text-xs bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded-full">BETA</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
