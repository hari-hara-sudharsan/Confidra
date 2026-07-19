'use client';
import { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const navigate = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-xl overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-gray-800">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            placeholder="Search organizations, executions, settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="flex items-center space-x-1 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
            <Command className="w-3 h-3" /> <span>K</span>
          </div>
        </div>
        
        <div className="py-2 max-h-96 overflow-y-auto">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</div>
          <button onClick={() => navigate('/command-center')} className="w-full text-left px-4 py-2 hover:bg-indigo-600/20 text-gray-300 hover:text-indigo-400 transition-colors">
            Command Center
          </button>
          <button onClick={() => navigate('/analytics')} className="w-full text-left px-4 py-2 hover:bg-indigo-600/20 text-gray-300 hover:text-indigo-400 transition-colors">
            Enterprise Analytics
          </button>
          <button onClick={() => navigate('/security-center')} className="w-full text-left px-4 py-2 hover:bg-indigo-600/20 text-gray-300 hover:text-indigo-400 transition-colors">
            Security Operations
          </button>
          <button onClick={() => navigate('/admin')} className="w-full text-left px-4 py-2 hover:bg-indigo-600/20 text-gray-300 hover:text-indigo-400 transition-colors">
            Administration Console
          </button>
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ecosystem</div>
          <button onClick={() => navigate('/marketplace')} className="w-full text-left px-4 py-2 hover:bg-indigo-600/20 text-gray-300 hover:text-indigo-400 transition-colors">
            Workflow Marketplace
          </button>
          <button onClick={() => navigate('/plugins')} className="w-full text-left px-4 py-2 hover:bg-indigo-600/20 text-gray-300 hover:text-indigo-400 transition-colors">
            Enterprise Plugins
          </button>
          <button onClick={() => navigate('/hub')} className="w-full text-left px-4 py-2 hover:bg-indigo-600/20 text-gray-300 hover:text-indigo-400 transition-colors">
            Organization Hub
          </button>
          <div className="px-4 py-2 text-xs font-semibold text-rose-500 uppercase tracking-wider">Hackathon</div>
          <button onClick={() => navigate('/demo')} className="w-full text-left px-4 py-2 hover:bg-rose-600/20 text-gray-300 hover:text-rose-400 transition-colors font-bold">
            Interactive Demo
          </button>
          <button onClick={() => navigate('/judge')} className="w-full text-left px-4 py-2 hover:bg-rose-600/20 text-gray-300 hover:text-rose-400 transition-colors">
            Judge Dashboard
          </button>
          <button onClick={() => navigate('/showcase')} className="w-full text-left px-4 py-2 hover:bg-rose-600/20 text-gray-300 hover:text-rose-400 transition-colors">
            Why Flare? (Showcase)
          </button>
        </div>
      </div>
    </div>
  );
}
