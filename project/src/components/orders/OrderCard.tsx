import React from 'react';
import { Order } from '../../types';
import { Clock, Users, Utensils } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onStatusChange: (id: string, status: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange }) => {
  const getStatusColor = () => {
    switch (order.status) {
      case 'processing':
        return 'bg-[#FFF3E0] border-[#FF9800]';
      case 'done':
      case 'served':
        return 'bg-[#E8F5E9] border-[#4CAF50]';
      case 'not-picked-up':
        return 'bg-[#E3F2FD] border-[#2196F3]';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`rounded-xl ${getStatusColor()} p-4 border`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <Utensils className="mr-2" size={20} />
          <div>
            <h3 className="font-bold">#{order.id.split('-')[1]}</h3>
            <p className="text-sm text-gray-600">
              {new Date(order.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          order.type === 'dine-in' 
            ? 'bg-orange-100 text-orange-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {order.type === 'dine-in' ? 'Dine In' : 'Take Away'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {order.tableId && (
          <div className="flex items-center text-sm">
            <Users size={16} className="mr-2" />
            <span>Table-{order.tableId.split('-')[1].padStart(2, '0')}</span>
          </div>
        )}
        
        <div className="flex items-center text-sm">
          <Clock size={16} className="mr-2" />
          <span>Ongoing: {Math.floor((Date.now() - new Date(order.timestamp).getTime()) / 60000)} min</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 mb-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm py-1">
            <span>{item.quantity}x {item.item.name}</span>
            <span>₹{item.item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <select 
        className="w-full p-2 border rounded-lg text-sm bg-white"
        value={order.status}
        onChange={(e) => onStatusChange(order.id, e.target.value)}
      >
        <option value="processing">Processing</option>
        <option value="done">Done</option>
        <option value="served">Served</option>
        <option value="not-picked-up">Not Picked Up</option>
      </select>
    </div>
  );
};

export default OrderCard