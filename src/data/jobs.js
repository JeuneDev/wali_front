export const jobs = [
    {
        id: 1,
        title: 'Développeur Full Stack Senior',
        company: 'TechSolutions Guinée',
        location: 'Conakry, Kaloum',
        contractType: 'CDI',
        experience: 'Expérimenté (5-10 ans)',
        salary: '5 000 000 - 8 000 000 GNF',
        postedDays: 2,
        deadline: '15 janvier 2026',
        isUrgent: true,
        logo: 'https://ui-avatars.com/api/?name=Tech+Solutions&background=0D9488&color=fff',
        companyInfo: {
            name: 'TechSolutions Guinée',
            industry: 'Informatique & Technologie',
            employees: '50-100 employés',
            founded: '2015',
            location: 'Conakry, Guinée',
            description: "TechSolutions Guinée est une entreprise leader dans le développement de solutions technologiques innovantes. Nous accompagnons les entreprises guinéennes dans leur transformation digitale."
        },
        description: "Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe dynamique et contribuer au développement de solutions innovantes pour nos clients guinéens et internationaux. En tant que Développeur Full Stack Senior, vous serez responsable de la conception, du développement et de la maintenance d'applications web modernes en utilisant les dernières technologies.",
        responsibilities: [
            "Développer des applications web complètes en utilisant React, Node.js et des bases de données relationnelles",
            "Collaborer avec les équipes de design et de produit pour implémenter les fonctionnalités",
            "Optimiser les performances des applications et assurer la qualité du code",
            "Mentorer les développeurs juniors et participer aux revues de code",
            "Maintenir et améliorer l'architecture technique existante"
        ],
        requirements: {
            experience: '5 ans d\'expérience en développement web full stack',
            education: 'Diplôme d\'ingénieur en informatique, Master en développement web ou équivalent',
            hardSkills: ['React.js', 'Node.js', 'Java Spring Boot', 'TypeScript', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Git'],
            softSkills: [
                "Excellentes capacités de communication en français et anglais",
                "Esprit d'équipe et capacité à travailler en mode collaboratif",
                "Autonomie et capacité à gérer plusieurs projets simultanément",
                "Curiosité technique et veille technologique permanente"
            ]
        },
        offerDetails: {
            contract: 'CDI - Temps plein',
            salary: '5 000 000 - 8 000 000 GNF/mois',
            location: 'Conakry, Kaloum - Bureau moderne',
            hours: 'Lun-Ven 8h-17h, Flexible possible'
        },
        benefits: [
            "Assurance maladie complète pour l'employé et sa famille",
            "Formation continue et certifications professionnelles payées",
            "Primes de performance et bonus annuel",
            "Transport d'entreprise ou allocation transport",
            "Équipement informatique de qualité fourni"
        ],
        recruitmentProcess: [
            { id: 1, title: 'Candidature en ligne', description: 'Soumission du CV et de la lettre de motivation' },
            { id: 2, title: 'Entretien téléphonique', description: 'Discussion préliminaire avec les RH (15 min)' },
            { id: 3, title: 'Test technique', description: 'Évaluation pratique des compétences de développement' },
            { id: 4, title: 'Entretien final', description: 'Rencontre avec l\'équipe technique et le manager' }
        ],
        documentsRequired: [
            "CV détaillé au format PDF",
            "Lettre de motivation personnalisée",
            "Portfolio ou liens vers vos projets GitHub",
            "Copies des diplômes et certifications"
        ]
    },
    {
        id: 2,
        title: 'Comptable Senior',
        company: 'Cabinet d\'Expertise Comptable Guinée',
        location: 'Conakry, Matam',
        contractType: 'CDI',
        experience: 'Expérimenté',
        description: 'Recherche d\'un comptable senior pour gérer la comptabilité de nos clients et superviser une équipe de juniors. Connaissance des normes OHADA requise. Excellentes compétences en gestion d\'équipe et communication.',
        salary: '2 à 4 M GNF',
        postedDays: 3,
        isUrgent: true,
        fullDescription: `
            <h3>Description du poste</h3>
            <p>Notre cabinet recherche un Comptable Senior pour renforcer notre équipe d'audit et d'expertise comptable.</p>

            <h3>Missions</h3>
            <ul>
                <li>Gestion d'un portefeuille clients diversifié.</li>
                <li>Supervision de la tenue comptable et révision des comptes.</li>
                <li>Établissement des déclarations fiscales et sociales.</li>
                <li>Encadrement et formation des comptables juniors.</li>
            </ul>

            <h3>Profil recherché</h3>
            <ul>
                <li>Diplôme supérieur en Comptabilité/Gestion (Master CCA, DSCG...).</li>
                <li>Minimum 4 ans d'expérience en cabinet comptable.</li>
                <li>Maîtrise parfaite du référentiel OHADA.</li>
                <li>Rigueur, organisation et sens du service client.</li>
            </ul>
        `
    },
    {
        id: 3,
        title: 'Chef de Projet Marketing Digital',
        company: 'Orange Guinée',
        location: 'Conakry, Kaloum',
        contractType: 'CDI',
        experience: 'Intermédiaire',
        description: 'Pilotez nos campagnes marketing digitales et développez nos stratégies d\'acquisition clients. Expérience en SEO/SEM et réseaux sociaux indispensable. Créativité et sens de l\'analyse requis.',
        salary: '3 à 5 M GNF',
        postedDays: 1,
        isUrgent: false,
        fullDescription: "Description détaillée à venir..."
    },
    {
        id: 4,
        title: 'Ingénieur Civil - Mines',
        company: 'Compagnie des Bauxites de Guinée',
        location: 'Boké',
        contractType: 'CDI',
        experience: 'Expérimenté',
        description: 'Supervision des travaux de construction civile sur nos projets de construction. Connaissance du suivi des projets de construction minière souhaitée. Déplacements fréquents sur site.',
        salary: '4 à 6 M GNF',
        postedDays: 4,
        isUrgent: false,
        fullDescription: "Description détaillée à venir..."
    },
    {
        id: 5,
        title: 'Responsable Ressources Humaines',
        company: 'Société Générale Guinée',
        location: 'Conakry, Kaloum',
        contractType: 'CDI',
        experience: 'Expérimenté',
        description: 'Gestion complète du RH : recrutement, formation, gestion des carrières et relations sociales. Expérience en RH en entreprise dans le secteur bancaire souhaitée. Leadership et diplomatie essentiels.',
        salary: '3 à 5 M GNF',
        postedDays: 5,
        isUrgent: false,
        fullDescription: "Description détaillée à venir..."
    },
    {
        id: 6,
        title: 'Médecin Généraliste',
        company: 'Clinique Ambroise Paré',
        location: 'Conakry, Ratoma',
        contractType: 'CDD',
        experience: 'Intermédiaire',
        description: 'Consultation médicale générale, suivi des patients et coordination avec les spécialistes. Diplôme de médecine générale et expérience clinique requise. Excellentes compétences relationnelles.',
        salary: '2 à 3 M GNF',
        postedDays: 3,
        isUrgent: false,
        fullDescription: "Description détaillée à venir..."
    },
    {
        id: 7,
        title: 'Assistant Commercial',
        company: 'Guinée Telecom',
        location: 'Labé',
        contractType: 'CDD',
        experience: 'Débutant',
        description: 'Support à l\'équipe commerciale, prospection client et suivi des ventes. Bonne maîtrise des outils bureautiques et sens du relationnel requis. Formation assurée en interne.',
        salary: '1 à 2 M GNF',
        postedDays: 2,
        isUrgent: false,
        fullDescription: "Description détaillée à venir..."
    },
    {
        id: 8,
        title: 'Professeur de Mathématiques',
        company: 'Lycée Privé Excellence',
        location: 'Conakry, Dixinn',
        contractType: 'CDI',
        experience: 'Intermédiaire',
        description: 'Enseignement des mathématiques aux élèves du lycée. Licence en mathématiques et expérience pédagogique souhaitée. Passion pour l\'enseignement et pédagogie moderne.',
        salary: '1 à 2 M GNF',
        postedDays: 6,
        isUrgent: false,
        fullDescription: "Description détaillée à venir..."
    }
];
