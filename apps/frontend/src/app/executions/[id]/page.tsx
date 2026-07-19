'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../providers/AuthProvider';
import { ShieldCheck, CheckCircle2, Lock, Cpu, Database, ChevronLeft, ArrowRight } from 'lucide-react';

export default function AttestationViewer({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // State for live timeline animation
  const [currentStep, setCurrentStep] = useState(0);

  // Mock Result Payload to simulate what the backend would fetch from ExecutionLog
  const mockResult = {
    decision: "APPROVED",
    final_score: 0.85,
    confidence_score: 0.95,
    risk_score: 0.15,
    fraud_score: 0.02,
    compliance_score: 0.98,
    decision_explanation: "The applicant meets all policy criteria with high compliance and low risk.",
  };

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
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><Database className="w-5 h-5 text-purple-500" /> Multi-Agent AI Analysis</h2>
              
              {currentStep < 5 ? (
                <div className="h-32 flex flex-col items-center justify-center text-slate-500">
                  <Cpu className="w-8 h-8 animate-spin mb-4" />
                  <p className="text-sm">Confidential evaluation in progress...</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="flex gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/50">
                    <div className="flex-1 text-center">
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Decision</p>
                      <p className={`text-xl font-bold mt-1 ${mockResult.decision === 'APPROVED' ? 'text-green-500' : 'text-red-500'}`}>{mockResult.decision}</p>
                    </div>
                    <div className="w-px bg-slate-800"></div>
                    <div className="flex-1 text-center">
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Score</p>
                      <p className="text-xl font-bold mt-1 text-blue-400">{(mockResult.final_score * 100).toFixed(1)}%</p>
                    </div>
                    <div className="w-px bg-slate-800"></div>
                    <div className="flex-1 text-center">
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Confidence</p>
                      <p className="text-xl font-bold mt-1 text-purple-400">{(mockResult.confidence_score * 100).toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-500 mb-1">Risk</p>
                      <p className="text-lg text-yellow-500 font-mono">{(mockResult.risk_score * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-500 mb-1">Fraud</p>
                      <p className="text-lg text-red-400 font-mono">{(mockResult.fraud_score * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-500 mb-1">Compliance</p>
                      <p className="text-lg text-green-400 font-mono">{(mockResult.compliance_score * 100).toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Explainability Agent</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{mockResult.decision_explanation}</p>
                  </div>
                  
                  <button 
                    onClick={() => router.push(`/executions/${params.id}/agents`)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold py-4 rounded-xl transition-colors flex justify-center items-center gap-2"
                  >
                    View Agent Execution Timeline <ArrowRight className="w-4 h-4" />
                  </button>
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
                <div className="space-y-4 animate-in fade-in duration-500 delay-300">
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
                  
                  <button 
                    onClick={() => router.push('/explorer')}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Verify On-Chain Proof
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
