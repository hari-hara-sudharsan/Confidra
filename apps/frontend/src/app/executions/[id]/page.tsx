'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../providers/AuthProvider';
import { ShieldCheck, CheckCircle2, Lock, Cpu, Database, ChevronLeft } from 'lucide-react';

export default function AttestationViewer({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // State for live timeline animation
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Simulate real-time execution timeline
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 800);

    return () => clearInterval(timer);
  }, [isAuthenticated, router]);

  const steps = [
    { label: 'Payload Encrypted (AES-256-GCM)', icon: Lock },
    { label: 'Dispatched to Flare TEE', icon: Cpu },
    { label: 'AI Evaluation & Risk Analysis', icon: Database },
    { label: 'ECDSA Cryptographic Signature', icon: ShieldCheck },
    { label: 'Blockchain Attestation Published', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.push('/executions')} 
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Executions
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Live Execution Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold mb-8">Execution Timeline</h2>
            
            <div className="space-y-6">
              {steps.map((step, index) => {
                const isCompleted = currentStep > index;
                const isActive = currentStep === index;
                const Icon = step.icon;
                
                return (
                  <div key={index} className={`flex items-start gap-4 ${isCompleted ? 'opacity-100' : isActive ? 'opacity-100 animate-pulse' : 'opacity-40'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isCompleted ? 'bg-green-500/20 text-green-500' : isActive ? 'bg-blue-500/20 text-blue-500' : 'bg-slate-800 text-slate-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="pt-2">
                      <p className={`font-semibold ${isCompleted ? 'text-white' : isActive ? 'text-blue-400' : 'text-slate-400'}`}>
                        {step.label}
                      </p>
                      {isCompleted && <p className="text-xs text-slate-500 mt-1">Verified {index * 125}ms ago</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attestation Result Viewer */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-xl font-bold mb-6">Execution Outcome</h2>
              
              {currentStep < 5 ? (
                <div className="h-32 flex flex-col items-center justify-center text-slate-500">
                  <Cpu className="w-8 h-8 animate-spin mb-4" />
                  <p className="text-sm">Confidential execution in progress...</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                    <div>
                      <h3 className="text-green-500 font-bold">APPROVED</h3>
                      <p className="text-sm text-green-400/80">AI Confidence Score: 94.5%</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 mb-2">Reasoning Summary</h4>
                    <p className="text-sm text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      Applicant passes all confidential checks securely. No anomalies found in fraud detection signals.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-500" /> 
                Cryptographic Attestation
              </h2>
              
              {currentStep < 5 ? (
                <p className="text-sm text-slate-500">Awaiting signature...</p>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Execution Hash</label>
                    <div className="font-mono text-xs text-blue-400 bg-slate-950 p-3 rounded-lg border border-slate-800 break-all">
                      0x8f2d5a9b7c3e1f0d4a6b8c9e2f1a3b5d7c9e0f2a4b6c8d1e3f5a7b9c1d3e5f7a
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">TEE ECDSA Signature</label>
                    <div className="font-mono text-xs text-purple-400 bg-slate-950 p-3 rounded-lg border border-slate-800 break-all h-24 overflow-y-auto">
                      304402206c4b2b2...8f3c7d9a1b3c5e7f9a1b3c5e7f9a1b3c5e7f
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
