import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const empty = { fullName: '', username: '', password: '', email: '', phone: '', reason: '', referral: '' };

export default function RequestMembership() {
  const { submitMembershipRequest } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const res = submitMembershipRequest(form);
    if (!res.ok) return setError(res.error);
    navigate('/request-status', { state: { status: 'pending', username: form.username, justSubmitted: true } });
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-noise px-5 py-14">
      <div className="w-full max-w-lg rounded-2xl border border-ink-700 bg-ink-850 p-8">
        <div className="mb-6 flex items-center gap-2 text-[#f2ede4]">
          <UserPlus size={18} className="text-gold-500" />
          <h1 className="font-display text-xl font-medium">Request Membership</h1>
        </div>
        <p className="mb-6 text-sm text-[#8f8778]">
          Your request will be reviewed by our administrators before member access is granted.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={form.fullName} onChange={update('fullName')} placeholder="Enter your full name" required />
            <Field label="Username" value={form.username} onChange={update('username')} placeholder="Choose a username" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Password" type="password" value={form.password} onChange={update('password')} placeholder="Choose a password" required />
            <Field label="Email" type="email" value={form.email} onChange={update('email')} placeholder="Enter your email" required />
          </div>
          <Field label="Phone Number" value={form.phone} onChange={update('phone')} placeholder="Enter your phone number" required />
          <div>
            <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">Reason for Joining</label>
            <textarea
              required
              rows={3}
              value={form.reason}
              onChange={update('reason')}
              placeholder="Tell us why you want to join"
              className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
            />
          </div>
          <Field label="Referral (Optional)" value={form.referral} onChange={update('referral')} placeholder="Enter referral name" />

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
          >
            Submit Request
          </button>
          <p className="text-center text-[11px] text-[#6f6858]">
            Your request will be reviewed by our administrators.
          </p>
        </form>

        <p className="mt-5 text-center text-sm text-[#8f8778]">
          Already a member?{' '}
          <Link to="/login" className="font-medium text-gold-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-[#c9c2b4]">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
      />
    </div>
  );
}
