import React from 'react';
import { MetricCard as MetricCardType } from '../../types';

const MetricCard: React.FC<MetricCardType> = ({ title, value, icon, subtitle }) => {
  return (
    <div className="analytics-card">
      <div className="flex items-center">
        <div className="analytics-card-icon">
          {icon}
        </div>
        <div className="ml-4">
          <h2 className="text-3xl font-bold">{value}</h2>
          <p className="text-sm text-gray-500 uppercase tracking-wide">{title}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default MetricCard