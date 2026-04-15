import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { mockCandidatsSearch } from '../../data/mockData';
import './CandidatsFavoris.css';

// Use first 5 candidates from search as "saved" candidates by default
const INITIAL_SAVED = mockCandidatsSearch.slice(0, 5);

export default function CandidatsFavoris() {
  const { toast } = useToast();
  const [candidats, setCandidats] = useState(INITIAL_SAVED);
  const [search, setSearch] = useState('');

  const filtered = candidats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const removeFavorite = (id) => {
    setCandidats((prev) => prev.filter((c) => c.id !== id));
    toast.info('Candidat retiré de vos favoris');
  };

  return (
    <div className="cf-page">
      <div className="container">

        {/* Header */}
        <div className="cf-header">
          <div>
            <h1 className="cf-title">Candidats favoris</h1>
            <p className="cf-sub">
              {candidats.length} profil{candidats.length > 1 ? 's' : ''} dans votre shortlist
            </p>
          </div>
          <Link to="/recruteur/recherche-candidats" className="btn btn--primary btn--medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Rechercher plus
          </Link>
        </div>

        {/* Search */}
        {candidats.length > 0 && (
          <div className="cf-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="cf-search"
              placeholder="Rechercher dans la shortlist…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* List */}
        {filtered.length === 0 ? (
          <div className="cf-empty">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <h2>{candidats.length === 0 ? 'Aucun candidat en favoris' : 'Aucun résultat'}</h2>
            <p>
              {candidats.length === 0
                ? 'Parcourez les profils disponibles et ajoutez les candidats qui retiennent votre attention'
                : 'Essayez avec d\'autres mots-clés'}
            </p>
            {candidats.length === 0 && (
              <Link to="/recruteur/recherche-candidats" className="btn btn--primary btn--medium">
                Rechercher des candidats
              </Link>
            )}
          </div>
        ) : (
          <div className="cf-grid">
            {filtered.map((c) => (
              <div key={c.id} className="cf-card">
                <button
                  className="cf-card-remove"
                  onClick={() => removeFavorite(c.id)}
                  title="Retirer des favoris"
                  aria-label="Retirer des favoris"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>

                <img src={c.avatar} alt={c.name} className="cf-card-avatar" />
                <h3 className="cf-card-name">{c.name}</h3>
                <p className="cf-card-title-text">{c.title}</p>

                <div className="cf-card-meta">
                  <span className="cf-meta-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {c.location}
                  </span>
                  <span className="cf-exp-badge">{c.experienceLabel}</span>
                </div>

                <div className="cf-card-skills">
                  {c.skills.slice(0, 3).map((s) => (
                    <span key={s} className="cf-skill">{s}</span>
                  ))}
                  {c.skills.length > 3 && (
                    <span className="cf-skill cf-skill--more">+{c.skills.length - 3}</span>
                  )}
                </div>

                <div className="cf-card-footer">
                  <span className={`cf-avail ${c.availability === 'Immédiate' ? 'cf-avail--now' : 'cf-avail--later'}`}>
                    {c.availability}
                  </span>
                  <Link to={`/recruteur/candidats/${c.id}`} className="cf-card-view">
                    Voir profil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
