'use client';

import { useAuth } from '../../providers/AuthProvider';
import { useConnect, useDisconnect, useAccount } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  const handleWalletConnect = () => {
    connect({ connector: injected() });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
          <Shield className="w-8 h-8 text-blue-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome to Confidra</h1>
        <p className="text-slate-400 text-center mb-8">
          Sign in to access confidential decision infrastructure.
        </p>

        {!isConnected ? (
          <button
            onClick={handleWalletConnect}
            className="w-full bg-white text-black font-semibold py-3 px-4 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="w-full space-y-4">
            <button
              onClick={login}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing...' : 'Sign-In with Ethereum'}
            </button>
            <button
              onClick={() => disconnect()}
              className="w-full bg-transparent border border-slate-700 text-slate-300 font-semibold py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-slate-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
