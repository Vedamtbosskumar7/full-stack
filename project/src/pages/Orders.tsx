import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import OrderCard from '../components/orders/OrderCard';
import { useOrder } from '../context/OrderContext';

const Orders: React.FC = () => {
  const { orders, updateOrderStatus } = useOrder();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesType = typeFilter === 'all' || order.type === typeFilter;
    return matchesStatus && matchesType;
  });
  
  const ordersByStatus = {
    processing: orders.filter(order => order.status === 'processing').length,
    done: orders.filter(order => order.status === 'done').length,
    served: orders.filter(order => order.status === 'served').length,
    notPickedUp: orders.filter(order => order.status === 'not-picked-up').length
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Order Line</h1>
        <div className="flex items-center">
          <Filter size={20} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium">Filters</span>
        </div>
      </div>
      
      <div className="flex mb-6 space-x-4 overflow-x-auto py-2">
        <button
          className={`filter-button ${statusFilter === 'all' ? 'active' : 'bg-white text-gray-700'}`}
          onClick={() => setStatusFilter('all')}
        >
          All Status
        </button>
        <button
          className={`filter-button ${statusFilter === 'processing' ? 'active' : 'bg-white text-gray-700'}`}
          onClick={() => setStatusFilter('processing')}
        >
          Processing ({ordersByStatus.processing})
        </button>
        <button
          className={`filter-button ${statusFilter === 'done' ? 'active' : 'bg-white text-gray-700'}`}
          onClick={() => setStatusFilter('done')}
        >
          Done ({ordersByStatus.done})
        </button>
        <button
          className={`filter-button ${statusFilter === 'served' ? 'active' : 'bg-white text-gray-700'}`}
          onClick={() => setStatusFilter('served')}
        >
          Served ({ordersByStatus.served})
        </button>
        <button
          className={`filter-button ${statusFilter === 'not-picked-up' ? 'active' : 'bg-white text-gray-700'}`}
          onClick={() => setStatusFilter('not-picked-up')}
        >
          Not Picked Up ({ordersByStatus.notPickedUp})
        </button>
      </div>
      
      <div className="flex mb-6 space-x-4">
        <button
          className={`filter-button ${typeFilter === 'all' ? 'active' : 'bg-white text-gray-700'}`}
          onClick={() => setTypeFilter('all')}
        >
          All Types
        </button>
        <button
          className={`filter-button ${typeFilter === 'dine-in' ? 'active' : 'bg-white text-gray-700'}`}
          onClick={() => setTypeFilter('dine-in')}
        >
          Dine In
        </button>
        <button
          className={`filter-button ${typeFilter === 'take-away' ? 'active' : 'bg-white text-gray-700'}`}
          onClick={() => setTypeFilter('take-away')}
        >
          Take Away
        </button>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No orders match your filters</p>
          <button
            className="mt-2 text-blue-500 hover:underline"
            onClick={() => {
              setStatusFilter('all');
              setTypeFilter('all');
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredOrders.map(order => (
            <OrderCard 
              key={order.id} 
              order={order}
              onStatusChange={updateOrderStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;