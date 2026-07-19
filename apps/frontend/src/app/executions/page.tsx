'use client';

import { useAuth } from '../../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShieldCheck, ServerCrash, Clock, Box } from 'lucide-react';

export default function ExecutionsDashboard() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [executions, setExecutions] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Mocking the execution history for the UI
    setExecutions([
      { id: 'exec-1', workflow: 'Grant Evaluation 2026', status: 'COMPLETED', date: 'Just now', timeMs: 450, hash: '0x3f5...91a' },
      { id: 'exec-2', workflow: 'Grant Evaluation 2026', status: 'TEE_PROCESSING', date: '2 min ago', timeMs: null, hash: 'Pending' },
      { id: 'exec-3', workflow: 'Senior Developer Hiring', status: 'FAILED', date: '1 hour ago', timeMs: 120, hash: '0x1c9...22b' },
    ]);
  }, [isAuthenticated, router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <ShieldCheck className="w-5 h-5 text-green-500" />;
      case 'FAILED': return <ServerCrash className="w-5 h-5 text-red-500" />;
      case 'TEE_PROCESSING': return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
      default: return <Box className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Confidential Executions</h1>
          </div>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-slate-400 hover:text-white transition-colors">
            Back to Dashboard
          </button>
        </header>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800">
                <th className="p-4 font-semibold text-slate-400 text-sm">Status</th>
                <th className="p-4 font-semibold text-slate-400 text-sm">Workflow</th>
                <th className="p-4 font-semibold text-slate-400 text-sm">Execution Hash</th>
                <th className="p-4 font-semibold text-slate-400 text-sm">Time</th>
                <th className="p-4 font-semibold text-slate-400 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {executions.map((exec) => (
                <tr key={exec.id} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    {getStatusIcon(exec.status)}
                    <span className="font-medium text-sm">{exec.status}</span>
                  </td>
                  <td className="p-4 text-sm">{exec.workflow}</td>
                  <td className="p-4 text-sm font-mono text-slate-400">{exec.hash}</td>
                  <td className="p-4 text-sm text-slate-400">{exec.date} {exec.timeMs ? `(${exec.timeMs}ms)` : ''}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => router.push(`/executions/${exec.id}`)}
                      className="text-blue-500 hover:text-blue-400 text-sm font-semibold transition-colors"
                    >
                      View Attestation &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
