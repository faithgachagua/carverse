import { useAuth } from '../context/AuthContext';

export default function AdminUsers() {
  const { users } = useAuth();
  const members = users.filter((u) => u.role === 'member');

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Users</h1>
      <p className="mt-1 text-sm text-[#8f8778]">All registered members and their status.</p>

      <div className="mt-5 overflow-hidden rounded-xl border border-ink-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-850 text-xs uppercase tracking-wide text-[#8f8778]">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Username</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((u) => (
              <tr key={u.id} className="border-t border-ink-700 hover:bg-ink-850">
                <td className="px-4 py-3 text-[#f2ede4]">{u.fullName}</td>
                <td className="px-4 py-3 text-[#8f8778]">{u.username}</td>
                <td className="px-4 py-3 text-[#8f8778]">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium capitalize text-emerald-400">
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
