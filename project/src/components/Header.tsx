import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'tables', label: 'Tables' },
    { id: 'orders', label: 'Orders' }
  ];

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 bg-[#F0F5F3] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="hidden md:flex items-center space-x-3 ml-4">
          <Filter size={20} className="text-gray-600" />
          <div className="flex space-x-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`filter-button ${activeFilter === filter.id ? 'active' : 'bg-white text-gray-600'}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;