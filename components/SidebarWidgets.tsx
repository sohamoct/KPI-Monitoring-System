import React from 'react';
import { Target, Zap, TrendingUp, TrendingDown } from 'lucide-react';

const SidebarWidgets: React.FC = () => {
  const kpiMonitorData = [
    { name: 'Leads', value: '452', change: 12.5, isPositive: true },
    { name: 'Signups', value: '1,203', change: 8.2, isPositive: true },
    { name: 'Enrollments', value: '89', change: -3.1, isPositive: false },
  ];

  const aiInsights = [
    "Queries related to 'MERN stack' are gaining traction. Consider creating a new blog post on this topic.",
    "Click-Through Rate for 'developer jobs' is dropping. Review meta descriptions for effectiveness.",
    "Mobile traffic increased by 15% on Saturday. Ensure all landing pages are fully optimized for mobile.",
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* KPI Monitor */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center mb-4">
          <Target className="text-sky-500 mr-3" size={20} />
          <h3 className="text-xl font-semibold text-slate-800">KPI Monitor</h3>
        </div>
        <div className="space-y-4">
          {kpiMonitorData.map((kpi, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-slate-600">{kpi.name}</span>
              <div className="text-right">
                <p className="font-bold text-slate-800">{kpi.value}</p>
                <div className={`flex items-center justify-end text-xs ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.isPositive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  <span>{kpi.change}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center mb-4">
          <Zap className="text-sky-500 mr-3" size={20} />
          <h3 className="text-xl font-semibold text-slate-800">AI Insights</h3>
        </div>
        <ul className="space-y-3 list-disc list-inside text-slate-500">
          {aiInsights.map((insight, index) => (
            <li key={index} className="text-sm">{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarWidgets;