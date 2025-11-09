import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import axios from 'axios'; // Uncomment to use axios

const candidatesChartData = [
  { name: 'Sep-20', uv: 570 }, { name: 'Sep-21', uv: 580 }, { name: 'Sep-22', uv: 620 }, { name: 'Sep-23', uv: 680 }, { name: 'Sep-24', uv: 750 }, { name: 'Sep-25', uv: 823 },
];

const jobAppsChartData = [
    { name: '12-Sep-2025', uv: 1 }, { name: '13-Sep-2025', uv: 5 }, { name: '14-Sep-2025', uv: 2 }, { name: '15-Sep-2025', uv: 4 }, { name: '16-Sep-2025', uv: 1 }, { name: '17-Sep-2025', uv: 3 },
];

// FIX: Add types for the props of CustomTooltip to resolve TS errors.
// Recharts passes these props automatically to the content component.
// By defining them as optional, we satisfy TypeScript when using <CustomTooltip />.
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-slate-200 rounded-md shadow-lg">
        <p className="label text-sm text-slate-600">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const TrafficOverview: React.FC = () => {
  // Axios placeholder is commented out but available for future integration.

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
      {/* Candidates Chart */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Candidates</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={candidatesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="uv" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Job Applications Chart */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Job applications</h3>
        <div className="h-80">
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={jobAppsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="uv" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4, fill: '#0ea5e9' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TrafficOverview;