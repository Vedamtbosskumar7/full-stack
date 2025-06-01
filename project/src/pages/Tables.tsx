import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TableCard from '../components/tables/TableCard';
import AddTableForm from '../components/tables/AddTableForm';
import { tables as initialTables } from '../data/tableData';
import { Table } from '../types';

const Tables: React.FC = () => {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'reserved'>('all');

  const handleStatusChange = (id: string, status: 'available' | 'reserved') => {
    setTables(tables.map(table => 
      table.id === id ? { ...table, status } : table
    ));
  };

  const handleDeleteTable = (id: string) => {
    setTables(prevTables => {
      const updatedTables = prevTables.filter(table => table.id !== id);
      // Reorder remaining tables
      return updatedTables.map((table, index) => ({
        ...table,
        id: `table-${index + 1}`,
        name: `Table ${String(index + 1).padStart(2, '0')}`
      }));
    });
  };
  
  const handleAddTable = (name: string, chairs: number) => {
    const newId = `table-${tables.length + 1}`;
    const tableName = name || `Table ${String(tables.length + 1).padStart(2, '0')}`;
    
    const newTable: Table = {
      id: newId,
      name: tableName,
      status: 'available',
      chairs
    };
    
    setTables([...tables, newTable]);
    setShowAddForm(false);
  };
  
  const filteredTables = tables.filter(table => {
    const matchesSearch = table.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || table.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Tables</h1>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={20} className="mr-1" />
          Add Table
        </button>
      </div>
      
      <div className="flex space-x-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
            placeholder="Search tables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <select 
          className="p-2 border border-gray-300 rounded-lg"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'available' | 'reserved')}
        >
          <option value="all">All Tables</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
        </select>
      </div>
      
      {showAddForm ? (
        <div className="mb-6">
          <AddTableForm 
            onAddTable={handleAddTable}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      ) : null}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {filteredTables.map(table => (
          <TableCard 
            key={table.id} 
            table={table} 
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTable}
          />
        ))}
      </div>
    </div>
  );
};

export default Tables;