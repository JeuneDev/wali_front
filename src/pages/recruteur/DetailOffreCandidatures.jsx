import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockOffresRecruteur, mockCandidaturesRecruteur } from '../../data/mockData';
import './DetailOffreCandidatures.css';

const STATUS_OPTS = ['Toutes', 'Nouveau', 'Vue', 'Présélectionnée', 'Rejetée'];

const CAND_STATUS = {
  Nouveau:         { className: 'cand-status--new',         label: 'Nouveau' },
  Vue:             { className: 'cand-status--viewed',      label: 'Vue' },
  Présélectionnée: { className: 'cand-status--shortlisted', label: 'Présélectionnée' },
  Rejetée:         { className: 'cand-status--rejected',    label: 'Rejetée' },
};

const OFFRE_STATUS = {
  Active:    'badge--active',
  Expirée:   'badge--expired',
  Brouillon: 'badge--draft',
};

export default function DetailOffreCandidatures() {
  const { id } = useParams();
  const offre = mockOffresRecruteur.find((o) => o.id === Number(id)) ?? mockOffresRecruteur[0];
  const allCandidatures = mockCandidaturesRecruteur;

  const [search, setSearch]   = useState('');
  const [status, setStatus]   = useState('Toutes');
  const [page, setPage]       = useState(1);
  const PER_PAGE = 4;

  const stats = {
    total:          allCandidatures.length,
    nouvelles:      allCandidatures.filter((c) => c.status === 'Nouveau').length,
    preselect:      allCandidatures.filter((c) => c.status === 'Présélectionnée').length,
    rejetees:       allCandidatures.filter((c) => c.status === 'Rejetée').length,
  };

  const filtered = useMemo(() => {
    let list = [...allCandidatures];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.candidat.name.toLowerCase().includes(q));
    }
    if (status !== 'Toutes') list = list.filter((c) => c.status === status);
    return list;
  }, [search, status]);

  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div className="detail-offre-page">
      <div className="container">
        <div className="do-layout">

          {/* ── Contenu principal ──────────────────── */}
          <main className="do-main">

            {/* Breadcrumb */}
            <nav className="breadcrumb">
              <Link to="/">Accueil</Link>
              <span>/</span>
              <Link to="/recruteur/dashboard">Espace recruteur</Link>
              <span>/</span>
              <Link to="/recruteur/offres">Mes offres</Link>
              <span>/</span>
              <span>{offre.title}</span>
            </nav>

            {/* En-tête candidatures */}
            <div className="do-header">
              <h1 className="do-title">Candidatures reçues</h1>
              <div className="do-stats-row">
                <div className="do-stat">
                  <span className="do-stat-value">{stats.total}</span>
                  <span className="do-stat-label">Total candidatures</span>
                </div>
                <div className="do-stat">
                  <span className="do-stat-value do-stat-value--blue">{stats.nouvelles}</span>
                  <span className="do-stat-label">Nouvelles (non vues)</span>
                </div>
                <div className="do-stat">
                  <span className="do-stat-value do-stat-value--green">{stats.preselect}</span>
                  <span className="do-stat-label">Présélectionnées</span>
                </div>
                <div className="do-stat">
                  <span className="do-stat-value do-stat-value--red">{stats.rejetees}</span>
                  <span className="do-stat-label">Rejetées</span>
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="do-filters">
              <div className="do-search-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input className="do-search" placeholder="Rechercher par nom de candidat..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
              </div>
              <div className="do-filter-row">
                <div className="do-filter-group">
                  <span className="do-filter-label">Statut :</span>
                  {STATUS_OPTS.map((s) => (
                    <button key={s} className={`filter-chip ${status === s ? 'filter-chip--active' : ''}`} onClick={() => { setStatus(s); setPage(1); }}>
                      {s}
                    </button>
                  ))}
                </div>
                <div className="do-filter-selects">
                  <select className="filter-select">
                    <option>Plus récentes</option>
                    <option>Plus anciennes</option>
                  </select>
                  <select className="filter-select">
                    <option>Plus pertinentes en premier</option>
                    <option>Alphabétique</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Liste candidatures */}
            <div className="do-candidatures-list">
              {paginated.length === 0 ? (
                <div className="do-empty">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <h2>Aucune candidature reçue</h2>
                  <p>Les candidatures apparaîtront ici dès que des candidats postuleront</p>
                  <button className="btn btn--secondary btn--medium">Partager l'offre</button>
                </div>
              ) : (
                paginated.map((ca) => {
                  const st = CAND_STATUS[ca.status] ?? CAND_STATUS.Nouveau;
                  return (
                    <div key={ca.id} className="do-candidature-card">
                      <div className="do-card-header">
                        <div className="do-card-left">
                          <img src={ca.candidat.avatar} alt={ca.candidat.name} className="do-avatar" />
                          <div>
                            <p className="do-cand-name">{ca.candidat.name}</p>
                            <p className="do-cand-title">{ca.candidat.title}</p>
                            <p className="do-cand-meta">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                              </svg>
                              {ca.candidat.location}
                            </p>
                          </div>
                        </div>
                        <div className="do-card-right">
                          {ca.status === 'Nouveau' && <span className="do-new-dot">Nouveau</span>}
                          <span className={`cand-status-badge ${st.className}`}>{st.label}</span>
                        </div>
                      </div>

                      <div className="do-card-body">
                        <p className="do-exp">{ca.candidat.experience} · Candidature le {ca.appliedDate}</p>
                        <div className="do-skills">
                          {ca.candidat.skills.map((s) => (
                            <span key={s} className="do-skill">{s}</span>
                          ))}
                        </div>
                      </div>

                      <div className="do-card-actions">
                        <Link to={`/recruteur/candidats/${ca.candidat.id}`} className="btn btn--primary btn--small">
                          Voir le profil complet
                        </Link>
                        <button className="btn btn--secondary btn--small">Télécharger CV</button>
                        <div className="do-more-actions">
                          <button className="do-more-btn">···</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="do-pagination">
                <span className="do-pagination-info">Affichage de {(page - 1) * PER_PAGE + 1} à {Math.min(page * PER_PAGE, filtered.length)} sur {filtered.length} candidatures</span>
                <div className="do-pages">
                  <button className="page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>Précédent</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} className={`page-btn ${p === page ? 'page-btn--active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                  ))}
                  <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Suivant</button>
                </div>
              </div>
            )}
          </main>

          {/* ── Sidebar offre ──────────────────────── */}
          <aside className="do-sidebar">
            <div className="do-sidebar-card">
              <h2 className="do-sidebar-title">{offre.title}</h2>
              <span className={`offre-status-badge ${OFFRE_STATUS[offre.status] ?? ''}`} style={{ marginBottom: 'var(--spacing-md)', display: 'inline-block' }}>
                {offre.status}
              </span>
              <div className="do-sidebar-info">
                <div className="do-info-row">
                  <span className="do-info-label">Date de publication</span>
                  <span className="do-info-value">{offre.publishedDate}</span>
                </div>
                {offre.closingDate && (
                  <div className="do-info-row">
                    <span className="do-info-label">Date de clôture</span>
                    <span className="do-info-value">{offre.closingDate}</span>
                  </div>
                )}
                <div className="do-info-row">
                  <span className="do-info-label">Total candidatures</span>
                  <span className="do-info-value do-info-value--bold">{offre.candidatures}</span>
                </div>
              </div>

              <div className="do-sidebar-actions">
                <Link to={`/jobs/${offre.id}`} className="do-sidebar-action">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  Voir l'offre publique
                </Link>
                <button className="do-sidebar-action">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Modifier l'offre
                </button>
                <button className="do-sidebar-action do-sidebar-action--danger">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  Clôturer l'offre
                </button>
                <button className="do-sidebar-action">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  Partager l'offre
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
