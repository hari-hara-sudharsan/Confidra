'use client';

import { ShieldCheck, Cpu, DatabaseZap, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WhyFlareShowcase() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-16 animate-in fade-in pb-24">
      
      <header className="text-center max-w-3xl mx-auto mt-12">
        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-6">
          Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">Flare?</span>
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          Confidra relies on the Flare Network to solve the fundamental problem of AI: <strong className="text-white">Trust</strong>. We bridge the gap between confidential Web2 data and verifiable Web3 cryptographic proofs.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden group hover:border-pink-500/30 transition-colors">
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all"></div>
          <Cpu className="w-12 h-12 text-pink-500 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">The AI Black Box Problem</h2>
          <p className="text-slate-400 leading-relaxed">
            Traditional AI workflows are executed on centralized servers. Enterprises cannot guarantee that sensitive user data (PII, Financials, Medical Records) isn't being logged, leaked, or used for model training. Furthermore, users cannot verify that the AI evaluated them fairly based on the agreed-upon policy.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden group hover:border-orange-500/30 transition-colors">
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
          <ShieldCheck className="w-12 h-12 text-orange-500 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">The Flare Solution</h2>
          <p className="text-slate-400 leading-relaxed">
            Flare Confidential Compute provides hardware-isolated Trusted Execution Environments (TEEs). Data is decrypted exclusively inside the enclave. Once the AI generates a decision, the TEE creates an ECDSA signature over the result hash. This signature is anchored to the Flare blockchain, providing absolute, public cryptographic proof of fair execution without ever revealing the private data.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-12 text-center shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-12">The Confidra Trust Pipeline</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex flex-col items-center max-w-[200px]">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/30">
              <Lock className="w-6 h-6 text-blue-500" />
            </div>
            <h4 className="font-bold text-white mb-2">1. Encrypt</h4>
            <p className="text-xs text-slate-400">Client-side encryption ensures the API never sees raw data.</p>
          </div>
          
          <ArrowRight className="hidden md:block w-6 h-6 text-slate-600" />
          
          <div className="flex flex-col items-center max-w-[200px]">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 border border-purple-500/30">
              <Cpu className="w-6 h-6 text-purple-500" />
            </div>
            <h4 className="font-bold text-white mb-2">2. Execute</h4>
            <p className="text-xs text-slate-400">Flare TEE decrypts data in memory and runs the AI Agent DAG.</p>
          </div>

          <ArrowRight className="hidden md:block w-6 h-6 text-slate-600" />

          <div className="flex flex-col items-center max-w-[200px]">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
              <DatabaseZap className="w-6 h-6 text-green-500" />
            </div>
            <h4 className="font-bold text-white mb-2">3. Attest</h4>
            <p className="text-xs text-slate-400">TEE signs the result. Smart contracts verify and anchor the signature.</p>
          </div>
        </div>

        <div className="mt-16">
          <Link href="/architecture" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors">
            View Interactive Architecture <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
