import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchBar from '../components/features/SearchBar';
import CategoryCard from '../components/features/CategoryCard';
import JobCard from '../components/features/JobCard';
import Button from '../components/common/Button';
import Typewriter from 'typewriter-effect';
import heroImage from '../assets/hero_image.png';
import recruiterHeroImage from '../assets/hero_recruteur.png';
import './Home.css';

// ═════════════════════════════════════════════════════════════
// Reusable — CountUp component (respects prefers-reduced-motion)
// ═════════════════════════════════════════════════════════════
function CountUp({ to, duration = 1800, suffix = '', prefix = '' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString('fr-FR')}
      {suffix}
    </span>
  );
}

// ═════════════════════════════════════════════════════════════
// Data
// ═════════════════════════════════════════════════════════════
const PARTNER_LOGOS = [
  { name: 'Orange',         initials: 'OG',  bg: '#FF6600', text: '#fff' },
  { name: 'Ecobank',        initials: 'EB',  bg: '#005BAA', text: '#fff' },
  { name: 'MTN',            initials: 'MTN', bg: '#FFCB05', text: '#000' },
  { name: 'Société Générale', initials: 'SG', bg: '#E60028', text: '#fff' },
  { name: 'Deloitte',       initials: 'D.',  bg: '#86BC25', text: '#fff' },
  { name: 'TechSolutions',  initials: 'TS',  bg: '#0B7A75', text: '#fff' },
  { name: 'Bolloré',        initials: 'BT',  bg: '#003DA5', text: '#fff' },
  { name: 'Vista Bank',     initials: 'VB',  bg: '#8B0000', text: '#fff' },
  { name: 'UBA',            initials: 'UBA', bg: '#CC0000', text: '#fff' },
  { name: 'Rio Tinto',      initials: 'RT',  bg: '#001E60', text: '#fff' },
];

const CATEGORIES = [
  { id: 1, title: 'Informatique & Tech',       count: '245 offres', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>) },
  { id: 2, title: 'Finance & Comptabilité',    count: '156 offres', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>) },
  { id: 3, title: 'Santé & Médical',           count: '98 offres',  icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>) },
  { id: 4, title: 'Éducation & Formation',     count: '134 offres', icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>) },
  { id: 5, title: 'Mines & Extraction',        count: '89 offres',  icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>) },
  { id: 6, title: 'Transport & Logistique',    count: '67 offres',  icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>) },
  { id: 7, title: 'Marketing & Communication', count: '72 offres',  icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>) },
  { id: 8, title: 'Ressources Humaines',       count: '45 offres',  icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>) },
];

const RECENT_JOBS = [
  { id: 1, title: 'Développeur Full Stack',   company: 'TechSolutions Guinée',   location: 'Conakry', type: 'CDI', salary: null, timeAgo: 'Il y a 2 jours',    isNew: true },
  { id: 2, title: 'Comptable Senior',          company: 'Cabinet Expertise',      location: 'Conakry', type: 'CDI', salary: null, timeAgo: 'Il y a 3 jours',    isNew: true },
  { id: 3, title: 'Ingénieur Civil',           company: 'Électricité Mining Corp',location: 'Kankan',  type: 'CDD', salary: null, timeAgo: 'Il y a 5 jours',    isNew: false },
  { id: 4, title: 'Responsable RH',            company: 'Société Générale Guinée',location: 'Conakry', type: 'CDI', salary: null, timeAgo: 'Il y a 1 semaine',  isNew: false },
  { id: 5, title: 'Médecin Généraliste',       company: 'Clinique Ambroise Paré', location: 'Labé',    type: 'CDI', salary: null, timeAgo: 'Il y a 1 semaine',  isNew: false },
  { id: 6, title: 'Chef de Projet Marketing',  company: 'Orange Guinée',          location: 'Conakry', type: 'CDI', salary: null, timeAgo: 'Il y a 2 semaines', isNew: false },
];

const HERO_IMAGES = [heroImage, recruiterHeroImage];
const HERO_ALTS = ['Candidat trouvant un emploi', 'Recruteur professionnel'];

export default function Home() {
  const reduced = useReducedMotion();
  const [heroImgIdx, setHeroImgIdx] = useState(0);

  // ── Animation variants (aware of reduced-motion) ──
  const sectionVariants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 90, damping: 18, mass: 0.8 },
        },
      };

  const containerVariants = reduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      };

  const itemVariants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 100, damping: 16 },
        },
      };

  const floatingCardVariants = reduced
    ? { animate: {} }
    : {
        animate: (custom) => ({
          y: [0, -12, 0],
          transition: {
            duration: custom?.duration || 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: custom?.delay || 0,
          },
        }),
      };

  // ── Scroll progress bar ──────────────────────
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // SearchBar now handles navigation internally via useNavigate

  return (
    <div className="home">
      {/* ═══════════════════════════════════════════ */}
      {/* Scroll progress bar                         */}
      {/* ═══════════════════════════════════════════ */}
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />

      {/* ═══════════════════════════════════════════ */}
      {/* HERO                                        */}
      {/* ═══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg-gradient" aria-hidden="true" />
        <div className="hero-grid-pattern" aria-hidden="true" />

        <div className="container">
          <div className="hero-content">
            {/* Text column */}
            <motion.div
              className="hero-text"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Tagline pill */}
              <motion.div className="hero-tagline" variants={itemVariants}>
                <span className="hero-tagline-dot" />
                Plateforme intelligente de recrutement
              </motion.div>

              {/* Title with Typewriter animation */}
              <motion.h1 className="hero-title" variants={itemVariants}>
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                    cursor: '|',
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Trouvez l'emploi de vos rêves en Guinée")
                      .pauseFor(4000)
                      .deleteAll()
                      .callFunction(() => setHeroImgIdx(1))
                      .typeString('Recrutez les meilleurs talents')
                      .pauseFor(4000)
                      .deleteAll()
                      .callFunction(() => setHeroImgIdx(0))
                      .start();
                  }}
                />
                <span className="sr-only">
                  Trouvez l'emploi idéal ou recrutez les meilleurs talents avec Wali
                </span>
              </motion.h1>

              <motion.p className="hero-subtitle" variants={itemVariants}>
                La plateforme qui <strong>comprend, recommande et optimise</strong> le recrutement
                en Guinée. Matching IA, tests de compétences, messagerie intégrée.
              </motion.p>

              <motion.div className="hero-search-wrapper" variants={itemVariants}>
                <SearchBar />
              </motion.div>

              <motion.div className="hero-badges" variants={itemVariants}>
                <span className="hero-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Matching IA
                </span>
                <span className="hero-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  100% local
                </span>
                <span className="hero-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Gratuit candidats
                </span>
              </motion.div>

              <motion.div className="hero-stats" variants={itemVariants}>
                <div className="stat-item">
                  <span className="stat-number">
                    <CountUp to={500} />+
                  </span>
                  <span className="stat-label">Offres actives</span>
                </div>
                <div className="stat-divider" aria-hidden="true" />
                <div className="stat-item">
                  <span className="stat-number">
                    <CountUp to={2000} />+
                  </span>
                  <span className="stat-label">Entreprises</span>
                </div>
                <div className="stat-divider" aria-hidden="true" />
                <div className="stat-item">
                  <span className="stat-number">
                    <CountUp to={10000} />+
                  </span>
                  <span className="stat-label">Candidats</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Image column */}
            <motion.div
              className="hero-image-container"
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-blob" aria-hidden="true" />

              <div className="hero-img-wrapper">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroImgIdx}
                    src={HERO_IMAGES[heroImgIdx]}
                    alt={HERO_ALTS[heroImgIdx]}
                    className="hero-img"
                    initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              </div>

              {/* Floating cards — context aware */}
              <AnimatePresence mode="wait">
                {heroImgIdx === 0 ? (
                  <motion.div
                    key="talent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="floating-card card-success"
                      variants={floatingCardVariants}
                      animate="animate"
                      custom={{ duration: 4, delay: 0 }}
                    >
                      <div className="fc-icon fc-icon--success">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div className="fc-content">
                        <span className="fc-title">Candidature acceptée</span>
                        <span className="fc-subtitle">Il y a 2 min</span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="floating-card card-match"
                      variants={floatingCardVariants}
                      animate="animate"
                      custom={{ duration: 5, delay: 1.5 }}
                    >
                      <div className="fc-icon fc-icon--primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                          <line x1="9" y1="9" x2="9.01" y2="9"/>
                          <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                      </div>
                      <div className="fc-content">
                        <span className="fc-title">Match IA · 95%</span>
                        <span className="fc-subtitle">Correspondance excellente</span>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="recruiter"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="floating-card card-success"
                      variants={floatingCardVariants}
                      animate="animate"
                      custom={{ duration: 4, delay: 0 }}
                    >
                      <div className="fc-icon fc-icon--primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <div className="fc-content">
                        <span className="fc-title">5 nouveaux candidats</span>
                        <span className="fc-subtitle">Aujourd'hui</span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="floating-card card-match"
                      variants={floatingCardVariants}
                      animate="animate"
                      custom={{ duration: 5, delay: 1.5 }}
                    >
                      <div className="fc-icon fc-icon--success">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="20" x2="18" y2="10"/>
                          <line x1="12" y1="20" x2="12" y2="4"/>
                          <line x1="6" y1="20" x2="6" y2="14"/>
                        </svg>
                      </div>
                      <div className="fc-content">
                        <span className="fc-title">+42% conversion</span>
                        <span className="fc-subtitle">Cette semaine</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.a
            href="#pillars"
            className="scroll-indicator"
            aria-label="Découvrir plus"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="scroll-indicator-label">Découvrir</span>
            <motion.div
              className="scroll-indicator-mouse"
              animate={reduced ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span />
            </motion.div>
          </motion.a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PILLARS — Pourquoi Wali                     */}
      {/* ═══════════════════════════════════════════ */}
      <section id="pillars" className="section section-pillars">
        <div className="container">
          <motion.div
            className="section-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionVariants}
          >
            <span className="section-eyebrow">Pourquoi Wali</span>
            <h2 className="section-title">Une nouvelle génération de recrutement</h2>
            <p className="section-lead">
              Plus qu'un simple job board : Wali comprend vos besoins, recommande les meilleurs
              matchs et optimise chaque étape du processus.
            </p>
          </motion.div>

          <motion.div
            className="pillars-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              {
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>),
                color: 'primary',
                title: 'Matching IA intelligent',
                desc: "Notre algorithme analyse compétences, expériences et aspirations pour proposer les meilleurs matchs candidats ↔ offres.",
                highlight: 'Score 0–100%',
              },
              {
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>),
                color: 'gold',
                title: 'Tests & badges de compétences',
                desc: "Valorisez vos compétences réelles avec des tests vérifiés. Les recruteurs voient vos badges certifiés, pas seulement votre CV.",
                highlight: 'Bronze · Argent · Or',
              },
              {
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>),
                color: 'purple',
                title: 'Messagerie intégrée',
                desc: "Fini les emails perdus. Échangez directement avec les recruteurs ou candidats et gardez tout l'historique en un seul endroit.",
                highlight: 'Temps réel',
              },
              {
                icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>),
                color: 'blue',
                title: 'Analytics décisionnels',
                desc: "Mesurez et pilotez vos recrutements : taux de conversion, délais d'embauche, qualité des candidatures, performances par offre.",
                highlight: 'Dashboard temps réel',
              },
            ].map((p, i) => (
              <motion.div key={i} className="pillar-card" variants={itemVariants}>
                <div className={`pillar-icon pillar-icon--${p.color}`}>{p.icon}</div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
                <div className="pillar-highlight">{p.highlight}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* HOW IT WORKS                                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section section-gray section-how">
        <div className="container">
          <motion.div
            className="section-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionVariants}
          >
            <span className="section-eyebrow">Comment ça marche</span>
            <h2 className="section-title">Un parcours simple, en 3 étapes</h2>
          </motion.div>

          <motion.div
            className="how-tabs-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Candidat flow */}
            <motion.div className="how-column" variants={itemVariants}>
              <div className="how-header">
                <div className="how-header-icon how-header-icon--candidat">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <span className="how-header-label">Pour les candidats</span>
                  <h3 className="how-header-title">Trouvez votre prochain poste</h3>
                </div>
              </div>

              <div className="how-steps">
                {[
                  { n: '1', t: 'Créez votre profil', d: 'Construisez un profil complet avec vos compétences, expériences et aspirations.' },
                  { n: '2', t: 'Validez vos compétences', d: 'Passez les tests pour obtenir des badges vérifiés qui vous démarquent.' },
                  { n: '3', t: 'Postulez en 1 clic', d: 'Recevez des recommandations personnalisées et suivez vos candidatures en temps réel.' },
                ].map((s) => (
                  <div key={s.n} className="how-step">
                    <div className="how-step-num">{s.n}</div>
                    <div className="how-step-content">
                      <h4 className="how-step-title">{s.t}</h4>
                      <p className="how-step-desc">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/inscription?role=candidat" className="btn btn--primary btn--medium how-cta">
                Créer mon profil candidat
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </motion.div>

            {/* Recruteur flow */}
            <motion.div className="how-column how-column--recruiter" variants={itemVariants}>
              <div className="how-header">
                <div className="how-header-icon how-header-icon--recruteur">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <div>
                  <span className="how-header-label">Pour les recruteurs</span>
                  <h3 className="how-header-title">Recrutez les meilleurs talents</h3>
                </div>
              </div>

              <div className="how-steps">
                {[
                  { n: '1', t: 'Publiez votre offre', d: 'Décrivez le poste, les compétences requises et l\'expérience souhaitée en quelques minutes.' },
                  { n: '2', t: 'Recevez les meilleurs matchs', d: 'Notre IA classe automatiquement les candidatures par score de correspondance.' },
                  { n: '3', t: 'Échangez et décidez', d: 'Messagerie intégrée, notes d\'équipe et analytics pour une décision éclairée.' },
                ].map((s) => (
                  <div key={s.n} className="how-step">
                    <div className="how-step-num">{s.n}</div>
                    <div className="how-step-content">
                      <h4 className="how-step-title">{s.t}</h4>
                      <p className="how-step-desc">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/inscription?role=recruteur" className="btn btn--secondary btn--medium how-cta">
                Publier une offre
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* RECENT JOBS                                 */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionVariants}
          >
            <div>
              <span className="section-eyebrow">Fraîchement publiées</span>
              <h2 className="section-title">Dernières offres publiées</h2>
            </div>
            <Link to="/recherche">
              <Button variant="text">Voir toutes les offres →</Button>
            </Link>
          </motion.div>
          <motion.div
            className="jobs-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {RECENT_JOBS.map((job) => (
              <motion.div key={job.id} variants={itemVariants}>
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CATEGORIES                                  */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section section-gray">
        <div className="container">
          <motion.div
            className="section-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionVariants}
          >
            <span className="section-eyebrow">Par secteur</span>
            <h2 className="section-title">Explorer les opportunités par domaine</h2>
          </motion.div>
          <motion.div
            className="categories-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {CATEGORIES.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* TESTIMONIALS                                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section section-testimonials">
        <div className="container">
          <motion.div
            className="section-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionVariants}
          >
            <span className="section-eyebrow">Ils parlent de Wali</span>
            <h2 className="section-title">Des histoires de réussite</h2>
          </motion.div>

          <motion.div
            className="testimonials-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              {
                text: "J'ai décroché mon poste de Développeur Senior en 2 semaines grâce au matching IA. Le score de correspondance m'a aidé à prioriser les bonnes offres.",
                name: 'Amadou Diallo',
                role: 'Développeur Full Stack · TechSolutions Guinée',
                avatar: 'https://ui-avatars.com/api/?name=Amadou+Diallo&background=0B7A75&color=fff&size=96',
              },
              {
                text: 'Nous avons divisé par deux notre délai de recrutement. Le dashboard analytique nous permet de piloter nos campagnes comme jamais auparavant.',
                name: 'Sarah Camara',
                role: 'Responsable RH · Orange Guinée',
                avatar: 'https://ui-avatars.com/api/?name=Sarah+Camara&background=D97706&color=fff&size=96',
              },
              {
                text: "Les tests de compétences m'ont permis de valoriser mon expertise technique. J'ai reçu 3 offres d'entretien en une semaine après avoir obtenu mes badges.",
                name: 'Aissatou Baldé',
                role: 'Développeuse Frontend · Ecobank Guinée',
                avatar: 'https://ui-avatars.com/api/?name=Aissatou+Balde&background=7C3AED&color=fff&size=96',
              },
            ].map((t, i) => (
              <motion.figure key={i} className="testimonial-card" variants={itemVariants}>
                <div className="testimonial-quote" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 7L8 11h3v6H5v-6l2-4h3zm8 0l-2 4h3v6h-6v-6l2-4h3z"/>
                  </svg>
                </div>
                <blockquote className="testimonial-text">{t.text}</blockquote>
                <figcaption className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PARTNERS — logo marquee                     */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section section-partners">
        <div className="container">
          <motion.div
            className="section-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionVariants}
          >
            <span className="section-eyebrow">Partenaires</span>
            <h2 className="section-title">Ils nous font confiance</h2>
            <p className="section-lead">
              Des entreprises leaders en Guinée font confiance à Wali pour recruter leurs talents.
            </p>
          </motion.div>
        </div>

        {/* Marquee — full bleed (no container) */}
        <div className="partners-marquee" aria-label="Logos des entreprises partenaires">
          <div className="partners-fade partners-fade--left" aria-hidden="true" />
          <div className="partners-fade partners-fade--right" aria-hidden="true" />

          <div className="partners-track">
            {/* Duplicate the set for seamless infinite scroll */}
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="partner-card">
                <div
                  className="partner-logo-icon"
                  style={{ background: logo.bg, color: logo.text }}
                >
                  {logo.initials}
                </div>
                <span className="partner-name">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FINAL CTA                                   */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section section-final-cta">
        <div className="container">
          <motion.div
            className="final-cta"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="final-cta-title">Prêt à transformer votre recrutement&nbsp;?</h2>
            <p className="final-cta-lead">
              Rejoignez des milliers de candidats et d'entreprises qui utilisent déjà Wali pour
              construire l'avenir du travail en Guinée.
            </p>
            <div className="final-cta-actions">
              <Link to="/inscription?role=candidat" className="btn btn--primary btn--large">
                Je suis candidat
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link to="/inscription?role=recruteur" className="btn btn--secondary btn--large">
                Je suis recruteur
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
            <p className="final-cta-note">
              ✓ Inscription gratuite&nbsp;·&nbsp;✓ Pas de carte bancaire&nbsp;·&nbsp;✓ Résultats en quelques minutes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
