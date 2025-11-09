import React, { useState } from 'react';
import { Menu, X, Bell, UserCircle } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Nav links from the admin dashboard screenshot
  const topNavLinks = ["Home", "Manage data", "Manage portal", "Refer & Earn", "Visit website"];
  const sideNavLinks = [
    { name: 'Dashboard', active: true },
    { name: 'Ad Network', active: false },
    { name: 'Analytics', active: false },
  ];

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-slate-200">
      <div className="mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-slate-900">
          Ed<span className="text-sky-500">Assist</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {topNavLinks.map((link) => (
            <a key={link} href="#" className="text-slate-600 hover:text-sky-500 transition-colors duration-300 text-sm font-medium">
              {link}
            </a>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-slate-500 hover:text-sky-500">
                <Bell size={22} />
            </button>
            <button className="text-slate-500 hover:text-sky-500">
                <UserCircle size={22} />
            </button>
          </div>
           {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200">
          <nav className="flex flex-col items-start space-y-1 p-4">
            {sideNavLinks.map(link => (
              <a href="#" key={link.name} className={`w-full text-left px-4 py-2 rounded-md font-medium text-slate-700 ${link.active ? 'bg-sky-100' : 'hover:bg-slate-100'}`}>{link.name}</a>
            ))}
            <hr className="w-full border-slate-200 my-2" />
            {topNavLinks.map((link) => (
              <a key={link} href="#" className="w-full text-left px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100">
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;