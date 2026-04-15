import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { jobs } from '../data/jobs';
import { mockCandidat } from '../data/mockData';
import './Postuler.css';

export default function Postuler() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === Number(id)) ?? jobs[0];
  const c = mockCandidat;

  const [letter, setLetter] = useState('');
  const [acceptShare, setAcceptShare] = useState(false);
  const [acceptAlerts, setAcceptAlerts] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const MAX_CHARS = 3000;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/candidat/candidatures'), 2000);
  };

  if (submitted) {
    return (
      <div className="postuler-page">
        <div className="container container--narrow">
          <div className="postuler-success">
            <div className="success-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2>Candidature envoyée !</h2>
            <p>Votre candidature pour <strong>{job.title}</strong> a été transmise à <strong>{job.company}</strong>.</p>
            <p className="success-sub">Vous pouvez suivre son statut dans votre espace candidat.</p>
            <Link to="/candidat/candidatures" className="btn btn--primary btn--medium">
              Voir mes candidatures
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="postuler-page">
      <div className="container container--narrow">

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Accueil</Link>
          <span>/</span>
          <Link to="/recherche">Recherche</Link>
          <span>/</span>
          <Link to={`/jobs/${id}`}>Détail offre</Link>
          <span>/</span>
          <span>Postuler</span>
        </nav>

        {/* Récapitulatif offre */}
        <div className="postuler-job-recap">
          <div className="recap-info">
            <h1 className="recap-title">{job.title}</h1>
            <p className="recap-company">{job.company}</p>
            <div className="recap-meta">
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {job.location}
              </span>
              <span className="contract-pill">{job.contractType}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Profil pré-rempli info */}
          <div className="prefilled-notice">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>Ces informations proviennent de votre profil.</span>
            <Link to="/candidat/profil/modifier">Modifier mon profil</Link>
          </div>

          {/* Vos informations */}
          <section className="postuler-section">
            <h2 className="postuler-section-title">Vos informations</h2>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Prénom</label>
                <input className="form-input form-input--prefilled" value={c.firstName} readOnly />
              </div>
              <div className="form-field">
                <label className="form-label">Nom</label>
                <input className="form-input form-input--prefilled" value={c.lastName} readOnly />
              </div>
              <div className="form-field form-field--full">
                <label className="form-label">Adresse email</label>
                <input className="form-input form-input--prefilled" value={c.email} readOnly />
              </div>
              <div className="form-field form-field--full">
                <label className="form-label">Numéro de téléphone</label>
                <input className="form-input form-input--prefilled" value={c.phone} readOnly />
              </div>
            </div>
          </section>

          {/* Votre parcours */}
          <section className="postuler-section">
            <h2 className="postuler-section-title">Votre parcours</h2>
            <div className="form-field" style={{ marginBottom: 'var(--spacing-md)' }}>
              <label className="form-label">Résumé de votre expérience</label>
              <textarea className="form-textarea form-input--prefilled" rows={3} value={c.about} readOnly />
            </div>
            <div className="form-field">
              <label className="form-label">Dernière formation / diplôme</label>
              <input className="form-input form-input--prefilled" value={`${c.education[0].degree} — ${c.education[0].institution} (${c.education[0].endYear})`} readOnly />
            </div>
            <p className="parcours-notice">Votre profil complet sera partagé avec le recruteur</p>
          </section>

          {/* Lettre de motivation */}
          <section className="postuler-section">
            <h2 className="postuler-section-title">Lettre de motivation</h2>
            <div className="form-field">
              <label className="form-label">Votre message</label>
              <textarea
                className="form-textarea"
                rows={8}
                placeholder="Expliquez pourquoi ce poste vous intéresse et ce que vous apporteriez à l'entreprise..."
                value={letter}
                onChange={(e) => setLetter(e.target.value.slice(0, MAX_CHARS))}
              />
              <div className="char-counter">
                <span className={letter.length >= MAX_CHARS ? 'char-counter--max' : ''}>
                  {letter.length} / {MAX_CHARS} caractères
                </span>
              </div>
            </div>
          </section>

          {/* Documents */}
          <section className="postuler-section">
            <h2 className="postuler-section-title">Documents</h2>
            <div className="cv-auto-notice">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span><strong>CV automatiquement inclus</strong> — {c.documents[0].name} depuis votre profil sera automatiquement envoyé.</span>
            </div>

            <div className="doc-upload-label-text">Documents complémentaires (optionnel)</div>
            <div className="doc-upload-area">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p>Glissez vos fichiers ici ou</p>
              <button type="button" className="btn btn--secondary btn--small">Parcourir les fichiers</button>
              <p className="doc-hint">PDF, max 5 Mo par fichier</p>
            </div>
          </section>

          {/* Confirmation */}
          <section className="postuler-section postuler-section--confirm">
            <label className="checkbox-label">
              <input type="checkbox" required checked={acceptShare} onChange={(e) => setAcceptShare(e.target.checked)} />
              J'accepte que mes informations soient partagées avec l'entreprise {job.company}
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={acceptAlerts} onChange={(e) => setAcceptAlerts(e.target.checked)} />
              Je souhaite recevoir des offres similaires par email
            </label>
            <div className="postuler-actions">
              <Link to={`/jobs/${id}`} className="btn btn--text btn--medium">Annuler</Link>
              <button type="submit" className="btn btn--primary btn--medium" disabled={!acceptShare}>
                Envoyer ma candidature
              </button>
            </div>
          </section>

        </form>
      </div>
    </div>
  );
}
