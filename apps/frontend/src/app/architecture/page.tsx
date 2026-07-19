'use client';

import { Cpu, Globe, Database, ArrowDown, Lock, CheckCircle } from 'lucide-react';

export default function ArchitectureVisualizer() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in pb-24">
      <header className="border-b border-slate-800 pb-6 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-3">
          <Cpu className="w-8 h-8 text-blue-500" />
          Architecture Visualizer
        </h1>
        <p className="text-slate-400 mt-2">The end-to-end flow of a Confidra Confidential Execution.</p>
      </header>

      <div className="flex flex-col items-center mt-12 space-y-4">
        
        {/* User / Frontend */}
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/30">
            <Globe className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">1. Client Interface (Next.js)</h3>
            <p className="text-slate-400 text-sm mt-1">User submits sensitive workflow data. Data is AES-256 encrypted in the browser.</p>
          </div>
        </div>

        <ArrowDown className="w-8 h-8 text-slate-600 animate-bounce" />

        {/* Backend API */}
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-6">
          <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/30">
            <Database className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">2. API Gateway (NestJS)</h3>
            <p className="text-slate-400 text-sm mt-1">Routes encrypted payloads, authenticates via JWT, and stores encrypted workflow metadata in PostgreSQL.</p>
          </div>
        </div>

        <ArrowDown className="w-8 h-8 text-slate-600 animate-bounce" />

        {/* TEE Enclave */}
        <div className="w-full max-w-2xl bg-slate-950 border-2 border-green-500/30 p-6 rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.15)] flex items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/50">
            <Lock className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              3. Flare Confidential Compute (TEE)
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-mono">Secure Enclave</span>
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              FastAPI Python worker decrypts the data in memory. Evaluates payload against the 14-Agent AI DAG. Outputs a boolean decision and generates an ECDSA signature over the result hash.
            </p>
          </div>
        </div>

        <ArrowDown className="w-8 h-8 text-slate-600 animate-bounce" />

        {/* Blockchain */}
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-6">
          <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/30">
            <CheckCircle className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">4. On-Chain Verification (Flare Network)</h3>
            <p className="text-slate-400 text-sm mt-1">
              Backend submits the TEE ECDSA signature to `ConfidentialExecutionRegistry.sol`. Smart contracts verify the signature against the trusted TEE public key and emit an `ExecutionAnchored` event.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
