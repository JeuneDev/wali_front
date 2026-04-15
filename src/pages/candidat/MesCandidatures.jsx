import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockCandidatures } from '../../data/mockData';
import './MesCandidatures.css';

const STATUS_OPTIONS = ['Toutes', 'Envoyée', 'Vue', "En cours d'examen", 'Rejetée', 'Acceptée'];
const DATE_OPTIONS   = ['Toutes', 'Cette semaine', 'Ce mois', 'Plus ancien'];
const SORT_OPTIONS   = ['Plus récentes', 'Plus anciennes', 'Par statut'];

const STATUS_CONFIG = {
  'Envoyée':          { className: 'status--sent' },
  'Vue':              { className: 'status--viewed' },
  "En cours d'examen":{ className: 'status--reviewing' },
  'Rejetée':          { className: 'status--rejected' },
  'Acceptée':         { className: 'status--accepted' },
};

const stats = [
  { label: 'Total envoyées',       value: mockCandidatures.length },
  { label: "En cours d'examen",    value: mockCandidatures.filter((c) => c.status === "En cours d'examen").length },
  { label: 'Réponses positives',   value: mockCandidatures.filter((c) => c.status === 'Acceptée').length },
  { label: 'Vues par recruteur',   value: mockCandidatures.filter((c) => ['Vue', "En cours d'examen", 'Acceptée'].includes(c.status)).length },
];

const PER_PAGE = 10;

export default function MesCandidatures() {
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('Toutes');
  const [dateFilter, setDate]     = useState('Toutes');
  const [sortBy, setSort]         = useState('Plus récentes');
  const [page, setPage]           = useState(1);

  const filtered = useMemo(() => {
    let list = [...mockCandidatures];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.jobTitle.toLowerCase().includes(q) || c.company.toLowerCase().includes(q));
    }
    if (statusFilter !== 'Toutes') list = list.filter((c) => c.status === statusFilter);
    return list;
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const isEmpty    = filtered.length === 0;

  return (
    <div className="mes-candidatures-page">
      <div className="container">

        {/* ── En-tête ────────────────────────────── */}
        <div className="mc-header">
          <h1 className="mc-title">Mes candidatures</h1>
          <div className="mc-stats">
            {stats.map((s) => (
              <div key={s.label} className="mc-stat">
                <span className="mc-stat-value">{s.value}</span>
                <span className="mc-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filtres ────────────────────────────── */}
        <div className="mc-filters">
          <div className="mc-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="mc-search"
              placeholder="Rechercher par poste ou entreprise..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="mc-filter-row">
            <div className="filter-group">
              <span className="filter-label">Statut :</span>
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  className={`filter-chip ${statusFilter === s ? 'filter-chip--active' : ''}`}
                  onClick={() => { setStatus(s); setPage(1); }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="filter-select-wrap">
              <span className="filter-label">Date :</span>
              <select className="filter-select" value={dateFilter} onChange={(e) => setDate(e.target.value)}>
                {DATE_OPTIONS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="filter-select-wrap">
              <span className="filter-label">Tri :</span>
              <select className="filter-select" value={sortBy} onChange={(e) => setSort(e.target.value)}>
                {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* ── Liste ──────────────────────────────── */}
        {isEmpty ? (
          <div className="mc-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <h2>Aucune candidature pour le moment</h2>
            <p>Commencez à postuler aux offres qui vous intéressent</p>
            <Link to="/recherche" className="btn btn--primary btn--medium">Rechercher des offres</Link>
          </div>
        ) : (
          <div className="mc-table">
            <div className="mc-table-head">
              <span>Poste / Entreprise</span>
              <span>Date</span>
              <span>Statut</span>
              <span>Mise à jour</span>
              <span>Actions</span>
            </div>
            {paginated.map((ca) => {
              const st = STATUS_CONFIG[ca.status] ?? { className: 'status--sent' };
              return (
                <div key={ca.id} className="mc-row">
                  <div className="mc-row-main">
                    <p className="mc-row-title">{ca.jobTitle}</p>
                    <p className="mc-row-company">{ca.company}</p>
                    <p className="mc-row-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {ca.location}
                    </p>
                  </div>
                  <span className="mc-row-date">{ca.appliedDate}</span>
                  <span className={`status-badge ${st.className}`}>{ca.status}</span>
                  <span className="mc-row-update">{ca.lastUpdate}</span>
                  <div className="mc-row-actions">
                    <Link to={`/jobs/${ca.jobId}`} className="mc-action-link">Voir l'offre</Link>
                    <button className="mc-action-danger">Retirer</button>
                  </div>
                </div>
              );
            })}
            <div className="mc-pagination">
              <span className="mc-pagination-info">
                Affichage de {(page - 1) * PER_PAGE + 1} à {Math.min(page * PER_PAGE, filtered.length)} sur {filtered.length} candidature{filtered.length > 1 ? 's' : ''}
              </span>
              {totalPages > 1 && (
                <div className="mc-pages">
                  <button className="page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>Précédent</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} className={`page-btn ${p === page ? 'page-btn--active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                  ))}
                  <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Suivant</button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
