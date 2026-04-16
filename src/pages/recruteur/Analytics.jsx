import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockAnalyticsRecruteur } from '../../data/mockData';
import './Analytics.css';

const PERIODS = [
  { id: '7d',  label: '7 jours' },
  { id: '30d', label: '30 jours' },
  { id: '90d', label: '90 jours' },
  { id: '12m', label: '12 mois' },
];

// Trend indicator
function Trend({ value, suffix = '' }) {
  if (!value) return null;
  const positive = value > 0;
  return (
    <span className={`an-trend ${positive ? 'an-trend--up' : 'an-trend--down'}`}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        {positive
          ? <polyline points="18 15 12 9 6 15"/>
          : <polyline points="6 9 12 15 18 9"/>}
      </svg>
      {positive ? '+' : ''}{value}{suffix}
    </span>
  );
}

export default function Analytics() {
  const [period, setPeriod] = useState('30d');
  const data = mockAnalyticsRecruteur;

  const maxWeekly = Math.max(...data.applicationsWeekly.map((d) => d.count));
  const totalApplications = data.statusDistribution.reduce((s, x) => s + x.count, 0);
  const maxTrend = Math.max(...data.timeToHireTrend.map((d) => d.days));

  return (
    <div className="analytics-page">
      <div className="container">

        {/* ── Header ─────────────────────────── */}
        <div className="an-page-header">
          <div>
            <h1 className="an-title">Analytics</h1>
            <p className="an-sub">Vue d'ensemble de vos performances de recrutement</p>
          </div>
          <div className="an-period-selector">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                className={`an-period-btn ${period === p.id ? 'an-period-btn--active' : ''}`}
                onClick={() => setPeriod(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── KPI Cards ──────────────────────── */}
        <div className="an-kpis">
          <div className="an-kpi-card">
            <div className="an-kpi-head">
              <div className="an-kpi-icon an-kpi-icon--primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <Trend value={data.kpis.activeOffers.trend} />
            </div>
            <div className="an-kpi-value">{data.kpis.activeOffers.value}{data.kpis.activeOffers.suffix}</div>
            <div className="an-kpi-label">{data.kpis.activeOffers.label}</div>
          </div>

          <div className="an-kpi-card">
            <div className="an-kpi-head">
              <div className="an-kpi-icon an-kpi-icon--blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <Trend value={data.kpis.responseRate.trend} suffix="%" />
            </div>
            <div className="an-kpi-value">{data.kpis.responseRate.value}{data.kpis.responseRate.suffix}</div>
            <div className="an-kpi-label">{data.kpis.responseRate.label}</div>
          </div>

          <div className="an-kpi-card">
            <div className="an-kpi-head">
              <div className="an-kpi-icon an-kpi-icon--orange">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <Trend value={data.kpis.avgTimeToHire.trend} suffix="j" />
            </div>
            <div className="an-kpi-value">{data.kpis.avgTimeToHire.value}{data.kpis.avgTimeToHire.suffix}</div>
            <div className="an-kpi-label">{data.kpis.avgTimeToHire.label}</div>
          </div>

          <div className="an-kpi-card">
            <div className="an-kpi-head">
              <div className="an-kpi-icon an-kpi-icon--purple">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <Trend value={data.kpis.qualityScore.trend} />
            </div>
            <div className="an-kpi-value">{data.kpis.qualityScore.value}{data.kpis.qualityScore.suffix}</div>
            <div className="an-kpi-label">{data.kpis.qualityScore.label}</div>
          </div>
        </div>

        {/* ── Charts row ─────────────────────── */}
        <div className="an-charts-row">

          {/* Weekly bar chart */}
          <div className="an-card">
            <div className="an-card-header">
              <div>
                <h2 className="an-card-title">Candidatures cette semaine</h2>
                <p className="an-card-sub">
                  {data.applicationsWeekly.reduce((s, d) => s + d.count, 0)} candidatures reçues
                </p>
              </div>
            </div>
            <div className="an-bar-chart">
              {data.applicationsWeekly.map((d) => (
                <div key={d.day} className="an-bar-col">
                  <div className="an-bar-value">{d.count}</div>
                  <div className="an-bar-wrap">
                    <div
                      className="an-bar"
                      style={{ height: `${(d.count / maxWeekly) * 100}%` }}
                    />
                  </div>
                  <div className="an-bar-label">{d.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Status distribution */}
          <div className="an-card">
            <div className="an-card-header">
              <div>
                <h2 className="an-card-title">Répartition par statut</h2>
                <p className="an-card-sub">{totalApplications} candidatures au total</p>
              </div>
            </div>
            <div className="an-status-list">
              {data.statusDistribution.map((s) => {
                const pct = Math.round((s.count / totalApplications) * 100);
                return (
                  <div key={s.label} className="an-status-item">
                    <div className="an-status-head">
                      <span className="an-status-label">{s.label}</span>
                      <span className="an-status-count">
                        <strong>{s.count}</strong> · {pct}%
                      </span>
                    </div>
                    <div className="an-status-track">
                      <div
                        className={`an-status-fill ${s.cls}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Second row ─────────────────────── */}
        <div className="an-charts-row">

          {/* Top offers */}
          <div className="an-card">
            <div className="an-card-header">
              <div>
                <h2 className="an-card-title">Top offres performantes</h2>
                <p className="an-card-sub">Classées par taux de conversion</p>
              </div>
            </div>
            <div className="an-top-offers">
              {data.topOffers.map((o, i) => (
                <Link key={o.id} to={`/recruteur/offres/${o.id}`} className="an-top-offer">
                  <div className="an-top-rank">{i + 1}</div>
                  <div className="an-top-info">
                    <p className="an-top-title">{o.title}</p>
                    <div className="an-top-metrics">
                      <span><strong>{o.applications}</strong> candidatures</span>
                      <span>·</span>
                      <span><strong>{o.views}</strong> vues</span>
                    </div>
                  </div>
                  <div className="an-top-conversion">
                    <span className="an-top-conv-value">{o.conversionRate}%</span>
                    <span className="an-top-conv-label">conversion</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Time to hire trend */}
          <div className="an-card">
            <div className="an-card-header">
              <div>
                <h2 className="an-card-title">Évolution délai d'embauche</h2>
                <p className="an-card-sub">En jours moyens · Tendance à la baisse</p>
              </div>
            </div>
            <div className="an-line-chart">
              <div className="an-line-wrap">
                {data.timeToHireTrend.map((d, i) => {
                  const h = (d.days / maxTrend) * 100;
                  return (
                    <div key={d.month} className="an-line-col">
                      <div className="an-line-value">{d.days}j</div>
                      <div className="an-line-dot-wrap">
                        <div
                          className="an-line-dot"
                          style={{ bottom: `calc(${h}% - 6px)` }}
                        />
                        {i < data.timeToHireTrend.length - 1 && (
                          <div
                            className="an-line-connector"
                            style={{
                              bottom: `${h}%`,
                              '--next-h': `${(data.timeToHireTrend[i + 1].days / maxTrend) * 100}%`,
                            }}
                          />
                        )}
                      </div>
                      <div className="an-line-label">{d.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sources ───────────────────────── */}
        <div className="an-card">
          <div className="an-card-header">
            <div>
              <h2 className="an-card-title">Sources de trafic</h2>
              <p className="an-card-sub">D'où proviennent vos candidats</p>
            </div>
          </div>
          <div className="an-sources">
            {data.sourcesTraffic.map((s) => (
              <div key={s.source} className="an-source-item">
                <div className="an-source-head">
                  <span className="an-source-label">{s.source}</span>
                  <span className="an-source-pct">{s.percent}%</span>
                </div>
                <div className="an-source-track">
                  <div className="an-source-fill" style={{ width: `${s.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
