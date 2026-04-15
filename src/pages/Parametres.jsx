import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { mockCandidat, mockRecruteur } from '../data/mockData';
import './Parametres.css';

const SECTIONS = [
  { id: 'account', label: 'Compte', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )},
  { id: 'security', label: 'Sécurité', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )},
  { id: 'notifications', label: 'Notifications', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )},
  { id: 'privacy', label: 'Confidentialité', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )},
];

export default function Parametres() {
  const { userType, logout } = useAuth();
  const { toast } = useToast();
  const [section, setSection] = useState('account');

  const user = userType === 'recruteur' ? mockRecruteur : mockCandidat;
  const displayName = userType === 'recruteur' ? user.name : `${user.firstName} ${user.lastName}`;

  // Account form
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [language, setLanguage] = useState('fr');
  const [timezone, setTimezone] = useState('Africa/Conakry');

  // Security
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState({
    newMessages: true,
    applications: true,
    jobAlerts: userType === 'candidat',
    newsletter: false,
  });
  const [pushNotifs, setPushNotifs] = useState({
    newMessages: true,
    applications: true,
  });

  // Privacy
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessaging: true,
  });

  // Handlers
  const saveAccount = (e) => {
    e.preventDefault();
    toast.success('Informations du compte mises à jour');
  };

  const savePassword = (e) => {
    e.preventDefault();
    if (!currentPwd || !newPwd || !confirmPwd) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    if (newPwd !== confirmPwd) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    if (newPwd.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    toast.success('Mot de passe mis à jour avec succès');
  };

  const saveNotifications = () => {
    toast.success('Préférences de notification enregistrées');
  };

  const savePrivacy = () => {
    toast.success('Paramètres de confidentialité mis à jour');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      toast.info('Compte supprimé (démo)');
      setTimeout(() => logout(), 1500);
    }
  };

  return (
    <div className="param-page">
      <div className="container">
        <div className="param-header">
          <h1 className="param-title">Paramètres</h1>
          <p className="param-sub">Gérez votre compte, sécurité et préférences</p>
        </div>

        <div className="param-layout">

          {/* Section nav */}
          <aside className="param-nav">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`param-nav-item ${section === s.id ? 'param-nav-item--active' : ''}`}
                onClick={() => setSection(s.id)}
              >
                {s.icon}
                <span>{s.label}</span>
              </button>
            ))}
          </aside>

          {/* Content */}
          <main className="param-content">

            {/* ── Compte ── */}
            {section === 'account' && (
              <form onSubmit={saveAccount} className="param-section">
                <div className="param-section-header">
                  <h2 className="param-section-title">Informations du compte</h2>
                  <p className="param-section-desc">Mettez à jour vos informations de base</p>
                </div>

                <div className="param-field">
                  <label className="param-label">Nom affiché</label>
                  <input
                    className="param-input"
                    type="text"
                    value={displayName}
                    disabled
                  />
                  <span className="param-hint">Pour modifier votre nom, rendez-vous sur votre profil</span>
                </div>

                <div className="param-field">
                  <label className="param-label">Adresse email</label>
                  <input
                    className="param-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="param-field">
                  <label className="param-label">Téléphone</label>
                  <input
                    className="param-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="param-row">
                  <div className="param-field">
                    <label className="param-label">Langue</label>
                    <select className="param-input" value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="param-field">
                    <label className="param-label">Fuseau horaire</label>
                    <select className="param-input" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                      <option value="Africa/Conakry">Conakry (GMT+0)</option>
                      <option value="Europe/Paris">Paris (GMT+1)</option>
                    </select>
                  </div>
                </div>

                <div className="param-actions">
                  <button type="submit" className="param-btn param-btn--primary">Enregistrer</button>
                </div>

                {/* Danger zone */}
                <div className="param-danger-zone">
                  <h3 className="param-danger-title">Zone de danger</h3>
                  <div className="param-danger-row">
                    <div>
                      <p className="param-danger-label">Supprimer mon compte</p>
                      <p className="param-danger-desc">Cette action est irréversible et supprimera toutes vos données</p>
                    </div>
                    <button type="button" className="param-btn param-btn--danger" onClick={handleDeleteAccount}>
                      Supprimer
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* ── Sécurité ── */}
            {section === 'security' && (
              <form onSubmit={savePassword} className="param-section">
                <div className="param-section-header">
                  <h2 className="param-section-title">Mot de passe</h2>
                  <p className="param-section-desc">Modifiez votre mot de passe régulièrement pour sécuriser votre compte</p>
                </div>

                <div className="param-field">
                  <label className="param-label">Mot de passe actuel</label>
                  <input
                    className="param-input"
                    type="password"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div className="param-field">
                  <label className="param-label">Nouveau mot de passe</label>
                  <input
                    className="param-input"
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="Minimum 6 caractères"
                  />
                </div>

                <div className="param-field">
                  <label className="param-label">Confirmer le nouveau mot de passe</label>
                  <input
                    className="param-input"
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div className="param-actions">
                  <button type="submit" className="param-btn param-btn--primary">Mettre à jour</button>
                </div>
              </form>
            )}

            {/* ── Notifications ── */}
            {section === 'notifications' && (
              <div className="param-section">
                <div className="param-section-header">
                  <h2 className="param-section-title">Préférences de notification</h2>
                  <p className="param-section-desc">Choisissez comment et quand recevoir nos notifications</p>
                </div>

                <h3 className="param-group-title">Notifications par email</h3>
                <div className="param-toggle-list">
                  <ToggleRow
                    label="Nouveaux messages"
                    desc="Recevoir un email pour chaque nouveau message"
                    checked={emailNotifs.newMessages}
                    onChange={(v) => setEmailNotifs({ ...emailNotifs, newMessages: v })}
                  />
                  <ToggleRow
                    label={userType === 'recruteur' ? 'Nouvelles candidatures' : 'Mises à jour de candidature'}
                    desc={userType === 'recruteur' ? 'Notification à chaque candidature reçue' : 'Statut de vos candidatures'}
                    checked={emailNotifs.applications}
                    onChange={(v) => setEmailNotifs({ ...emailNotifs, applications: v })}
                  />
                  {userType === 'candidat' && (
                    <ToggleRow
                      label="Alertes emploi"
                      desc="Nouvelles offres correspondant à votre profil"
                      checked={emailNotifs.jobAlerts}
                      onChange={(v) => setEmailNotifs({ ...emailNotifs, jobAlerts: v })}
                    />
                  )}
                  <ToggleRow
                    label="Newsletter"
                    desc="Conseils, actualités et nouveautés de la plateforme"
                    checked={emailNotifs.newsletter}
                    onChange={(v) => setEmailNotifs({ ...emailNotifs, newsletter: v })}
                  />
                </div>

                <h3 className="param-group-title">Notifications push</h3>
                <div className="param-toggle-list">
                  <ToggleRow
                    label="Nouveaux messages"
                    desc="Notifications push pour les messages"
                    checked={pushNotifs.newMessages}
                    onChange={(v) => setPushNotifs({ ...pushNotifs, newMessages: v })}
                  />
                  <ToggleRow
                    label="Activité des candidatures"
                    desc="Notifications push pour les changements de statut"
                    checked={pushNotifs.applications}
                    onChange={(v) => setPushNotifs({ ...pushNotifs, applications: v })}
                  />
                </div>

                <div className="param-actions">
                  <button className="param-btn param-btn--primary" onClick={saveNotifications}>Enregistrer</button>
                </div>
              </div>
            )}

            {/* ── Confidentialité ── */}
            {section === 'privacy' && (
              <div className="param-section">
                <div className="param-section-header">
                  <h2 className="param-section-title">Confidentialité</h2>
                  <p className="param-section-desc">Contrôlez la visibilité de votre profil et vos données</p>
                </div>

                <div className="param-toggle-list">
                  <ToggleRow
                    label="Profil visible"
                    desc={userType === 'recruteur' ? 'Votre entreprise apparaît dans les recherches' : 'Votre profil est visible par les recruteurs'}
                    checked={privacy.profileVisible}
                    onChange={(v) => setPrivacy({ ...privacy, profileVisible: v })}
                  />
                  <ToggleRow
                    label="Afficher mon email"
                    desc="Les autres utilisateurs peuvent voir votre email"
                    checked={privacy.showEmail}
                    onChange={(v) => setPrivacy({ ...privacy, showEmail: v })}
                  />
                  <ToggleRow
                    label="Afficher mon téléphone"
                    desc="Les autres utilisateurs peuvent voir votre téléphone"
                    checked={privacy.showPhone}
                    onChange={(v) => setPrivacy({ ...privacy, showPhone: v })}
                  />
                  <ToggleRow
                    label="Autoriser les messages directs"
                    desc="Recevoir des messages des autres utilisateurs"
                    checked={privacy.allowMessaging}
                    onChange={(v) => setPrivacy({ ...privacy, allowMessaging: v })}
                  />
                </div>

                <div className="param-actions">
                  <button className="param-btn param-btn--primary" onClick={savePrivacy}>Enregistrer</button>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

// ── Toggle row component ──────────────────
function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <label className="param-toggle-row">
      <div className="param-toggle-info">
        <p className="param-toggle-label">{label}</p>
        <p className="param-toggle-desc">{desc}</p>
      </div>
      <div className={`param-toggle ${checked ? 'param-toggle--on' : ''}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="param-toggle-slider" />
      </div>
    </label>
  );
}
