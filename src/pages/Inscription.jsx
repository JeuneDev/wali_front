import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import logo from '../assets/logo.png';
import './Connexion.css';

export default function Inscription() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register, userType } = useAuth();
  const { toast } = useToast();

  const [role, setRole] = useState(searchParams.get('role') === 'recruteur' ? 'recruteur' : 'candidat');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  // Shared fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Candidat fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Recruteur fields
  const [company, setCompany] = useState('');
  const [fullName, setFullName] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (userType === 'candidat') navigate('/candidat/dashboard', { replace: true });
    else if (userType === 'recruteur') navigate('/recruteur/dashboard', { replace: true });
  }, [userType, navigate]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (role === 'candidat' && (!firstName.trim() || !lastName.trim())) {
      setError('Veuillez renseigner votre prénom et nom.');
      return;
    }
    if (role === 'recruteur' && (!company.trim() || !fullName.trim())) {
      setError("Veuillez renseigner le nom de l'entreprise et votre nom.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = register({ email, password, firstName, lastName, company, fullName }, role);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      toast.success('Votre compte a été créé avec succès !');
      setTimeout(() => {
        navigate(role === 'candidat' ? '/candidat/dashboard' : '/recruteur/dashboard', { replace: true });
      }, 1400);
    } else {
      setError(result.error || 'Une erreur est survenue.');
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-success">
            <div className="auth-success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2>Compte créé avec succès !</h2>
            <p>Vous allez être redirigé vers votre espace…</p>
          </div>
        </div>
      </div>
    );
  }

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

        <h1 className="auth-title">Créer un compte</h1>
        <p className="auth-subtitle">Rejoignez la plateforme Wali</p>

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

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && <div className="auth-error">{error}</div>}

          {/* Candidat-specific fields */}
          {role === 'candidat' && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="in-firstname">Prénom *</label>
                <input
                  id="in-firstname"
                  type="text"
                  className="form-input"
                  placeholder="Amadou"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="in-lastname">Nom *</label>
                <input
                  id="in-lastname"
                  type="text"
                  className="form-input"
                  placeholder="Diallo"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </div>
            </div>
          )}

          {/* Recruteur-specific fields */}
          {role === 'recruteur' && (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="in-company">Nom de l'entreprise *</label>
                <input
                  id="in-company"
                  type="text"
                  className="form-input"
                  placeholder="TechSolutions Guinée"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="in-fullname">Votre nom complet *</label>
                <input
                  id="in-fullname"
                  type="text"
                  className="form-input"
                  placeholder="Sarah Camara"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </>
          )}

          {/* Common fields */}
          <div className="form-group">
            <label className="form-label" htmlFor="in-email">Adresse email *</label>
            <input
              id="in-email"
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
            <label className="form-label" htmlFor="in-password">Mot de passe *</label>
            <div className="form-input-wrap">
              <input
                id="in-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input form-input--with-toggle"
                placeholder="Minimum 6 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
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
            <span className="form-hint">Minimum 6 caractères</span>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Créer mon compte'}
          </button>
        </form>

        <p className="auth-footer">
          Déjà un compte ?{' '}
          <Link to={`/connexion?role=${role}`} className="auth-link">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
