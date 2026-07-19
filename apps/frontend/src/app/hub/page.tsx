'use client';
import { Building2, Share2, Users, FileText, CheckCircle } from 'lucide-react';

export default function OrganizationHub() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header Profile */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-700 shadow-inner">
               <Building2 className="w-10 h-10 text-indigo-400" />
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
                Acme Corporation 
                <CheckCircle className="w-5 h-5 ml-2 text-blue-500" />
              </h1>
              <p className="text-gray-400 mt-1">Verified Confidra Ecosystem Partner since 2024</p>
              
              <div className="flex items-center space-x-4 mt-4">
                 <div className="flex items-center text-sm text-gray-400"><Users className="w-4 h-4 mr-1" /> 24 Members</div>
                 <div className="flex items-center text-sm text-gray-400"><Share2 className="w-4 h-4 mr-1" /> 3 Published Workflows</div>
              </div>
            </div>
          </div>
          
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-700">
            Edit Profile
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mt-8 mb-4">Published Assets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-3">
             <div className="p-2 bg-indigo-500/10 rounded-lg mr-3">
               <FileText className="w-5 h-5 text-indigo-400" />
             </div>
             <h3 className="font-bold text-white">Acme Vendor Evaluator</h3>
          </div>
          <p className="text-sm text-gray-400">Our standard procurement workflow, open-sourced for the community.</p>
          <div className="mt-4 flex items-center text-xs text-gray-500">
             <span>412 Downloads</span>
             <span className="mx-2">•</span>
             <span>Updated 2 days ago</span>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg border-dashed flex flex-col items-center justify-center text-center">
           <Share2 className="w-8 h-8 text-gray-600 mb-3" />
           <h3 className="font-medium text-gray-300">Publish New Asset</h3>
           <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Share a workflow or policy with the Confidra community.</p>
        </div>
      </div>
    </div>
  );
}
