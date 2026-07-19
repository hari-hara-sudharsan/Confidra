'use client';
import { BarChart2, TrendingUp, Users, Box } from 'lucide-react';

export default function AnalyticsDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
          <BarChart2 className="w-8 h-8 mr-3 text-emerald-500" />
          Enterprise Analytics
        </h1>
        <p className="text-gray-400 mt-2">Deep insights into workflow throughput and API usage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-gray-400 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-emerald-500" /> Total Executions (MTD)</p>
          <p className="text-3xl font-bold text-white mt-4">124,592</p>
          <p className="text-xs text-emerald-400 mt-2">+14.2% from last month</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-gray-400 flex items-center"><Users className="w-4 h-4 mr-2 text-indigo-500" /> Active API Keys</p>
          <p className="text-3xl font-bold text-white mt-4">18</p>
          <p className="text-xs text-gray-400 mt-2">Across 4 environments</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-gray-400 flex items-center"><Box className="w-4 h-4 mr-2 text-amber-500" /> Storage Utilized</p>
          <p className="text-3xl font-bold text-white mt-4">42.8 GB</p>
          <p className="text-xs text-gray-400 mt-2">Encrypted payload storage</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg min-h-[400px] flex items-center justify-center">
         <p className="text-gray-500 italic">Advanced Cohort & Retention Analytics (Chart integration pending)</p>
      </div>
    </div>
  );
}
