'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Activity, BrainCircuit, AlertTriangle, ArrowUpRight, Lock, Database } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // We fetch from our new analytics endpoint
    fetch('http://localhost:3001/api/v1/analytics/dashboard', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  if (!stats) {
    return (
      <div className="p-8 flex justify-center items-center h-full">
        <Activity className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Mocking recent workflows since we don't have them in the endpoint yet
  const recentWorkflows = [
    { id: 'wf_1', name: 'KYC Verification', status: 'Active', executions: 142 },
    { id: 'wf_2', name: 'Loan Approval', status: 'Active', executions: 89 },
    { id: 'wf_3', name: 'Grant Disbursement', status: 'Paused', executions: 12 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Executive Overview</h1>
          <p className="text-slate-400 mt-1">Platform intelligence and confidential execution metrics.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
          Generate Report <ArrowUpRight className="w-4 h-4" />
        </button>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Total Executions</p>
          <div className="flex items-end gap-4">
            <p className="text-4xl font-bold text-white">{stats.totalExecutions.toLocaleString()}</p>
            <p className="text-green-500 text-sm font-semibold mb-1">+12% this week</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">On-Chain Attestations</p>
          <div className="flex items-end gap-4">
            <p className="text-4xl font-bold text-white">{stats.attestationsAnchored.toLocaleString()}</p>
            <ShieldCheck className="w-6 h-6 text-purple-500 mb-1" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Avg. AI Confidence</p>
          <div className="flex items-end gap-4">
            <p className="text-4xl font-bold text-white">{(stats.averageConfidence * 100).toFixed(1)}%</p>
            <BrainCircuit className="w-6 h-6 text-green-500 mb-1" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Avg. Risk Index</p>
          <div className="flex items-end gap-4">
            <p className="text-4xl font-bold text-white">{(stats.averageRisk * 100).toFixed(1)}%</p>
            <AlertTriangle className="w-6 h-6 text-red-500 mb-1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Trend Bar Chart */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-blue-500" /> Execution Trends (7 Days)</h2>
          <div className="flex items-end gap-4 h-64 mt-4 px-2">
            {stats.executionTrends.map((t: any, i: number) => {
              const max = Math.max(...stats.executionTrends.map((d:any) => d.count));
              const height = (t.count / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end group">
                  <div className="w-full bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/30 rounded-t-sm transition-all relative" style={{ height: `${height}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.count}
                    </div>
                  </div>
                  <p className="text-center text-xs text-slate-500 mt-2 font-semibold">{t.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Database className="w-5 h-5 text-purple-500" /> Risk Distribution</h2>
          <div className="space-y-6">
            {stats.riskDistribution.map((r: any, i: number) => {
              const colors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500'];
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-300">{r.name}</span>
                    <span className="text-slate-400">{r.value}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
                    <div className={`h-full ${colors[i]}`} style={{ width: `${r.value}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 p-4 bg-slate-950 rounded-xl border border-slate-800">
             <p className="text-sm text-slate-400 leading-relaxed">
               Confidra’s Multi-Agent engine has automatically flagged <span className="text-white font-bold">{stats.riskDistribution[2].value}%</span> of executions as High Risk without exposing sensitive payload data on-chain.
             </p>
          </div>
        </div>
      </div>
      
      {/* Mini Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">Active Workflows</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-950">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Workflow Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Executions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {recentWorkflows.map(wf => (
                <tr key={wf.id} className="hover:bg-slate-800/30">
                  <td className="px-6 py-4 text-sm font-semibold text-white">{wf.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${wf.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-slate-500/10 text-slate-500'}`}>
                      {wf.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono text-right">{wf.executions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-center items-center text-center">
          <Lock className="w-12 h-12 text-blue-500 mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-white mb-2">Flare TEE Enclave Secured</h3>
          <p className="text-sm text-slate-400 max-w-sm">
            All AI decisions are currently being executed inside the hardware-secured enclave. Execution logs are cryptographically anchored.
          </p>
          <button onClick={() => router.push('/executions')} className="mt-6 border border-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
            View Live Executions
          </button>
        </div>
      </div>

    </div>
  );
}
