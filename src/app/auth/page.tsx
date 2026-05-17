'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Zap, Mail, Lock, User, ArrowRight, Code, Globe } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { setUser } = useAppStore();

  useEffect(() => {
    /* global google */
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: 'your_google_client_id_here.apps.googleusercontent.com', // Matches backend .env
        callback: handleGoogleCallback,
      });
    }
  }, []);

  const handleGoogleCallback = async (response: any) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      } else {
        setError(data.error || 'Google login failed');
      }
    } catch (err) {
      setError('Connection failed. Google authentication could not be completed.');
    } finally {
      setLoading(false);
    }
  };

  const triggerGoogleLogin = () => {
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.prompt(); // One Tap
    } else {
      setError('Google Sign-In is still loading. Please try again in a moment.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const body = isLogin ? { email, password } : { name, email, password };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--st-bg-dark)] relative overflow-hidden">
      {/* Ambient Background Blobs */}
      <div className="ambient-container">
        <div className="ambient-blob blob-1 opacity-30" />
        <div className="ambient-blob blob-2 opacity-30" />
        <div className="ambient-blob blob-3 opacity-30" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white border border-[var(--st-glass-border)] rounded-[40px] overflow-hidden shadow-xl">
          <div className="p-10 sm:p-14">
            <div className="flex flex-col items-center mb-12">
              <div className="w-16 h-16 rounded-[22px] bg-[var(--st-accent-brand)] flex items-center justify-center mb-8 shadow-xl shadow-[var(--st-accent-brand)]/20">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-[var(--st-text-primary)] tracking-tight">StepThrough</h1>
              <p className="text-[var(--st-text-muted)] text-[11px] font-bold uppercase tracking-[0.25em] mt-3 opacity-60">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-muted)] px-1 opacity-60">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--st-text-muted)] opacity-30" />
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[var(--st-bg-dark)] border border-[var(--st-glass-border)] rounded-[20px] py-4 pl-14 pr-4 text-sm text-[var(--st-text-primary)] font-medium focus:outline-none focus:border-[var(--st-accent-primary)] focus:bg-white transition-all placeholder:text-[var(--st-text-muted)]/40 shadow-inner"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-muted)] px-1 opacity-60">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--st-text-muted)] opacity-30" />
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[var(--st-bg-dark)] border border-[var(--st-glass-border)] rounded-[20px] py-4 pl-14 pr-4 text-sm text-[var(--st-text-primary)] font-medium focus:outline-none focus:border-[var(--st-accent-primary)] focus:bg-white transition-all placeholder:text-[var(--st-text-muted)]/40 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-muted)] opacity-60">Password</label>
                  {isLogin && <button type="button" className="text-[9px] font-bold text-[var(--st-accent-primary)] uppercase tracking-widest hover:text-[var(--st-text-primary)] transition-colors">Recovery</button>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--st-text-muted)] opacity-30" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[var(--st-bg-dark)] border border-[var(--st-glass-border)] rounded-[20px] py-4 pl-14 pr-4 text-sm text-[var(--st-text-primary)] font-medium focus:outline-none focus:border-[var(--st-accent-primary)] focus:bg-white transition-all placeholder:text-[var(--st-text-muted)]/40 shadow-inner"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs font-bold text-rose-400 text-center bg-rose-500/10 py-3 rounded-xl border border-rose-500/20 uppercase tracking-widest">
                  {error}
                </p>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-glass-primary py-5 flex items-center justify-center gap-3 group disabled:opacity-50 !rounded-[24px] shadow-lg shadow-[var(--st-accent-brand)]/10 text-[13px] font-bold uppercase tracking-[0.2em]"
              >
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Get Started')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </form>

            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[var(--st-glass-border)]"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--st-text-muted)] opacity-30">
                <span className="bg-white px-6">Trusted Access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={triggerGoogleLogin}
                className="flex items-center justify-center gap-3 py-4 rounded-[20px] border border-[var(--st-glass-border)] bg-white text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-primary)] hover:bg-[var(--st-bg-dark)] transition-all shadow-sm"
              >
                <Globe className="w-4 h-4 text-[var(--st-accent-brand)]" /> Google
              </button>
              <button className="flex items-center justify-center gap-3 py-4 rounded-[20px] border border-[var(--st-glass-border)] bg-white text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-primary)] hover:bg-[var(--st-bg-dark)] transition-all shadow-sm">
                <Code className="w-4 h-4 text-[var(--st-accent-primary)]" /> Github
              </button>
            </div>
          </div>

          <div className="p-10 bg-[var(--st-bg-dark)]/50 border-t border-[var(--st-glass-border)] text-center">
            <p className="text-[11px] text-[var(--st-text-muted)] font-bold tracking-tight opacity-60">
              {isLogin ? "New to the platform?" : "Already joined?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[var(--st-accent-primary)] font-bold hover:text-[var(--st-text-primary)] transition-colors ml-1"
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-[9px] text-center text-[var(--st-text-muted)] mt-12 font-bold uppercase tracking-[0.3em] opacity-30">
          Encrypted Authentication Environment
        </p>
      </motion.div>
    </div>
  );
}
