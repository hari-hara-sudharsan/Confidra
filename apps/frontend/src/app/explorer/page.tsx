'use client';

import { useState } from 'react';
import { Search, ShieldCheck, Box, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlockchainExplorer() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const mockBlocks = [
    { number: 125439, time: '2m ago', txCount: 14 },
    { number: 125438, time: '5m ago', txCount: 8 },
    { number: 125437, time: '8m ago', txCount: 22 },
  ];

  const mockTransactions = [
    { hash: '0x3f5b...91a2', type: 'ExecutionVerified', from: '0x1A4...B92', to: 'ConfidentialExecutionRegistry', time: '2m ago', status: 'Success' },
    { hash: '0x8f2d...5a9b', type: 'DecisionPublished', from: '0x1A4...B92', to: 'DecisionRegistry', time: '5m ago', status: 'Success' },
    { hash: '0x2a1c...89ef', type: 'WorkflowCreated', from: '0x99B...C14', to: 'WorkflowRegistry', time: '12m ago', status: 'Success' },
    { hash: '0x7b3d...22ac', type: 'ExecutionVerified', from: '0x1A4...B92', to: 'ConfidentialExecutionRegistry', time: '1h ago', status: 'Success' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <Box className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold">Confidra Explorer</h1>
              <p className="text-sm text-slate-400">Powered by Flare Network</p>
            </div>
          </div>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-slate-400 hover:text-white transition-colors">
            Back to Dashboard
          </button>
        </header>

        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by Tx Hash / Block / Address / Execution Hash..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest Blocks */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="font-bold flex items-center gap-2"><Box className="w-4 h-4 text-blue-500"/> Latest Blocks</h2>
            </div>
            <div className="divide-y divide-slate-800/50">
              {mockBlocks.map((block) => (
                <div key={block.number} className="p-6 hover:bg-slate-800/50 transition-colors flex justify-between items-center">
                  <div>
                    <span className="text-blue-400 font-mono font-bold text-sm">Block {block.number}</span>
                    <p className="text-xs text-slate-500 mt-1">{block.time}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm">{block.txCount} txns</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Transactions */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-green-500"/> Trust Layer Attestations</h2>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-slate-800">
                  <th className="p-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Tx Hash</th>
                  <th className="p-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Event / Action</th>
                  <th className="p-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">To (Contract)</th>
                  <th className="p-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((tx) => (
                  <tr key={tx.hash} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-sm font-mono text-blue-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {tx.hash}
                    </td>
                    <td className="p-4 text-sm font-semibold">
                      <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs">
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-300 font-mono">{tx.to}</td>
                    <td className="p-4 text-sm text-slate-500">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}
