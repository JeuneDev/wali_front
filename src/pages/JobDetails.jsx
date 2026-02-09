import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { jobs } from '../data/jobs';
import Button from '../components/common/Button';
import JobCard from '../components/features/JobCard';
import './JobDetails.css';

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const job = jobs.find(j => j.id === parseInt(id));

    if (!job) {
        return (
            <div className="job-not-found">
                <h2>Offre non trouvée</h2>
                <Button onClick={() => navigate('/recherche')}>Retour aux offres</Button>
            </div>
        );
    }

    const {
        title, company, location, contractType, companyInfo,
        description, responsibilities, requirements,
        offerDetails, benefits, recruitmentProcess, documentsRequired,
        deadline, isUrgent, salary, fullDescription
    } = job;

    // Fallback for older job entries that don't have the new structure
    const isStructured = !!companyInfo;

    return (
        <motion.div
            className="job-details-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="container">
                {/* Breadcrumb / Back Link */}
                <div className="details-top-bar">
                    <Link to="/recherche" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Retour aux offres
                    </Link>
                </div>

                {/* Header Section */}
                <div className="job-details-header">
                    <div className="header-main-info">
                        <div className="header-title-row">
                            <h1 className="details-title">{title}</h1>
                            {isUrgent && <span className="badge-urgent">Urgente</span>}
                        </div>
                        <h2 className="details-company-name">{company}</h2>

                        <div className="header-meta-grid">
                            <div className="meta-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {location}
                            </div>
                            <div className="meta-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                                {contractType}
                            </div>
                            <div className="meta-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                Expérience: {job.experience || 'Non spécifié'}
                            </div>
                            {salary && (
                                <div className="meta-item highlight">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="1" x2="12" y2="23" />
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                    {salary}
                                </div>
                            )}
                        </div>

                        <div className="header-dates">
                            <span>Publié il y a {job.postedDays} jours</span>
                            {deadline && <span className="date-separator">•</span>}
                            {deadline && <span>Date limite : {deadline}</span>}
                        </div>
                    </div>

                    <div className="job-header-actions">
                        <Button variant="primary" size="large" className="btn-apply-main">Postuler maintenant</Button>
                        <Button variant="outline" size="large" className="btn-save">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                            Sauvegarder
                        </Button>
                    </div>
                </div>

                <div className="job-details-layout">
                    {/* Main Content Column */}
                    <div className="details-main-column">

                        {/* Description Section */}
                        <section className="details-section">
                            <h3 className="section-title">Description du poste</h3>
                            {isStructured ? (
                                <div className="text-content">
                                    <p>{description}</p>

                                    {responsibilities && (
                                        <>
                                            <h4>Responsabilités principales</h4>
                                            <ul>
                                                {responsibilities.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="text-content" dangerouslySetInnerHTML={{ __html: fullDescription }}></div>
                            )}
                        </section>

                        {/* Profile / Requirements Section */}
                        {requirements && (
                            <section className="details-section">
                                <h3 className="section-title">Profil recherché</h3>

                                <div className="requirements-group">
                                    <h4>Niveau d'expérience</h4>
                                    <p>{requirements.experience}</p>
                                </div>

                                <div className="requirements-group">
                                    <h4>Formation requise</h4>
                                    <p>{requirements.education}</p>
                                </div>

                                <div className="requirements-group">
                                    <h4>Compétences techniques requises</h4>
                                    <div className="skills-tags">
                                        {requirements.hardSkills.map((skill, idx) => (
                                            <span key={idx} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>

                                {requirements.softSkills && (
                                    <div className="requirements-group">
                                        <h4>Compétences comportementales</h4>
                                        <ul className="check-list">
                                            {requirements.softSkills.map((skill, idx) => (
                                                <li key={idx}>{skill}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Offer Section */}
                        {offerDetails && (
                            <section className="details-section">
                                <h3 className="section-title">Ce que nous offrons</h3>
                                <div className="offer-grid">
                                    <div className="offer-item">
                                        <span className="offer-label">Type de contrat</span>
                                        <span className="offer-value">{offerDetails.contract}</span>
                                    </div>
                                    <div className="offer-item">
                                        <span className="offer-label">Salaire</span>
                                        <span className="offer-value">{offerDetails.salary}</span>
                                    </div>
                                    <div className="offer-item">
                                        <span className="offer-label">Lieu de travail</span>
                                        <span className="offer-value">{offerDetails.location}</span>
                                    </div>
                                    <div className="offer-item">
                                        <span className="offer-label">Horaires</span>
                                        <span className="offer-value">{offerDetails.hours}</span>
                                    </div>
                                </div>

                                {benefits && (
                                    <div className="benefits-list">
                                        <h4>Avantages sociaux</h4>
                                        <ul>
                                            {benefits.map((benefit, idx) => (
                                                <li key={idx}>{benefit}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Recruitment Process */}
                        {recruitmentProcess && (
                            <section className="details-section">
                                <h3 className="section-title">Comment postuler</h3>
                                <div className="process-timeline">
                                    <h4>Étapes du processus de recrutement</h4>
                                    <div className="timeline-steps">
                                        {recruitmentProcess.map((step, idx) => (
                                            <div key={idx} className="timeline-step">
                                                <div className="step-number">{step.id}</div>
                                                <div className="step-content">
                                                    <h5>{step.title}</h5>
                                                    <p>{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {documentsRequired && (
                                    <div className="documents-required">
                                        <h4>Documents requis</h4>
                                        <ul>
                                            {documentsRequired.map((doc, idx) => (
                                                <li key={idx}>{doc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="deadline-alert">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    <div>
                                        <strong>Date limite de candidature</strong>
                                        <p>{deadline || 'Non spécifiée'}</p>
                                    </div>
                                </div>

                                <Button variant="primary" size="large" className="btn-apply-bottom">Postuler maintenant</Button>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <aside className="details-sidebar-column">
                        {/* Company Card */}
                        <div className="sidebar-card company-card">
                            {job.logo && (
                                <div className="company-logo-wrapper">
                                    <img src={job.logo} alt={company} className="company-logo" />
                                </div>
                            )}
                            <h3 className="sidebar-company-name">{companyInfo?.name || company}</h3>
                            <p className="sidebar-company-industry">{companyInfo?.industry || 'Secteur non spécifié'}</p>

                            <div className="company-meta">
                                {companyInfo?.employees && (
                                    <div className="company-meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                        {companyInfo.employees}
                                    </div>
                                )}
                                {companyInfo?.founded && (
                                    <div className="company-meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        Fondée en {companyInfo.founded}
                                    </div>
                                )}
                                {companyInfo?.location && (
                                    <div className="company-meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {companyInfo.location}
                                    </div>
                                )}
                            </div>

                            {companyInfo?.description && (
                                <div className="company-description">
                                    <h4>À propos de l'entreprise</h4>
                                    <p>{companyInfo.description}</p>
                                </div>
                            )}

                            <Link to="#" className="btn-view-offers">Voir toutes les offres de cette entreprise</Link>
                        </div>

                        {/* Quick Actions */}
                        <div className="sidebar-card actions-card">
                            <h3>Actions rapides</h3>
                            <button className="action-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                                Partager cette offre
                            </button>
                            <button className="action-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                                    <line x1="4" y1="22" x2="4" y2="15" />
                                </svg>
                                Signaler un problème
                            </button>
                            <button className="action-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                Créer une alerte similaire
                            </button>
                        </div>
                    </aside>
                </div>

                {/* Similar Jobs Section */}
                <div className="similar-jobs-section">
                    <h3>Offres similaires</h3>
                    <div className="similar-jobs-grid">
                        {jobs
                            .filter(j => j.id !== job.id)
                            .slice(0, 3)
                            .map(similarJob => (
                                <JobCard key={similarJob.id} job={similarJob} />
                            ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
