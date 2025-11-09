import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import KpiCard from './components/KpiCard';
import TopQueries from './components/TopQueries';
import TrafficOverview from './components/TrafficOverview';
import SidebarWidgets from './components/SidebarWidgets';

const kpiData = [
  { title: 'Candidates', value: '823', change: '+48%', previousText: 'from 556 (Previous 4 Weeks)' },
  { title: 'Employers', value: '2,879', change: '+322%', previousText: 'from 682 (Previous 4 Weeks)' },
  { title: 'Active Jobs', value: '2,134', change: '+5105%', previousText: 'from 41 (Previous 4 Weeks)' },
  { title: 'Job Applications', value: '25', change: '+67%', previousText: 'from 15 (Previous 4 Weeks)' },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          {/* Title and Breadcrumbs */}
          <div className="p-6 md:p-8 border-b border-slate-200 bg-white">
            <p className="text-sm text-slate-500">Home / Dashboard</p>
            <h1 className="text-3xl font-bold text-slate-900 mt-1">Dashboard</h1>
          </div>

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            {/* KPI Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <KpiCard key={index} title={kpi.title} value={kpi.value} change={kpi.change} previousText={kpi.previousText} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8">
              <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                {/* Performance Charts Section */}
                <TrafficOverview />
                {/* Search Console Table Section (as an example of another data widget) */}
                <TopQueries />
              </div>

              {/* Sidebar Widgets moved to the right column */}
              <div className="lg:col-span-1">
                <SidebarWidgets />
              </div>
            </div>
          </main>
           {/* Footer */}
          <footer className="text-center p-6 text-slate-500 text-sm border-t border-slate-200">
            © 2025 EdAssist — Prototype Dashboard.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;