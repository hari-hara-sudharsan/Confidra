'use client';
import { Target, Activity, AlertTriangle } from 'lucide-react';

export default function AiQualityCenter() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
          <Target className="w-8 h-8 mr-3 text-emerald-500" />
          AI Quality Center
        </h1>
        <p className="text-gray-400 mt-2">Monitor model calibration, decision accuracy, and human-agreement rates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-gray-400">Decision Accuracy</p>
          <p className="text-3xl font-bold text-white mt-4">98.4%</p>
          <p className="text-xs text-emerald-400 mt-2">Based on human-reviewed sample</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-gray-400 flex items-center"><Activity className="w-4 h-4 mr-2 text-indigo-500" /> Human Agreement Rate</p>
          <p className="text-3xl font-bold text-white mt-4">96.2%</p>
          <p className="text-xs text-gray-400 mt-2">Reviewers matching AI recommendation</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-gray-400 flex items-center"><AlertTriangle className="w-4 h-4 mr-2 text-amber-500" /> False Positives</p>
          <p className="text-3xl font-bold text-white mt-4">1.2%</p>
          <p className="text-xs text-rose-400 mt-2">+0.1% increase this week</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg min-h-[400px] flex items-center justify-center">
         <p className="text-gray-500 italic">Confidence Calibration Scatter Plot (Chart integration pending)</p>
      </div>
    </div>
  );
}
