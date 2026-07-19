'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';

interface User {
  id: string;
  walletAddress: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    // Attempt to refresh or get current session here
    const token = localStorage.getItem('accessToken');
    if (token && address) {
      setUser({ id: 'pending', walletAddress: address });
    }
    setIsLoading(false);
  }, [address]);

  const login = async () => {
    try {
      setIsLoading(true);
      if (!address || !chainId) throw new Error('Wallet not connected');

      // 1. Get nonce
      const nonceRes = await fetch('http://localhost:3001/api/v1/auth/nonce');
      const { nonce } = await nonceRes.json();

      // 2. Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to Confidra.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });

      const messageStr = message.prepareMessage();

      // 3. Sign message
      const signature = await signMessageAsync({ message: messageStr });

      // 4. Verify on backend
      const verifyRes = await fetch('http://localhost:3001/api/v1/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageStr, signature }),
      });

      if (!verifyRes.ok) throw new Error('Verification failed');

      const { accessToken } = await verifyRes.json();
      localStorage.setItem('accessToken', accessToken);
      
      setUser({ id: 'resolved', walletAddress: address });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:3001/api/v1/auth/logout', { method: 'POST' });
      localStorage.removeItem('accessToken');
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
