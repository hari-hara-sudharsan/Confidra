'use client';

import Link from 'next/link';
import { ShieldCheck, BrainCircuit, Database, ArrowRight, Lock, CheckCircle2, Globe, Cpu } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold tracking-tight">Confidra</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign In</Link>
            <Link href="/dashboard" className="bg-white text-slate-950 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Powered by Flare Confidential Compute
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Confidential Decision <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Infrastructure
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Execute complex AI workflows on sensitive enterprise data. Guaranteed privacy inside hardware enclaves, with cryptographic proof anchored to the Flare blockchain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
              Start Building <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/demo" className="w-full sm:w-auto bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-2">
              View Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Intelligence</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">The only platform bridging Web2 SaaS scalability with Web3 cryptographic trust.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Absolute Privacy</h3>
              <p className="text-slate-400 leading-relaxed">Data is decrypted only inside the Flare hardware TEE. Neither we, nor the AI models, can extract your payload.</p>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-purple-500/50 transition-colors">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">14-Agent AI Pipeline</h3>
              <p className="text-slate-400 leading-relaxed">Sophisticated DAG architecture routes decisions through compliance, fraud, and risk agents autonomously.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-green-500/50 transition-colors">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">On-Chain Attestations</h3>
              <p className="text-slate-400 leading-relaxed">Every decision generates an ECDSA signature anchored to the Flare Testnet for immutable public verifiability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Showcase */}
      <section id="architecture" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-bold leading-tight">Secure from end to end.</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1"><CheckCircle2 className="w-6 h-6 text-blue-500" /></div>
                  <div>
                    <h4 className="font-bold text-lg">1. Client-side Encryption</h4>
                    <p className="text-slate-400">Payloads are encrypted in the browser before ever touching our API gateway.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1"><CheckCircle2 className="w-6 h-6 text-blue-500" /></div>
                  <div>
                    <h4 className="font-bold text-lg">2. TEE Enclave Processing</h4>
                    <p className="text-slate-400">Memory-isolated Python worker executes the multi-agent AI pipeline.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1"><CheckCircle2 className="w-6 h-6 text-blue-500" /></div>
                  <div>
                    <h4 className="font-bold text-lg">3. Cryptographic Anchoring</h4>
                    <p className="text-slate-400">The enclave signs the result hash and anchors it via Hardhat to the Flare blockchain.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
                  <Globe className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-bold">Next.js Executive App</p>
                    <p className="text-xs text-slate-500">React Server Components</p>
                  </div>
                </div>
                <div className="flex justify-center"><ArrowRight className="w-6 h-6 text-slate-600 rotate-90" /></div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
                  <Database className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="font-bold">NestJS API Gateway</p>
                    <p className="text-xs text-slate-500">Prisma + PostgreSQL</p>
                  </div>
                </div>
                <div className="flex justify-center"><ArrowRight className="w-6 h-6 text-slate-600 rotate-90" /></div>
                <div className="bg-slate-950 border border-blue-500/30 rounded-xl p-4 flex items-center gap-4 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <Cpu className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="font-bold">Flare Confidential Compute TEE</p>
                    <p className="text-xs text-green-500 font-mono">14-Agent DAG Enclave</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
            <span className="font-bold tracking-tight">Confidra</span>
          </div>
          <p className="text-sm text-slate-500">Built for the Flare Summer Signal Hackathon 2026.</p>
        </div>
      </footer>
    </div>
  );
}
