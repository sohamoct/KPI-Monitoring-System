import React, { useState } from 'react';
import { Search } from 'lucide-react';
// import axios from 'axios'; // Uncomment to use axios

const dummyData = [
  { query: 'react developer jobs', clicks: 1250, impressions: 25000, ctr: '5.00%', position: 3.1 },
  { query: 'mern stack tutorial', clicks: 980, impressions: 18000, ctr: '5.44%', position: 2.5 },
  { query: 'edassist services', clicks: 760, impressions: 12000, ctr: '6.33%', position: 1.2 },
  { query: 'tailwind css dashboard', clicks: 540, impressions: 22000, ctr: '2.45%', position: 7.8 },
  { query: 'best front-end framework 2025', clicks: 450, impressions: 35000, ctr: '1.29%', position: 10.4 },
];

const TopQueries: React.FC = () => {
  const [queries, setQueries] = useState(dummyData);

  // Axios placeholder is commented out but available for future integration.

  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex items-center mb-4">
        <Search className="text-sky-500 mr-3" size={20} />
        <h3 className="text-xl font-semibold text-slate-800">Top Queries</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Query</th>
              <th scope="col" className="px-6 py-3 font-medium text-right">Clicks</th>
              <th scope="col" className="px-6 py-3 font-medium text-right">Impressions</th>
              <th scope="col" className="px-6 py-3 font-medium text-right">CTR</th>
              <th scope="col" className="px-6 py-3 font-medium text-right">Position</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((item, index) => (
              <tr key={index} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">{item.query}</td>
                <td className="px-6 py-4 text-slate-600 text-right">{item.clicks.toLocaleString()}</td>
                <td className="px-6 py-4 text-slate-600 text-right">{item.impressions.toLocaleString()}</td>
                <td className="px-6 py-4 text-slate-600 text-right">{item.ctr}</td>
                <td className="px-6 py-4 text-slate-600 text-right">{item.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopQueries;