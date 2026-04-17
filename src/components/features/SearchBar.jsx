import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const LOCATIONS = [
  'Toute la Guinée',
  'Conakry',
  'Kankan',
  'Labé',
  'Nzérékoré',
  'Kindia',
  'Mamou',
  'Boké',
  'Faranah',
];

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('Toute la Guinée');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ keyword, location });
    }
    // Navigate to search page with query params
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (location && location !== 'Toute la Guinée') params.set('location', location);
    navigate(`/recherche${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      {/* Keyword input */}
      <div className="sb-field sb-field--keyword">
        <div className="sb-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <input
          type="text"
          className="sb-input"
          placeholder="Poste, compétence, entreprise…"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label="Rechercher par mot-clé"
        />
      </div>

      {/* Divider */}
      <div className="sb-divider" aria-hidden="true" />

      {/* Location select */}
      <div className="sb-field sb-field--location">
        <div className="sb-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <select
          className="sb-select"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Localisation"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button type="submit" className="sb-submit">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span>Rechercher</span>
      </button>
    </form>
  );
}
