'use client';
import { PlayCircle, GitMerge, FileSpreadsheet } from 'lucide-react';

export default function SimulationEngine() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
          <PlayCircle className="w-8 h-8 mr-3 text-indigo-500" />
          Workflow Simulation Engine
        </h1>
        <p className="text-gray-400 mt-2">Run synthetic datasets against drafted policies before pushing to production.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="font-medium text-white mb-4 flex items-center"><FileSpreadsheet className="w-5 h-5 mr-2 text-indigo-400" /> Synthetic Dataset</h3>
          <p className="text-sm text-gray-400 mb-4">Select a dataset to simulate evaluation traffic.</p>
          <select className="w-full bg-gray-950 border border-gray-700 text-white rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500">
            <option>Startup Applications (Q2 Mock Data - 10,000 rows)</option>
            <option>Scholarship Applicants (Demo Set - 500 rows)</option>
          </select>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="font-medium text-white mb-4 flex items-center"><GitMerge className="w-5 h-5 mr-2 text-indigo-400" /> Policy Configuration</h3>
          <p className="text-sm text-gray-400 mb-4">Select the policy version to evaluate against.</p>
          <select className="w-full bg-gray-950 border border-gray-700 text-white rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500">
            <option>v1.4 (Draft - Strict Thresholds)</option>
            <option>v1.3 (Current Production)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center shadow-lg shadow-indigo-500/20">
          <PlayCircle className="w-5 h-5 mr-2" />
          Run Simulation
        </button>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 shadow-lg min-h-[300px] flex items-center justify-center">
         <p className="text-gray-500 italic">Run a simulation to view approval rates and risk distributions.</p>
      </div>
    </div>
  );
}
