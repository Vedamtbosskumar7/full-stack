import React from 'react';
import { Users, ShoppingBag, CreditCard, UserCircle } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import OrderSummaryChart from '../components/dashboard/OrderSummaryChart';
import TableStatusChart from '../components/dashboard/TableStatusChart';
import ChefTable from '../components/dashboard/ChefTable';

const Dashboard: React.FC = () => {
  const metrics = [
    {
      title: 'TOTAL CHEF',
      value: '04',
      icon: <Users size={24} className="text-blue-500" />,
      subtitle: 'All active chefs'
    },
    {
      title: 'TOTAL REVENUE',
      value: '₹12K',
      icon: <CreditCard size={24} className="text-green-500" />,
      subtitle: 'Current week revenue'
    },
    {
      title: 'TOTAL ORDERS',
      value: '20',
      icon: <ShoppingBag size={24} className="text-orange-500" />,
      subtitle: 'Current day orders'
    },
    {
      title: 'TOTAL CLIENTS',
      value: '65',
      icon: <UserCircle size={24} className="text-purple-500" />,
      subtitle: 'Returning customers'
    }
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <OrderSummaryChart />
        <RevenueChart />
        <TableStatusChart />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Chef Name / Orders Taken</h2>
        <ChefTable />
      </div>
    </div>
  );
};

export default Dashboard;