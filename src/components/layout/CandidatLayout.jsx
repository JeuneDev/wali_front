import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { mockCandidat } from '../../data/mockData';
import Header from './Header';
import Footer from './Footer';
import './DashboardLayout.css';

const NAV_ITEMS = [
  {
    to: '/candidat/dashboard',
    label: 'Tableau de bord',
    end: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    to: '/candidat/profil',
    label: 'Mon profil',
    end: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    to: '/candidat/candidatures',
    label: 'Mes candidatures',
    end: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    to: '/candidat/favoris',
    label: 'Favoris',
    end: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    to: '/recherche',
    label: 'Rechercher des offres',
    end: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    to: '/candidat/messages',
    label: 'Messages',
    end: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    to: '/candidat/notifications',
    label: 'Notifications',
    end: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
  },
  {
    to: '/candidat/parametres',
    label: 'Paramètres',
    end: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

export default function CandidatLayout() {
  const { userType, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth guard
  if (!userType) return <Navigate to="/connexion?role=candidat" replace />;
  if (userType === 'recruteur') return <Navigate to="/recruteur/dashboard" replace />;

  const c = mockCandidat;

  const handleLogout = () => {
    logout();
    toast.info('Vous avez été déconnecté');
    navigate('/');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dl-root">
      <Header />

      <div className="dl-body">
        {/* Mobile FAB toggle */}
        <button
          className="dl-sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {sidebarOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>

        {/* Backdrop overlay */}
        {sidebarOpen && (
          <div className="dl-overlay" onClick={closeSidebar} aria-hidden="true" />
        )}

        {/* Sidebar */}
        <aside className={`dl-sidebar ${sidebarOpen ? 'dl-sidebar--open' : ''}`}>
          {/* User card */}
          <div className="dl-user-card">
            <img src={c.avatar} alt={`${c.firstName} ${c.lastName}`} className="dl-user-avatar" />
            <div className="dl-user-info">
              <p className="dl-user-name">{c.firstName} {c.lastName}</p>
              <p className="dl-user-role">Candidat</p>
            </div>
          </div>

          {/* Profile completion */}
          <div className="dl-completion">
            <div className="dl-completion-header">
              <span className="dl-completion-label">Profil complété</span>
              <span className="dl-completion-pct">{c.profileCompletion}%</span>
            </div>
            <div className="dl-completion-bar">
              <div className="dl-completion-fill" style={{ width: `${c.profileCompletion}%` }} />
            </div>
          </div>

          {/* Navigation */}
          <nav className="dl-nav" aria-label="Navigation candidat">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `dl-nav-item${isActive ? ' dl-nav-item--active' : ''}`
                }
                onClick={closeSidebar}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="dl-sidebar-footer">
            <button className="dl-logout-btn" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Déconnexion
            </button>
          </div>
        </aside>

        {/* Page content */}
        <main className="dl-main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
