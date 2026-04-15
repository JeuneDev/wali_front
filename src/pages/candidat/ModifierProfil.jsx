import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockCandidat } from '../../data/mockData';
import './ModifierProfil.css';

const SECTORS = ['Informatique & Technologie', 'Finance & Comptabilité', 'Marketing & Communication', 'Mines & Industrie', 'Ressources Humaines', 'Commerce & Vente', 'Santé & Médical'];
const CONTRACT_TYPES = ['CDI', 'CDD', 'Stage', 'Freelance'];
const LOCATIONS = ['Conakry', 'Labé', 'Kindia', 'Kankan', 'Boké'];
const AVAILABILITY = ['Immédiate', '1 mois', '2 mois', '3 mois ou plus'];

const steps = ['Informations', 'Formation', 'Expériences', 'Compétences & Documents'];

export default function ModifierProfil() {
  const navigate = useNavigate();
  const c = mockCandidat;
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);

  // ── form state ──────────────────────────────────
  const [info, setInfo] = useState({
    firstName: c.firstName,
    lastName: c.lastName,
    title: c.title,
    phone: c.phone,
    birthDate: c.birthDate,
    nationality: c.nationality,
    city: c.location,
    address: c.address,
  });

  const [education, setEducation] = useState(c.education);
  const [experiences, setExperiences] = useState(c.experiences);

  const [hardSkillInput, setHardSkillInput] = useState('');
  const [softSkillInput, setSoftSkillInput] = useState('');
  const [hardSkills, setHardSkills] = useState(c.hardSkills);
  const [softSkills, setSoftSkills] = useState(c.softSkills);

  const [prefs, setPrefs] = useState(c.preferences);

  // ── helpers ─────────────────────────────────────
  const addHardSkill = () => {
    const v = hardSkillInput.trim();
    if (v && !hardSkills.includes(v)) setHardSkills([...hardSkills, v]);
    setHardSkillInput('');
  };

  const addSoftSkill = () => {
    const v = softSkillInput.trim();
    if (v && !softSkills.includes(v)) setSoftSkills([...softSkills, v]);
    setSoftSkillInput('');
  };

  const togglePref = (field, value) => {
    const arr = prefs[field];
    setPrefs({
      ...prefs,
      [field]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value],
    });
  };

  const addEducation = () =>
    setEducation([...education, { id: Date.now(), degree: '', institution: '', startYear: '', endYear: '', specialization: '' }]);

  const removeEducation = (id) => setEducation(education.filter((e) => e.id !== id));

  const updateEducation = (id, field, value) =>
    setEducation(education.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const addExperience = () =>
    setExperiences([...experiences, { id: Date.now(), title: '', company: '', startDate: '', endDate: '', isCurrent: false, location: '', description: '' }]);

  const removeExperience = (id) => setExperiences(experiences.filter((e) => e.id !== id));

  const updateExperience = (id, field, value) =>
    setExperiences(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { navigate('/candidat/profil'); }, 1500);
  };

  return (
    <div className="modifier-page">
      <div className="container container--narrow">

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Accueil</Link>
          <span>/</span>
          <Link to="/candidat/dashboard">Mon espace</Link>
          <span>/</span>
          <Link to="/candidat/profil">Mon profil</Link>
          <span>/</span>
          <span>Modifier</span>
        </nav>

        {/* En-tête */}
        <div className="modifier-header">
          <h1 className="modifier-title">Modifier mon profil</h1>
          <p className="modifier-subtitle">Complétez votre profil pour augmenter vos chances</p>
          <div className="modifier-progress-bar">
            <div className="modifier-progress-fill" style={{ width: `${c.profileCompletion}%` }} />
          </div>
        </div>

        {/* Stepper */}
        <div className="stepper">
          {steps.map((s, i) => (
            <button
              key={s}
              className={`step-btn ${i === step ? 'step-btn--active' : ''} ${i < step ? 'step-btn--done' : ''}`}
              onClick={() => setStep(i)}
            >
              <span className="step-num">{i + 1}</span>
              <span className="step-label">{s}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSave}>

          {/* ── Étape 0 : Informations personnelles ── */}
          {step === 0 && (
            <div className="form-card">
              {/* Photo */}
              <section className="form-section">
                <h2 className="form-section-title">Photo de profil</h2>
                <div className="photo-row">
                  <img src={c.avatar} alt="avatar" className="photo-preview" />
                  <div className="photo-actions">
                    <button type="button" className="btn btn--secondary btn--small">Changer la photo</button>
                    <button type="button" className="btn btn--text btn--small">Supprimer la photo</button>
                  </div>
                </div>
              </section>

              {/* Infos */}
              <section className="form-section">
                <h2 className="form-section-title">Informations personnelles</h2>
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label">Prénom *</label>
                    <input className="form-input" value={info.firstName} onChange={(e) => setInfo({ ...info, firstName: e.target.value })} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Nom *</label>
                    <input className="form-input" value={info.lastName} onChange={(e) => setInfo({ ...info, lastName: e.target.value })} required />
                  </div>
                  <div className="form-field form-field--full">
                    <label className="form-label">Titre professionnel *</label>
                    <input className="form-input" value={info.title} onChange={(e) => setInfo({ ...info, title: e.target.value })} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email</label>
                    <input className="form-input form-input--disabled" value={c.email} disabled />
                    <p className="form-hint">L'email ne peut pas être modifié</p>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Téléphone *</label>
                    <input className="form-input" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Date de naissance</label>
                    <input className="form-input" value={info.birthDate} onChange={(e) => setInfo({ ...info, birthDate: e.target.value })} />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Nationalité</label>
                    <input className="form-input" value={info.nationality} onChange={(e) => setInfo({ ...info, nationality: e.target.value })} />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Ville *</label>
                    <input className="form-input" value={info.city} onChange={(e) => setInfo({ ...info, city: e.target.value })} required />
                  </div>
                  <div className="form-field form-field--full">
                    <label className="form-label">Adresse complète</label>
                    <textarea className="form-textarea" rows={2} value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ── Étape 1 : Formation ───────────────── */}
          {step === 1 && (
            <div className="form-card">
              <section className="form-section">
                <div className="section-row">
                  <h2 className="form-section-title">Formation</h2>
                  <button type="button" className="btn btn--secondary btn--small" onClick={addEducation}>
                    + Ajouter une formation
                  </button>
                </div>
                {education.map((edu, idx) => (
                  <div key={edu.id} className="entry-block">
                    <div className="entry-block-header">
                      <span className="entry-label">Formation {idx + 1}</span>
                      <button type="button" className="remove-btn" onClick={() => removeEducation(edu.id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                          <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                        </svg>
                      </button>
                    </div>
                    <div className="form-grid">
                      <div className="form-field form-field--full">
                        <label className="form-label">Diplôme</label>
                        <input className="form-input" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Ex: Licence en Informatique" />
                      </div>
                      <div className="form-field form-field--full">
                        <label className="form-label">Établissement</label>
                        <input className="form-input" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} placeholder="Nom de l'université" />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Année de début</label>
                        <input className="form-input" value={edu.startYear} onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)} placeholder="2020" />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Année de fin</label>
                        <input className="form-input" value={edu.endYear} onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)} placeholder="2023" />
                      </div>
                      <div className="form-field form-field--full">
                        <label className="form-label">Spécialisation</label>
                        <input className="form-input" value={edu.specialization} onChange={(e) => updateEducation(edu.id, 'specialization', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* ── Étape 2 : Expériences ─────────────── */}
          {step === 2 && (
            <div className="form-card">
              <section className="form-section">
                <div className="section-row">
                  <h2 className="form-section-title">Expériences professionnelles</h2>
                  <button type="button" className="btn btn--secondary btn--small" onClick={addExperience}>
                    + Ajouter une expérience
                  </button>
                </div>
                {experiences.map((exp, idx) => (
                  <div key={exp.id} className="entry-block">
                    <div className="entry-block-header">
                      <span className="entry-label">Expérience {idx + 1}</span>
                      <button type="button" className="remove-btn" onClick={() => removeExperience(exp.id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                          <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                        </svg>
                      </button>
                    </div>
                    <div className="form-grid">
                      <div className="form-field form-field--full">
                        <label className="form-label">Poste</label>
                        <input className="form-input" value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Entreprise</label>
                        <input className="form-input" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Localisation</label>
                        <input className="form-input" value={exp.location} onChange={(e) => updateExperience(exp.id, 'location', e.target.value)} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Date de début</label>
                        <input className="form-input" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="MM/AAAA" />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Date de fin</label>
                        <input className="form-input" value={exp.endDate || ''} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="MM/AAAA" disabled={exp.isCurrent} />
                      </div>
                      <div className="form-field form-field--full">
                        <label className="form-checkbox">
                          <input type="checkbox" checked={exp.isCurrent} onChange={(e) => updateExperience(exp.id, 'isCurrent', e.target.checked)} />
                          Poste actuel
                        </label>
                      </div>
                      <div className="form-field form-field--full">
                        <label className="form-label">Description des responsabilités</label>
                        <textarea className="form-textarea" rows={3} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* ── Étape 3 : Compétences & Docs ─────── */}
          {step === 3 && (
            <div className="form-card">
              {/* Compétences */}
              <section className="form-section">
                <h2 className="form-section-title">Compétences</h2>
                <div className="skills-edit-block">
                  <label className="form-label">Compétences techniques</label>
                  <div className="skill-input-row">
                    <input className="form-input" value={hardSkillInput} onChange={(e) => setHardSkillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHardSkill())} placeholder="Ex: React.js" />
                    <button type="button" className="btn btn--secondary btn--small" onClick={addHardSkill}>Ajouter</button>
                  </div>
                  <div className="skills-tags">
                    {hardSkills.map((s) => (
                      <span key={s} className="skill-tag-edit">
                        {s}
                        <button type="button" onClick={() => setHardSkills(hardSkills.filter((x) => x !== s))}>×</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="skills-edit-block">
                  <label className="form-label">Compétences comportementales</label>
                  <div className="skill-input-row">
                    <input className="form-input" value={softSkillInput} onChange={(e) => setSoftSkillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSoftSkill())} placeholder="Ex: Leadership" />
                    <button type="button" className="btn btn--secondary btn--small" onClick={addSoftSkill}>Ajouter</button>
                  </div>
                  <div className="skills-tags">
                    {softSkills.map((s) => (
                      <span key={s} className="skill-tag-edit skill-tag-edit--soft">
                        {s}
                        <button type="button" onClick={() => setSoftSkills(softSkills.filter((x) => x !== s))}>×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Préférences */}
              <section className="form-section">
                <h2 className="form-section-title">Préférences de recherche</h2>
                <div className="form-grid">
                  <div className="form-field form-field--full">
                    <label className="form-label">Secteurs d'activité</label>
                    <div className="checkbox-group">
                      {SECTORS.map((s) => (
                        <label key={s} className="checkbox-label">
                          <input type="checkbox" checked={prefs.sectors.includes(s)} onChange={() => togglePref('sectors', s)} />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Types de contrat</label>
                    <div className="checkbox-group">
                      {CONTRACT_TYPES.map((t) => (
                        <label key={t} className="checkbox-label">
                          <input type="checkbox" checked={prefs.contractTypes.includes(t)} onChange={() => togglePref('contractTypes', t)} />
                          {t}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Localisations</label>
                    <div className="checkbox-group">
                      {LOCATIONS.map((l) => (
                        <label key={l} className="checkbox-label">
                          <input type="checkbox" checked={prefs.locations.includes(l)} onChange={() => togglePref('locations', l)} />
                          {l}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-field form-field--full">
                    <label className="form-label">Disponibilité</label>
                    <select className="form-select" value={prefs.availability} onChange={(e) => setPrefs({ ...prefs, availability: e.target.value })}>
                      {AVAILABILITY.map((a) => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                </div>
              </section>

              {/* Documents */}
              <section className="form-section">
                <h2 className="form-section-title">CV et documents</h2>
                <div className="doc-upload-area">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                  <p className="doc-upload-label">Glissez votre CV ici ou</p>
                  <button type="button" className="btn btn--secondary btn--small">Parcourir les fichiers</button>
                  <p className="doc-upload-hint">PDF, max 5 Mo</p>
                </div>
                <div className="existing-docs">
                  {c.documents.map((doc) => (
                    <div key={doc.id} className="existing-doc-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      <span className="existing-doc-name">{doc.name}</span>
                      <span className="existing-doc-size">{doc.size}</span>
                      <button type="button" className="remove-doc-btn">Supprimer</button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ── Navigation étapes ────────────────── */}
          <div className="step-nav">
            <div className="step-nav-left">
              {step > 0 && (
                <button type="button" className="btn btn--text btn--medium" onClick={() => setStep(step - 1)}>
                  ← Précédent
                </button>
              )}
            </div>
            <div className="step-nav-right">
              <Link to="/candidat/profil" className="btn btn--text btn--medium">Annuler</Link>
              {step < steps.length - 1 ? (
                <button type="button" className="btn btn--primary btn--medium" onClick={() => setStep(step + 1)}>
                  Suivant →
                </button>
              ) : (
                <button type="submit" className="btn btn--primary btn--medium">
                  Enregistrer les modifications
                </button>
              )}
            </div>
          </div>

          {saved && (
            <div className="save-confirmation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Vos modifications ont été enregistrées
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
