import React, { useState } from 'react';

interface AddTableFormProps {
  onAddTable: (name: string, chairs: number) => void;
  onCancel: () => void;
}

const AddTableForm: React.FC<AddTableFormProps> = ({ onAddTable, onCancel }) => {
  const [tableName, setTableName] = useState('');
  const [chairs, setChairs] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTable(tableName, chairs);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Add New Table</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="tableName" className="block text-sm font-medium text-gray-700 mb-1">
            Table name (optional)
          </label>
          <input
            type="text"
            id="tableName"
            className="w-full p-2 border border-gray-300 rounded"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="e.g., VIP Table"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="chairs" className="block text-sm font-medium text-gray-700 mb-1">
            Chair
          </label>
          <select
            id="chairs"
            className="w-full p-2 border border-gray-300 rounded"
            value={chairs}
            onChange={(e) => setChairs(Number(e.target.value))}
          >
            <option value={2}>02</option>
            <option value={3}>03</option>
            <option value={4}>04</option>
            <option value={6}>06</option>
            <option value={8}>08</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded text-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTableForm;