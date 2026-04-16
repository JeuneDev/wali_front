import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import SkillBadge from '../../components/common/SkillBadge';
import { mockCompetenceTests } from '../../data/mockData';
import './Competences.css';

const CATEGORIES = ['Toutes', 'Frontend', 'Backend', 'DevOps', 'Soft Skills'];

const DIFFICULTY_CLASS = {
  'Débutant':      'diff--easy',
  'Intermédiaire': 'diff--mid',
  'Avancé':        'diff--hard',
};

export default function Competences() {
  const { toast } = useToast();
  const [category, setCategory] = useState('Toutes');
  const [tab, setTab] = useState('all');

  const passed = mockCompetenceTests.filter((t) => t.status === 'passed');
  const inProgress = mockCompetenceTests.filter((t) => t.status === 'in-progress');
  const available = mockCompetenceTests.filter((t) => t.status === 'available');

  const stats = {
    total:   mockCompetenceTests.length,
    passed:  passed.length,
    badges:  passed.filter((t) => t.badge).length,
    avgScore: passed.length
      ? Math.round(passed.reduce((s, t) => s + t.score, 0) / passed.length)
      : 0,
  };

  let tests = mockCompetenceTests;
  if (tab === 'passed')     tests = passed;
  if (tab === 'available')  tests = available;
  if (tab === 'in-progress') tests = inProgress;

  if (category !== 'Toutes') {
    tests = tests.filter((t) => t.category === category);
  }

  const handleStartTest = (test) => {
    toast.info(`Test "${test.title}" — démarrage bientôt disponible`);
  };

  return (
    <div className="comp-page">
      <div className="container">

        {/* Header */}
        <div className="comp-header">
          <div>
            <h1 className="comp-title">Compétences & certifications</h1>
            <p className="comp-sub">
              Valorisez votre profil en passant des tests vérifiés et en obtenant des badges
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="comp-stats">
          <div className="comp-stat-card">
            <div className="comp-stat-icon comp-stat-icon--primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div>
              <div className="comp-stat-value">{stats.passed}</div>
              <div className="comp-stat-label">Tests réussis</div>
            </div>
          </div>

          <div className="comp-stat-card">
            <div className="comp-stat-icon comp-stat-icon--gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <div className="comp-stat-value">{stats.badges}</div>
              <div className="comp-stat-label">Badges obtenus</div>
            </div>
          </div>

          <div className="comp-stat-card">
            <div className="comp-stat-icon comp-stat-icon--green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div>
              <div className="comp-stat-value">{stats.avgScore}/100</div>
              <div className="comp-stat-label">Score moyen</div>
            </div>
          </div>

          <div className="comp-stat-card">
            <div className="comp-stat-icon comp-stat-icon--purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <div className="comp-stat-value">{stats.total - stats.passed}</div>
              <div className="comp-stat-label">Tests à passer</div>
            </div>
          </div>
        </div>

        {/* My badges showcase */}
        {passed.length > 0 && (
          <div className="comp-badges-section">
            <h2 className="comp-section-title">Mes badges</h2>
            <div className="comp-badges">
              {passed.map((t) => (
                <SkillBadge
                  key={t.id}
                  skill={t.title}
                  tier={t.badge || 'verified'}
                  score={t.score}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="comp-tabs">
          <button
            className={`comp-tab ${tab === 'all' ? 'comp-tab--active' : ''}`}
            onClick={() => setTab('all')}
          >
            Tous les tests
            <span className="comp-tab-count">{mockCompetenceTests.length}</span>
          </button>
          <button
            className={`comp-tab ${tab === 'passed' ? 'comp-tab--active' : ''}`}
            onClick={() => setTab('passed')}
          >
            Réussis
            <span className="comp-tab-count">{passed.length}</span>
          </button>
          <button
            className={`comp-tab ${tab === 'in-progress' ? 'comp-tab--active' : ''}`}
            onClick={() => setTab('in-progress')}
          >
            En cours
            {inProgress.length > 0 && <span className="comp-tab-count comp-tab-count--accent">{inProgress.length}</span>}
          </button>
          <button
            className={`comp-tab ${tab === 'available' ? 'comp-tab--active' : ''}`}
            onClick={() => setTab('available')}
          >
            Disponibles
            <span className="comp-tab-count">{available.length}</span>
          </button>
        </div>

        {/* Category filter */}
        <div className="comp-categories">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`comp-cat-chip ${category === c ? 'comp-cat-chip--active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Tests grid */}
        {tests.length === 0 ? (
          <div className="comp-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <h3>Aucun test dans cette catégorie</h3>
            <p>Essayez une autre catégorie ou un autre onglet</p>
          </div>
        ) : (
          <div className="comp-grid">
            {tests.map((t) => (
              <div key={t.id} className={`comp-card ${t.status === 'passed' ? 'comp-card--passed' : ''}`}>

                <div className="comp-card-header">
                  <span className="comp-card-category">{t.category}</span>
                  <span className={`comp-difficulty ${DIFFICULTY_CLASS[t.difficulty]}`}>{t.difficulty}</span>
                </div>

                <h3 className="comp-card-title">{t.title}</h3>
                <p className="comp-card-desc">{t.description}</p>

                <div className="comp-card-meta">
                  <span className="comp-meta-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {t.duration} min
                  </span>
                  <span className="comp-meta-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4"/>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                    {t.questions} questions
                  </span>
                </div>

                {/* Progress bar for in-progress */}
                {t.status === 'in-progress' && (
                  <div className="comp-progress">
                    <div className="comp-progress-head">
                      <span>Progression</span>
                      <span>{t.progress}%</span>
                    </div>
                    <div className="comp-progress-track">
                      <div className="comp-progress-fill" style={{ width: `${t.progress}%` }} />
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="comp-card-footer">
                  {t.status === 'passed' ? (
                    <>
                      <div className="comp-score">
                        <span className="comp-score-value">{t.score}/100</span>
                        <SkillBadge skill="" tier={t.badge || 'verified'} />
                      </div>
                      <button className="comp-btn comp-btn--secondary" onClick={() => handleStartTest(t)}>
                        Repasser
                      </button>
                    </>
                  ) : t.status === 'in-progress' ? (
                    <button className="comp-btn comp-btn--primary" onClick={() => handleStartTest(t)}>
                      Continuer
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </button>
                  ) : (
                    <button className="comp-btn comp-btn--primary" onClick={() => handleStartTest(t)}>
                      Commencer
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
