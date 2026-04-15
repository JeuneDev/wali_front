import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockCandidatsSearch } from '../../data/mockData';
import './RechercheCandidats.css';

// ── Constants ──────────────────────────────────
const SECTORS = [
  'Informatique & Technologie',
  'Finance & Comptabilité',
  'Marketing & Communication',
  'Ressources Humaines',
  'Commerce & Vente',
  'BTP & Immobilier',
  'Mines & Énergie',
  'Administration & Secrétariat',
  'Juridique',
];

const EXPERIENCE_OPTIONS = [
  { label: 'Tous niveaux', value: 'all' },
  { label: 'Débutant (0–2 ans)', value: '0-2' },
  { label: 'Intermédiaire (3–5 ans)', value: '3-5' },
  { label: 'Confirmé (6–9 ans)', value: '6-9' },
  { label: 'Expert (10+ ans)', value: '10+' },
];

const AVAILABILITY_OPTIONS = ['Toutes', 'Immédiate', 'Sous préavis'];

const CONTRACT_OPTIONS = ['Tous', 'CDI', 'CDD', 'Freelance'];

const SORT_OPTIONS = [
  { label: 'Pertinence', value: 'relevance' },
  { label: 'Plus expérimentés', value: 'exp-desc' },
  { label: 'Moins expérimentés', value: 'exp-asc' },
];

const PER_PAGE = 8;

function expLevel(years) {
  if (years <= 2) return { label: 'Débutant', cls: 'exp--junior' };
  if (years <= 5) return { label: 'Intermédiaire', cls: 'exp--mid' };
  if (years <= 9) return { label: 'Confirmé', cls: 'exp--senior' };
  return { label: 'Expert', cls: 'exp--expert' };
}

function matchesExpFilter(years, filter) {
  if (filter === 'all') return true;
  if (filter === '0-2') return years <= 2;
  if (filter === '3-5') return years >= 3 && years <= 5;
  if (filter === '6-9') return years >= 6 && years <= 9;
  if (filter === '10+') return years >= 10;
  return true;
}

// ── Component ──────────────────────────────────
export default function RechercheCandidats() {
  const [query, setQuery]           = useState('');
  const [sectors, setSectors]       = useState([]);
  const [expFilter, setExpFilter]   = useState('all');
  const [availability, setAvail]    = useState('Toutes');
  const [contract, setContract]     = useState('Tous');
  const [sortBy, setSort]           = useState('relevance');
  const [page, setPage]             = useState(1);
  const [saved, setSaved]           = useState(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Active filter count (for badge)
  const activeFilterCount = [
    sectors.length > 0,
    expFilter !== 'all',
    availability !== 'Toutes',
    contract !== 'Tous',
  ].filter(Boolean).length;

  // Toggle sector chip
  const toggleSector = (s) => {
    setSectors((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
    setPage(1);
  };

  const resetFilters = () => {
    setQuery('');
    setSectors([]);
    setExpFilter('all');
    setAvail('Toutes');
    setContract('Tous');
    setSort('relevance');
    setPage(1);
  };

  // Filtering + sorting
  const results = useMemo(() => {
    let list = [...mockCandidatsSearch];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (sectors.length > 0) {
      list = list.filter((c) => sectors.includes(c.sector));
    }

    if (expFilter !== 'all') {
      list = list.filter((c) => matchesExpFilter(c.experienceYears, expFilter));
    }

    if (availability !== 'Toutes') {
      list = list.filter((c) => c.availability.startsWith(availability));
    }

    if (contract !== 'Tous') {
      list = list.filter((c) => c.contractTypes.includes(contract));
    }

    if (sortBy === 'exp-desc') list.sort((a, b) => b.experienceYears - a.experienceYears);
    else if (sortBy === 'exp-asc') list.sort((a, b) => a.experienceYears - b.experienceYears);

    return list;
  }, [query, sectors, expFilter, availability, contract, sortBy]);

  const totalPages = Math.ceil(results.length / PER_PAGE);
  const paginated  = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="rc-page">
      <div className="rc-container">

        {/* ── Page header ─────────────────────── */}
        <div className="rc-page-header">
          <div>
            <h1 className="rc-page-title">Rechercher des candidats</h1>
            <p className="rc-page-sub">
              {results.length} profil{results.length !== 1 ? 's' : ''} disponible{results.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* ── Search + filters bar ─────────────── */}
        <div className="rc-toolbar">
          {/* Search */}
          <div className="rc-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="rc-search"
              type="text"
              placeholder="Nom, titre, compétence…"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            />
            {query && (
              <button className="rc-search-clear" onClick={() => { setQuery(''); setPage(1); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Filter toggles */}
          <div className="rc-filter-pills">
            <select
              className="rc-select"
              value={expFilter}
              onChange={(e) => { setExpFilter(e.target.value); setPage(1); }}
            >
              {EXPERIENCE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <select
              className="rc-select"
              value={availability}
              onChange={(e) => { setAvail(e.target.value); setPage(1); }}
            >
              {AVAILABILITY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>

            <select
              className="rc-select"
              value={contract}
              onChange={(e) => { setContract(e.target.value); setPage(1); }}
            >
              {CONTRACT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>

            <button
              className={`rc-filter-btn ${filtersOpen ? 'rc-filter-btn--open' : ''}`}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              Secteurs
              {sectors.length > 0 && <span className="rc-filter-badge">{sectors.length}</span>}
            </button>

            {activeFilterCount > 0 && (
              <button className="rc-reset-btn" onClick={resetFilters}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.07"/>
                </svg>
                Réinitialiser ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="rc-sort-wrap">
            <span className="rc-sort-label">Trier :</span>
            <select
              className="rc-select"
              value={sortBy}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Sector chips (collapsible) ───────── */}
        {filtersOpen && (
          <div className="rc-sector-panel">
            <p className="rc-sector-label">Secteur d'activité</p>
            <div className="rc-sector-chips">
              {SECTORS.map((s) => (
                <button
                  key={s}
                  className={`rc-chip ${sectors.includes(s) ? 'rc-chip--active' : ''}`}
                  onClick={() => toggleSector(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Results ─────────────────────────── */}
        {paginated.length === 0 ? (
          <div className="rc-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <h2>Aucun profil trouvé</h2>
            <p>Essayez de modifier vos filtres ou d'élargir votre recherche</p>
            <button className="btn btn--secondary btn--medium" onClick={resetFilters}>
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="rc-results">
            {paginated.map((c) => {
              const lvl    = expLevel(c.experienceYears);
              const isSaved = saved.has(c.id);

              return (
                <div key={c.id} className="rc-card">
                  {/* ── Left: identity ── */}
                  <div className="rc-card-identity">
                    <img src={c.avatar} alt={c.name} className="rc-card-avatar" />
                    <div className="rc-card-bio">
                      <div className="rc-card-name-row">
                        <h3 className="rc-card-name">{c.name}</h3>
                        <span className={`rc-exp-badge ${lvl.cls}`}>{lvl.label}</span>
                      </div>
                      <p className="rc-card-title">{c.title}</p>
                      <div className="rc-card-meta">
                        <span className="rc-meta-item">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                          </svg>
                          {c.location}
                        </span>
                        <span className="rc-meta-item">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          {c.experienceLabel}
                        </span>
                        <span className="rc-meta-item rc-meta-item--sector">{c.sector}</span>
                      </div>
                    </div>
                  </div>

                  {/* ── Middle: skills + availability ── */}
                  <div className="rc-card-details">
                    <div className="rc-skills">
                      {c.skills.slice(0, 4).map((s) => (
                        <span key={s} className="rc-skill-tag">{s}</span>
                      ))}
                      {c.skills.length > 4 && (
                        <span className="rc-skill-more">+{c.skills.length - 4}</span>
                      )}
                    </div>
                    <div className="rc-card-badges">
                      <span className={`rc-avail-badge ${c.availability === 'Immédiate' ? 'rc-avail--now' : 'rc-avail--later'}`}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {c.availability}
                      </span>
                      {c.contractTypes.map((ct) => (
                        <span key={ct} className="rc-contract-badge">{ct}</span>
                      ))}
                    </div>
                  </div>

                  {/* ── Right: actions ── */}
                  <div className="rc-card-actions">
                    <button
                      className={`rc-save-btn ${isSaved ? 'rc-save-btn--saved' : ''}`}
                      onClick={() => toggleSave(c.id)}
                      title={isSaved ? 'Retirer des favoris' : 'Sauvegarder le profil'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                      </svg>
                    </button>
                    <Link
                      to={`/recruteur/candidats/${c.id}`}
                      className="rc-view-btn"
                    >
                      Voir le profil
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Pagination ──────────────────────── */}
        {totalPages > 1 && (
          <div className="rc-pagination">
            <span className="rc-pagination-info">
              {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, results.length)} sur {results.length} profil{results.length > 1 ? 's' : ''}
            </span>
            <div className="rc-pages">
              <button className="rc-page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`rc-page-btn ${p === page ? 'rc-page-btn--active' : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button className="rc-page-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
