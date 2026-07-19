'use client';

import { useState } from 'react';
import { Presentation, DatabaseZap, Users, FileText, CheckCircle2, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DemoControlCenter() {
  const router = useRouter();
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [loadingDataset, setLoadingDataset] = useState<string | null>(null);

  const togglePresentationMode = () => {
    const newState = !isPresentationMode;
    setIsPresentationMode(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('presentationMode', newState ? 'true' : 'false');
    }
  };

  const injectDataset = (datasetName: string) => {
    setLoadingDataset(datasetName);
    // Simulate injection delay
    setTimeout(() => {
      setLoadingDataset(null);
      alert(`✅ Mock ${datasetName} dataset injected successfully. Navigate to Dashboards to view.`);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in h-full">
      <header className="border-b border-slate-800 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Presentation className="w-8 h-8 text-blue-500" />
            Demo Control Center
          </h1>
          <p className="text-slate-400 mt-1">Configure presentation settings and inject mock datasets for live judging.</p>
        </div>
        <button
          onClick={togglePresentationMode}
          className={`px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-lg ${
            isPresentationMode ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
          }`}
        >
          {isPresentationMode ? 'Disable Presentation Mode' : 'Enable Presentation Mode'}
        </button>
      </header>

      {isPresentationMode && (
        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl text-blue-400 text-sm flex items-center gap-2 mb-8">
          <CheckCircle2 className="w-5 h-5" />
          Presentation mode is active. Extraneous UI is hidden, and metrics are amplified for visibility on projectors.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-colors">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Hiring & KYC Dataset</h2>
          <p className="text-slate-400 text-sm mb-6">Injects 142 historical executions demonstrating background checks, identity verification, and PII masking.</p>
          <button 
            onClick={() => injectDataset('Hiring')}
            disabled={loadingDataset !== null}
            className="w-full bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex justify-center items-center gap-2"
          >
            {loadingDataset === 'Hiring' ? <RotateCcw className="w-4 h-4 animate-spin" /> : <DatabaseZap className="w-4 h-4" />}
            {loadingDataset === 'Hiring' ? 'Injecting...' : 'Inject Dataset'}
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-colors">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Loan Approval Dataset</h2>
          <p className="text-slate-400 text-sm mb-6">Injects 89 historical executions highlighting credit risk analysis and financial document parsing.</p>
          <button 
            onClick={() => injectDataset('Loan')}
            disabled={loadingDataset !== null}
            className="w-full bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex justify-center items-center gap-2"
          >
            {loadingDataset === 'Loan' ? <RotateCcw className="w-4 h-4 animate-spin" /> : <DatabaseZap className="w-4 h-4" />}
            {loadingDataset === 'Loan' ? 'Injecting...' : 'Inject Dataset'}
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-colors opacity-50 cursor-not-allowed">
          <div className="w-12 h-12 bg-slate-500/10 rounded-xl flex items-center justify-center mb-4">
            <DatabaseZap className="w-6 h-6 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-300 mb-2">DAO Governance Dataset</h2>
          <p className="text-slate-500 text-sm mb-6">Injects voting and proposal evaluation data. (Coming soon in v2).</p>
          <button disabled className="w-full bg-slate-950 border border-slate-800 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold flex justify-center items-center gap-2">
            Locked
          </button>
        </div>

      </div>
    </div>
  );
}
