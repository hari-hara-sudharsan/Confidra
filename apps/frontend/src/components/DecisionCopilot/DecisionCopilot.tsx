'use client';
import { Bot, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DecisionCopilot({ executionId }: { executionId?: string }) {
  const [loading, setLoading] = useState(true);
  const [explanation, setExplanation] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching explanation from backend
    const fetchExplanation = async () => {
      setLoading(true);
      setTimeout(() => {
        setExplanation({
          decisionSummary: "Approved based on exceeding the minimum scoring threshold.",
          confidenceScore: 92,
          riskFactors: ["Mild inconsistency in reported financial history (Flags: 1)"],
          policyCitations: ["Rule 4.2: Technical Capability Score > 80"],
          humanReadable: "The applicant demonstrated exceptional technical capability, scoring 92/100, easily clearing our internal benchmark of 80."
        });
        setLoading(false);
      }, 1500);
    };

    fetchExplanation();
  }, [executionId]);

  return (
    <div className="bg-gray-900 border border-indigo-900/50 rounded-xl overflow-hidden shadow-2xl">
      <div className="px-4 py-3 border-b border-gray-800 bg-gray-950 flex items-center">
        <Bot className="w-5 h-5 text-indigo-400 mr-2" />
        <h3 className="font-medium text-white">AI Decision Copilot</h3>
      </div>
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex items-center text-gray-400 space-x-2 animate-pulse">
             <div className="w-4 h-4 bg-indigo-500 rounded-full" />
             <span className="text-sm">Analyzing confidential TEE execution...</span>
          </div>
        ) : (
          <>
            <div>
              <p className="text-sm font-medium text-gray-300">Explanation</p>
              <p className="text-sm text-gray-400 mt-1">{explanation?.humanReadable}</p>
            </div>
            
            <div className="bg-gray-950 rounded-lg p-3 border border-gray-800">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Confidence Score</span>
                 <span className="text-emerald-400 font-bold">{explanation?.confidenceScore}%</span>
               </div>
               <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${explanation?.confidenceScore}%` }}></div>
               </div>
            </div>

            {explanation?.policyCitations?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-300 flex items-center"><FileText className="w-4 h-4 mr-1 text-gray-500" /> Policy Citations</p>
                <ul className="mt-1 space-y-1">
                  {explanation.policyCitations.map((cite: string, idx: number) => (
                    <li key={idx} className="text-xs text-indigo-300 bg-indigo-900/20 px-2 py-1 rounded inline-block mr-2">
                      {cite}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {explanation?.riskFactors?.length > 0 && (
              <div className="bg-rose-900/10 border border-rose-900/30 rounded-lg p-3">
                <p className="text-sm font-medium text-rose-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> Risk Factors Detected</p>
                <ul className="mt-1 list-disc list-inside">
                  {explanation.riskFactors.map((risk: string, idx: number) => (
                    <li key={idx} className="text-xs text-rose-300/80">{risk}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
