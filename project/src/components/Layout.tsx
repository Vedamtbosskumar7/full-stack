import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#F0F5F3]">
      <Sidebar />
      <div className="flex-1 ml-[65px]">
        <Header />
        <main className="p-6 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;