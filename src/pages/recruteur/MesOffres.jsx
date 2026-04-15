import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockOffresRecruteur } from '../../data/mockData';
import './MesOffres.css';

const STATUS_OPTS = ['Toutes', 'Active', 'Expirée', 'Brouillon'];
const DATE_OPTS   = ['Toutes', 'Cette semaine', 'Ce mois', 'Plus ancien'];
const SORT_OPTS   = ['Plus récentes', 'Plus anciennes', 'Plus de candidatures'];

const STATUS_BADGE = {
  Active:    'badge--active',
  Expirée:   'badge--expired',
  Brouillon: 'badge--draft',
};

export default function MesOffres() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Toutes');
  const [date, setDate]     = useState('Toutes');
  const [sort, setSort]     = useState('Plus récentes');
  const [page, setPage]     = useState(1);
  const PER_PAGE = 10;

  const activeCount  = mockOffresRecruteur.filter((o) => o.status === 'Active').length;
  const expiredCount = mockOffresRecruteur.filter((o) => o.status === 'Expirée').length;
  const totalCands   = mockOffresRecruteur.reduce((s, o) => s + o.candidatures, 0);

  const filtered = useMemo(() => {
    let list = [...mockOffresRecruteur];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((o) => o.title.toLowerCase().includes(q));
    }
    if (status !== 'Toutes') list = list.filter((o) => o.status === status);
    if (sort === 'Plus de candidatures') list.sort((a, b) => b.candidatures - a.candidatures);
    return list;
  }, [search, status, sort]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div className="mes-offres-page">
      <div className="container">

        {/* ── Header ─────────────────────────────────── */}
        <div className="mo-header">
          <div>
            <h1 className="mo-title">Mes offres d'emploi</h1>
            <div className="mo-quick-stats">
              <span className="mo-qs mo-qs--active">
                <span className="mo-qs-dot" />
                {activeCount} Offres actives
              </span>
              <span className="mo-qs mo-qs--expired">
                <span className="mo-qs-dot mo-qs-dot--expired" />
                {expiredCount} Offres expirées
              </span>
              <span className="mo-qs mo-qs--total">
                {totalCands} Total candidatures
              </span>
            </div>
          </div>
          <Link to="/recruteur/offres/nouvelle" className="btn btn--primary btn--medium">
            Publier une nouvelle offre
          </Link>
        </div>

        {/* ── Filtres ────────────────────────────────── */}
        <div className="mo-filters">
          <div className="mo-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="mo-search"
              placeholder="Rechercher par titre de poste..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="mo-filter-row">
            <div className="mo-filter-group">
              <span className="mo-filter-label">Statut :</span>
              {STATUS_OPTS.map((s) => (
                <button key={s} className={`filter-chip ${status === s ? 'filter-chip--active' : ''}`} onClick={() => { setStatus(s); setPage(1); }}>
                  {s}
                </button>
              ))}
            </div>
            <div className="mo-filter-selects">
              <div className="filter-select-wrap">
                <span className="mo-filter-label">Date :</span>
                <select className="filter-select" value={date} onChange={(e) => setDate(e.target.value)}>
                  {DATE_OPTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="filter-select-wrap">
                <span className="mo-filter-label">Tri :</span>
                <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                  {SORT_OPTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Table ──────────────────────────────────── */}
        <div className="mo-table">
          <div className="mo-table-head">
            <span>Titre du poste</span>
            <span>Contrat / Localisation</span>
            <span>Publication / Clôture</span>
            <span>Statut</span>
            <span>Candidatures</span>
            <span>Actions</span>
          </div>

          {paginated.length === 0 ? (
            <div className="mo-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <h2>Aucune offre publiée</h2>
              <p>Commencez à recruter en publiant votre première offre</p>
              <Link to="/recruteur/offres/nouvelle" className="btn btn--primary btn--medium">Publier une offre</Link>
            </div>
          ) : (
            paginated.map((offre) => (
              <div key={offre.id} className="mo-row">
                <div className="mo-row-title-block">
                  <p className="mo-row-title">{offre.title}</p>
                  <p className="mo-row-meta">{offre.contractType}</p>
                </div>
                <span className="mo-cell-secondary">
                  {offre.contractType} · {offre.location}
                </span>
                <div className="mo-cell-dates">
                  <p className="mo-date">{offre.publishedDate}</p>
                  {offre.closingDate && <p className="mo-date mo-date--closing">{offre.closingDate}</p>}
                </div>
                <span className={`offre-status-badge ${STATUS_BADGE[offre.status] ?? ''}`}>
                  {offre.status}
                </span>
                <div className="mo-cand-cell">
                  <span className="mo-cand-num">{offre.candidatures}</span>
                  {offre.newCandidatures > 0 && (
                    <span className="mo-new-badge">{offre.newCandidatures} nouvelles</span>
                  )}
                </div>
                <div className="mo-row-actions">
                  <Link to={`/recruteur/offres/${offre.id}`} className="mo-action-link">Voir candidatures</Link>
                  <button className="mo-action-btn">Modifier</button>
                  <button className="mo-action-btn mo-action-btn--danger">
                    {offre.status === 'Active' ? 'Clôturer' : 'Réactiver'}
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mo-pagination">
              <span className="mo-pagination-info">
                Affichage de {(page - 1) * PER_PAGE + 1} à {Math.min(page * PER_PAGE, filtered.length)} sur {filtered.length} offres
              </span>
              <div className="mo-pages">
                <button className="page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>Précédent</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} className={`page-btn ${p === page ? 'page-btn--active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                ))}
                <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Suivant</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
