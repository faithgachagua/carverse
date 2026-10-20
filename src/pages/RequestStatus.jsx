import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, XCircle, Circle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RequestStatus() {
  const { state } = useLocation();
  const { getStatusForUsername } = useAuth();
  const navigate = useNavigate();

  const username = state?.username;
  const status = username ? getStatusForUsername(username) || state?.status : state?.status || 'pending';

  if (status === 'rejected') {
    return (
      <StatusShell>
        <XCircle className="mx-auto mb-4 text-red-400" size={44} />
        <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Access Denied</h1>
        <p className="mt-2 text-sm text-[#8f8778]">
          Your membership request was not approved. Contact support if you believe this is a mistake.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 rounded-lg border border-ink-600 px-5 py-2.5 text-sm font-medium text-[#f2ede4] hover:border-gold-600"
        >
          Back to Home
        </button>
      </StatusShell>
    );
  }

  if (status === 'approved') {
    return (
      <StatusShell>
        <CheckCircle2 className="mx-auto mb-4 text-gold-500" size={44} />
        <h1 className="font-display text-2xl font-medium text-[#f2ede4]">You're Approved!</h1>
        <p className="mt-2 text-sm text-[#8f8778]">Your membership has been approved. You can now log in.</p>
        <Link
          to="/login"
          className="mt-6 inline-block rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-gold-400"
        >
          Go to Login
        </Link>
      </StatusShell>
    );
  }

  return (
    <StatusShell wide>
      <Clock className="mx-auto mb-4 text-gold-500" size={40} />
      <h2 className="font-display text-xl font-medium text-[#f2ede4]">Membership Request Submitted</h2>
      <p className="mt-2 text-sm text-[#8f8778]">
        Thank you! Your request has been submitted. Status: <span className="text-gold-500">Pending Administrator Approval</span>
      </p>

      <div className="mx-auto mt-8 max-w-xs text-left">
        <TimelineItem icon={CheckCircle2} filled title="Request Submitted" sub="Just now" />
        <TimelineItem icon={CheckCircle2} filled title="Under Review" sub="In progress" />
        <TimelineItem icon={Circle} title="Decision Pending" sub="You'll be notified via email" last />
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-8 rounded-lg border border-ink-600 px-5 py-2.5 text-sm font-medium text-[#f2ede4] hover:border-gold-600"
      >
        Back to Home
      </button>
    </StatusShell>
  );
}

function StatusShell({ children, wide }) {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-noise px-5 py-14">
      <div className={`w-full ${wide ? 'max-w-md' : 'max-w-sm'} rounded-2xl border border-ink-700 bg-ink-850 p-8 text-center`}>
        {children}
      </div>
    </div>
  );
}

function TimelineItem({ icon: Icon, filled, title, sub, last }) {
  return (
    <div className="relative flex gap-3 pb-6 last:pb-0">
      {!last && <span className="absolute left-[9px] top-5 h-full w-px bg-ink-600" />}
      <Icon size={19} className={filled ? 'text-gold-500' : 'text-[#6f6858]'} />
      <div>
        <p className="text-sm font-medium text-[#f2ede4]">{title}</p>
        <p className="text-xs text-[#8f8778]">{sub}</p>
      </div>
    </div>
  );
}
