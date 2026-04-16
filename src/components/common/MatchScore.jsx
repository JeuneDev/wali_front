import './MatchScore.css';

/**
 * Match Score — Circular progress indicator showing candidate↔offer compatibility
 *
 * @param {number} score — 0-100
 * @param {'sm' | 'md' | 'lg'} size
 * @param {boolean} showLabel — show "% match" text below
 * @param {boolean} withTooltip — show explanation on hover
 */
export default function MatchScore({ score = 0, size = 'md', showLabel = false, withTooltip = true }) {
  const clamped = Math.max(0, Math.min(100, score));

  // Tier classification
  let tier = 'low';
  let tierLabel = 'Faible';
  if (clamped >= 85)      { tier = 'excellent'; tierLabel = 'Excellente'; }
  else if (clamped >= 70) { tier = 'good';      tierLabel = 'Bonne'; }
  else if (clamped >= 50) { tier = 'medium';    tierLabel = 'Moyenne'; }

  // SVG dimensions per size
  const dims = {
    sm: { box: 36, r: 15, sw: 3,  fs: 10 },
    md: { box: 48, r: 20, sw: 4,  fs: 13 },
    lg: { box: 72, r: 30, sw: 6,  fs: 20 },
  }[size] || { box: 48, r: 20, sw: 4, fs: 13 };

  const circ = 2 * Math.PI * dims.r;
  const offset = circ - (clamped / 100) * circ;

  return (
    <div
      className={`match-score match-score--${size} match-score--${tier}`}
      title={withTooltip ? `Correspondance ${tierLabel.toLowerCase()} — ${clamped}% de match avec ce profil` : undefined}
    >
      <svg
        width={dims.box}
        height={dims.box}
        viewBox={`0 0 ${dims.box} ${dims.box}`}
        className="match-score-svg"
      >
        {/* Background ring */}
        <circle
          cx={dims.box / 2}
          cy={dims.box / 2}
          r={dims.r}
          className="match-score-track"
          strokeWidth={dims.sw}
          fill="none"
        />
        {/* Foreground arc */}
        <circle
          cx={dims.box / 2}
          cy={dims.box / 2}
          r={dims.r}
          className="match-score-fill"
          strokeWidth={dims.sw}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${dims.box / 2} ${dims.box / 2})`}
        />
        {/* Score number */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          className="match-score-text"
          fontSize={dims.fs}
          fontWeight="700"
        >
          {clamped}
        </text>
      </svg>
      {showLabel && (
        <span className="match-score-label">{tierLabel} · {clamped}%</span>
      )}
    </div>
  );
}
