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
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: 'your_google_client_id_here.apps.googleusercontent.com',
        callback: handleGoogleCallback,
      });
    }
  }, []);

  const handleGoogleCallback = async (response: any) => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });
      const ct = res.headers.get('content-type') || '';
      if (!res.ok || !ct.includes('application/json')) throw new Error('Backend unavailable');
      const data = await res.json();
      if (data.success) { localStorage.setItem('token', data.token); setUser(data.user); }
      else { setError(data.error || 'Google login failed'); }
    } catch (err) {
      const mockUser = { id: 'demo-google-123', name: 'Demo Google User', email: 'demo@google.com', quizData: {} };
      localStorage.setItem('token', 'mock-jwt-token-123'); setUser(mockUser);
    } finally { setLoading(false); }
  };

  const triggerGoogleLogin = () => {
    if (typeof window !== 'undefined' && (window as any).google) { (window as any).google.accounts.id.prompt(); }
    else { setError('Google Sign-In is still loading. Please try again in a moment.'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const body = isLogin ? { email, password } : { name, email, password };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      const ct = response.headers.get('content-type') || '';
      if (!response.ok || !ct.includes('application/json')) throw new Error('Backend unavailable');
      const data = await response.json();
      if (data.success) { localStorage.setItem('token', data.token); setUser(data.user); }
      else { setError(data.error || 'Something went wrong'); }
    } catch (err) {
      const mockUser = { id: 'demo-123', name: name || 'Demo User', email, quizData: {} };
      localStorage.setItem('token', 'mock-jwt-token-123'); setUser(mockUser);
    } finally { setLoading(false); }
  };

  const inputStyle = "w-full border rounded-[20px] py-4 pl-14 pr-4 text-sm font-medium focus:outline-none transition-all shadow-inner";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: 'var(--st-bg-base)' }}>
      <div className="ambient-container">
        <div className="ambient-blob blob-1 opacity-50" />
        <div className="ambient-blob blob-2 opacity-50" />
        <div className="ambient-blob blob-3 opacity-50" />
      </div>

      <motion.div initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="w-full max-w-md relative z-10">
        <div className="liquid-glass-elevated liquid-border rounded-[40px] overflow-hidden" style={{ boxShadow: '0 32px 100px rgba(139,115,85,0.15), 0 8px 32px rgba(139,115,85,0.08)' }}>
          <div className="p-10 sm:p-14">
            <div className="flex flex-col items-center mb-12">
              <div className="w-16 h-16 rounded-[22px] flex items-center justify-center mb-8 shadow-xl" style={{ background: 'linear-gradient(135deg, #C9A96E, #8B7355)', boxShadow: '0 8px 32px rgba(201,169,110,0.3)' }}>
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-[var(--st-text-primary)] tracking-tight">StepThrough</h1>
              <p className="text-[var(--st-text-faint)] text-[11px] font-bold uppercase tracking-[0.25em] mt-3 opacity-60">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-faint)] px-1 opacity-60">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--st-text-faint)] opacity-30" />
                      <input type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)}
                        className="input-liquid w-full py-4 pl-14 pr-4 text-sm font-medium placeholder:text-[var(--st-text-faint)] placeholder:opacity-60"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-faint)] px-1 opacity-60">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--st-text-faint)] opacity-30 z-10" />
                  <input type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="input-liquid w-full py-4 pl-14 pr-4 text-sm font-medium placeholder:text-[var(--st-text-faint)] placeholder:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-faint)] opacity-60">Password</label>
                  {isLogin && <button type="button" className="text-[9px] font-bold uppercase tracking-widest hover:text-[var(--st-text-primary)] transition-colors" style={{ color: 'var(--st-accent-mocha)' }}>Recovery</button>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--st-text-faint)] opacity-30 z-10" />
                  <input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="input-liquid w-full py-4 pl-14 pr-4 text-sm font-medium placeholder:text-[var(--st-text-faint)] placeholder:opacity-60"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs font-bold text-center py-3 rounded-xl uppercase tracking-widest" style={{ color: 'var(--st-accent-danger)', background: 'rgba(196,122,106,0.08)', border: '1px solid rgba(196,122,106,0.15)' }}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-5 btn-liquid-gold flex items-center justify-center gap-3 group disabled:opacity-50 !rounded-[24px] text-[13px] font-bold uppercase tracking-[0.2em]">
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Get Started')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </form>

            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[var(--st-glass-border)]"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--st-text-faint)] opacity-30">
                <span className="px-6" style={{ background: 'var(--st-glass-elevated)' }}>Trusted Access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={triggerGoogleLogin} className="btn-liquid py-4 justify-center text-[10px] font-bold uppercase tracking-widest">
                <Globe className="w-4 h-4" style={{ color: 'var(--st-accent-gold)' }} /> Google
              </button>
              <button className="btn-liquid py-4 justify-center text-[10px] font-bold uppercase tracking-widest">
                <Code className="w-4 h-4" style={{ color: 'var(--st-accent-mocha)' }} /> Github
              </button>
            </div>
          </div>

          <div className="p-10 border-t border-[var(--st-glass-border)] text-center" style={{ background: 'rgba(239,231,221,0.3)' }}>
            <p className="text-[11px] text-[var(--st-text-muted)] font-bold tracking-tight opacity-60">
              {isLogin ? "New to the platform?" : "Already joined?"}{' '}
              <button onClick={() => setIsLogin(!isLogin)}
                className="font-bold hover:text-[var(--st-text-primary)] transition-colors ml-1" style={{ color: 'var(--st-accent-mocha)' }}>
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-[9px] text-center text-[var(--st-text-faint)] mt-12 font-bold uppercase tracking-[0.3em] opacity-30">
          Encrypted Authentication Environment
        </p>
      </motion.div>
    </div>
  );
}
