import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchBar from '../components/features/SearchBar';
import CategoryCard from '../components/features/CategoryCard';
import JobCard from '../components/features/JobCard';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Typewriter from 'typewriter-effect';
import heroImage from '../assets/hero_image.png';
import recruiterHeroImage from '../assets/hero_recruteur.png';
import './Home.css';

export default function Home() {
    // State for managing image alternation
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroImages = [heroImage, recruiterHeroImage];


    // Mock data for categories
    const categories = [
        {
            id: 1,
            title: 'Informatique & Tech',
            count: '245 offres',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            )
        },
        {
            id: 2,
            title: 'Finance & Comptabilité',
            count: '156 offres',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
            )
        },
        {
            id: 3,
            title: 'Santé & Médical',
            count: '98 offres',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            )
        },
        {
            id: 4,
            title: 'Éducation & Formation',
            count: '134 offres',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
            )
        },
        {
            id: 5,
            title: 'Mines & Extraction',
            count: '89 offres',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
            )
        },
        {
            id: 6,
            title: 'Transport & Logistique',
            count: '67 offres',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
            )
        },
        {
            id: 7,
            title: 'Marketing & Communication',
            count: '72 offres',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            )
        },
        {
            id: 8,
            title: 'Ressources Humaines',
            count: '45 offres',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        }
    ];

    // Mock data for recent jobs
    const recentJobs = [
        {
            id: 1,
            title: 'Développeur Full Stack',
            company: 'TechSolutions Guinée',
            location: 'Conakry',
            type: 'CDI',
            salary: null,
            timeAgo: 'Il y a 2 jours',
            isNew: true
        },
        {
            id: 2,
            title: 'Comptable Senior',
            company: 'Cabinet Expertise',
            location: 'Conakry',
            type: 'CDI',
            salary: null,
            timeAgo: 'Il y a 3 jours',
            isNew: true
        },
        {
            id: 3,
            title: 'Ingénieur Civil',
            company: 'Électricité Mining Corp',
            location: 'Kankan',
            type: 'CDD',
            salary: null,
            timeAgo: 'Il y a 5 jours',
            isNew: false
        },
        {
            id: 4,
            title: 'Responsable RH',
            company: 'Société Générale Guinée',
            location: 'Conakry',
            type: 'CDI',
            salary: null,
            timeAgo: 'Il y a 1 semaine',
            isNew: false
        },
        {
            id: 5,
            title: 'Médecin Généraliste',
            company: 'Clinique Ambroise Paré',
            location: 'Labé',
            type: 'CDI',
            salary: null,
            timeAgo: 'Il y a 1 semaine',
            isNew: false
        },
        {
            id: 6,
            title: 'Chef de Projet Marketing',
            company: 'Orange Guinée',
            location: 'Conakry',
            type: 'CDI',
            salary: null,
            timeAgo: 'Il y a 2 semaines',
            isNew: false
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const heroVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for smooth "pro" feel
            }
        }
    };

    const floatingCardVariants = {
        animate: (custom) => ({
            y: [0, -15, 0],
            transition: {
                duration: custom?.duration || 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: custom?.delay || 0
            }
        })
    };

    const handleSearch = (searchData) => {
        console.log('Search:', searchData);
        // Handle search logic here
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <motion.div
                            className="hero-text"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <h1 className="hero-title">
                                <Typewriter
                                    options={{
                                        autoStart: true,
                                        loop: true,
                                        delay: 50,
                                        deleteSpeed: 30,
                                    }}
                                    onInit={(typewriter) => {
                                        typewriter
                                            .typeString('Trouvez l\'emploi de vos rêves en Guinée')
                                            .pauseFor(4000)
                                            .deleteAll()
                                            .callFunction(() => {
                                                setCurrentImageIndex(1);
                                            })
                                            .typeString('Recrutez les meilleurs talents')
                                            .pauseFor(4000)
                                            .deleteAll()
                                            .callFunction(() => {
                                                setCurrentImageIndex(0);
                                            })
                                            .start();
                                    }}
                                />
                            </h1>
                            <motion.p className="hero-subtitle" variants={heroVariants}>
                                Connectez-vous avec les meilleures opportunités d'emploi et donnez un nouvel élan à votre carrière. Une plateforme moderne pour l'avenir du travail en Guinée.
                            </motion.p>
                            <motion.div className="hero-search-wrapper" variants={heroVariants}>
                                <SearchBar onSearch={handleSearch} />
                            </motion.div>

                            <motion.div className="hero-stats" variants={heroVariants}>
                                <div className="stat-item">
                                    <span className="stat-number">500+</span>
                                    <span className="stat-label">Offres actives</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">2k+</span>
                                    <span className="stat-label">Entreprises</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">10k+</span>
                                    <span className="stat-label">Candidats</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="hero-image-container"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="hero-blob"></div>

                            {/* Animated alternating images */}
                            <div className="hero-img-wrapper">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={heroImages[currentImageIndex]}
                                        alt={currentImageIndex === 0 ? "Candidat heureux trouvant un emploi" : "Recruteur professionnel"}
                                        className="hero-img"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                    />
                                </AnimatePresence>
                            </div>


                            {/* Floating Cards Animation - Context Aware */}
                            <AnimatePresence mode="wait">
                                {currentImageIndex === 0 ? (
                                    // Talent context cards
                                    <motion.div key="talent-cards">
                                        <motion.div
                                            key="talent-success"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <motion.div
                                                className="floating-card card-success"
                                                variants={floatingCardVariants}
                                                animate="animate"
                                                custom={{ duration: 4, delay: 0 }}
                                            >
                                                <div className="icon-success">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </div>
                                                <div className="card-content">
                                                    <span className="card-title">Candidature acceptée</span>
                                                    <span className="card-subtitle">Il y a 2 min</span>
                                                </div>
                                            </motion.div>
                                        </motion.div>

                                        <motion.div
                                            key="talent-profile"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4, delay: 0.1 }}
                                        >
                                            <motion.div
                                                className="floating-card card-profile"
                                                variants={floatingCardVariants}
                                                animate="animate"
                                                custom={{ duration: 5, delay: 1.5 }}
                                            >
                                                <div className="icon-profile">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                        <circle cx="12" cy="7" r="4" />
                                                    </svg>
                                                </div>
                                                <div className="card-content">
                                                    <span className="card-title">Profil complété</span>
                                                    <span className="card-subtitle">100%</span>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    // Recruiter context cards
                                    <motion.div key="recruiter-cards">
                                        <motion.div
                                            key="recruiter-applicants"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <motion.div
                                                className="floating-card card-success"
                                                variants={floatingCardVariants}
                                                animate="animate"
                                                custom={{ duration: 4, delay: 0 }}
                                            >
                                                <div className="icon-success">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                        <circle cx="9" cy="7" r="4" />
                                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                    </svg>
                                                </div>
                                                <div className="card-content">
                                                    <span className="card-title">5 candidats ont postulé</span>
                                                    <span className="card-subtitle">Aujourd'hui</span>
                                                </div>
                                            </motion.div>
                                        </motion.div>

                                        <motion.div
                                            key="recruiter-views"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4, delay: 0.1 }}
                                        >
                                            <motion.div
                                                className="floating-card card-profile"
                                                variants={floatingCardVariants}
                                                animate="animate"
                                                custom={{ duration: 5, delay: 1.5 }}
                                            >
                                                <div className="icon-profile">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                </div>
                                                <div className="card-content">
                                                    <span className="card-title">10 vues de votre offre</span>
                                                    <span className="card-subtitle">Cette semaine</span>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Recent Jobs Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Dernières offres publiées</h2>
                        <Link to="/recherche">
                            <Button variant="text">Voir toutes les offres →</Button>
                        </Link>
                    </div>
                    <motion.div
                        className="jobs-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {recentJobs.map(job => (
                            <motion.div key={job.id} variants={itemVariants}>
                                <JobCard job={job} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="section section-gray">
                <div className="container">
                    <h2 className="section-title text-center">Rechercher par secteur</h2>
                    <motion.div
                        className="categories-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {categories.map(category => (
                            <motion.div key={category.id} variants={itemVariants}>
                                <CategoryCard category={category} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Sections */}
            <section className="section">
                <div className="container">
                    <motion.div
                        className="cta-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <motion.div variants={itemVariants}>
                            <Card className="cta-card">
                                <div className="cta-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <h3 className="cta-title">Créez votre profil candidat</h3>
                                <p className="cta-description">
                                    Construisez un profil complet et recevez des recommandations d'emploi personnalisées directement dans votre boîte mail.
                                </p>
                                <Button variant="primary" size="medium">
                                    Créer mon profil
                                </Button>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="cta-card">
                                <div className="cta-icon cta-icon-secondary">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                    </svg>
                                </div>
                                <h3 className="cta-title">Recrutez les meilleurs talents</h3>
                                <p className="cta-description">
                                    Accédez à une base de candidats qualifiés et publiez vos offres d'emploi pour atteindre les meilleurs profils de Guinée.
                                </p>
                                <Button variant="secondary" size="medium">
                                    Publier une offre
                                </Button>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
