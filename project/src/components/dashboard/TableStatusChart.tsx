import React from 'react';
import { tables } from '../../data/tableData';

const TableStatusChart: React.FC = () => {
  // Count tables by status
  const availableTables = tables.filter(table => table.status === 'available').length;
  const reservedTables = tables.length - availableTables;
  
  // Group tables by ranges of 7
  const tableGroups = [];
  for (let i = 0; i < 30; i += 7) {
    tableGroups.push(tables.slice(i, i + 7));
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Tables</h3>
        <div className="flex items-center text-sm">
          <span className="flex items-center mr-3">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            Available
          </span>
          <span className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
            Reserved
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {tableGroups.map((group, groupIndex) => (
          <React.Fragment key={`group-${groupIndex}`}>
            {group.map((table) => {
              const isAvailable = table.status === 'available';
              return (
                <div 
                  key={table.id}
                  className={`p-1 text-center rounded ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                >
                  {table.name.split(' ')[1]}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TableStatusChart;