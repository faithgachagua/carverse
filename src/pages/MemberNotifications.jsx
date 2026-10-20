import { Info, FileText, CheckCircle2, Heart, DollarSign } from 'lucide-react';
import { notifications } from '../data/mockData';

const notifIcon = { message: Info, document: FileText, success: CheckCircle2, reaction: Heart, update: DollarSign };

export default function MemberNotifications() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-2xl font-medium text-[#f2ede4]">Notifications</h1>
      <p className="mt-1 text-sm text-[#8f8778]">Stay up to date on your listings and conversations.</p>

      <div className="mt-6 max-w-xl divide-y divide-ink-700 rounded-xl border border-ink-700 bg-ink-850">
        {notifications.map((n) => {
          const Icon = notifIcon[n.type] || Info;
          return (
            <div key={n.text} className="flex items-start gap-3 px-4 py-4">
              <Icon size={16} className="mt-0.5 shrink-0 text-gold-500" />
              <div>
                <p className="text-sm text-[#f2ede4]">{n.text}</p>
                <p className="mt-0.5 text-xs text-[#6f6858]">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
