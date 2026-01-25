import SearchBar from '../components/features/SearchBar';
import CategoryCard from '../components/features/CategoryCard';
import JobCard from '../components/features/JobCard';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Typewriter from 'typewriter-effect';
import './Home.css';

export default function Home() {
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

    const handleSearch = (searchData) => {
        console.log('Search:', searchData);
        // Handle search logic here
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">
                        <Typewriter
                            options={{
                                strings: ['Trouvez l\'emploi de vos rêves en Guinée'],
                                autoStart: true,
                                loop: true,
                                delay: 50,
                                deleteSpeed: 30,
                                pauseFor: 3000,
                            }}
                        />
                    </h1>
                    <p className="hero-subtitle">
                        Connectez-vous avec les meilleures opportunités d'emploi et donnez un nouvel élan à votre carrière
                    </p>
                    <div className="hero-search">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </section>

            {/* Recent Jobs Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Dernières offres publiées</h2>
                        <Button variant="text">Voir toutes les offres →</Button>
                    </div>
                    <div className="jobs-grid">
                        {recentJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="section section-gray">
                <div className="container">
                    <h2 className="section-title text-center">Rechercher par secteur</h2>
                    <div className="categories-grid">
                        {categories.map(category => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Sections */}
            <section className="section">
                <div className="container">
                    <div className="cta-grid">
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
                    </div>
                </div>
            </section>
        </div>
    );
}
