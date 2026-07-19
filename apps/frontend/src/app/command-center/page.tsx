'use client';
import { Activity, ShieldCheck, Zap, Database, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CommandCenter() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching from observability API
    const fetchMetrics = () => {
      setMetrics({
        apiLatency: Math.floor(Math.random() * 50) + 10,
        teeExecutionTime: Math.floor(Math.random() * 200) + 300,
        blockchainConfirmationTime: Math.floor(Math.random() * 500) + 1500,
        certificateGenerationTime: Math.floor(Math.random() * 10) + 5,
        systemThroughput: Math.floor(Math.random() * 100) + 50,
        errorRate: (Math.random() * 0.5).toFixed(2),
        activeEnclaves: 3,
        queuedJobs: Math.floor(Math.random() * 5)
      });
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
          <Globe className="w-8 h-8 mr-3 text-indigo-500" />
          Executive Command Center
        </h1>
        <p className="text-gray-400 mt-2">Real-time holistic overview of Confidra Enterprise Operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">System Throughput</p>
              <p className="text-3xl font-bold text-white mt-2">{metrics?.systemThroughput || '-'} req/s</p>
            </div>
            <Activity className="w-6 h-6 text-indigo-500" />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">TEE Avg Latency</p>
              <p className="text-3xl font-bold text-white mt-2">{metrics?.teeExecutionTime || '-'} ms</p>
            </div>
            <Zap className="w-6 h-6 text-emerald-500" />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">Flare Anchor Time</p>
              <p className="text-3xl font-bold text-white mt-2">{((metrics?.blockchainConfirmationTime || 0) / 1000).toFixed(2)} s</p>
            </div>
            <Database className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-400">Active Enclaves</p>
              <p className="text-3xl font-bold text-white mt-2">{metrics?.activeEnclaves || '-'}</p>
            </div>
            <ShieldCheck className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg min-h-[300px] flex items-center justify-center">
           <p className="text-gray-500 italic">Live Execution Throughput Chart (Simulated Data)</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg min-h-[300px] flex items-center justify-center">
           <p className="text-gray-500 italic">Global Enclave Health Map (Simulated Data)</p>
        </div>
      </div>
    </div>
  );
}
