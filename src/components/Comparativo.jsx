import { useMemo } from 'react';
import { instruments, calcInst } from '../data/instruments';
import { fmt, fmtPct } from '../data/format';
import { useUrlState } from '../hooks/useUrlState';
import styles from './Comparativo.module.css';

const INST_KEYS = Object.keys(instruments);

export default function Comparativo() {
  const { get, set } = useUrlState();
  const instA = get('ca', 'cri');
  const instB = get('cb', 'cra');
  const volume = get('cvol', 10000000);
  const prazo = get('cprazo', 36);

  const ra = useMemo(() => calcInst(instA, volume, prazo), [instA, volume, prazo]);
  const rb = useMemo(() => calcInst(instB, volume, prazo), [instB, volume, prazo]);

  const winner = ra.total <= rb.total ? ra : rb;
  const loser  = ra.total <= rb.total ? rb : ra;
  const diff    = loser.total - winner.total;
  const diffPct = volume > 0 ? (diff / volume) * 100 : 0;

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link do comparativo copiado!');
    });
  }

  function gerarPDFComp() {
    const now = new Date();
    const dataStr =
      now.toLocaleDateString('pt-BR') +
      ' às ' +
      now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const aIsWinner = ra.total <= rb.total;

    function colHTML(r, isWinner) {
      const rowsHTML = r.rows
        .map((row, i) => `
          <tr class="${i % 2 === 1 ? 'alt' : ''}">
            <td class="cost-label">${row.label}</td>
            <td class="cost-val">${fmt(row.amount)}</td>
          </tr>`)
        .join('');

      return `
        <div class="col${isWinner ? ' col-winner' : ''}">
          <div class="col-header">
            <span class="col-title">${r.inst.label}</span>
            ${isWinner ? '<span class="badge">Menor custo</span>' : ''}
          </div>
          <div class="highlight">
            <div class="hl-label">Volume líquido ao emissor</div>
            <div class="hl-value">${fmt(r.liquido)}</div>
          </div>
          <table class="costs-table">
            <tbody>
              ${rowsHTML}
              <tr class="total-row">
                <td class="cost-label">Custo total</td>
                <td class="cost-val">${fmt(r.total)}</td>
              </tr>
              <tr class="meta-row">
                <td class="cost-label">% do volume</td>
                <td class="cost-val">${fmtPct(r.custoPct)}</td>
              </tr>
              <tr class="meta-row">
                <td class="cost-label">Custo médio a.a.</td>
                <td class="cost-val">${fmtPct(r.custoAA)}</td>
              </tr>
              <tr class="meta-row">
                <td class="cost-label">Líquido / bruto</td>
                <td class="cost-val">${fmtPct(r.liquidoPct)}</td>
              </tr>
            </tbody>
          </table>
        </div>`;
    }

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Bloxs — Comparativo</title>
<style>
  @page { size: A4 landscape; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: #1a1a1a;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .header {
    background: #185FA5;
    color: #fff;
    padding: 12px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-left { font-size: 14px; font-weight: 700; }
  .header-right { font-size: 10px; opacity: 0.82; }

  .body { padding: 24px 32px 80px; }

  .title { font-size: 17px; font-weight: 700; color: #185FA5; margin-bottom: 3px; }
  .divider { border: none; border-top: 2px solid #185FA5; margin: 5px 0 5px; }
  .date { font-size: 10px; color: #aaa; margin-bottom: 18px; }

  .cols { display: flex; gap: 16px; align-items: flex-start; }

  .col {
    flex: 1;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 14px;
    background: #fff;
  }
  .col-winner { border: 2px solid #185FA5; }

  .col-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .col-title { font-size: 14px; font-weight: 700; color: #1a1a1a; }
  .badge {
    background: #E6F1FB;
    color: #0C447C;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
  }

  .highlight {
    background: #f5f7fa;
    border-radius: 6px;
    padding: 10px;
    text-align: center;
    margin-bottom: 12px;
  }
  .hl-label { font-size: 9px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; }
  .hl-value { font-size: 20px; font-weight: 700; color: #1a1a1a; }

  .costs-table { width: 100%; border-collapse: collapse; }
  .costs-table thead th {
    padding: 5px 6px;
    font-size: 9px;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e5e7eb;
    background: #fff;
  }
  .cost-label { padding: 5px 6px; font-size: 10px; color: #374151; }
  .cost-val { padding: 5px 6px; text-align: right; font-size: 10px; font-weight: 600; color: #1a1a1a; }
  .cost-pct { padding: 5px 6px; text-align: right; font-size: 9px; color: #9ca3af; }
  .alt td { background: #f9fafb; }

  .total-row td { border-top: 2px solid #185FA5; padding: 6px 6px; font-weight: 700; font-size: 11px; }
  .meta-row td { padding: 4px 6px; font-size: 10px; color: #6b7280; }

  .summary {
    background: #f5f7fa;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 12px 16px;
    margin-top: 16px;
    font-size: 12px;
    color: #6b7280;
    line-height: 1.6;
  }
  .summary strong { color: #1a1a1a; }
  .summary .economy { color: #0F6E56; font-weight: 700; }

  .footer {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: 32px;
    background: #f5f7fa;
    border-top: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    font-size: 9px;
    color: #9ca3af;
  }

  @media print { .footer { position: fixed; bottom: 0; } }
</style>
</head>
<body>

<div class="header">
  <div class="header-left">Bloxs</div>
  <div class="header-right">Simulador de Custos — Comparativo de Instrumentos</div>
</div>

<div class="body">
  <div class="title">Comparativo de Instrumentos</div>
  <hr class="divider">
  <div class="date">Gerado em ${dataStr} · Volume: ${fmt(volume)} · Prazo: ${prazo} meses</div>

  <div class="cols">
    ${colHTML(ra, aIsWinner)}
    ${colHTML(rb, !aIsWinner)}
  </div>

  <div class="summary">
    <strong>${winner.inst.label}</strong> representa uma economia de
    <span class="economy">${fmt(diff)}</span>
    (${fmtPct(diffPct)} do volume) em relação ao
    <strong>${loser.inst.label}</strong> para este volume e prazo.
  </div>
</div>

<div class="footer">
  <span>Bloxs</span>
  <span>Valores indicativos — sujeitos a alteração sem aviso prévio</span>
  <span>${dataStr}</span>
</div>

<script>window.onload = function(){ window.print(); }<\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    if (!w) {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bloxs_comparativo.html';
      a.click();
    }
    setTimeout(() => URL.revokeObjectURL(url), 15000);
  }
  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <div className={styles.field}>
          <label>Instrumento A</label>
          <select value={instA} onChange={(e) => set({ ca: e.target.value })}>
            {INST_KEYS.map((k) => <option key={k} value={k}>{instruments[k].label}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label>Instrumento B</label>
          <select value={instB} onChange={(e) => set({ cb: e.target.value })}>
            {INST_KEYS.map((k) => <option key={k} value={k}>{instruments[k].label}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label>Volume bruto (R$)</label>
          <input type="number" value={volume} step="100000" onChange={(e) => set({ cvol: e.target.value })} />
        </div>
        <div className={styles.field}>
          <label>Prazo (meses)</label>
          <input type="number" value={prazo} min="1" onChange={(e) => set({ cprazo: e.target.value })} />
        </div>
      </div>

      <div className={styles.compGrid}>
        {[ra, rb].map((r, i) => {
          const other = i === 0 ? rb : ra;
          const isWinner = r.total < other.total;
          return (
            <div key={i} className={`${styles.compCol} ${isWinner ? styles.winner : ''}`}>
              <div className={styles.compHeader}>
                <div className={styles.compInst}>{r.inst.label}</div>
                {isWinner && <span className={styles.badge}>Menor custo</span>}
              </div>
              <div className={styles.highlight}>
                <div className={styles.hlLabel}>Volume líquido ao emissor</div>
                <div className={styles.hlValue}>{fmt(r.liquido)}</div>
              </div>
              {r.rows.map((row) => (
                <div className={styles.compRow} key={row.id}>
                  <span className={styles.cl}>{row.label}</span>
                  <span className={styles.cv}>{fmt(row.amount)}</span>
                </div>
              ))}
              <div className={`${styles.compRow} ${styles.totalLine}`}>
                <span className={styles.cl}>Custo total</span>
                <span className={styles.cv}>{fmt(r.total)}</span>
              </div>
              <div className={styles.compRow}>
                <span className={styles.cl}>% do volume</span>
                <span className={styles.cv}>{fmtPct(r.custoPct)}</span>
              </div>
              <div className={styles.compRow}>
                <span className={styles.cl}>Custo médio a.a.</span>
                <span className={styles.cv}>{fmtPct(r.custoAA)}</span>
              </div>
              <div className={styles.compRow}>
                <span className={styles.cl}>Líquido / bruto</span>
                <span className={styles.cv}>{fmtPct(r.liquidoPct)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.summary}>
        <strong>{winner.inst.label}</strong> representa economia de{' '}
        <strong style={{ color: 'var(--green)' }}>{fmt(diff)}</strong> ({fmtPct(diffPct)} do volume) em relação ao{' '}
        <strong>{loser.inst.label}</strong> para este volume e prazo.
      </div>

      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={gerarPDFComp}>
          ↓ Gerar comparativo PDF
        </button>
        <button className={styles.btnLink} onClick={copyLink}>
          🔗 Copiar link deste comparativo
        </button>
      </div>
    </div>
  );
}
