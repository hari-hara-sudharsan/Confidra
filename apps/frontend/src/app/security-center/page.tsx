'use client';
import { ShieldAlert, Key, LogIn, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SecurityCenter() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    setEvents([
      { id: 'sec_1', type: 'Failed Login', severity: 'high', user: 'admin@org.com', ip: '192.168.1.100', time: '10 mins ago' },
      { id: 'sec_2', type: 'API Key Created', severity: 'low', user: 'dev_user_1', ip: '10.0.0.5', time: '2 hours ago' },
      { id: 'sec_3', type: 'Role Changed', severity: 'medium', user: 'hr_manager', ip: '172.16.0.4', time: '5 hours ago' }
    ]);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center">
          <ShieldAlert className="w-8 h-8 mr-3 text-rose-500" />
          Security Operations Center (SOC)
        </h1>
        <p className="text-gray-400 mt-2">Monitor authentication activity, access logs, and threat indicators.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-gray-800 bg-gray-950 flex justify-between items-center">
            <h3 className="font-medium text-white flex items-center"><Activity className="w-4 h-4 mr-2 text-rose-400" /> Audit & Threat Feed</h3>
          </div>
          <ul className="divide-y divide-gray-800">
            {events.map((e) => (
              <li key={e.id} className="px-6 py-4 hover:bg-gray-800/50 transition-colors flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-4 ${
                    e.severity === 'high' ? 'bg-rose-500' : e.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-white">{e.type}</p>
                    <p className="text-xs text-gray-400 mt-1">{e.user} from {e.ip}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{e.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
           <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="font-medium text-white flex items-center mb-4"><LogIn className="w-4 h-4 mr-2 text-gray-400" /> Failed Logins (24h)</h3>
              <p className="text-4xl font-bold text-rose-500">12</p>
           </div>
           <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="font-medium text-white flex items-center mb-4"><Key className="w-4 h-4 mr-2 text-gray-400" /> Active API Keys</h3>
              <p className="text-4xl font-bold text-indigo-400">4</p>
           </div>
        </div>
      </div>
    </div>
  );
}
