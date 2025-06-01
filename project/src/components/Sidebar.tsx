import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, Table, ClipboardList, ShoppingCart } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-[65px] bg-white flex flex-col items-center py-4 rounded-r-[50px] shadow-md">
      <div className="mb-8">
        <UtensilsCrossed size={28} className="text-green-600" />
      </div>
      
      <div className="flex flex-col items-center gap-1">
        <NavLink 
          to="/" 
          className={({ isActive }) => `
            w-full h-[48px] flex items-center justify-center relative group
            ${isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}
          `}
        >
          <LayoutDashboard size={24} />
          <span className="absolute left-16 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
            Dashboard
          </span>
        </NavLink>
        
        <NavLink 
          to="/tables" 
          className={({ isActive }) => `
            w-full h-[48px] flex items-center justify-center relative group
            ${isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}
          `}
        >
          <Table size={24} />
          <span className="absolute left-16 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
            Tables
          </span>
        </NavLink>
        
        <NavLink 
          to="/orders" 
          className={({ isActive }) => `
            w-full h-[48px] flex items-center justify-center relative group
            ${isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}
          `}
        >
          <ClipboardList size={24} />
          <span className="absolute left-16 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
            Orders
          </span>
        </NavLink>
        
        <NavLink 
          to="/menu" 
          className={({ isActive }) => `
            w-full h-[48px] flex items-center justify-center relative group
            ${isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}
          `}
        >
          <ShoppingCart size={24} />
          <span className="absolute left-16 bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
            Menu
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;