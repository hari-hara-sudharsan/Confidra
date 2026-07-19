'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Workflow, Activity, ShieldCheck, Settings, HeartPulse, Search, Database, ArrowRightLeft, Cpu, Sparkles } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Workflows', href: '/workflows', icon: Workflow },
    { name: 'Executions', href: '/executions', icon: Activity },
    { name: 'Audit Center', href: '/audit', icon: ShieldCheck },
    { name: 'Flare Explorer', href: '/explorer', icon: Database },
    { name: 'Transactions', href: '/transactions', icon: ArrowRightLeft },
    { name: 'Network Health', href: '/network', icon: HeartPulse },
    { name: 'Why Flare?', href: '/showcase', icon: Cpu },
    { name: 'Architecture', href: '/architecture', icon: Cpu },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Demo Control', href: '/demo', icon: Sparkles },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen fixed top-0 left-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-500" />
          Confidra
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900 rounded-lg p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Network</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-sm font-mono text-slate-300">Flare Testnet</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
