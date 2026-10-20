import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

// Clicking the shield mark 5 times within 2 seconds opens the hidden
// member portal — mirrors the "visitor discovers login" flow.
export default function Logo({ size = 'md' }) {
  const [clicks, setClicks] = useState(0);
  const [pulse, setPulse] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const dims = size === 'lg' ? 'w-9 h-9' : 'w-6 h-6';
  const textSize = size === 'lg' ? 'text-2xl' : 'text-lg';

  function handleShieldClick(e) {
    e.preventDefault();
    clearTimeout(timerRef.current);
    const next = clicks + 1;
    setClicks(next);

    if (next >= 5) {
      setPulse(true);
      setTimeout(() => navigate('/login'), 260);
      setClicks(0);
      return;
    }
    timerRef.current = setTimeout(() => setClicks(0), 2000);
  }

  return (
    <div className="flex items-center gap-2 select-none">
      <button
        onClick={handleShieldClick}
        aria-label="Carverse"
        className={`text-gold-500 transition-transform duration-200 ${pulse ? 'scale-125' : 'scale-100'}`}
      >
        <ShieldCheck className={dims} strokeWidth={1.75} fill="rgba(232,184,75,0.12)" />
      </button>
      <span className={`font-display font-semibold tracking-wide ${textSize} text-[#f2ede4]`}>
        CARVERSE
      </span>
    </div>
  );
}
