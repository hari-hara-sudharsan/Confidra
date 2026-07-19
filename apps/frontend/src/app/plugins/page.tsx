'use client';
import { Blocks, CheckCircle, Search, Plug } from 'lucide-react';
import { useState } from 'react';

const mockPlugins = [
  {
    id: 'plug_slack',
    name: 'Slack Notifications',
    description: 'Broadcast execution status updates to internal Slack channels.',
    publisher: 'Slack',
    installed: true
  },
  {
    id: 'plug_salesforce',
    name: 'Salesforce CRM Sync',
    description: 'Automatically ingest CRM data into the TEE for confidential scoring.',
    publisher: 'Confidra Official',
    installed: false
  },
  {
    id: 'plug_okta',
    name: 'Okta Identity Provider',
    description: 'Enterprise SSO and directory sync for Confidra administrators.',
    publisher: 'Okta Inc.',
    installed: false
  }
];

export default function PluginDirectory() {
  const [plugins, setPlugins] = useState(mockPlugins);

  const toggleInstall = (id: string) => {
    setPlugins(plugins.map(p => p.id === id ? { ...p, installed: !p.installed } : p));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
          <Blocks className="w-8 h-8 mr-3 text-fuchsia-500" />
          Enterprise Plugins & Connectors
        </h1>
        <p className="text-gray-400 mt-2">Extend Confidra by integrating external APIs, Identity Providers, and Cloud Storage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plugins.map((plugin) => (
          <div key={plugin.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col">
            <div className="flex items-center mb-4">
               <div className="p-3 bg-gray-800 rounded-lg mr-4">
                  <Plug className="w-6 h-6 text-fuchsia-400" />
               </div>
               <div>
                  <h3 className="font-bold text-white">{plugin.name}</h3>
                  <p className="text-xs text-gray-500">By {plugin.publisher}</p>
               </div>
            </div>
            
            <p className="text-sm text-gray-400 flex-grow mb-6">{plugin.description}</p>
            
            <div className="mt-auto">
              <button 
                onClick={() => toggleInstall(plugin.id)}
                className={`w-full py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center ${
                  plugin.installed 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                    : 'bg-fuchsia-600 text-white hover:bg-fuchsia-700'
                }`}
              >
                {plugin.installed ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2 text-emerald-400" /> Installed
                  </>
                ) : 'Install'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
