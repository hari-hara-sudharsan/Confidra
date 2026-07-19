'use client';

import { useAuth } from '../../../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Network, Plus, Copy, Trash2, ArrowRight } from 'lucide-react';

export default function WorkflowsGallery() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock workspace id for demo purposes. Real app would read from state.
  const activeWorkspaceId = '00000000-0000-0000-0000-000000000000';

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // In a real app, we'd fetch actual workflows here
    // For visual testing, we'll mock it if the DB is empty
    setWorkflows([
      { id: '1', name: 'Grant Evaluation 2026', status: 'PUBLISHED', stages: 3 },
      { id: '2', name: 'Senior Developer Hiring', status: 'DRAFT', stages: 5 },
    ]);
    setIsLoading(false);
  }, [isAuthenticated, router]);

  const handleCreate = async () => {
    // In real app, call API to create Draft workflow, then redirect to builder
    router.push(`/workflows/builder/new`);
  };

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Workflows...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <Network className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Confidential Workflows</h1>
          </div>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-slate-400 hover:text-white transition-colors">
            Back to Dashboard
          </button>
        </header>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Active Workflows</h2>
          <button onClick={handleCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> Create Workflow
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map(wf => (
            <div key={wf.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{wf.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${wf.status === 'PUBLISHED' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {wf.status}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-6">{wf.stages} Stages configured</p>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => router.push(`/workflows/builder/${wf.id}`)} className="flex-1 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm transition-colors font-medium">
                  Builder <ArrowRight className="w-4 h-4" />
                </button>
                <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors text-slate-300">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 bg-slate-800 hover:bg-red-900/30 rounded-lg text-sm transition-colors text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
