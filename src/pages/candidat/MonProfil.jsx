import { Link } from 'react-router-dom';
import { mockCandidat } from '../../data/mockData';
import './MonProfil.css';

export default function MonProfil() {
  const c = mockCandidat;

  return (
    <div className="profil-page">
      <div className="container">

        {/* ── En-tête profil ─────────────────────────── */}
        <div className="profil-header-card">
          <div className="profil-header-left">
            <img src={c.avatar} alt={`${c.firstName} ${c.lastName}`} className="profil-avatar" />
            <div>
              <h1 className="profil-name">{c.firstName} {c.lastName}</h1>
              <p className="profil-title-text">{c.title}</p>
              <p className="profil-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {c.location}
              </p>
              <div className="profil-completion-row">
                <div className="completion-bar">
                  <div className="completion-fill" style={{ width: `${c.profileCompletion}%` }} />
                </div>
                <span className="completion-pct">Profil complet à {c.profileCompletion}%</span>
              </div>
            </div>
          </div>
          <Link to="/candidat/profil/modifier" className="btn btn--primary btn--medium">
            Modifier mon profil
          </Link>
        </div>

        <div className="profil-layout">
          <div className="profil-main">

            {/* ── Informations personnelles ───────────── */}
            <section className="profil-section">
              <h2 className="profil-section-title">Informations personnelles</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{c.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Téléphone</span>
                  <span className="info-value">{c.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Date de naissance</span>
                  <span className="info-value">{c.birthDate}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Nationalité</span>
                  <span className="info-value">{c.nationality}</span>
                </div>
                <div className="info-item info-item--full">
                  <span className="info-label">Adresse</span>
                  <span className="info-value">{c.address}</span>
                </div>
              </div>
            </section>

            {/* ── Formation ──────────────────────────── */}
            <section className="profil-section">
              <h2 className="profil-section-title">Formation</h2>
              <div className="timeline">
                {c.education.map((edu) => (
                  <div key={edu.id} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <p className="timeline-title">{edu.degree}</p>
                      <p className="timeline-sub">{edu.institution}</p>
                      <p className="timeline-date">{edu.startYear} – {edu.endYear}</p>
                      {edu.specialization && (
                        <p className="timeline-desc">{edu.specialization}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Expériences ────────────────────────── */}
            <section className="profil-section">
              <h2 className="profil-section-title">Expériences professionnelles</h2>
              <div className="timeline">
                {c.experiences.map((exp) => (
                  <div key={exp.id} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <p className="timeline-title">{exp.title}</p>
                        {exp.isCurrent && <span className="current-badge">Actuellement</span>}
                      </div>
                      <p className="timeline-sub">{exp.company}</p>
                      <p className="timeline-date">
                        {exp.startDate} – {exp.isCurrent ? 'Présent' : exp.endDate} · {exp.location}
                      </p>
                      <p className="timeline-desc">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Compétences ────────────────────────── */}
            <section className="profil-section">
              <h2 className="profil-section-title">Compétences</h2>
              <div className="skills-block">
                <p className="skills-category">Compétences techniques</p>
                <div className="skills-tags">
                  {c.hardSkills.map((s) => (
                    <span key={s} className="skill-tag skill-tag--hard">{s}</span>
                  ))}
                </div>
              </div>
              <div className="skills-block">
                <p className="skills-category">Compétences comportementales</p>
                <div className="skills-tags">
                  {c.softSkills.map((s) => (
                    <span key={s} className="skill-tag skill-tag--soft">{s}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Préférences ────────────────────────── */}
            <section className="profil-section">
              <h2 className="profil-section-title">Préférences de recherche</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Secteurs</span>
                  <div className="pref-tags">
                    {c.preferences.sectors.map((s) => (
                      <span key={s} className="pref-tag">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-label">Types de contrat</span>
                  <div className="pref-tags">
                    {c.preferences.contractTypes.map((t) => (
                      <span key={t} className="pref-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-label">Localisations</span>
                  <div className="pref-tags">
                    {c.preferences.locations.map((l) => (
                      <span key={l} className="pref-tag">{l}</span>
                    ))}
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-label">Disponibilité</span>
                  <span className="info-value">{c.preferences.availability}</span>
                </div>
              </div>
            </section>

            {/* ── Documents ──────────────────────────── */}
            <section className="profil-section">
              <h2 className="profil-section-title">Documents</h2>
              <div className="documents-list">
                {c.documents.map((doc) => (
                  <div key={doc.id} className="document-item">
                    <div className="document-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div className="document-info">
                      <p className="document-name">{doc.name}</p>
                      <p className="document-meta">{doc.size} · Ajouté le {doc.date}</p>
                    </div>
                    <button className="document-download">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

          </div>
        </div>
      </div>
    </div>
  );
}
