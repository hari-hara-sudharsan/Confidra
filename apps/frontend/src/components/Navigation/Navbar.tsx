'use client';

import GlobalSearch from '../Search/GlobalSearch';
import { Bell, UserCircle } from 'lucide-react';
import { useAuth } from '../../../providers/AuthProvider';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 w-full ml-0">
      <div className="flex-1 max-w-2xl">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-white relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-slate-950"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user?.email || 'Admin'}</p>
            <p className="text-xs text-slate-500">{user?.role || 'Global Admin'}</p>
          </div>
          <UserCircle className="w-8 h-8 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
