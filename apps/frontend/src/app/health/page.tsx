'use client';

import { HeartPulse, CheckCircle2, AlertTriangle, Database, Cpu, Globe, Server } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SystemHealth() {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(console.error);
  }, []);

  if (!health) return <div className="p-8 text-slate-500">Loading system health...</div>;

  const services = [
    { name: 'Backend API Engine', key: 'backendApi', icon: Server },
    { name: 'PostgreSQL Database', key: 'database', icon: Database },
    { name: 'Python TEE Worker', key: 'teeWorker', icon: Cpu },
    { name: 'Flare Testnet RPC', key: 'flareNetwork', icon: Globe },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in">
      <header className="border-b border-slate-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <HeartPulse className="w-8 h-8 text-blue-500" />
            System Health
          </h1>
          <p className="text-slate-400 mt-1">Real-time status of all Confidra platform infrastructure.</p>
        </div>
        <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${health.status === 'Healthy' ? 'border-green-500/30 bg-green-500/10 text-green-500' : 'border-red-500/30 bg-red-500/10 text-red-500'}`}>
          <div className={`w-2 h-2 rounded-full ${health.status === 'Healthy' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <span className="font-bold text-sm">System {health.status}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(s => {
          const status = health.services[s.key];
          const Icon = s.icon;
          return (
            <div key={s.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{s.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">Latency: {status.latencyMs}ms</p>
                </div>
              </div>
              <div>
                {status.status === 'Operational' ? (
                  <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1.5 rounded-lg text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> Operational
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg text-sm font-semibold">
                    <AlertTriangle className="w-4 h-4" /> Degraded
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
