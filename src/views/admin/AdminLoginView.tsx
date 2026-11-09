import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, Loader2, AlertCircle, KeyRound, Globe } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useLanguage } from '../../context/LanguageContext';
import { PageRoute } from '../../types/navigation';

interface AdminLoginViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onNavigate }) => {
  const { login } = useAdmin();
  const { adminLanguage, toggleAdminLanguage, adminIsBn: isBn } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError(isBn ? 'অনুগ্রহ করে অনুমোদিত ইমেইল প্রবেশ করান।' : 'Please enter your authorized admin email.');
      return;
    }
    if (!password) {
      setError(isBn ? 'অনুগ্রহ করে পাসওয়ার্ড প্রবেশ করান।' : 'Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(cleanEmail, password);
      if (!res.success) {
        setError(res.error || (isBn ? 'ভুল ক্রেডেনশিয়াল। অ্যাক্সেস অস্বীকৃত।' : 'Invalid credentials. Access denied.'));
      }
    } catch (err: any) {
      setError(err.message || (isBn ? 'লগইন প্রক্রিয়া ব্যর্থ হয়েছে।' : 'Authentication failed. Please check credentials.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Bar with Language Toggle & Return Link */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-800/80 bg-[#0A1222]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md">
            MT
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide text-white">MetalTech BD</span>
            <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 font-mono border border-blue-800/60 uppercase">
              Admin Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleAdminLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 transition-all cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{adminLanguage === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* Return to Public Website */}
          <button
            onClick={() => onNavigate({ view: 'home' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'ওয়েবসাইটে ফিরুন' : 'Public Site'}</span>
          </button>
        </div>
      </header>

      {/* Main Authentication Centerpiece */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0D1629] border border-cyan-500/30 rounded-xl p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
          {/* Top Gradient Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-amber-500" />

          {/* Header Icon & Title */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
              <KeyRound className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {isBn ? 'অ্যাডমিনিস্ট্রেটর লগইন' : 'Enterprise Admin Login'}
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              {isBn 
                ? 'ওয়েবসাইট ম্যানেজমেন্ট ও সুপাবেস ডাটাবেজ সুরক্ষার জন্য প্রমাণীকরণ প্রয়োজন।'
                : 'Secure Supabase Auth verification required to manage casting catalog, leads, and metallurgy matrix.'}
            </p>
          </div>

          {/* Security Alert / Notice */}
          <div className="p-3 rounded-lg bg-[#070D18] border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5 leading-relaxed">
              <span className="font-semibold text-slate-200">
                {isBn ? 'এনক্রিপ্টেড সেশন গার্ড সক্রিয়' : 'Encrypted Session Guard Active'}
              </span>
              <p className="text-[11px] text-slate-400">
                {isBn
                  ? 'সরাসরি সুপাবেস অথেন্টিকেশন প্রটোকল দ্বারা পরিচালিত।'
                  : 'Authenticated directly via Supabase Auth & JWT Row Level Security.'}
              </p>
            </div>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {isBn ? 'অ্যাডমিন ইমেইল' : 'Admin Email Address'}
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@metaltekbd.com"
                  autoComplete="email"
                  className="w-full pl-9 pr-3 py-2.5 rounded-md bg-[#070D18] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-xs outline-hidden transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 block">
                  {isBn ? 'পাসওয়ার্ড' : 'Master Password'}
                </label>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-3 text-slate-500 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2.5 rounded-md bg-[#070D18] border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-xs outline-hidden transition-all placeholder:text-slate-600 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-500 hover:text-slate-300 cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 disabled:opacity-50 text-white font-bold rounded-md text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{isBn ? 'যাচাই করা হচ্ছে...' : 'Authenticating...'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isBn ? 'অ্যাডমিন কনসোলে প্রবেশ করুন' : 'Sign In to Admin Console'}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Hint for Testing */}
          <div className="pt-3 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500">
              Default authorized credential: <code className="text-cyan-400/90 font-mono">admin@metaltekbd.com</code>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center text-xs text-slate-500 border-t border-slate-800/80">
        <span>© 2026 Metal Tech BD. Enterprise Foundry Management System.</span>
      </footer>
    </div>
  );
};
