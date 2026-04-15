import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockRecruteur } from '../../data/mockData';
import './PublierOffre.css';

const SECTORS = ['Informatique & Technologie', 'Finance & Comptabilité', 'Marketing & Communication', 'Mines & Industrie', 'Ressources Humaines', 'Commerce & Vente', 'Santé & Médical', 'Éducation & Formation'];
const CONTRACT_TYPES = ['CDI', 'CDD', 'Stage', 'Freelance'];
const EXPERIENCE_LEVELS = ['Débutant (0-2 ans)', 'Intermédiaire (2-5 ans)', 'Expérimenté (5-10 ans)', 'Senior (10+ ans)'];

const steps = [
  { label: 'Informations générales', desc: 'Étape 1 sur 3' },
  { label: 'Description du poste',   desc: 'Étape 2 sur 3' },
  { label: 'Profil recherché',       desc: 'Étape 3 sur 3' },
];

export default function PublierOffre() {
  const navigate = useNavigate();
  const r = mockRecruteur;
  const [step, setStep] = useState(0);
  const [published, setPublished] = useState(false);

  const [form, setForm] = useState({
    title: '',
    sector: '',
    contractType: '',
    experience: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    hideSalary: false,
    description: '',
    responsibilities: '',
    benefits: '',
    education: '',
    hardSkills: '',
    softSkills: '',
    specificExperience: '',
    closingDate: '',
    companyName: r.company,
    companyDescription: r.companyDescription,
  });

  const update = (field, value) => setForm({ ...form, [field]: value });

  const handlePublish = (e) => {
    e.preventDefault();
    setPublished(true);
    setTimeout(() => navigate('/recruteur/offres'), 2000);
  };

  if (published) {
    return (
      <div className="publier-page">
        <div className="container container--narrow">
          <div className="publier-success">
            <div className="success-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2>Offre publiée avec succès !</h2>
            <p>Votre offre est maintenant visible par tous les candidats.</p>
            <Link to="/recruteur/offres" className="btn btn--primary btn--medium">Voir mes offres</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="publier-page">
      <div className="container container--narrow">

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Accueil</Link>
          <span>/</span>
          <Link to="/recruteur/dashboard">Espace recruteur</Link>
          <span>/</span>
          <span>Publier une offre</span>
        </nav>

        {/* En-tête */}
        <div className="publier-header">
          <h1 className="publier-title">Publier une nouvelle offre</h1>
          <p className="publier-subtitle">Remplissez les informations pour créer une offre attractive</p>
        </div>

        {/* Stepper */}
        <div className="publier-stepper">
          {steps.map((s, i) => (
            <div key={s.label} className={`pub-step ${i === step ? 'pub-step--active' : ''} ${i < step ? 'pub-step--done' : ''}`}>
              <div className="pub-step-circle">{i < step ? '✓' : i + 1}</div>
              <div className="pub-step-text">
                <span className="pub-step-label">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className="pub-step-line" />}
            </div>
          ))}
        </div>
        <p className="publier-step-desc">{steps[step].desc} — {steps[step].label}</p>

        <form onSubmit={handlePublish}>

          {/* ── Étape 0 : Informations générales ──── */}
          {step === 0 && (
            <div className="form-card">
              <section className="form-section">
                <h2 className="form-section-title">Informations générales</h2>
                <div className="form-grid">
                  <div className="form-field form-field--full">
                    <label className="form-label">Titre du poste *</label>
                    <input className="form-input" value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Ex: Développeur Full Stack Senior" required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Secteur d'activité *</label>
                    <select className="form-select" value={form.sector} onChange={(e) => update('sector', e.target.value)} required>
                      <option value="">Sélectionner un secteur</option>
                      {SECTORS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Type de contrat *</label>
                    <select className="form-select" value={form.contractType} onChange={(e) => update('contractType', e.target.value)} required>
                      <option value="">Sélectionner un type</option>
                      {CONTRACT_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Niveau d'expérience *</label>
                    <select className="form-select" value={form.experience} onChange={(e) => update('experience', e.target.value)} required>
                      <option value="">Sélectionner un niveau</option>
                      {EXPERIENCE_LEVELS.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Localisation *</label>
                    <input className="form-input" value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="Ex: Conakry, Kaloum" required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Salaire minimum (GNF)</label>
                    <input className="form-input" value={form.salaryMin} onChange={(e) => update('salaryMin', e.target.value)} placeholder="Ex: 2000000" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Salaire maximum (GNF)</label>
                    <input className="form-input" value={form.salaryMax} onChange={(e) => update('salaryMax', e.target.value)} placeholder="Ex: 3000000" />
                  </div>
                  <div className="form-field form-field--full">
                    <label className="form-checkbox">
                      <input type="checkbox" checked={form.hideSalary} onChange={(e) => update('hideSalary', e.target.checked)} />
                      Ne pas afficher le salaire publiquement
                    </label>
                  </div>
                </div>
              </section>

              {/* Info entreprise */}
              <section className="form-section">
                <div className="section-row">
                  <h2 className="form-section-title">Votre entreprise</h2>
                  <button type="button" className="section-edit-link">Modifier mon profil entreprise</button>
                </div>
                <div className="form-grid">
                  <div className="form-field form-field--full">
                    <label className="form-label">Nom de l'entreprise</label>
                    <input className="form-input form-input--prefilled" value={form.companyName} readOnly />
                  </div>
                  <div className="form-field form-field--full">
                    <label className="form-label">Présentation de l'entreprise</label>
                    <textarea className="form-textarea" rows={4} value={form.companyDescription} onChange={(e) => update('companyDescription', e.target.value)} />
                    <p className="form-hint">Ces informations proviennent de votre profil entreprise</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ── Étape 1 : Description du poste ────── */}
          {step === 1 && (
            <div className="form-card">
              <section className="form-section">
                <h2 className="form-section-title">Description du poste</h2>
                <div className="form-field" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label className="form-label">Description générale *</label>
                  <textarea className="form-textarea" rows={5} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Décrivez les missions principales et le contexte de travail..." required />
                  <p className="form-hint">Décrivez les missions principales et le contexte de travail</p>
                </div>
                <div className="form-field" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label className="form-label">Responsabilités principales</label>
                  <textarea className="form-textarea" rows={5} value={form.responsibilities} onChange={(e) => update('responsibilities', e.target.value)} placeholder="- Développer des applications web&#10;- Collaborer avec l'équipe design&#10;- ..." />
                  <p className="form-hint">Listez les principales missions (une par ligne)</p>
                </div>
                <div className="form-field">
                  <label className="form-label">Avantages offerts</label>
                  <textarea className="form-textarea" rows={3} value={form.benefits} onChange={(e) => update('benefits', e.target.value)} placeholder="Assurance santé, télétravail, formation continue..." />
                  <p className="form-hint">Décrivez les avantages sociaux, conditions de travail, etc.</p>
                </div>
              </section>
            </div>
          )}

          {/* ── Étape 2 : Profil recherché ──────── */}
          {step === 2 && (
            <div className="form-card">
              <section className="form-section">
                <h2 className="form-section-title">Profil du candidat idéal</h2>
                <div className="form-field" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label className="form-label">Formations ou diplômes requis</label>
                  <textarea className="form-textarea" rows={3} value={form.education} onChange={(e) => update('education', e.target.value)} placeholder="Ex: Bac+3 en Informatique ou équivalent" />
                </div>
                <div className="form-field" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label className="form-label">Compétences techniques requises</label>
                  <textarea className="form-textarea" rows={4} value={form.hardSkills} onChange={(e) => update('hardSkills', e.target.value)} placeholder="- React.js&#10;- Node.js&#10;- ..." />
                  <p className="form-hint">Listez les compétences clés (une par ligne)</p>
                </div>
                <div className="form-field" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label className="form-label">Compétences comportementales souhaitées</label>
                  <textarea className="form-textarea" rows={3} value={form.softSkills} onChange={(e) => update('softSkills', e.target.value)} placeholder="Communication, Travail d'équipe, Autonomie..." />
                </div>
                <div className="form-field" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label className="form-label">Expériences spécifiques souhaitées</label>
                  <textarea className="form-textarea" rows={3} value={form.specificExperience} onChange={(e) => update('specificExperience', e.target.value)} placeholder="Ex: Expérience en environnement startup, connaissance du marché guinéen..." />
                </div>
                <div className="form-field">
                  <label className="form-label">Date de clôture (optionnel)</label>
                  <input className="form-input" type="date" value={form.closingDate} onChange={(e) => update('closingDate', e.target.value)} style={{ maxWidth: 200 }} />
                </div>
              </section>
            </div>
          )}

          {/* ── Navigation ───────────────────────── */}
          <div className="publier-nav">
            <button type="button" className="btn btn--text btn--medium" onClick={() => navigate('/recruteur/dashboard')}>
              Annuler
            </button>
            <div className="publier-nav-right">
              {step > 0 && (
                <button type="button" className="btn btn--text btn--medium" onClick={() => setStep(step - 1)}>
                  ← Précédent
                </button>
              )}
              <button type="button" className="btn btn--secondary btn--medium">
                Enregistrer en brouillon
              </button>
              {step < steps.length - 1 ? (
                <button type="button" className="btn btn--primary btn--medium" onClick={() => setStep(step + 1)}>
                  Suivant →
                </button>
              ) : (
                <button type="submit" className="btn btn--primary btn--medium">
                  Publier l'offre
                </button>
              )}
            </div>
          </div>

          <div className="publier-info-bar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Votre offre sera visible immédiatement après publication
          </div>

        </form>
      </div>
    </div>
  );
}
