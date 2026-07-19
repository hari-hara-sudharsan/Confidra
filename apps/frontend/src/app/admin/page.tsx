'use client';
import { Settings, ToggleLeft, ToggleRight, Save } from 'lucide-react';
import { useState } from 'react';

export default function AdminConsole() {
  const [maintenance, setMaintenance] = useState(false);
  const [rateLimit, setRateLimit] = useState(true);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
            <Settings className="w-8 h-8 mr-3 text-gray-400" />
            Administration Console
          </h1>
          <p className="text-gray-400 mt-2">Global platform configuration, feature flags, and system policies.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg divide-y divide-gray-800">
        
        {/* Maintenance Mode */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">Maintenance Mode</h3>
            <p className="text-sm text-gray-400 mt-1">Suspend all non-admin logins and pause incoming webhook dispatching.</p>
          </div>
          <button onClick={() => setMaintenance(!maintenance)} className="focus:outline-none">
            {maintenance ? (
              <ToggleRight className="w-10 h-10 text-rose-500" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-gray-600" />
            )}
          </button>
        </div>

        {/* Global Rate Limiting */}
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">Global Rate Limiting</h3>
            <p className="text-sm text-gray-400 mt-1">Enforce strict API Quotas on all developer keys (100 req / min).</p>
          </div>
          <button onClick={() => setRateLimit(!rateLimit)} className="focus:outline-none">
            {rateLimit ? (
              <ToggleRight className="w-10 h-10 text-emerald-500" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-gray-600" />
            )}
          </button>
        </div>

        {/* Audit Retention */}
        <div className="p-6">
           <h3 className="text-lg font-medium text-white mb-4">Audit Log Retention Policy</h3>
           <select className="bg-gray-950 border border-gray-700 text-white rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500">
             <option>30 Days</option>
             <option>90 Days</option>
             <option>1 Year</option>
             <option>Indefinite (Compliance Mode)</option>
           </select>
        </div>

      </div>
    </div>
  );
}
