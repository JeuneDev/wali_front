import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  const { userType } = useAuth();

  const homeRoute = userType === 'recruteur'
    ? '/recruteur/dashboard'
    : userType === 'candidat'
    ? '/candidat/dashboard'
    : '/';

  return (
    <div className="nf-page">
      <div className="nf-content">
        <div className="nf-illustration">
          <span className="nf-code">404</span>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="12"/>
            <line x1="11" y1="14" x2="11.01" y2="14"/>
          </svg>
        </div>

        <h1 className="nf-title">Page introuvable</h1>
        <p className="nf-desc">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Vérifiez l'URL ou retournez à l'accueil.
        </p>

        <div className="nf-actions">
          <button className="nf-btn nf-btn--secondary" onClick={() => navigate(-1)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Retour
          </button>
          <Link to={homeRoute} className="nf-btn nf-btn--primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Aller à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
