'use client';

import { Database, Search, Cpu, Globe, Lock, Code } from 'lucide-react';

export default function FlareExplorer() {
  const contracts = [
    { name: 'ConfidentialExecutionRegistry', address: '0x8F2A...3B1C', type: 'Core', calls: '1,492', status: 'Active' },
    { name: 'VerificationRegistry', address: '0x4E9B...7A2D', type: 'Security', calls: '1,492', status: 'Active' },
    { name: 'PolicyRegistry', address: '0x1C5D...9F4E', type: 'Core', calls: '34', status: 'Active' },
    { name: 'OrganizationRegistry', address: '0x9A3B...2C1D', type: 'Identity', calls: '8', status: 'Active' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in h-full">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Database className="w-8 h-8 text-blue-500" />
          Flare Explorer
        </h1>
        <p className="text-slate-400 mt-1">Dedicated block explorer for Confidra Smart Contracts on the Flare Network.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <Globe className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Network</h3>
          <p className="text-xl font-bold text-white mt-1">Coston2 Testnet</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <Code className="w-8 h-8 text-purple-500 mb-3" />
          <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Deployed Contracts</h3>
          <p className="text-xl font-bold text-white mt-1">10</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <Lock className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Attestations</h3>
          <p className="text-xl font-bold text-white mt-1">1,492</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <Cpu className="w-8 h-8 text-red-500 mb-3" />
          <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">TEE Enclaves</h3>
          <p className="text-xl font-bold text-white mt-1">1 Active</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden mt-8">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Smart Contract Registry</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search contracts..." 
              className="bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-950">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contract Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Calls</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {contracts.map((contract, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-white">{contract.name}</td>
                <td className="px-6 py-4 text-sm font-mono text-blue-400 cursor-pointer hover:text-blue-300">{contract.address}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs">{contract.type}</span>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-slate-400">{contract.calls}</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-green-500/10 text-green-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> {contract.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
