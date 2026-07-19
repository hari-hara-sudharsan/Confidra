'use client';
import { PlayCircle, GraduationCap, Building2, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const scenarios = [
  {
    id: 'scholarship',
    title: 'University Scholarship Review',
    icon: GraduationCap,
    description: 'Evaluate student financial and academic records confidentially.',
    steps: ['Encrypt PII locally', 'AI Evaluation in TEE', 'Anchor decision to Flare', 'Issue Trust Certificate']
  },
  {
    id: 'procurement',
    title: 'Enterprise Vendor Selection',
    icon: Building2,
    description: 'Score vendor bids blindly to prevent bias and ensure compliance.',
    steps: ['Mask Vendor Identity', 'Score Technical Merits', 'Verify Compliance', 'Generate Audit Trail']
  },
  {
    id: 'hiring',
    title: 'Executive Hiring',
    icon: Briefcase,
    description: 'Process background checks and executive scoring securely.',
    steps: ['Encrypt Resume', 'AI Risk Assessment', 'Human-in-the-loop Review', 'Final TEE Verification']
  }
];

export default function DemoControlCenter() {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);

  const runSimulation = (id: string) => {
    setActiveSimulation(id);
    setTimeout(() => {
      // Simulate pushing to an execution view
      window.location.href = '/executions/demo-123';
    }, 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
          Demo Control Center
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Experience how Confidra transforms sensitive decision-making. Select a curated scenario below to simulate an end-to-end confidential execution powered by the Flare Network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <div key={scenario.id} className="bg-gray-900 border border-gray-800 hover:border-indigo-500 transition-colors rounded-2xl p-6 shadow-xl flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="w-24 h-24 text-indigo-500" />
              </div>
              
              <div className="relative z-10">
                <div className="bg-indigo-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{scenario.title}</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">{scenario.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {scenario.steps.map((step, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-500 font-medium">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500/70" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto relative z-10">
                <button 
                  onClick={() => runSimulation(scenario.id)}
                  disabled={activeSimulation !== null}
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all ${
                    activeSimulation === scenario.id 
                      ? 'bg-indigo-600 text-white animate-pulse' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {activeSimulation === scenario.id ? (
                    'Initializing TEE Enclave...'
                  ) : (
                    <>Run Scenario <ChevronRight className="w-4 h-4 ml-1" /></>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
