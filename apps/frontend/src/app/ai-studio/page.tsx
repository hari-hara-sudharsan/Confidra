'use client';
import { Sparkles, Save, Code } from 'lucide-react';
import { useState } from 'react';

export default function AiStudio() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState<any>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate API call to backend AiService
    setTimeout(() => {
      setOutput({
        workflowName: "Generated Evaluation Workflow",
        description: "Auto-generated policy rules based on natural language prompt.",
        stages: [
          { name: "Ingestion", type: "data_collection" },
          { name: "Evaluation", type: "ai_scoring", parameters: { threshold: 80 } },
          { name: "Approval", type: "human_review" }
        ],
        policies: {
          requireTechnicalCapability: true,
          enforceRegulatoryCompliance: true,
          minScore: 75
        }
      });
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
          <Sparkles className="w-8 h-8 mr-3 text-indigo-500" />
          AI Workflow Designer
        </h1>
        <p className="text-gray-400 mt-2">Design complex confidential workflows and policies using natural language.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
        <label className="block text-sm font-medium text-gray-300 mb-2">Describe your workflow</label>
        <textarea 
          className="w-full bg-gray-950 border border-gray-700 rounded-lg p-4 text-white focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
          placeholder="e.g. Evaluate startup applications by prioritizing technical capability, founder experience, and regulatory compliance..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button 
            onClick={handleGenerate}
            disabled={!prompt || generating}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            {generating ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Workflow
              </>
            )}
          </button>
        </div>
      </div>

      {output && (
        <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex justify-between items-center">
            <h3 className="text-sm font-medium text-white flex items-center"><Code className="w-4 h-4 mr-2 text-indigo-400" /> Generated Configuration</h3>
            <button className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-gray-300 flex items-center transition-colors">
              <Save className="w-3 h-3 mr-1" /> Save to Workspace
            </button>
          </div>
          <div className="p-4">
            <pre className="text-emerald-400 text-sm overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(output, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
