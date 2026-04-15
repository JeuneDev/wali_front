import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { mockConversationsCandidat, mockConversationsRecruteur } from '../data/mockData';
import './Messages.css';

export default function Messages() {
  const { userType } = useAuth();
  const { toast } = useToast();
  const source = userType === 'recruteur' ? mockConversationsRecruteur : mockConversationsCandidat;
  const [conversations, setConversations] = useState(source);
  const [activeId, setActiveId] = useState(conversations[0]?.id || null);
  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');

  const active = conversations.find((c) => c.id === activeId);

  const filtered = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim() || !active) return;
    const newMessage = {
      id: Date.now(),
      from: 'me',
      text: draft.trim(),
      time: 'À l\'instant',
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMessage], lastMessage: draft.trim(), lastMessageTime: 'À l\'instant', unread: 0 }
          : c
      )
    );
    setDraft('');
    toast.success('Message envoyé');
  };

  const openConversation = (id) => {
    setActiveId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  return (
    <div className="msg-page">
      <div className="msg-container">

        {/* ── Conversations list ──────────────── */}
        <aside className="msg-sidebar">
          <div className="msg-sidebar-header">
            <h1 className="msg-title">Messages</h1>
          </div>

          <div className="msg-search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="msg-search"
              placeholder="Rechercher une conversation…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="msg-conv-list">
            {filtered.length === 0 ? (
              <div className="msg-conv-empty">Aucune conversation</div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.id}
                  className={`msg-conv-item ${c.id === activeId ? 'msg-conv-item--active' : ''}`}
                  onClick={() => openConversation(c.id)}
                >
                  <img src={c.participant.avatar} alt={c.participant.name} className="msg-conv-avatar" />
                  <div className="msg-conv-info">
                    <div className="msg-conv-head">
                      <p className="msg-conv-name">{c.participant.name}</p>
                      <span className="msg-conv-time">{c.lastMessageTime}</span>
                    </div>
                    <p className="msg-conv-preview">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && <span className="msg-conv-badge">{c.unread}</span>}
                </button>
              ))
            )}
          </div>
        </aside>

        {/* ── Active thread ───────────────────── */}
        {active ? (
          <section className="msg-thread">
            {/* Thread header */}
            <div className="msg-thread-header">
              <img src={active.participant.avatar} alt={active.participant.name} className="msg-thread-avatar" />
              <div className="msg-thread-info">
                <p className="msg-thread-name">{active.participant.name}</p>
                <p className="msg-thread-sub">
                  {active.participant.role} · {active.participant.company}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="msg-thread-body">
              {active.messages.map((m) => (
                <div
                  key={m.id}
                  className={`msg-bubble-wrap ${m.from === 'me' ? 'msg-bubble-wrap--me' : ''}`}
                >
                  <div className={`msg-bubble ${m.from === 'me' ? 'msg-bubble--me' : ''}`}>
                    {m.text}
                  </div>
                  <span className="msg-bubble-time">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Composer */}
            <form className="msg-composer" onSubmit={handleSend}>
              <input
                className="msg-composer-input"
                type="text"
                placeholder="Écrire un message…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button type="submit" className="msg-composer-send" disabled={!draft.trim()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Envoyer
              </button>
            </form>
          </section>
        ) : (
          <section className="msg-thread msg-thread--empty">
            <div className="msg-empty-state">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h2>Sélectionnez une conversation</h2>
              <p>Choisissez une discussion dans la liste pour commencer</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
