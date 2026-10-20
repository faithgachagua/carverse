import { useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ChevronRight, X, Home, Car, Tag, Wallet, Users, LayoutDashboard,
  ShieldCheck, LogOut, ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SWIPE_OPEN_THRESHOLD = 60; // px dragged right from the edge to open
const SWIPE_CLOSE_THRESHOLD = 60; // px dragged left to close

export default function NavDrawer() {
  const [open, setOpen] = useState(false);
  const [dragX, setDragX] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  function handleTouchStart(e) {
    startX.current = e.touches[0].clientX;
    dragging.current = true;
  }

  function handleTouchMove(e) {
    if (!dragging.current) return;
    const delta = e.touches[0].clientX - startX.current;
    if (!open && delta > 0) setDragX(Math.min(delta, 260));
    if (open && delta < 0) setDragX(Math.max(delta, -260));
  }

  function handleTouchEnd() {
    dragging.current = false;
    if (!open && dragX > SWIPE_OPEN_THRESHOLD) setOpen(true);
    if (open && dragX < -SWIPE_CLOSE_THRESHOLD) setOpen(false);
    setDragX(0);
  }

  function go(path) {
    navigate(path);
    setOpen(false);
  }

  function handleBack() {
    navigate(-1);
    setOpen(false);
  }

  function handleLogout() {
    logout();
    navigate('/');
    setOpen(false);
  }

  const canGoBack = location.key !== 'default'; // history stack has somewhere to go

  return (
    <>
      {/* Edge handle — always present, swipeable, and clickable */}
      <button
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className={`fixed left-0 top-1/2 z-40 flex h-16 w-5 -translate-y-1/2 items-center justify-center rounded-r-lg border border-l-0 border-ink-700 bg-ink-850 text-[#8f8778] shadow-lg transition-opacity hover:text-gold-500 ${
          open ? 'pointer-events-none opacity-0' : 'opacity-90'
        }`}
      >
        <ChevronRight size={14} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}

      {/* Drawer */}
      <aside
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="fixed left-0 top-0 z-50 flex h-full w-72 max-w-[80vw] flex-col border-r border-ink-700 bg-ink-900 shadow-2xl transition-transform duration-200 ease-out"
        style={{
          transform: open
            ? `translateX(${Math.min(dragX, 0)}px)`
            : `translateX(calc(-100% + ${Math.max(dragX, 0)}px))`,
        }}
      >
        <div className="flex items-center justify-between border-b border-ink-700 p-4">
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <ShieldCheck className="text-gold-500" size={20} />
            <span className="font-display text-base font-semibold text-[#f2ede4]">CARVERSE</span>
          </Link>
          <button onClick={() => setOpen(false)} className="text-[#8f8778] hover:text-[#f2ede4]" aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>

        <button
          onClick={handleBack}
          disabled={!canGoBack}
          className="flex items-center gap-3 border-b border-ink-700 px-4 py-3 text-sm font-medium text-[#c9c2b4] transition-colors hover:bg-ink-800 hover:text-gold-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft size={17} /> Back
        </button>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <DrawerLink icon={Home} label="Home" onClick={() => go('/')} />
          <DrawerLink icon={Car} label="Inventory" onClick={() => go('/inventory')} />
          <DrawerLink icon={Tag} label="Owner Listings" onClick={() => go('/owner-listings')} />
          <DrawerLink icon={Wallet} label="Financing" onClick={() => go('/financing')} />
          <DrawerLink icon={Tag} label="Sell Your Car" onClick={() => go('/sell')} />

          <div className="my-2 border-t border-ink-700" />

          {!currentUser && (
            <DrawerLink icon={Users} label="Member Login" onClick={() => go('/login')} />
          )}
          {currentUser?.role === 'member' && (
            <DrawerLink icon={LayoutDashboard} label="My Dashboard" onClick={() => go('/dashboard')} />
          )}
          {currentUser?.role === 'admin' && (
            <DrawerLink icon={LayoutDashboard} label="Admin Dashboard" onClick={() => go('/admin')} />
          )}
        </nav>

        {currentUser && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 border-t border-ink-700 px-4 py-3.5 text-sm font-medium text-[#c9c2b4] transition-colors hover:bg-ink-800 hover:text-gold-500"
          >
            <LogOut size={17} /> Logout
          </button>
        )}
      </aside>
    </>
  );
}

function DrawerLink({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#c9c2b4] transition-colors hover:bg-ink-800 hover:text-gold-500"
    >
      <Icon size={17} /> {label}
    </button>
  );
}