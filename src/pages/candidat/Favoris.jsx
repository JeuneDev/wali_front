import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { mockFavoriteJobs } from '../../data/mockData';
import './Favoris.css';

export default function Favoris() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState(mockFavoriteJobs);
  const [search, setSearch] = useState('');

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  const removeFavorite = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    toast.info('Offre retirée des favoris');
  };

  return (
    <div className="fav-page">
      <div className="container">

        {/* Header */}
        <div className="fav-header">
          <div>
            <h1 className="fav-title">Offres sauvegardées</h1>
            <p className="fav-sub">
              {jobs.length} offre{jobs.length > 1 ? 's' : ''} dans vos favoris
            </p>
          </div>
        </div>

        {/* Search */}
        {jobs.length > 0 && (
          <div className="fav-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="fav-search"
              placeholder="Rechercher dans mes favoris…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* List */}
        {filtered.length === 0 ? (
          <div className="fav-empty">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            <h2>{jobs.length === 0 ? 'Aucune offre sauvegardée' : 'Aucun résultat'}</h2>
            <p>
              {jobs.length === 0
                ? 'Parcourez les offres disponibles et sauvegardez celles qui vous intéressent'
                : 'Essayez avec d\'autres mots-clés'}
            </p>
            {jobs.length === 0 && (
              <Link to="/recherche" className="btn btn--primary btn--medium">
                Rechercher des offres
              </Link>
            )}
          </div>
        ) : (
          <div className="fav-grid">
            {filtered.map((job) => (
              <div key={job.id} className="fav-card">
                <div className="fav-card-header">
                  <img src={job.logo} alt={job.company} className="fav-card-logo" />
                  <button
                    className="fav-card-bookmark"
                    onClick={() => removeFavorite(job.id)}
                    title="Retirer des favoris"
                    aria-label="Retirer des favoris"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>

                <h3 className="fav-card-title">{job.title}</h3>
                <p className="fav-card-company">{job.company}</p>

                <div className="fav-card-meta">
                  <span className="fav-meta-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {job.location}
                  </span>
                  <span className="fav-contract-badge">{job.contractType}</span>
                </div>

                <div className="fav-card-tags">
                  {job.tags.map((t) => (
                    <span key={t} className="fav-tag">{t}</span>
                  ))}
                </div>

                <div className="fav-card-footer">
                  <div className="fav-card-footer-info">
                    <span className="fav-card-salary">{job.salary}</span>
                    <span className="fav-card-saved-date">{job.savedDate}</span>
                  </div>
                  <Link to={`/jobs/${job.id}`} className="fav-card-view">
                    Voir l'offre
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
