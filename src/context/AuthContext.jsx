import { createContext, useContext, useEffect, useState } from 'react';
import { seedUsers, seedRequests } from '../data/mockData';

const AuthContext = createContext(null);

const LS_USERS = 'carverse_users';
const LS_REQUESTS = 'carverse_requests';
const LS_SESSION = 'carverse_session';

function loadOrSeed(key, seed) {
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fall through to reseed on corrupt data
    }
  }
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadOrSeed(LS_USERS, seedUsers));
  const [requests, setRequests] = useState(() => loadOrSeed(LS_REQUESTS, seedRequests));
  const [currentUser, setCurrentUser] = useState(() => {
    const raw = localStorage.getItem(LS_SESSION);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    localStorage.setItem(LS_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(LS_REQUESTS, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(LS_SESSION, JSON.stringify(currentUser));
    else localStorage.removeItem(LS_SESSION);
  }, [currentUser]);

  function login(username, password) {
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) return { ok: false, error: 'Incorrect username or password.' };
    if (user.role === 'member' && user.status !== 'approved') {
      return { ok: false, error: `Your membership request is ${user.status}.`, status: user.status };
    }
    setCurrentUser(user);
    return { ok: true, user };
  }

  function logout() {
    setCurrentUser(null);
  }

  function submitMembershipRequest(data) {
    const exists = requests.some((r) => r.username === data.username) || users.some((u) => u.username === data.username);
    if (exists) return { ok: false, error: 'That username has already been requested or is taken.' };
    const newRequest = {
      id: `req-${Date.now()}`,
      status: 'pending',
      submitted: new Date().toISOString().slice(0, 10),
      ...data,
    };
    setRequests((prev) => [newRequest, ...prev]);
    // Also create a shadow "pending" user so they can check status by logging in.
    setUsers((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: 'member',
        status: 'pending',
        fullName: data.fullName,
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
      },
    ]);
    return { ok: true, request: newRequest };
  }

  function approveRequest(requestId) {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;
    setRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: 'approved' } : r)));
    setUsers((prev) =>
      prev.map((u) => (u.username === req.username ? { ...u, status: 'approved', joined: new Date().toISOString().slice(0, 10) } : u))
    );
  }

  function rejectRequest(requestId) {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;
    setRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: 'rejected' } : r)));
    setUsers((prev) => prev.map((u) => (u.username === req.username ? { ...u, status: 'rejected' } : u)));
  }

  function getStatusForUsername(username) {
    const user = users.find((u) => u.username === username);
    return user ? user.status : null;
  }

  const value = {
    users,
    requests,
    currentUser,
    login,
    logout,
    submitMembershipRequest,
    approveRequest,
    rejectRequest,
    getStatusForUsername,
    pendingRequests: requests.filter((r) => r.status === 'pending'),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
