import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import JobCard from '../components/features/JobCard';
import './JobSearch.css';

import { jobs } from '../data/jobs';

export default function JobSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');

    const [selectedContractTypes, setSelectedContractTypes] = useState([]);
    const [selectedExperienceLevels, setSelectedExperienceLevels] = useState([]);
    const [selectedSector, setSelectedSector] = useState('Tous les secteurs');
    const [selectedDate, setSelectedDate] = useState('Toutes les dates');

    const industries = ['Tous les secteurs', ...new Set(jobs.map(job => job.industry).filter(Boolean))];
    const dateOptions = [
        'Toutes les dates',
        'Dernières 24h',
        '7 derniers jours',
        '30 derniers jours'
    ];

    const handleCheckboxChange = (e, type, value) => {
        if (type === 'contract') {
            setSelectedContractTypes(prev =>
                e.target.checked ? [...prev, value.trim()] : prev.filter(item => item !== value.trim())
            );
        } else if (type === 'experience') {
            setSelectedExperienceLevels(prev =>
                e.target.checked ? [...prev, value.trim()] : prev.filter(item => item !== value.trim())
            );
        }
    };

    const [sortBy, setSortBy] = useState('Plus récentes');
    const [visibleItems, setVisibleItems] = useState(10);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef(null);

    const handleReset = () => {
        setSearchQuery('');
        setLocation('');
        setSelectedContractTypes([]);
        setSelectedExperienceLevels([]);
        setSelectedSector('Tous les secteurs');
        setSelectedDate('Toutes les dates');
        setSortBy('Plus récentes');
        setVisibleItems(10);
    };

    const getSalaryValue = (salaryStr) => {
        if (!salaryStr) return 0;
        // Basic parser for GNF salary strings
        const matches = salaryStr.match(/(\d+)/g);
        if (matches) return parseInt(matches.join(''));
        return 0;
    };

    const hasActiveFilters = searchQuery.trim() !== '' ||
        location.trim() !== '' ||
        selectedContractTypes.length > 0 ||
        selectedExperienceLevels.length > 0 ||
        selectedSector !== 'Tous les secteurs' ||
        selectedDate !== 'Toutes les dates';

    const allFilteredJobs = useMemo(() => {
        const baseJobs = !hasActiveFilters
            ? [...jobs].sort((a, b) => a.postedDays - b.postedDays)
            : jobs.filter(job => {
                const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
                const matchesContract = selectedContractTypes.length === 0 || selectedContractTypes.includes(job.contractType);
                const matchesExperience = selectedExperienceLevels.length === 0 || selectedExperienceLevels.includes(job.experience) ||
                    (job.experience.includes('Expérimenté') && selectedExperienceLevels.includes('Expérimenté'));
                const matchesSector = selectedSector === 'Tous les secteurs' || job.industry === selectedSector;

                let matchesDate = true;
                if (selectedDate === 'Dernières 24h') matchesDate = job.postedDays <= 1;
                else if (selectedDate === '7 derniers jours') matchesDate = job.postedDays <= 7;
                else if (selectedDate === '30 derniers jours') matchesDate = job.postedDays <= 30;

                return matchesSearch && matchesLocation && matchesContract && matchesExperience && matchesSector && matchesDate;
            });

        if (hasActiveFilters) {
            return baseJobs.sort((a, b) => {
                if (sortBy === 'Plus récentes') return a.postedDays - b.postedDays;
                if (sortBy === 'Salaire décroissant') return getSalaryValue(b.salary) - getSalaryValue(a.salary);
                return 0;
            });
        }
        return baseJobs;
    }, [searchQuery, location, selectedContractTypes, selectedExperienceLevels, selectedSector, selectedDate, sortBy, hasActiveFilters]);

    const filteredJobs = allFilteredJobs.slice(0, visibleItems);

    // Reset pagination when filters change
    useEffect(() => {
        setVisibleItems(10);
    }, [searchQuery, location, selectedContractTypes, selectedExperienceLevels, selectedSector, selectedDate, sortBy]);

    // Infinite Scroll logic
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && visibleItems < allFilteredJobs.length && !isLoadingMore) {
                setIsLoadingMore(true);
                // Simuler un délai réseau
                setTimeout(() => {
                    setVisibleItems(prev => prev + 10);
                    setIsLoadingMore(false);
                }, 800);
            }
        }, { threshold: 1.0 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [visibleItems, allFilteredJobs.length, isLoadingMore]);

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
                        <select
                            className="filter-input"
                            value={selectedSector}
                            onChange={(e) => setSelectedSector(e.target.value)}
                        >
                            {industries.map(industry => (
                                <option key={industry} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Contract Type */}
                    <div className="filter-group">
                        <label>Type de contrat</label>
                        <div className="checkbox-list">
                            {['CDI', 'CDD', 'Stage', 'Freelance'].map(type => (
                                <label key={type} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedContractTypes.includes(type)}
                                        onChange={(e) => handleCheckboxChange(e, 'contract', type)}
                                    />
                                    <span>{type === 'CDI' ? 'CDI (Contrat à Durée Indéterminée)' :
                                        type === 'CDD' ? 'CDD (Contrat à Durée Déterminée)' :
                                            type === 'Freelance' ? 'Freelance/Indépendant' : type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Experience Level */}
                    <div className="filter-group">
                        <label>Niveau d'expérience</label>
                        <div className="checkbox-list">
                            {['Débutant', 'Junior', 'Intermédiaire', 'Expérimenté', 'Senior', 'Expert'].map(level => (
                                <label key={level} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedExperienceLevels.includes(level)}
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
                        <select
                            className="filter-input"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        >
                            {dateOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <motion.button
                        className="btn-search"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { }} // Search is instant anyway
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        Rechercher
                    </motion.button>
                    <button className="btn-reset" onClick={handleReset}>Réinitialiser les filtres</button>
                </motion.aside>

                {/* Main Content */}
                <main className="job-search-main">
                    <motion.div
                        className="results-header"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <h1>{hasActiveFilters ? 'Résultats de recherche' : 'Dernières offres d\'emploi'}</h1>
                            <p className="results-count">
                                {hasActiveFilters
                                    ? `${allFilteredJobs.length} offres d'emploi trouvées`
                                    : 'Les 10 offres les plus récentes'}
                            </p>
                        </div>
                        {hasActiveFilters && (
                            <div className="results-sort">
                                <label>Trier par:</label>
                                <select
                                    className="sort-select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option>Plus récentes</option>
                                    <option>Plus pertinentes</option>
                                    <option>Salaire décroissant</option>
                                </select>
                            </div>
                        )}
                    </motion.div>

                    {/* Job Listings */}
                    <motion.div
                        className="job-listings"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <JobCard key={job.id} job={job} variant="list" />
                            ))
                        ) : (
                            <div className="no-results">
                                <p>Aucune offre ne correspond à vos critères.</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Loading/Sentinel for Infinite Scroll */}
                    {visibleItems < allFilteredJobs.length && (
                        <div ref={loaderRef} className="scroll-loader">
                            {isLoadingMore && (
                                <div className="spinner-container">
                                    <div className="loading-spinner"></div>
                                    <span>Chargement de plus d'offres...</span>
                                </div>
                            )}
                        </div>
                    )}

                    {visibleItems >= allFilteredJobs.length && allFilteredJobs.length > 0 && (
                        <div className="end-of-list">
                            <p>Vous avez vu toutes les offres correspondantes.</p>
                        </div>
                    )}
                </main>
            </div>
        </div >
    );
}
