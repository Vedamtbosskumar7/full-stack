import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const OrderSummaryChart: React.FC = () => {
  const data = {
    labels: ['Dine In', 'Take Away', 'Served'],
    datasets: [
      {
        data: [9, 6, 5],
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          boxWidth: 10,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const summaryData = [
    { label: 'Served', value: '09', className: 'bg-green-100' },
    { label: 'Dine In', value: '05', className: 'bg-orange-100' },
    { label: 'Take Away', value: '06', className: 'bg-blue-100' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Order Summary</h3>
        <select className="text-sm border rounded p-1">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      
      <div className="flex flex-wrap justify-around mb-4">
        {summaryData.map((item) => (
          <div key={item.label} className={`${item.className} px-4 py-2 rounded-lg text-center`}>
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-xs">{item.label}</div>
          </div>
        ))}
      </div>
      
      <div className="h-40 mt-4">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default OrderSummaryChart;