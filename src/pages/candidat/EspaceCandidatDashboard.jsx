import { Link } from 'react-router-dom';
import { mockCandidat, mockCandidatures, recommendedJobs } from '../../data/mockData';
import './EspaceCandidatDashboard.css';

const STATUS_CONFIG = {
  'Envoyée':         { label: 'Envoyée',           className: 'status--sent' },
  'Vue':             { label: 'Vue',                className: 'status--viewed' },
  "En cours d'examen":{ label: "En cours d'examen", className: 'status--reviewing' },
  'Rejetée':         { label: 'Rejetée',            className: 'status--rejected' },
  'Acceptée':        { label: 'Acceptée',           className: 'status--accepted' },
};

const tips = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
    title: 'Optimisez votre CV',
    desc: 'Un CV bien structuré augmente vos chances de 60%.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Préparez vos entretiens',
    desc: 'Anticipez les questions fréquentes des recruteurs.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Développez votre réseau',
    desc: 'Connectez-vous avec des professionnels de votre secteur.',
  },
];

export default function EspaceCandidatDashboard() {
  const c = mockCandidat;
  const recent = mockCandidatures.slice(0, 5);

  return (
    <div className="dashboard-page">
      <div className="container">

        {/* ── Header ─────────────────────────────────── */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-greeting">Bonjour {c.firstName}</h1>
            <div className="profile-completion">
              <span className="completion-text">Votre profil est complet à {c.profileCompletion}%</span>
              <div className="completion-bar">
                <div className="completion-fill" style={{ width: `${c.profileCompletion}%` }} />
              </div>
              <Link to="/candidat/profil/modifier" className="completion-link">
                Compléter mon profil
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stats ──────────────────────────────────── */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon--blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div className="stat-value">{c.stats.candidaturesEnvoyees}</div>
            <div className="stat-label">Candidatures envoyées</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon--orange">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="stat-value">{c.stats.candidaturesEnCours}</div>
            <div className="stat-label">En cours d'examen</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon--teal">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div className="stat-value">{c.stats.offresSauvegardees}</div>
            <div className="stat-label">Offres sauvegardées</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon--purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <div className="stat-value">{c.stats.profilesConsultes}</div>
            <div className="stat-label">Profil consulté cette semaine</div>
          </div>
        </div>

        {/* ── Candidatures récentes ───────────────────── */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Mes candidatures récentes</h2>
            <Link to="/candidat/candidatures" className="section-link">
              Voir toutes mes candidatures
            </Link>
          </div>

          <div className="candidatures-table">
            {recent.map((ca) => {
              const st = STATUS_CONFIG[ca.status] ?? { label: ca.status, className: 'status--sent' };
              return (
                <div key={ca.id} className="candidature-row">
                  <div className="candidature-main">
                    <p className="candidature-title">{ca.jobTitle}</p>
                    <p className="candidature-company">{ca.company}</p>
                    <p className="candidature-date">{ca.location} · {ca.appliedDate}</p>
                  </div>
                  <div className="candidature-right">
                    <span className={`status-badge ${st.className}`}>{st.label}</span>
                    <Link to={`/jobs/${ca.jobId}`} className="candidature-link">
                      Voir les détails
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Actions rapides ─────────────────────────── */}
        <section className="dashboard-section">
          <h2 className="section-title">Actions rapides</h2>
          <div className="quick-actions">
            <Link to="/recherche" className="quick-action-card">
              <div className="quick-action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <p className="quick-action-label">Rechercher des offres</p>
              <p className="quick-action-sub">Explorer les opportunités</p>
            </Link>
            <Link to="/candidat/profil/modifier" className="quick-action-card">
              <div className="quick-action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <p className="quick-action-label">Modifier mon profil</p>
              <p className="quick-action-sub">Mettre à jour mes informations</p>
            </Link>
            <Link to="/candidat/candidatures" className="quick-action-card">
              <div className="quick-action-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <p className="quick-action-label">Mes offres sauvegardées</p>
              <span className="quick-action-badge">{c.stats.offresSauvegardees}</span>
            </Link>
          </div>
        </section>

        {/* ── Recommandations ─────────────────────────── */}
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Offres qui pourraient vous intéresser</h2>
              <p className="section-sub">Basées sur votre profil et vos recherches</p>
            </div>
          </div>
          <div className="recommended-grid">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="recommended-card">
                <div className="recommended-badge">Correspond à votre profil</div>
                <h3 className="recommended-title">{job.title}</h3>
                <p className="recommended-company">{job.company}</p>
                <div className="recommended-meta">
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {job.location}
                  </span>
                  <span className="contract-badge">{job.contractType}</span>
                </div>
                <Link to={`/jobs/${job.id}`} className="btn btn--primary btn--small recommended-btn">
                  Voir l'offre
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Conseils ────────────────────────────────── */}
        <section className="dashboard-section">
          <h2 className="section-title">Conseils pour votre recherche</h2>
          <div className="tips-grid">
            {tips.map((tip) => (
              <div key={tip.title} className="tip-card">
                <div className="tip-icon">{tip.icon}</div>
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-desc">{tip.desc}</p>
                <button className="tip-link">Lire la suite</button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
