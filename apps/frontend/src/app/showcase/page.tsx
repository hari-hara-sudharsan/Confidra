'use client';
import { ShieldCheck, Cpu, Database, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function WhyFlareShowcase() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-950 p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-6">
            Why <span className="text-rose-500">Flare?</span>
          </h1>
          <p className="text-xl text-gray-400">
            Confidra solves a massive paradox in AI adoption: Organizations want AI evaluation, but cannot expose sensitive data to cloud LLMs.
          </p>
        </div>

        {/* Interactive Diagram */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 shadow-2xl relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            
            {/* Step 1: Encrypted Input */}
            <div 
              className={`flex flex-col items-center text-center transition-all cursor-pointer ${activeStep === 1 ? 'scale-110 opacity-100' : 'scale-100 opacity-50'}`}
              onClick={() => setActiveStep(1)}
            >
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-4 border-2 ${activeStep === 1 ? 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]' : 'bg-gray-800 border-gray-700'}`}>
                <Lock className={`w-10 h-10 ${activeStep === 1 ? 'text-indigo-400' : 'text-gray-500'}`} />
              </div>
              <h3 className="font-bold text-white">1. Encrypted PII</h3>
              <p className="text-xs text-gray-400 mt-2 max-w-[150px]">Resumes and financials are encrypted client-side.</p>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-700 hidden md:block" />

            {/* Step 2: Flare TEE */}
            <div 
              className={`flex flex-col items-center text-center transition-all cursor-pointer ${activeStep === 2 ? 'scale-110 opacity-100' : 'scale-100 opacity-50'}`}
              onClick={() => setActiveStep(2)}
            >
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-4 border-2 ${activeStep === 2 ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)]' : 'bg-gray-800 border-gray-700'}`}>
                <Cpu className={`w-10 h-10 ${activeStep === 2 ? 'text-rose-400' : 'text-gray-500'}`} />
              </div>
              <h3 className="font-bold text-white">2. Confidential Compute</h3>
              <p className="text-xs text-gray-400 mt-2 max-w-[150px]">Decrypted and evaluated by AI strictly inside the TEE enclave.</p>
            </div>

            <ArrowRight className="w-8 h-8 text-gray-700 hidden md:block" />

            {/* Step 3: Flare Blockchain */}
            <div 
              className={`flex flex-col items-center text-center transition-all cursor-pointer ${activeStep === 3 ? 'scale-110 opacity-100' : 'scale-100 opacity-50'}`}
              onClick={() => setActiveStep(3)}
            >
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-4 border-2 ${activeStep === 3 ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-gray-800 border-gray-700'}`}>
                <Database className={`w-10 h-10 ${activeStep === 3 ? 'text-emerald-400' : 'text-gray-500'}`} />
              </div>
              <h3 className="font-bold text-white">3. Immutable Ledger</h3>
              <p className="text-xs text-gray-400 mt-2 max-w-[150px]">Only the decision & cryptographic proof are stored on Flare.</p>
            </div>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="bg-indigo-950 border border-indigo-900 rounded-xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 mr-2 text-indigo-400" />
            The Flare Advantage
          </h2>
          <p className="text-indigo-200/80 leading-relaxed text-lg">
            Without Flare Confidential Compute, node operators or cloud providers could view the sensitive inputs during evaluation. By executing the AI reasoning engine securely inside an enclave, and anchoring the mathematical proof of that execution to the Flare EVM, Confidra guarantees absolute data privacy while maintaining 100% decision auditability.
          </p>
        </div>
      </div>
    </div>
  );
}
