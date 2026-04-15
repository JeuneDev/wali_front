import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { mockNotificationsCandidat, mockNotificationsRecruteur } from '../data/mockData';
import './Notifications.css';

const ICON_MAP = {
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  message: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  star: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  alert: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  bell: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
};

export default function Notifications() {
  const { userType } = useAuth();
  const { toast } = useToast();
  const source = userType === 'recruteur' ? mockNotificationsRecruteur : mockNotificationsCandidat;
  const [items, setItems] = useState(source);
  const [tab, setTab] = useState('all');

  const unreadCount = items.filter((n) => !n.read).length;
  const filtered = tab === 'unread' ? items.filter((n) => !n.read) : items;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('Toutes les notifications ont été marquées comme lues');
  };

  const markRead = (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="notifs-page">
      <div className="container">
        <div className="notifs-layout">

          {/* Header */}
          <div className="notifs-header">
            <div>
              <h1 className="notifs-title">Notifications</h1>
              <p className="notifs-sub">
                {unreadCount > 0
                  ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
                  : 'Vous êtes à jour'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button className="notifs-mark-all" onClick={markAllRead}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Tout marquer comme lu
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="notifs-tabs">
            <button
              className={`notifs-tab ${tab === 'all' ? 'notifs-tab--active' : ''}`}
              onClick={() => setTab('all')}
            >
              Toutes
              <span className="notifs-tab-count">{items.length}</span>
            </button>
            <button
              className={`notifs-tab ${tab === 'unread' ? 'notifs-tab--active' : ''}`}
              onClick={() => setTab('unread')}
            >
              Non lues
              {unreadCount > 0 && <span className="notifs-tab-count notifs-tab-count--accent">{unreadCount}</span>}
            </button>
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="notifs-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <h2>Aucune notification</h2>
              <p>{tab === 'unread' ? 'Toutes vos notifications ont été lues' : 'Vous n\'avez pas encore de notification'}</p>
            </div>
          ) : (
            <div className="notifs-list">
              {filtered.map((n) => (
                <Link
                  key={n.id}
                  to={n.link}
                  className={`notifs-item ${!n.read ? 'notifs-item--unread' : ''}`}
                  onClick={() => markRead(n.id)}
                >
                  <div className="notifs-item-icon">{ICON_MAP[n.icon] || ICON_MAP.bell}</div>
                  <div className="notifs-item-content">
                    <div className="notifs-item-head">
                      <p className="notifs-item-title">{n.title}</p>
                      <span className="notifs-item-time">{n.time}</span>
                    </div>
                    <p className="notifs-item-desc">{n.description}</p>
                  </div>
                  {!n.read && <span className="notifs-item-dot" aria-hidden />}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
