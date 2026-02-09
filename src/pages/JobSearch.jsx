import { useState } from 'react';
import { motion } from 'framer-motion';
import JobCard from '../components/features/JobCard';
import './JobSearch.css';

import { jobs } from '../data/jobs';

export default function JobSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');

    const [selectedContractTypes, setSelectedContractTypes] = useState([]);
    const [selectedExperienceLevels, setSelectedExperienceLevels] = useState([]);

    const handleCheckboxChange = (e, type, value) => {
        if (type === 'contract') {
            setSelectedContractTypes(prev =>
                e.target.checked ? [...prev, value] : prev.filter(item => item !== value)
            );
        } else if (type === 'experience') {
            setSelectedExperienceLevels(prev =>
                e.target.checked ? [...prev, value] : prev.filter(item => item !== value)
            );
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());

        const matchesContract = selectedContractTypes.length === 0 || selectedContractTypes.includes(job.contractType);

        const matchesExperience = selectedExperienceLevels.length === 0 || selectedExperienceLevels.includes(job.experience);

        return matchesSearch && matchesLocation && matchesContract && matchesExperience;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };


    return (
        <div className="job-search-page">
            <div className="job-search-container">
                {/* Sidebar Filters */}
                <motion.aside
                    className="job-search-sidebar"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="sidebar-title">Affiner la recherche</h2>

                    {/* Search Input */}
                    <div className="filter-group">
                        <label>Titre, mot-clé</label>
                        <input
                            type="text"
                            placeholder="Ex: Développeur, comptable..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    {/* Location */}
                    <div className="filter-group">
                        <label>Localisation</label>
                        <input
                            type="text"
                            placeholder="Ville ou Guinée"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    {/* Sector */}
                    <div className="filter-group">
                        <label>Secteur d'activité</label>
                        <div className="filter-dropdown">
                            <button className="dropdown-btn">
                                Tous les secteurs
                                <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Contract Type */}
                    <div className="filter-group">
                        <label>Type de contrat</label>
                        <div className="checkbox-list">
                            {[' CDI', ' CDD', ' Stage', ' Freelance'].map(type => (
                                <label key={type} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleCheckboxChange(e, 'contract', type)}
                                    />
                                    <span>{type === 'CDI' ? ' CDI (Contrat à Durée Indéterminée)' :
                                        type === 'CDD' ? ' CDD (Contrat à Durée Déterminée)' :
                                            type === 'Freelance' ? ' Freelance/Indépendant' : type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Experience Level */}
                    <div className="filter-group">
                        <label>Niveau d'expérience</label>
                        <div className="checkbox-list">
                            {[' Débutant', ' Junior', ' Intermédiaire', ' Expérimenté', ' Senior', ' Expert'].map(level => (
                                <label key={level} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleCheckboxChange(e, 'experience', level)}
                                    />
                                    <span>{level}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Publication Date */}
                    <div className="filter-group">
                        <label>Date de publication</label>
                        <div className="filter-dropdown">
                            <button className="dropdown-btn">
                                Toutes les dates
                                <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <motion.button
                        className="btn-search"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        Rechercher
                    </motion.button>
                    <button className="btn-reset">Réinitialiser les filtres</button>
                </motion.aside>

                {/* Main Content */}
                <main className="job-search-main">
                    {/* Results Header */}
                    <motion.div
                        className="results-header"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <h1>Résultats de recherche</h1>
                            <p className="results-count">{filteredJobs.length} offres d'emploi trouvées</p>
                        </div>
                        <div className="results-sort">
                            <label>Trier par:</label>
                            <select className="sort-select">
                                <option>Plus récentes</option>
                                <option>Plus pertinentes</option>
                                <option>Salaire décroissant</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Job Listings */}
                    <motion.div
                        className="job-listings"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredJobs.map((job) => (
                            <JobCard key={job.id} job={job} variant="list" />
                        ))}
                    </motion.div>

                    {/* Pagination */}
                    <motion.div
                        className="pagination"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <button className="page-btn" disabled>‹</button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <button className="page-btn">4</button>
                        <button className="page-btn">5</button>
                        <button className="page-btn">›</button>
                        <button className="page-btn">»</button>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
