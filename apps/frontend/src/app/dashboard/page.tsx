'use client';

import { useAuth } from '../../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Building, Plus, Users, FolderPlus } from 'lucide-react';

export default function DashboardPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchOrgs = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch('http://localhost:3001/api/v1/organizations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrganizations(data);
          if (data.length === 0) {
            router.push('/onboarding');
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrgs();
  }, [isAuthenticated, router]);

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <Building className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Confidra Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">{user?.walletAddress.slice(0, 6)}...{user?.walletAddress.slice(-4)}</span>
            <button onClick={logout} className="text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors">
              Sign Out
            </button>
          </div>
        </header>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Organizations</h2>
          <button onClick={() => router.push('/onboarding')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> New Organization
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map(org => (
            <div key={org.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
              <h3 className="text-lg font-bold mb-2">{org.name}</h3>
              <p className="text-sm text-slate-400 mb-6">Role: Owner</p>
              
              <div className="flex gap-2">
                <button className="flex-1 flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 py-2 rounded-lg text-sm transition-colors">
                  <FolderPlus className="w-4 h-4" /> Workspaces
                </button>
                <button className="flex-1 flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 py-2 rounded-lg text-sm transition-colors">
                  <Users className="w-4 h-4" /> Members
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
