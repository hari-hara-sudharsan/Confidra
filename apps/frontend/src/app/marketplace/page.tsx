'use client';
import { ShoppingBag, Star, Download, Search, FileText } from 'lucide-react';
import { useState } from 'react';

const mockTemplates = [
  {
    id: 'wf_scholarship',
    name: 'University Scholarship Evaluator',
    type: 'workflow',
    description: 'Complete confidential workflow for evaluating student financial and academic records without exposing PII.',
    author: 'EduTech Inc.',
    downloads: 1250,
    verified: true
  },
  {
    id: 'pol_kyc',
    name: 'Strict KYC / AML Policy',
    type: 'policy',
    description: 'Pre-configured risk thresholds for evaluating identity verification documents.',
    author: 'Confidra Core',
    downloads: 8400,
    verified: true
  },
  {
    id: 'wf_procurement',
    name: 'Enterprise Procurement Review',
    type: 'workflow',
    description: 'Evaluate vendor bids anonymously to prevent bias and comply with corporate governance.',
    author: 'Enterprise Solutions',
    downloads: 412,
    verified: false
  }
];

export default function Marketplace() {
  const [filter, setFilter] = useState('all');

  const filteredTemplates = filter === 'all' 
    ? mockTemplates 
    : mockTemplates.filter(t => t.type === filter);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
            <ShoppingBag className="w-8 h-8 mr-3 text-indigo-500" />
            Confidra Marketplace
          </h1>
          <p className="text-gray-400 mt-2">Discover and import confidential workflows and AI policies.</p>
        </div>
        <div className="flex bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
           <button onClick={() => setFilter('all')} className={`px-4 py-2 text-sm font-medium ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>All</button>
           <button onClick={() => setFilter('workflow')} className={`px-4 py-2 text-sm font-medium border-l border-gray-700 ${filter === 'workflow' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Workflows</button>
           <button onClick={() => setFilter('policy')} className={`px-4 py-2 text-sm font-medium border-l border-gray-700 ${filter === 'policy' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Policies</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-gray-900 border border-gray-800 hover:border-indigo-500/50 transition-colors rounded-xl p-6 shadow-lg flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${template.type === 'workflow' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {template.type === 'workflow' ? <FileText className="w-6 h-6" /> : <Star className="w-6 h-6" />}
              </div>
              {template.verified && (
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                  Verified
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">{template.name}</h3>
            <p className="text-sm text-gray-400 flex-grow mb-4">{template.description}</p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
              <span className="text-xs text-gray-500">By {template.author}</span>
              <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center transition-colors">
                <Download className="w-4 h-4 mr-1" /> Import
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
