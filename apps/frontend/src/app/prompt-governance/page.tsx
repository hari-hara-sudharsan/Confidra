'use client';
import { Network, History, RotateCcw } from 'lucide-react';

export default function PromptGovernance() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
          <Network className="w-8 h-8 mr-3 text-fuchsia-500" />
          Prompt & Model Governance
        </h1>
        <p className="text-gray-400 mt-2">Manage prompt versions, view historical model metrics, and control rollbacks.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 border-b border-gray-800 bg-gray-950 flex justify-between items-center">
          <h3 className="font-medium text-white flex items-center"><History className="w-5 h-5 mr-2 text-fuchsia-400" /> Prompt Version History</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Deployed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">Active (v2.4)</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Today, 10:00 AM</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">AI Admin</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-500 cursor-not-allowed">Rollback</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-gray-400 text-sm">v2.3</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">July 15, 2026</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">System (Auto-tune)</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-400 hover:text-indigo-300 flex items-center justify-end w-full">
                  <RotateCcw className="w-4 h-4 mr-1" /> Rollback
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-gray-400 text-sm">v2.2</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">July 1, 2026</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">AI Admin</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-400 hover:text-indigo-300 flex items-center justify-end w-full">
                  <RotateCcw className="w-4 h-4 mr-1" /> Rollback
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
