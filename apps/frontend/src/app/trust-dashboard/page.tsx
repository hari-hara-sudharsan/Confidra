'use client';
import { Activity, ShieldCheck, FileCheck2, BarChart4 } from 'lucide-react';

export default function TrustDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Organization Trust Profile</h1>
        <p className="text-gray-400 mt-2">Executive overview of your organization's cryptographic verifications.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-emerald-500/10 rounded-md p-3">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="text-sm font-medium text-gray-400">Trust Score</h3>
              <p className="text-2xl font-bold text-white">99.9%</p>
            </div>
          </div>
        </div>
        
        {/* Metric 2 */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-500/10 rounded-md p-3">
              <FileCheck2 className="w-6 h-6 text-indigo-500" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="text-sm font-medium text-gray-400">Certificates Issued</h3>
              <p className="text-2xl font-bold text-white">1,245</p>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500/10 rounded-md p-3">
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="text-sm font-medium text-gray-400">Verification Requests</h3>
              <p className="text-2xl font-bold text-white">8,392</p>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-amber-500/10 rounded-md p-3">
              <BarChart4 className="w-6 h-6 text-amber-500" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="text-sm font-medium text-gray-400">Audit Readiness</h3>
              <p className="text-2xl font-bold text-white">Pass</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart Mock */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg h-96 flex items-center justify-center">
        <p className="text-gray-500 italic">Certificate issuance volume over time (Chart integration pending)</p>
      </div>
    </div>
  );
}
