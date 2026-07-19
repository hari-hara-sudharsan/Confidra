'use client';
import { Shield, Search, Filter, Download } from 'lucide-react';

export default function TrustExplorer() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
            <Shield className="w-8 h-8 mr-3 text-emerald-500" />
            Trust Explorer
          </h1>
          <p className="text-gray-400 mt-2">Search and verify all cryptographically signed Trust Certificates.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Export Audit Log
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Certificate ID, Workflow ID, or Tx Hash..." 
            className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
        <button className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-700">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-xl">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-950">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Certificate ID</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Workflow</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-900">
            <tr className="hover:bg-gray-800/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">cert_mock_123</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">wf_9876</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">Just now</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="/verify/cert_mock_123" target="_blank" className="text-indigo-400 hover:text-indigo-300 mr-4">View Public</a>
                <button className="text-gray-400 hover:text-white"><Download className="w-4 h-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
