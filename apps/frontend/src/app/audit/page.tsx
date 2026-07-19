'use client';

import { ShieldCheck, Search, Filter, Download, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function AuditCenter() {
  const [search, setSearch] = useState('');

  // Mocked Audit Events for Demonstration
  const events = [
    { id: 'EVT-001', type: 'EXECUTION_ANCHOR', entity: 'Workflow Engine', user: 'System', timestamp: '2 mins ago', status: 'Verified' },
    { id: 'EVT-002', type: 'POLICY_UPDATE', entity: 'Policy Engine', user: 'admin@confidra.com', timestamp: '1 hour ago', status: 'Success' },
    { id: 'EVT-003', type: 'ORG_INVITE', entity: 'Organization', user: 'admin@confidra.com', timestamp: '3 hours ago', status: 'Pending' },
    { id: 'EVT-004', type: 'API_KEY_CREATED', entity: 'Security', user: 'admin@confidra.com', timestamp: '1 day ago', status: 'Success' },
    { id: 'EVT-005', type: 'EXECUTION_FAILED', entity: 'TEE Worker', user: 'System', timestamp: '2 days ago', status: 'Failed' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in">
      <header className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            Audit Center
          </h1>
          <p className="text-slate-400 mt-1">Immutable cryptographic log of all platform activity.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center">
          <Search className="w-4 h-4 text-slate-500 ml-2" />
          <input 
            type="text" 
            placeholder="Search by Event ID, Type, or User..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-sm text-white w-full px-4 outline-none placeholder-slate-600"
          />
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Event ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User / Actor</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {events.map((event, i) => (
              <tr key={i} className="hover:bg-slate-800/30 group">
                <td className="px-6 py-4 text-sm font-mono text-slate-400">{event.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-white">{event.type}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{event.user}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{event.timestamp}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    event.status === 'Verified' ? 'bg-purple-500/10 text-purple-400' : 
                    event.status === 'Success' ? 'bg-green-500/10 text-green-500' :
                    event.status === 'Failed' ? 'bg-red-500/10 text-red-500' :
                    'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
