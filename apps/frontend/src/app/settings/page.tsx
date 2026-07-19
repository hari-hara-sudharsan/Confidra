'use client';

import { Settings, Lock, Bell, Users, Webhook, Key } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Organization');

  const tabs = [
    { name: 'Organization', icon: Users },
    { name: 'Security', icon: Lock },
    { name: 'API Keys', icon: Key },
    { name: 'Webhooks', icon: Webhook },
    { name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in h-full">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-500" />
          Settings
        </h1>
        <p className="text-slate-400 mt-1">Manage your organization and security preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.name}
              </button>
            )
          })}
        </div>

        <div className="md:col-span-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">{activeTab} Settings</h2>
            
            {activeTab === 'Organization' && (
              <div className="space-y-6 max-w-lg">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Organization Name</label>
                  <input type="text" defaultValue="Confidra Demo Org" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Support Email</label>
                  <input type="email" defaultValue="admin@confidra.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'API Keys' && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-white">Production API Key</h3>
                    <p className="text-sm text-slate-500 mt-1">Created 2 months ago</p>
                  </div>
                  <button className="text-sm text-blue-500 hover:text-blue-400 font-semibold border border-blue-500/30 px-4 py-2 rounded-lg">Revoke</button>
                </div>
                <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
                  + Generate New API Key
                </button>
              </div>
            )}
            
            {activeTab !== 'Organization' && activeTab !== 'API Keys' && (
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-xl">
                <p className="text-slate-500">{activeTab} configuration coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
