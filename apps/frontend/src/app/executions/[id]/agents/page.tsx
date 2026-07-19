'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Bot, Activity, Clock, Zap, CheckCircle2 } from 'lucide-react';

export default function AgentTimeline({ params }: { params: { id: string } }) {
  const router = useRouter();

  // Mocked Metrics for the UI Visualization
  const agents = [
    { name: 'SupervisorAgent', time: '120ms', tokens: 15, cost: '$0.0001', status: 'Success' },
    { name: 'WorkflowUnderstandingAgent', time: '850ms', tokens: 120, cost: '$0.0012', status: 'Success' },
    { name: 'PolicyAgent', time: '1200ms', tokens: 450, cost: '$0.0045', status: 'Success' },
    { name: 'DocumentAgent', time: '3400ms', tokens: 2100, cost: '$0.0210', status: 'Success' },
    { name: 'OcrAgent', time: '100ms', tokens: 50, cost: '$0.0005', status: 'Skipped' },
    { name: 'EvidenceAgent', time: '2100ms', tokens: 800, cost: '$0.0080', status: 'Success' },
    { name: 'RiskAgent', time: '900ms', tokens: 300, cost: '$0.0030', status: 'Success' },
    { name: 'FraudAgent', time: '950ms', tokens: 320, cost: '$0.0032', status: 'Success' },
    { name: 'ComplianceAgent', time: '1100ms', tokens: 400, cost: '$0.0040', status: 'Success' },
    { name: 'ScoringAgent', time: '400ms', tokens: 80, cost: '$0.0008', status: 'Success' },
    { name: 'DecisionAgent', time: '500ms', tokens: 90, cost: '$0.0009', status: 'Success' },
    { name: 'ExplainabilityAgent', time: '2800ms', tokens: 1200, cost: '$0.0120', status: 'Success' },
    { name: 'SummaryAgent', time: '1800ms', tokens: 600, cost: '$0.0060', status: 'Success' },
    { name: 'QaAgent', time: '600ms', tokens: 150, cost: '$0.0015', status: 'Success' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push(`/executions/${params.id}`)} 
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-800 transition-colors mr-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <Bot className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold">Agent Execution Timeline</h1>
              <p className="text-sm text-slate-400">Multi-Agent DAG trace inside Flare TEE</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-bold flex items-center gap-2 mb-4"><Activity className="w-4 h-4 text-purple-500"/> Pipeline Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500">Total Latency</p>
                  <p className="text-xl font-mono text-white">16.8s</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Agents Invoked</p>
                  <p className="text-xl font-mono text-white">14</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Token Usage</p>
                  <p className="text-xl font-mono text-white">6,675</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Cost Estimate</p>
                  <p className="text-xl font-mono text-white">$0.0667</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/50 border-b border-slate-800">
                    <th className="p-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Agent Node</th>
                    <th className="p-4 font-semibold text-slate-400 text-xs uppercase tracking-wider text-right">Latency</th>
                    <th className="p-4 font-semibold text-slate-400 text-xs uppercase tracking-wider text-right">Tokens</th>
                    <th className="p-4 font-semibold text-slate-400 text-xs uppercase tracking-wider text-right">Cost</th>
                    <th className="p-4 font-semibold text-slate-400 text-xs uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {agents.map((agent, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                      <td className="p-4 text-sm font-semibold flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800">
                          {i + 1}
                        </div>
                        {agent.name}
                      </td>
                      <td className="p-4 text-sm font-mono text-right text-slate-300 flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3 text-slate-500" /> {agent.time}
                      </td>
                      <td className="p-4 text-sm font-mono text-right text-blue-400">{agent.tokens.toLocaleString()}</td>
                      <td className="p-4 text-sm font-mono text-right text-green-400">{agent.cost}</td>
                      <td className="p-4 text-sm text-right">
                        {agent.status === 'Success' ? (
                           <span className="inline-flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs font-semibold">
                             <CheckCircle2 className="w-3 h-3" /> Valid
                           </span>
                        ) : (
                           <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-500/10 px-2 py-1 rounded text-xs font-semibold">
                             <Zap className="w-3 h-3" /> Skipped
                           </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
