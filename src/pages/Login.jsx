import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const res = login(username, password);
    if (!res.ok) {
      if (res.status === 'pending') return navigate('/request-status', { state: { status: 'pending', username } });
      if (res.status === 'rejected') return navigate('/request-status', { state: { status: 'rejected', username } });
      setError(res.error);
      return;
    }
    navigate(res.user.role === 'admin' ? '/admin' : '/dashboard');
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-noise px-5 py-14">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-ink-700 md:grid-cols-2">
        {/* Left brand panel */}
        <div className="flex flex-col items-center justify-center gap-4 border-b border-ink-700 bg-ink-850 p-10 text-center md:border-b-0 md:border-r">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="text-gold-500" size={26} />
            <span className="font-display text-xl font-semibold text-[#f2ede4]">CARVERSE</span>
          </Link>
          <p className="text-xs text-[#8f8778]">Click the logo 5 times to access member portal</p>
          <div className="mt-4 flex h-28 w-28 items-center justify-center rounded-full border border-gold-700/40 bg-ink-800 shadow-gold">
            <ShieldCheck className="text-gold-500" size={48} strokeWidth={1.5} />
          </div>
        </div>

        {/* Right form panel */}
        <div className="bg-ink-850 p-8">
          <div className="mb-6 flex items-center gap-2 text-[#f2ede4]">
            <Lock size={18} className="text-gold-500" />
            <h1 className="font-display text-xl font-medium">Member Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Username</label>
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 pr-10 text-sm text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8f8778]"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-center text-sm">
            <Link to="/request-membership" className="font-medium text-gold-500 hover:underline">
              Request Membership
            </Link>
          </p>

          <p className="mt-6 rounded-lg bg-ink-800 p-3 text-[11px] leading-relaxed text-[#6f6858]">
            Demo accounts — Admin: <span className="text-[#c9c2b4]">admin / admin123</span>. Member:{' '}
            <span className="text-[#c9c2b4]">johnk / member123</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
