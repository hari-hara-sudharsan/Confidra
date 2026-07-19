'use client';
import { ShieldCheck, Network, Cpu, Lock, Activity, ArrowUpRight, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function JudgeDashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Executive Summary */}
      <div className="bg-gradient-to-br from-indigo-900 to-gray-900 rounded-2xl p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Flare Summer Signal Hackathon Finalist</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">Confidra Platform Overview</h1>
          <p className="text-lg text-indigo-100/80 max-w-2xl leading-relaxed">
            Confidra bridges the scale of Web2 SaaS with the cryptographic certainty of Web3. By leveraging Flare Confidential Compute, we've built the world's first auditable infrastructure for confidential AI decision-making.
          </p>
        </div>
      </div>

      {/* Judging Criteria Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
          <Network className="w-8 h-8 text-rose-500 mb-4" />
          <h3 className="font-bold text-white mb-2">Deep Flare Integration</h3>
          <p className="text-sm text-gray-400">Every AI decision is anchored to the Flare blockchain, producing immutable, verifiable Trust Certificates.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
          <Lock className="w-8 h-8 text-fuchsia-500 mb-4" />
          <h3 className="font-bold text-white mb-2">Confidential Compute</h3>
          <p className="text-sm text-gray-400">Inputs and reasoning remain fully encrypted in hardware TEEs; even node operators cannot see the data.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
          <Code2 className="w-8 h-8 text-emerald-500 mb-4" />
          <h3 className="font-bold text-white mb-2">Developer Ecosystem</h3>
          <p className="text-sm text-gray-400">A robust Plugin Framework, Marketplace, and REST API make Confidra an extensible infrastructure platform.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
          <Activity className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="font-bold text-white mb-2">Enterprise Ready</h3>
          <p className="text-sm text-gray-400">Complete with SOC monitoring, organizational hubs, and strict granular RBAC for production deployments.</p>
        </div>
      </div>

      {/* Architecture & Live Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Cpu className="w-6 h-6 mr-3 text-indigo-400" />
            System Architecture
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
              <span className="text-xs text-gray-500 uppercase font-semibold">Layer 1</span>
              <p className="font-medium text-gray-300 mt-1">Next.js + NestJS Enterprise SaaS Frontend/Backend</p>
            </div>
            <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/30">
              <span className="text-xs text-indigo-300 uppercase font-semibold">Layer 2</span>
              <p className="font-medium text-white mt-1">Flare Confidential Compute (TEE AI Enclave)</p>
            </div>
            <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
              <span className="text-xs text-gray-500 uppercase font-semibold">Layer 3</span>
              <p className="font-medium text-gray-300 mt-1">Flare EVM Blockchain (Trust Certificates)</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-6">Quick Navigation</h3>
          <div className="space-y-3 flex-grow">
            <Link href="/demo" className="flex items-center justify-between p-4 bg-gray-950 hover:bg-gray-800 border border-gray-800 rounded-lg transition-colors group">
              <span className="font-medium text-gray-300 group-hover:text-white">Run Interactive Demo</span>
              <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors" />
            </Link>
            <Link href="/showcase" className="flex items-center justify-between p-4 bg-gray-950 hover:bg-gray-800 border border-gray-800 rounded-lg transition-colors group">
              <span className="font-medium text-gray-300 group-hover:text-white">Why Flare? (Visual Explainer)</span>
              <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-rose-400 transition-colors" />
            </Link>
            <Link href="/trust-dashboard" className="flex items-center justify-between p-4 bg-gray-950 hover:bg-gray-800 border border-gray-800 rounded-lg transition-colors group">
              <span className="font-medium text-gray-300 group-hover:text-white">View Live Trust Certificates</span>
              <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
