import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, MOCK_CREDENTIALS } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import logo from '../assets/logo.png';
import './Connexion.css';

export default function Connexion() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, userType } = useAuth();
  const { toast } = useToast();

  const [role, setRole] = useState(searchParams.get('role') === 'recruteur' ? 'recruteur' : 'candidat');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (userType === 'candidat') navigate('/candidat/dashboard', { replace: true });
    else if (userType === 'recruteur') navigate('/recruteur/dashboard', { replace: true });
  }, [userType, navigate]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError('');
    setEmail('');
    setPassword('');
  };

  const fillDemo = () => {
    const creds = MOCK_CREDENTIALS[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(email, password, role);
    setLoading(false);
    if (result.success) {
      toast.success(`Bienvenue ! Connexion réussie en tant que ${role}`);
      navigate(role === 'candidat' ? '/candidat/dashboard' : '/recruteur/dashboard', { replace: true });
    } else {
      setError(result.error);
    }
  };

  const creds = MOCK_CREDENTIALS[role];

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Back to home */}
        <Link to="/" className="auth-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Retour à l'accueil
        </Link>

        <div className="auth-logo">
          <img src={logo} alt="Wali" />
        </div>

        <h1 className="auth-title">Connexion</h1>
        <p className="auth-subtitle">Accédez à votre espace personnel</p>

        {/* Role tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${role === 'candidat' ? 'auth-tab--active' : ''}`}
            onClick={() => handleRoleChange('candidat')}
          >
            Je suis candidat
          </button>
          <button
            type="button"
            className={`auth-tab ${role === 'recruteur' ? 'auth-tab--active' : ''}`}
            onClick={() => handleRoleChange('recruteur')}
          >
            Je suis recruteur
          </button>
        </div>

        {/* Demo hint */}
        <button type="button" className="auth-demo-hint" onClick={fillDemo}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Compte démo : {creds.email} · Cliquez pour remplir automatiquement
        </button>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="cx-email">Adresse email</label>
            <input
              id="cx-email"
              type="email"
              className="form-input"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cx-password">Mot de passe</label>
            <div className="form-input-wrap">
              <input
                id="cx-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input form-input--with-toggle"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Se connecter'}
          </button>
        </form>

        <p className="auth-footer">
          Pas encore de compte ?{' '}
          <Link to={`/inscription?role=${role}`} className="auth-link">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
