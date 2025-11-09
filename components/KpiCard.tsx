import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp } from 'lucide-react';

interface KpiCardProps {
    title: string;
    value: string;
    change: string;
    previousText: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, previousText }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="text-base font-medium text-slate-500">{title}</h3>
        <div className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <TrendingUp size={12} className="mr-1" />
          <span>{change.replace('+', '')}</span>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-slate-500 mt-1">{previousText}</p>
      </div>
    </div>
  );
};

KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  previousText: PropTypes.string.isRequired,
};

export default KpiCard;