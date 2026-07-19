'use client';

import { ArrowRightLeft, Search, Filter, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function TransactionCenter() {
  const [search, setSearch] = useState('');

  // Mocked Transactions for Demonstration
  const transactions = [
    { txHash: '0x3a4b...9f2c', method: 'recordExecution', block: 1543902, gas: '142,050', latency: '400ms', status: 'Confirmed', time: '2 mins ago' },
    { txHash: '0x7c9d...1a4e', method: 'recordExecution', block: 1543880, gas: '141,990', latency: '385ms', status: 'Confirmed', time: '12 mins ago' },
    { txHash: '0x1b2f...8e7d', method: 'updatePolicy', block: 1543805, gas: '85,400', latency: '210ms', status: 'Confirmed', time: '45 mins ago' },
    { txHash: '0x9f8a...3c2b', method: 'recordExecution', block: 'Pending', gas: 'Estimating...', latency: '-', status: 'Pending', time: 'Just now' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in h-full">
      <header className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <ArrowRightLeft className="w-8 h-8 text-blue-500" />
            Transaction Center
          </h1>
          <p className="text-slate-400 mt-1">Live monitoring of all Confidra interactions with the Flare Testnet.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center">
          <Search className="w-4 h-4 text-slate-500 ml-2" />
          <input 
            type="text" 
            placeholder="Search by TxHash, Method, or Block..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-sm text-white w-full px-4 outline-none placeholder-slate-600"
          />
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaction Hash</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Method</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Block</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Gas Used</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Latency</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {transactions.map((tx, i) => (
              <tr key={i} className="hover:bg-slate-800/30 group transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-mono text-blue-400 hover:text-blue-300 cursor-pointer">
                    {tx.txHash} <ExternalLink className="w-3 h-3" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-mono">{tx.method}</span>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-slate-400">{tx.block}</td>
                <td className="px-6 py-4 text-sm font-mono text-slate-500">{tx.gas}</td>
                <td className="px-6 py-4 text-sm font-mono text-slate-500">{tx.latency}</td>
                <td className="px-6 py-4 text-right">
                  {tx.status === 'Confirmed' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-green-500/10 text-green-500">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {tx.status}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-yellow-500/10 text-yellow-500">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div> {tx.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
