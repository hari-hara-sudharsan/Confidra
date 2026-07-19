'use client';

import { HeartPulse, Globe, Server, Database, Cpu, Activity, Clock } from 'lucide-react';

export default function NetworkHealth() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in h-full">
      <header className="border-b border-slate-800 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <HeartPulse className="w-8 h-8 text-blue-500" />
            Network Health
          </h1>
          <p className="text-slate-400 mt-1">Real-time status of the Confidra infrastructure and Flare Network synchronization.</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 px-4 py-2 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-bold text-sm">All Systems Operational</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Blockchain Node Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-500" /> Flare RPC Status
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <span className="text-slate-400">Network Name</span>
              <span className="font-bold text-white">Coston2 Testnet</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <span className="text-slate-400">Chain ID</span>
              <span className="font-mono text-white">114</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <span className="text-slate-400">Latest Block</span>
              <span className="font-mono text-blue-400">1543902</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">RPC Latency</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="font-mono text-green-500 font-bold">42ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confidra Infrastructure Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Server className="w-6 h-6 text-blue-500" /> Confidra Infrastructure
          </h2>
          <div className="space-y-4">
            
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Server className="w-6 h-6 text-slate-400" />
                <div>
                  <h4 className="font-bold text-white">API Gateway (NestJS)</h4>
                  <p className="text-xs text-slate-500">Latency: 12ms</p>
                </div>
              </div>
              <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold uppercase">Operational</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Cpu className="w-6 h-6 text-slate-400" />
                <div>
                  <h4 className="font-bold text-white">TEE Enclave (Python)</h4>
                  <p className="text-xs text-slate-500">Latency: 8ms</p>
                </div>
              </div>
              <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold uppercase">Operational</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Database className="w-6 h-6 text-slate-400" />
                <div>
                  <h4 className="font-bold text-white">Database (PostgreSQL)</h4>
                  <p className="text-xs text-slate-500">Latency: 4ms</p>
                </div>
              </div>
              <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold uppercase">Operational</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
