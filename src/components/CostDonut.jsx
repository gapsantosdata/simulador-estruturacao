import { useMemo } from 'react';
import { fmt, fmtPct } from '../data/format';
import styles from './CostDonut.module.css';

const COLORS = [
  '#185FA5', '#2E86D4', '#5BA4E5', '#8EC4F3',
  '#B8D9F7', '#93B7D9', '#6A9EC7', '#4A84B5',
];

export default function CostDonut({ rows, total }) {
  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const r = 52;
  const stroke = 22;

  const slices = useMemo(() => {
    if (!total || !rows.length) return [];
    let cumAngle = -Math.PI / 2;
    return rows.map((row, i) => {
      const frac = row.amount / total;
      const angle = frac * 2 * Math.PI;
      const x1 = cx + r * Math.cos(cumAngle);
      const y1 = cy + r * Math.sin(cumAngle);
      cumAngle += angle;
      const x2 = cx + r * Math.cos(cumAngle);
      const y2 = cy + r * Math.sin(cumAngle);
      const largeArc = angle > Math.PI ? 1 : 0;
      return {
        d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
        color: COLORS[i % COLORS.length],
        frac,
        label: row.label,
        amount: row.amount,
      };
    });
  }, [rows, total, cx, cy, r]);

  // Arc-based donut
  const arcs = useMemo(() => {
    if (!total || !rows.length) return [];
    let cumAngle = -Math.PI / 2;
    return rows.map((row, i) => {
      const frac = row.amount / total;
      const angle = frac * 2 * Math.PI - 0.02;
      const x1 = cx + r * Math.cos(cumAngle);
      const y1 = cy + r * Math.sin(cumAngle);
      const endAngle = cumAngle + angle;
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = angle > Math.PI ? 1 : 0;
      const path = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
      cumAngle += frac * 2 * Math.PI;
      return { path, color: COLORS[i % COLORS.length], frac, label: row.label, amount: row.amount };
    });
  }, [rows, total, cx, cy, r]);

  return (
    <div className={styles.wrap}>
      <svg width={size} height={size} className={styles.svg}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg3)" strokeWidth={stroke} />
        {arcs.map((a, i) => (
          <path
            key={i}
            d={a.path}
            fill="none"
            stroke={a.color}
            strokeWidth={stroke}
            strokeLinecap="butt"
          />
        ))}
        <text x={cx} y={cy - 7} textAnchor="middle" className={styles.centerTop}>
          CUSTO
        </text>
        <text x={cx} y={cy + 9} textAnchor="middle" className={styles.centerMid}>
          {fmtPct(total > 0 ? (rows.reduce((s, r) => s + r.amount, 0) / (rows[0]?.vol || total) * 100 || 0) : 0)}
        </text>
      </svg>
      <div className={styles.legend}>
        {arcs.map((a, i) => (
          <div key={i} className={styles.legendItem}>
            <span className={styles.dot} style={{ background: a.color }} />
            <span className={styles.legendLabel}>{a.label}</span>
            <span className={styles.legendVal}>{fmt(a.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
