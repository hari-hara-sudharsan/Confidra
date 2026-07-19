'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{workflows: any[], executions: any[]}>({ workflows: [], executions: [] });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults({ workflows: [], executions: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/v1/search?q=${query}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search workflows, executions, tx hash (Cmd+K)" 
          className="w-full bg-slate-900 border border-slate-800 text-sm rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-all"
        />
        {loading && <Loader2 className="absolute right-3 w-4 h-4 text-blue-500 animate-spin" />}
      </div>

      {isOpen && (query.length >= 2) && (
        <div className="absolute top-12 left-0 w-full bg-slate-900 border border-slate-800 shadow-2xl rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          {results.workflows.length === 0 && results.executions.length === 0 && !loading && (
            <div className="p-4 text-sm text-slate-500 text-center">No results found for "{query}"</div>
          )}

          {results.workflows.length > 0 && (
            <div>
              <div className="bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Workflows</div>
              <ul className="divide-y divide-slate-800">
                {results.workflows.map(wf => (
                  <li key={wf.id} className="p-4 hover:bg-slate-800/50 cursor-pointer transition-colors flex items-center gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{wf.name}</p>
                      <p className="text-xs text-slate-500">{wf.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.executions.length > 0 && (
            <div>
              <div className="bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Executions</div>
              <ul className="divide-y divide-slate-800">
                {results.executions.map(ex => (
                  <li key={ex.id} className="p-4 hover:bg-slate-800/50 cursor-pointer transition-colors">
                    <p className="text-sm font-semibold text-white">Execution #{ex.id.substring(0,8)}</p>
                    <p className="text-xs font-mono text-slate-500 truncate">{ex.executionHash}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
