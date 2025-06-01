import React from 'react';
import { Table } from '../../types';
import { Trash2, Users } from 'lucide-react';

interface TableCardProps {
  table: Table;
  onStatusChange: (id: string, status: 'available' | 'reserved') => void;
  onDelete: (id: string) => void;
}

const TableCard: React.FC<TableCardProps> = ({ table, onStatusChange, onDelete }) => {
  const isAvailable = table.status === 'available';
  
  return (
    <div className={`table-card ${isAvailable ? 'available' : 'reserved'}`}>
      <div className="absolute top-2 right-2">
        <button
          onClick={() => onDelete(table.id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Delete table"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <h3 className="text-xl font-bold mb-1">Table</h3>
      <p className="text-3xl font-bold mb-2">{table.name.split(' ')[1].padStart(2, '0')}</p>
      
      <div className="flex items-center justify-center mb-2">
        <Users size={16} className="mr-1" />
        <span>{table.chairs}</span>
      </div>
      
      <button
        className={`mt-2 px-3 py-1 rounded-full text-sm ${
          isAvailable 
            ? 'bg-green-500 text-white hover:bg-green-600' 
            : 'bg-yellow-500 text-white hover:bg-yellow-600'
        }`}
        onClick={() => onStatusChange(table.id, isAvailable ? 'reserved' : 'available')}
      >
        {isAvailable ? 'Available' : 'Reserved'}
      </button>
    </div>
  );
};

export default TableCard;