import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { mockCandidatures } from '../../data/mockData';
import MatchScore from '../../components/common/MatchScore';
import './MesCandidatures.css';

// ── Constants ─────────────────────────────────
const STATUS_OPTIONS = ['Toutes', 'Envoyée', 'Vue', "En cours d'examen", 'Rejetée', 'Acceptée'];

const DATE_OPTIONS = [
  { value: 'all',   label: 'Toutes les dates' },
  { value: 'week',  label: 'Cette semaine' },
  { value: 'month', label: 'Ce mois' },
  { value: 'older', label: 'Plus ancien' },
];

const SORT_OPTIONS = [
  { value: 'recent', label: 'Plus récentes' },
  { value: 'oldest', label: 'Plus anciennes' },
  { value: 'match',  label: 'Meilleur match IA' },
  { value: 'status', label: 'Par statut' },
];

const STATUS_CONFIG = {
  'Envoyée':          { className: 'status--sent' },
  'Vue':              { className: 'status--viewed' },
  "En cours d'examen":{ className: 'status--reviewing' },
  'Rejetée':          { className: 'status--rejected' },
  'Acceptée':         { className: 'status--accepted' },
};

// Priority order for "Par statut" sort
const STATUS_WEIGHT = {
  "En cours d'examen": 1,
  'Vue':               2,
  'Envoyée':           3,
  'Acceptée':          4,
  'Rejetée':           5,
};

const PER_PAGE = 10;

// Extract days count from "Il y a X jours" / "Il y a X semaines"
function parseDaysAgo(lastUpdate = '') {
  const num = parseInt((lastUpdate.match(/\d+/) || ['0'])[0], 10);
  if (/semaine/i.test(lastUpdate)) return num * 7;
  if (/mois/i.test(lastUpdate))    return num * 30;
  return num;
}

export default function MesCandidatures() {
  const { toast } = useToast();

  // Local state copy so we can remove items
  const [candidatures, setCandidatures] = useState(mockCandidatures);

  // Filters
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatus]   = useState('Toutes');
  const [dateFilter, setDate]       = useState('all');
  const [sortBy, setSort]           = useState('recent');
  const [page, setPage]             = useState(1);

  // Derived stats — reactive to withdrawals
  const stats = useMemo(() => ([
    { key: 'total',    label: 'Total envoyées',    value: candidatures.length },
    { key: 'pending',  label: "En cours d'examen", value: candidatures.filter((c) => c.status === "En cours d'examen").length },
    { key: 'accepted', label: 'Réponses positives', value: candidatures.filter((c) => c.status === 'Acceptée').length },
    { key: 'seen',     label: 'Vues par recruteur', value: candidatures.filter((c) => ['Vue', "En cours d'examen", 'Acceptée'].includes(c.status)).length },
  ]), [candidatures]);

  // Active filter count (for reset button)
  const activeFilterCount = [
    search.trim() !== '',
    statusFilter !== 'Toutes',
    dateFilter !== 'all',
  ].filter(Boolean).length;

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...candidatures];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.jobTitle.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          (c.location || '').toLowerCase().includes(q)
      );
    }

    // Status
    if (statusFilter !== 'Toutes') {
      list = list.filter((c) => c.status === statusFilter);
    }

    // Date — uses lastUpdate parsed to days
    if (dateFilter !== 'all') {
      list = list.filter((c) => {
        const days = parseDaysAgo(c.lastUpdate);
        if (dateFilter === 'week')  return days <= 7;
        if (dateFilter === 'month') return days <= 30;
        if (dateFilter === 'older') return days > 30;
        return true;
      });
    }

    // Sort
    if (sortBy === 'recent')      list.sort((a, b) => parseDaysAgo(a.lastUpdate) - parseDaysAgo(b.lastUpdate));
    else if (sortBy === 'oldest') list.sort((a, b) => parseDaysAgo(b.lastUpdate) - parseDaysAgo(a.lastUpdate));
    else if (sortBy === 'match')  list.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    else if (sortBy === 'status') list.sort((a, b) => (STATUS_WEIGHT[a.status] || 99) - (STATUS_WEIGHT[b.status] || 99));

    return list;
  }, [candidatures, search, statusFilter, dateFilter, sortBy]);

  // Reset page when filter narrows results below current page
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    if (page > maxPage) setPage(maxPage);
  }, [filtered.length, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Empty state type
  const hasNoCandidatures = candidatures.length === 0;
  const hasNoResults      = !hasNoCandidatures && filtered.length === 0;

  // Actions
  const resetFilters = () => {
    setSearch('');
    setStatus('Toutes');
    setDate('all');
    setSort('recent');
    setPage(1);
  };

  const handleWithdraw = (ca) => {
    const confirmed = window.confirm(
      `Retirer votre candidature pour "${ca.jobTitle}" chez ${ca.company} ?\n\nCette action est irréversible.`
    );
    if (!confirmed) return;
    setCandidatures((prev) => prev.filter((c) => c.id !== ca.id));
    toast.success('Candidature retirée');
  };

  return (
    <div className="mes-candidatures-page">
      <div className="container">

        {/* ── En-tête ──────────────────────────── */}
        <div className="mc-header">
          <div>
            <h1 className="mc-title">Mes candidatures</h1>
            <p className="mc-subtitle">
              Suivez l'évolution de vos candidatures en temps réel
            </p>
          </div>
          <div className="mc-stats">
            {stats.map((s) => (
              <div key={s.key} className={`mc-stat mc-stat--${s.key}`}>
                <span className="mc-stat-value">{s.value}</span>
                <span className="mc-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* If user has zero candidatures at all — onboarding empty state */}
        {hasNoCandidatures ? (
          <div className="mc-empty">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <h2>Aucune candidature pour le moment</h2>
            <p>Parcourez les offres disponibles et postulez à celles qui correspondent à votre profil</p>
            <Link to="/recherche" className="btn btn--primary btn--medium">
              Rechercher des offres
            </Link>
          </div>
        ) : (
          <>
            {/* ── Filtres ──────────────────────── */}
            <div className="mc-filters">
              <div className="mc-search-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  className="mc-search"
                  placeholder="Rechercher par poste, entreprise ou ville…"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
                {search && (
                  <button
                    className="mc-search-clear"
                    onClick={() => { setSearch(''); setPage(1); }}
                    aria-label="Effacer la recherche"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
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
                  <select
                    className="filter-select"
                    value={dateFilter}
                    onChange={(e) => { setDate(e.target.value); setPage(1); }}
                  >
                    {DATE_OPTIONS.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-select-wrap">
                  <span className="filter-label">Tri :</span>
                  <select
                    className="filter-select"
                    value={sortBy}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    {SORT_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                {activeFilterCount > 0 && (
                  <button className="mc-reset-btn" onClick={resetFilters}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="1 4 1 10 7 10"/>
                      <path d="M3.51 15a9 9 0 1 0 .49-4.07"/>
                    </svg>
                    Réinitialiser ({activeFilterCount})
                  </button>
                )}
              </div>
            </div>

            {/* ── Résultats ────────────────────── */}
            {hasNoResults ? (
              <div className="mc-empty mc-empty--filtered">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <h2>Aucun résultat</h2>
                <p>Aucune candidature ne correspond à vos filtres. Essayez de les ajuster.</p>
                <button className="btn btn--secondary btn--medium" onClick={resetFilters}>
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="mc-table">
                <div className="mc-table-head">
                  <span>Poste / Entreprise</span>
                  <span>Match IA</span>
                  <span>Date</span>
                  <span>Statut</span>
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

                      <div className="mc-row-match" data-label="Match IA">
                        <MatchScore score={ca.matchScore || 0} size="sm" />
                      </div>

                      <div className="mc-row-date" data-label="Candidature">
                        <span className="mc-row-date-main">{ca.appliedDate}</span>
                        <span className="mc-row-date-sub">{ca.lastUpdate}</span>
                      </div>

                      <div className="mc-row-status" data-label="Statut">
                        <span className={`status-badge ${st.className}`}>{ca.status}</span>
                      </div>

                      <div className="mc-row-actions">
                        <Link to={`/jobs/${ca.jobId}`} className="mc-action-link">
                          Voir l'offre
                        </Link>
                        <button
                          className="mc-action-danger"
                          onClick={() => handleWithdraw(ca)}
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Pagination */}
                <div className="mc-pagination">
                  <span className="mc-pagination-info">
                    {filtered.length > 0 && (
                      <>
                        <strong>{(page - 1) * PER_PAGE + 1}</strong>
                        –<strong>{Math.min(page * PER_PAGE, filtered.length)}</strong>
                        {' '}sur <strong>{filtered.length}</strong> candidature{filtered.length > 1 ? 's' : ''}
                      </>
                    )}
                  </span>
                  {totalPages > 1 && (
                    <div className="mc-pages">
                      <button
                        className="page-btn"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15 18 9 12 15 6"/>
                        </svg>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          className={`page-btn ${p === page ? 'page-btn--active' : ''}`}
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        className="page-btn"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
