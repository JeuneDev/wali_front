import { Link } from 'react-router-dom';
import { mockProfilCandidatRecruteur } from '../../data/mockData';
import './ProfilCandidatVueRecruteur.css';

const STATUS_CONFIG = {
  Nouveau:         { className: 'cand-status--new',         label: 'Nouveau' },
  Vue:             { className: 'cand-status--viewed',      label: 'Vue' },
  Présélectionnée: { className: 'cand-status--shortlisted', label: 'Présélectionnée' },
  Rejetée:         { className: 'cand-status--rejected',    label: 'Rejetée' },
};

export default function ProfilCandidatVueRecruteur() {
  const p = mockProfilCandidatRecruteur;
  const st = STATUS_CONFIG[p.applicationStatus] ?? STATUS_CONFIG.Nouveau;

  return (
    <div className="profil-recruteur-page">
      <div className="container">
        <div className="pr-layout">

          {/* ── Contenu principal ──────────────────── */}
          <main className="pr-main">

            {/* Breadcrumb */}
            <nav className="breadcrumb">
              <Link to="/">Accueil</Link>
              <span>/</span>
              <Link to="/recruteur/dashboard">Espace recruteur</Link>
              <span>/</span>
              <Link to="/recruteur/offres">Mes offres</Link>
              <span>/</span>
              <Link to={`/recruteur/offres/${p.offerId}`}>Candidatures</Link>
              <span>/</span>
              <span>{p.name}</span>
            </nav>

            {/* ── En-tête candidat ─────────────────── */}
            <div className="pr-candidate-header">
              <img src={p.avatar} alt={p.name} className="pr-header-avatar" />
              <div className="pr-candidate-meta">
                <h1 className="pr-candidate-name">{p.name}</h1>
                <p className="pr-candidate-title">{p.title}</p>
                <div className="pr-candidate-details">
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {p.location}
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    {p.email}
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.91 6.91l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    {p.phone}
                  </span>
                  <span className="pr-exp-badge">{p.totalExperience} d'expérience</span>
                </div>
              </div>
            </div>

            {/* ── Lettre de motivation ─────────────── */}
            <section className="pr-section">
              <h2 className="pr-section-title">Lettre de motivation</h2>
              <div className="pr-cover-letter">
                {p.coverLetter.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </section>

            {/* ── À propos ─────────────────────────── */}
            <section className="pr-section">
              <h2 className="pr-section-title">À propos</h2>
              <p className="pr-about">{p.about}</p>
            </section>

            {/* ── Expériences ──────────────────────── */}
            <section className="pr-section">
              <h2 className="pr-section-title">Expériences professionnelles</h2>
              <div className="pr-timeline">
                {p.experiences.map((exp) => (
                  <div key={exp.id} className="pr-timeline-item">
                    <div className="pr-timeline-dot" />
                    <div className="pr-timeline-content">
                      <div className="pr-timeline-header">
                        <p className="pr-timeline-title">{exp.title}</p>
                        <span className="pr-timeline-date">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <p className="pr-timeline-company">{exp.company} · {exp.location}</p>
                      <p className="pr-timeline-desc">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Formation ────────────────────────── */}
            <section className="pr-section">
              <h2 className="pr-section-title">Formation</h2>
              <div className="pr-timeline">
                {p.education.map((edu) => (
                  <div key={edu.id} className="pr-timeline-item">
                    <div className="pr-timeline-dot" />
                    <div className="pr-timeline-content">
                      <div className="pr-timeline-header">
                        <p className="pr-timeline-title">{edu.degree}</p>
                        <span className="pr-timeline-date">{edu.year}</span>
                      </div>
                      <p className="pr-timeline-company">{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Compétences ──────────────────────── */}
            <section className="pr-section">
              <h2 className="pr-section-title">Compétences</h2>
              <div className="pr-skills-block">
                <p className="pr-skills-label">Compétences techniques</p>
                <div className="pr-skills-tags">
                  {p.hardSkills.map((s) => (
                    <span key={s} className="pr-skill pr-skill--hard">{s}</span>
                  ))}
                </div>
              </div>
              <div className="pr-skills-block">
                <p className="pr-skills-label">Compétences comportementales</p>
                <div className="pr-skills-tags">
                  {p.softSkills.map((s) => (
                    <span key={s} className="pr-skill pr-skill--soft">{s}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Préférences ──────────────────────── */}
            <section className="pr-section">
              <h2 className="pr-section-title">Préférences de recherche</h2>
              <div className="pr-prefs-grid">
                <div>
                  <p className="pr-pref-label">Secteurs</p>
                  <div className="pr-pref-tags">
                    {p.preferences.sectors.map((s) => <span key={s} className="pr-pref-tag">{s}</span>)}
                  </div>
                </div>
                <div>
                  <p className="pr-pref-label">Types de contrat</p>
                  <div className="pr-pref-tags">
                    {p.preferences.contractTypes.map((t) => <span key={t} className="pr-pref-tag">{t}</span>)}
                  </div>
                </div>
                <div>
                  <p className="pr-pref-label">Localisations</p>
                  <div className="pr-pref-tags">
                    {p.preferences.locations.map((l) => <span key={l} className="pr-pref-tag">{l}</span>)}
                  </div>
                </div>
                <div>
                  <p className="pr-pref-label">Disponibilité</p>
                  <p className="pr-pref-value">{p.preferences.availability}</p>
                </div>
              </div>
            </section>

            {/* ── Documents ────────────────────────── */}
            <section className="pr-section">
              <h2 className="pr-section-title">Documents</h2>
              <div className="pr-documents">
                {p.documents.map((doc) => (
                  <div key={doc.id} className="pr-doc-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <div className="pr-doc-info">
                      <p className="pr-doc-name">{doc.name}</p>
                      <p className="pr-doc-size">{doc.size}</p>
                    </div>
                    <button className="pr-doc-dl">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Télécharger
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* ── Sidebar ────────────────────────────── */}
          <aside className="pr-sidebar">
            <div className="pr-sidebar-card">
              <img src={p.avatar} alt={p.name} className="pr-sidebar-avatar" />
              <h2 className="pr-sidebar-name">{p.name}</h2>
              <p className="pr-sidebar-title">{p.title}</p>
              <p className="pr-sidebar-location">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {p.location}
              </p>
              <span className={`cand-status-badge ${st.className}`} style={{ marginBottom: 'var(--spacing-md)' }}>
                {st.label}
              </span>
              <p className="pr-sidebar-date">Candidature le {p.applicationDate}</p>

              <div className="pr-sidebar-actions">
                <button className="btn btn--primary btn--medium pr-action-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Présélectionner
                </button>
                <button className="btn btn--secondary btn--medium pr-action-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Télécharger le CV
                </button>
                <button className="btn btn--secondary btn--medium pr-action-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Contacter par email
                </button>
                <button className="btn btn--text btn--medium pr-action-btn pr-reject-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  Rejeter
                </button>
              </div>

              <div className="pr-sidebar-offer">
                <p className="pr-offer-label">Offre concernée</p>
                <p className="pr-offer-title">{p.offerTitle}</p>
                <Link to={`/recruteur/offres/${p.offerId}`} className="pr-offer-link">
                  ← Retour aux candidatures
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
