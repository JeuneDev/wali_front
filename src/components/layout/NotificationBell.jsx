import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockNotificationsCandidat, mockNotificationsRecruteur } from '../../data/mockData';
import './NotificationBell.css';

const ICON_MAP = {
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  message: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  star: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  alert: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  bell: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  chart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
};

export default function NotificationBell() {
  const { userType } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const notifications = userType === 'recruteur'
    ? mockNotificationsRecruteur
    : mockNotificationsCandidat;

  const unreadCount = notifications.filter((n) => !n.read).length;
  const recent = notifications.slice(0, 5);

  const notificationsRoute = userType === 'recruteur'
    ? '/recruteur/notifications'
    : '/candidat/notifications';

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="notif-bell" ref={wrapRef}>
      <button
        className="notif-trigger"
        onClick={() => setOpen(!open)}
        aria-label={`Notifications (${unreadCount} non lues)`}
        aria-expanded={open}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="notif-dropdown">
          <div className="notif-dropdown-header">
            <h3 className="notif-dropdown-title">Notifications</h3>
            {unreadCount > 0 && (
              <span className="notif-dropdown-count">{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</span>
            )}
          </div>

          <div className="notif-dropdown-list">
            {recent.length === 0 ? (
              <div className="notif-empty">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                </svg>
                <p>Aucune notification</p>
              </div>
            ) : (
              recent.map((n) => (
                <Link
                  key={n.id}
                  to={n.link}
                  className={`notif-item ${!n.read ? 'notif-item--unread' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <div className="notif-item-icon">{ICON_MAP[n.icon] || ICON_MAP.bell}</div>
                  <div className="notif-item-content">
                    <p className="notif-item-title">{n.title}</p>
                    <p className="notif-item-desc">{n.description}</p>
                    <span className="notif-item-time">{n.time}</span>
                  </div>
                  {!n.read && <span className="notif-item-dot" aria-hidden />}
                </Link>
              ))
            )}
          </div>

          <Link
            to={notificationsRoute}
            className="notif-dropdown-footer"
            onClick={() => setOpen(false)}
          >
            Voir toutes les notifications
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
