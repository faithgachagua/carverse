import { useState } from 'react';
import { Paperclip, Mic, Send, FileText, Image as ImageIcon, Eye, MessageSquare, FolderOpen, Activity } from 'lucide-react';
import { seedConversations } from '../data/mockData';

const tabIcons = [
  { key: 'chat', label: 'Chat', icon: MessageSquare },
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'images', label: 'Images', icon: ImageIcon },
  { key: 'activity', label: 'Activity', icon: Activity },
];

export default function Chat() {
  const [conversations, setConversations] = useState(seedConversations);
  const [activeId, setActiveId] = useState(seedConversations[0].id);
  const [draft, setDraft] = useState('');
  const [tab, setTab] = useState('chat');

  const active = conversations.find((c) => c.id === activeId);

  function sendMessage(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              lastMessage: draft,
              messages: [...c.messages, { from: 'me', text: draft, time: 'Now' }],
            }
          : c
      )
    );
    setDraft('');
  }

  const files = active.messages.filter((m) => m.attachment).map((m) => m.attachment);

  return (
    <div className="flex h-screen">
      {/* Conversation list */}
      <div className="w-72 shrink-0 overflow-y-auto border-r border-ink-700 bg-ink-900 p-4">
        <h2 className="mb-3 px-1 font-display text-lg text-[#f2ede4]">Messages</h2>
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`mb-1 flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left transition-colors ${
              c.id === activeId ? 'bg-gold-500/10' : 'hover:bg-ink-800'
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-700 text-xs font-semibold text-gold-500">
              {c.withName.slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#f2ede4]">{c.withName}</p>
              <p className="truncate text-xs text-[#8f8778]">{c.lastMessage}</p>
            </div>
            <span className="shrink-0 text-[10px] text-[#6f6858]">{c.time}</span>
          </button>
        ))}
      </div>

      {/* Conversation */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-ink-700 px-6 py-4">
          <div>
            <p className="font-medium text-[#f2ede4]">{active.withName}</p>
            <p className="text-xs text-[#8f8778]">Online</p>
          </div>
          <div className="flex gap-1 rounded-lg border border-ink-700 p-1">
            {tabIcons.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  tab === t.key ? 'bg-gold-500 text-ink-950' : 'text-[#8f8778] hover:text-[#f2ede4]'
                }`}
              >
                <t.icon size={13} /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {tab === 'chat' && (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-6">
              {active.messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-sm rounded-xl px-4 py-2.5 text-sm ${
                      m.from === 'me' ? 'bg-gold-500 text-ink-950' : 'border border-ink-700 bg-ink-850 text-[#f2ede4]'
                    }`}
                  >
                    {m.attachment ? (
                      <a href="#" className="flex items-center gap-2 underline">
                        <FileText size={14} /> {m.attachment}
                      </a>
                    ) : (
                      m.text
                    )}
                    <p className={`mt-1 text-[10px] ${m.from === 'me' ? 'text-ink-800' : 'text-[#6f6858]'}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-ink-700 p-4">
              <button type="button" className="text-[#8f8778] hover:text-gold-500"><Paperclip size={18} /></button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-[#f2ede4] placeholder:text-[#6f6858] outline-none focus:border-gold-600"
              />
              <button type="button" className="text-[#8f8778] hover:text-gold-500"><Mic size={18} /></button>
              <button type="submit" className="rounded-lg bg-gold-500 p-2.5 text-ink-950 hover:bg-gold-400"><Send size={16} /></button>
            </form>
          </>
        )}

        {tab === 'documents' && (
          <div className="flex-1 overflow-y-auto p-6">
            {files.length === 0 && <p className="text-sm text-[#8f8778]">No documents shared yet.</p>}
            <div className="space-y-2">
              {files.map((f) => (
                <div key={f} className="flex items-center justify-between rounded-lg border border-ink-700 bg-ink-850 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm text-[#f2ede4]"><FileText size={15} className="text-gold-500" /> {f}</span>
                  <Eye size={15} className="text-[#8f8778]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'images' && (
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="text-center text-sm text-[#8f8778]">
              <FolderOpen className="mx-auto mb-2 text-[#6f6858]" size={28} />
              No images shared in this conversation yet.
            </div>
          </div>
        )}

        {tab === 'activity' && (
          <div className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-3 text-sm text-[#8f8778]">
              <li>· Conversation started with {active.withName}</li>
              <li>· {active.messages.length} messages exchanged</li>
              <li>· Last activity {active.time}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
