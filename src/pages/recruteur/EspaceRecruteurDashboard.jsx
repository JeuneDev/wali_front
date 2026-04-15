import { Link } from 'react-router-dom';
import { mockRecruteur, mockOffresRecruteur, mockCandidaturesRecruteur } from '../../data/mockData';
import './EspaceRecruteurDashboard.css';

const STATUS_BADGE = {
  Active:    'badge--active',
  Expirée:   'badge--expired',
  Brouillon: 'badge--draft',
};

const CAND_STATUS = {
  Nouveau:         'cand-status--new',
  Vue:             'cand-status--viewed',
  Présélectionnée: 'cand-status--shortlisted',
  Rejetée:         'cand-status--rejected',
};

const tips = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Rédigez une offre attractive',
    desc: 'Une description claire et détaillée attire plus de candidats qualifiés.',
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
    title: 'Techniques de sélection',
    desc: 'Comment identifier rapidement les profils les plus pertinents.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Conduisez un entretien efficace',
    desc: 'Préparez les bonnes questions pour évaluer les compétences.',
  },
];

export default function EspaceRecruteurDashboard() {
  const r = mockRecruteur;
  const recentOffres = mockOffresRecruteur.slice(0, 5);
  const recentCandidatures = mockCandidaturesRecruteur.slice(0, 5);

  return (
    <div className="recruteur-dashboard-page">
      <div className="container">

        {/* ── Header ─────────────────────────────────── */}
        <div className="rd-header">
          <div>
            <h1 className="rd-greeting">Bonjour {r.name}</h1>
            <p className="rd-company">{r.company}</p>
          </div>
          <Link to="/recruteur/offres/nouvelle" className="btn btn--primary btn--medium">
            Publier une nouvelle offre
          </Link>
        </div>

        {/* ── Stats ──────────────────────────────────── */}
        <div className="rd-stats-grid">
          <div className="rd-stat">
            <div className="rd-stat-icon rd-stat-icon--teal">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <div className="rd-stat-value">{r.stats.offresActives}</div>
            <div className="rd-stat-label">Offres actives</div>
          </div>
          <div className="rd-stat">
            <div className="rd-stat-icon rd-stat-icon--blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="rd-stat-value">{r.stats.candidaturesRecues}</div>
            <div className="rd-stat-label">Candidatures reçues</div>
          </div>
          <div className="rd-stat">
            <div className="rd-stat-icon rd-stat-icon--orange">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="rd-stat-value">{r.stats.candidaturesEnAttente}</div>
            <div className="rd-stat-label">En attente d'examen</div>
          </div>
          <div className="rd-stat">
            <div className="rd-stat-icon rd-stat-icon--purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <div className="rd-stat-value">{r.stats.tauxReponse}%</div>
            <div className="rd-stat-label">Taux de réponse moyen</div>
          </div>
        </div>

        {/* ── Mes offres actives ─────────────────────── */}
        <section className="rd-section">
          <div className="rd-section-header">
            <h2 className="rd-section-title">Mes offres actives</h2>
            <Link to="/recruteur/offres" className="rd-section-link">Voir toutes mes offres</Link>
          </div>
          <div className="rd-table">
            <div className="rd-table-head">
              <span>Titre du poste</span>
              <span>Date de publication</span>
              <span>Candidatures</span>
              <span>Statut</span>
              <span>Actions</span>
            </div>
            {recentOffres.map((offre) => (
              <div key={offre.id} className="rd-table-row">
                <div>
                  <p className="rd-offre-title">{offre.title}</p>
                  <p className="rd-offre-meta">{offre.contractType}</p>
                </div>
                <span className="rd-cell-secondary">{offre.publishedDate}</span>
                <div className="rd-cand-count">
                  <span className="rd-cand-num">{offre.candidatures}</span>
                  {offre.newCandidatures > 0 && (
                    <span className="rd-new-badge">{offre.newCandidatures} nouvelles</span>
                  )}
                </div>
                <span className={`offre-status-badge ${STATUS_BADGE[offre.status] ?? ''}`}>
                  {offre.status}
                </span>
                <div className="rd-row-actions">
                  <Link to={`/recruteur/offres/${offre.id}`} className="rd-action-link">Voir candidatures</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Candidatures récentes ──────────────────── */}
        <section className="rd-section">
          <div className="rd-section-header">
            <h2 className="rd-section-title">Candidatures récentes</h2>
            <Link to="/recruteur/offres/1" className="rd-section-link">Voir toutes les candidatures</Link>
          </div>
          <div className="rd-candidatures-list">
            {recentCandidatures.map((ca) => {
              const cs = CAND_STATUS[ca.status] ?? 'cand-status--new';
              return (
                <div key={ca.id} className="rd-candidature-row">
                  <img src={ca.candidat.avatar} alt={ca.candidat.name} className="rd-cand-avatar" />
                  <div className="rd-cand-info">
                    <p className="rd-cand-name">{ca.candidat.name}</p>
                    <p className="rd-cand-title-text">{ca.candidat.title}</p>
                    <p className="rd-cand-meta">{ca.candidat.experience} · Candidature le {ca.appliedDate}</p>
                    <div className="rd-cand-skills">
                      {ca.candidat.skills.map((s) => (
                        <span key={s} className="rd-skill-badge">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rd-cand-right">
                    <span className={`cand-status-badge ${cs}`}>{ca.status}</span>
                    <div className="rd-cand-actions">
                      <Link to={`/recruteur/candidats/${ca.candidat.id}`} className="btn btn--primary btn--small">
                        Voir le profil
                      </Link>
                      <button className="btn btn--text btn--small">Marquer comme vu</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Actions rapides ─────────────────────────── */}
        <section className="rd-section">
          <h2 className="rd-section-title">Actions rapides</h2>
          <div className="rd-quick-actions">
            <Link to="/recruteur/offres/nouvelle" className="rd-quick-card">
              <div className="rd-quick-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
              <p className="rd-quick-label">Publier une offre</p>
              <p className="rd-quick-sub">Créer et publier une offre</p>
            </Link>
            <Link to="/recherche" className="rd-quick-card">
              <div className="rd-quick-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <p className="rd-quick-label">Rechercher des candidats</p>
              <p className="rd-quick-sub">Trouver des profils</p>
            </Link>
            <Link to="/recruteur/offres" className="rd-quick-card">
              <div className="rd-quick-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <p className="rd-quick-label">Gérer mes offres</p>
              <p className="rd-quick-sub">Voir et modifier mes offres</p>
            </Link>
            <button className="rd-quick-card">
              <div className="rd-quick-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <p className="rd-quick-label">Profil entreprise</p>
              <p className="rd-quick-sub">Gérer la fiche entreprise</p>
            </button>
          </div>
        </section>

        {/* ── Conseils ────────────────────────────────── */}
        <section className="rd-section">
          <h2 className="rd-section-title">Optimisez vos recrutements</h2>
          <div className="rd-tips-grid">
            {tips.map((tip) => (
              <div key={tip.title} className="rd-tip-card">
                <div className="rd-tip-icon">{tip.icon}</div>
                <h3 className="rd-tip-title">{tip.title}</h3>
                <p className="rd-tip-desc">{tip.desc}</p>
                <button className="rd-tip-link">En savoir plus</button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
