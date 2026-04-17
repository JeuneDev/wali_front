import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { mockCandidat, mockRecruteur } from '../../data/mockData';
import NotificationBell from './NotificationBell';
import logo from '../../assets/logo.png';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const { userType, logout } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const avatarRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setIsAvatarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAvatarOpen(false);
    closeMenu();
    toast.info('Vous avez été déconnecté');
    navigate('/');
  };

  // ── Nav variants ─────────────────────────────────
  const isCandidat = userType === 'candidat';
  const isRecruteur = userType === 'recruteur';

  const navLinks = isCandidat
    ? [
        { to: '/', label: 'Accueil' },
        { to: '/recherche', label: 'Rechercher des offres' },
        { to: '/candidat/dashboard', label: 'Mon espace' },
      ]
    : isRecruteur
    ? [
        { to: '/', label: 'Accueil' },
        { to: '/recruteur/dashboard', label: 'Espace recruteur' },
        { to: '/recruteur/recherche-candidats', label: 'Rechercher des candidats' },
      ]
    : [
        { to: '/recherche', label: 'Rechercher des offres' },
        { to: '/connexion?role=recruteur', label: 'Pour les entreprises' },
      ];

  const avatarLabel = isCandidat
    ? mockCandidat.firstName
    : isRecruteur
    ? mockRecruteur.company
    : null;

  const avatarSrc = isCandidat
    ? mockCandidat.avatar
    : isRecruteur
    ? mockRecruteur.avatar
    : null;

  const dropdownLinks = isCandidat
    ? [
        { to: '/candidat/profil', label: 'Mon profil' },
        { to: '/candidat/candidatures', label: 'Mes candidatures' },
        { to: '/candidat/competences', label: 'Compétences' },
        { to: '/candidat/favoris', label: 'Favoris' },
        { to: '/candidat/messages', label: 'Messages' },
        { to: '/candidat/parametres', label: 'Paramètres' },
      ]
    : isRecruteur
    ? [
        { to: '/recruteur/offres', label: 'Mes offres' },
        { to: '/recruteur/analytics', label: 'Analytics' },
        { to: '/recruteur/favoris', label: 'Candidats favoris' },
        { to: '/recruteur/messages', label: 'Messages' },
        { to: '/recruteur/parametres', label: 'Paramètres' },
      ]
    : [];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src={logo} alt="Wali" className="logo-image" />
          </Link>

          {/* Burger */}
          <button
            className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Nav */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'nav-link--active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile auth actions */}
            <div className="header-actions-mobile">
              {userType ? (
                <button className="btn btn--text btn--medium" onClick={handleLogout}>
                  Déconnexion
                </button>
              ) : (
                <>
                  <Link to="/connexion" className="btn btn--text btn--medium" onClick={closeMenu}>
                    Connexion
                  </Link>
                  <Link to="/inscription" className="btn btn--primary btn--medium" onClick={closeMenu}>
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Desktop actions */}
          <div className="header-actions">
            {userType && <NotificationBell />}
            {userType ? (
              <div className="avatar-menu" ref={avatarRef}>
                <button
                  className="avatar-trigger"
                  onClick={() => setIsAvatarOpen(!isAvatarOpen)}
                  aria-expanded={isAvatarOpen}
                >
                  <img src={avatarSrc} alt={avatarLabel} className="avatar-img" />
                  <span className="avatar-label">{avatarLabel}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`avatar-chevron ${isAvatarOpen ? 'open' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isAvatarOpen && (
                  <div className="avatar-dropdown">
                    {dropdownLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="dropdown-item"
                        onClick={() => setIsAvatarOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="dropdown-divider" />
                    <button className="dropdown-item dropdown-item--danger" onClick={handleLogout}>
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/connexion" className="btn btn--text btn--medium">
                  Connexion
                </Link>
                <Link to="/inscription" className="btn btn--primary btn--medium">
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="menu-overlay" onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  );
}
