'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Database, CheckCircle2, XCircle, ChevronRight, Lock } from 'lucide-react';

export default function VerificationPortal({ params }: { params: { id: string } }) {
  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching and verifying the certificate from the public API
    setTimeout(() => {
      setCert({
        id: params.id,
        version: '1.0',
        workflowId: 'wf_9876',
        executionId: 'exec_012345',
        organizationId: 'org_1',
        policyVersion: 'v1.0.0',
        decisionHash: '0xabc123...',
        executionHash: '0xdef456...',
        blockchainTxHash: '0x789txhash...',
        blockNumber: 1543902,
        timestamp: Date.now(),
        signer: '0xTeeEnclaveKey...',
        verificationStatus: 'Verified',
        integrityHash: 'a5b4c3d2e1...',
        platformSignature: 'f9e8d7c6b5...',
      });
      setLoading(false);
    }, 1500);
  }, [params.id]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white p-6 text-center">
      <div>
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Verification Failed</h1>
        <p className="text-gray-400">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <ShieldCheck className="w-20 h-20 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold tracking-tight">Trust Certificate</h1>
          <p className="text-emerald-400 mt-2 text-lg font-medium">Mathematically Verified & Cryptographically Signed</p>
          <p className="text-gray-400 mt-1">Certificate ID: {cert?.id}</p>
        </div>

        <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-800 bg-gray-800/50">
            <h3 className="text-lg leading-6 font-medium text-white flex items-center">
              <Lock className="w-5 h-5 mr-2 text-indigo-400" />
              Cryptographic Signatures
            </h3>
          </div>
          <div className="px-6 py-5">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-400">Integrity Hash (SHA-256)</dt>
                <dd className="mt-1 text-sm text-gray-200 font-mono truncate">{cert?.integrityHash}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-400">Platform Signature (HMAC)</dt>
                <dd className="mt-1 text-sm text-gray-200 font-mono truncate">{cert?.platformSignature}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-400">TEE Enclave Signer</dt>
                <dd className="mt-1 text-sm text-emerald-400 font-mono truncate">{cert?.signer}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-400">Flare TX Hash</dt>
                <dd className="mt-1 text-sm text-emerald-400 font-mono truncate">{cert?.blockchainTxHash}</dd>
              </div>
            </dl>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12 text-center text-gray-200">Decision Lineage</h2>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-between">
            <div className="bg-gray-950 px-4 flex flex-col items-center">
              <span className="h-10 w-10 rounded-full bg-indigo-900/50 flex items-center justify-center border-2 border-indigo-500">
                <Lock className="h-5 w-5 text-indigo-400" />
              </span>
              <span className="mt-2 text-xs text-gray-400 font-medium">Encrypted Payload</span>
            </div>
            <div className="bg-gray-950 px-4 flex flex-col items-center">
              <span className="h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center border-2 border-blue-500">
                <Cpu className="h-5 w-5 text-blue-400" />
              </span>
              <span className="mt-2 text-xs text-gray-400 font-medium">TEE Execution</span>
            </div>
            <div className="bg-gray-950 px-4 flex flex-col items-center">
              <span className="h-10 w-10 rounded-full bg-emerald-900/50 flex items-center justify-center border-2 border-emerald-500">
                <Database className="h-5 w-5 text-emerald-400" />
              </span>
              <span className="mt-2 text-xs text-gray-400 font-medium">Flare Anchored</span>
            </div>
            <div className="bg-gray-950 px-4 flex flex-col items-center">
              <span className="h-10 w-10 rounded-full bg-amber-900/50 flex items-center justify-center border-2 border-amber-500">
                <CheckCircle2 className="h-5 w-5 text-amber-400" />
              </span>
              <span className="mt-2 text-xs text-gray-400 font-medium">Certificate Issued</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-flex items-center">
            Download JSON Certificate Bundle
          </button>
        </div>
      </div>
    </div>
  );
}
