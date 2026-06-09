import { useMemo, useState } from 'react';
import { instruments, calcInst } from '../data/instruments';
import { fmt, fmtPct } from '../data/format';
import { useUrlState } from '../hooks/useUrlState';
import Tooltip from './Tooltip';
import CostDonut from './CostDonut';
import styles from './Simulator.module.css';

const INDEXADORES = ['CDI', 'IPCA+', 'IGPM+', 'Prefixado'];
const INST_KEYS = Object.keys(instruments);

export default function Simulator() {
  const { get, set } = useUrlState();

  const instKey = get('inst', 'cri');
  const volume = get('vol', 10000000);
  const prazo = get('prazo', 36);
  const indexador = get('idx', 'CDI');
  const taxa = get('taxa', 12.5);
  const successOn = true;
  const successType = get('stype', 'pct');
  const successVal = get('sval', 2);
  const successDesc = get('sdesc', 'Distribuição RCVM 161');

  const inst = instruments[instKey] || instruments.cri;

  // Per-cost overrides stored in URL as cost_<id>
  const costOverrides = useMemo(() => {
    const o = {};
    inst.costs.forEach((c) => {
      const v = get(`cost_${c.id}`, c.default);
      o[c.id] = v;
    });
    return o;
  }, [inst, get]);

  const result = useMemo(() => {
    const r = calcInst(instKey, volume, prazo, costOverrides);
    let successAmt = 0;
    if (successOn) {
      successAmt = successType === 'pct' ? (volume * successVal) / 100 : successVal;
    }
    const totalAll = r.total + successAmt;
    const liquido = volume - totalAll;
    const custoPct = volume > 0 ? (totalAll / volume) * 100 : 0;
    const liquidoPct = volume > 0 ? (liquido / volume) * 100 : 0;
    const custoAA = prazo > 0 ? custoPct / (prazo / 12) : 0;
    const allRows = [...r.rows];
    if (successOn && successAmt > 0) allRows.push({ id: 'success', label: successDesc || 'Success fee', amount: successAmt });
    return { ...r, successAmt, totalAll, liquido, custoPct, liquidoPct, custoAA, allRows };
  }, [instKey, volume, prazo, costOverrides, successOn, successType, successVal, successDesc]);

  function handleCostChange(id, val) {
    set({ [`cost_${id}`]: val });
  }

  function gerarPDF() {
    const d = result;
    const now = new Date();
    const dataStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const paramsRows = [
      ['Instrumento', inst.label],
      ['Volume bruto', fmt(volume)],
      ['Prazo', prazo + ' meses'],
      ['Indexador', indexador],
      ['Taxa indicativa', taxa.toFixed(2).replace('.', ',') + '% a.a.'],
    ].map(([k, v]) => `
      <tr>
        <td class="param-key">${k}</td>
        <td class="param-val">${v}</td>
      </tr>`).join('');

    const costRows = d.allRows.map((r, i) => {
      const pct = volume > 0 ? ((r.amount / volume) * 100).toFixed(2).replace('.', ',') + '%' : '0,00%';
      return `
        <tr class="${i % 2 === 1 ? 'alt' : ''}">
          <td class="cost-label">${r.label}</td>
          <td class="cost-val">${fmt(r.amount)}</td>
          <td class="cost-pct">${pct}</td>
        </tr>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Bloxs — Simulação ${inst.label}</title>
<style>
  @page {
    size: A4 portrait;
    margin: 0;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: #1a1a1a;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* HEADER */
  .header {
    background: #185FA5;
    color: #fff;
    padding: 14px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-left { font-size: 15px; font-weight: 700; letter-spacing: -0.2px; }
  .header-right { font-size: 10px; opacity: 0.82; }

  /* BODY */
  .body { padding: 28px 32px 100px; }

  .title { font-size: 18px; font-weight: 700; color: #185FA5; margin-bottom: 3px; }
  .divider { border: none; border-top: 2px solid #185FA5; margin: 6px 0 6px; }
  .date { font-size: 10px; color: #aaa; margin-bottom: 22px; }

  /* SECTION LABEL */
  .section {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #9ca3af;
    margin: 20px 0 8px;
    padding-bottom: 5px;
    border-bottom: 1px solid #e5e7eb;
  }

  /* PARAMS TABLE */
  .params-table { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
  .param-key { width: 160px; padding: 5px 8px; color: #6b7280; font-size: 11px; }
  .param-val { padding: 5px 8px; font-size: 11px; font-weight: 600; color: #1a1a1a; }

  /* COSTS TABLE */
  .costs-table { width: 100%; border-collapse: collapse; }
  .costs-table thead th {
    text-align: left;
    padding: 6px 8px;
    font-size: 10px;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e5e7eb;
    background: #fff;
  }
  .costs-table thead th:not(:first-child) { text-align: right; }
  .cost-label { padding: 6px 8px; font-size: 11px; color: #374151; }
  .cost-val { padding: 6px 8px; text-align: right; font-size: 11px; font-weight: 600; color: #1a1a1a; }
  .cost-pct { padding: 6px 8px; text-align: right; font-size: 10px; color: #9ca3af; }
  .alt td { background: #f9fafb; }

  /* TOTAL ROW */
  .total-row td {
    padding: 8px 8px;
    font-weight: 700;
    font-size: 12px;
    color: #1a1a1a;
    border-top: 2px solid #185FA5;
  }
  .total-row .cost-val { font-size: 13px; }

  /* RESULT BOX */
  .result-box {
    background: #EBF5FD;
    border: 1.5px solid #185FA5;
    border-radius: 8px;
    padding: 16px 20px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .result-label {
    font-size: 10px;
    font-weight: 700;
    color: #0C447C;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 5px;
  }
  .result-value { font-size: 26px; font-weight: 700; color: #185FA5; letter-spacing: -0.5px; }
  .result-meta { text-align: right; font-size: 11px; color: #374151; line-height: 1.7; }
  .result-meta strong { color: #185FA5; }

  /* FOOTER */
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 36px;
    background: #f5f7fa;
    border-top: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    font-size: 9px;
    color: #9ca3af;
  }

  @media print {
    body { background: #fff; }
    .footer { position: fixed; bottom: 0; }
  }
</style>
</head>
<body>

<div class="header">
  <div class="header-left">Bloxs</div>
  <div class="header-right">Simulador de Custos de Estruturação</div>
</div>

<div class="body">

  <div class="title">Resumo da Simulação — ${inst.label}</div>
  <hr class="divider">
  <div class="date">Gerado em ${dataStr}</div>

  <div class="section">Parâmetros da operação</div>
  <table class="params-table">
    <tbody>${paramsRows}</tbody>
  </table>

  <div class="section">Breakdown de custos</div>
  <table class="costs-table">
    <thead>
      <tr>
        <th style="text-align:left">Item</th>
        <th style="text-align:right">Valor (R$)</th>
        <th style="text-align:right">% Volume</th>
      </tr>
    </thead>
    <tbody>
      ${costRows}
      <tr class="total-row">
        <td class="cost-label">Custo total de estruturação</td>
        <td class="cost-val">${fmt(d.totalAll)}</td>
        <td class="cost-pct">${fmtPct(d.custoPct)}</td>
      </tr>
    </tbody>
  </table>

  <div class="result-box">
    <div>
      <div class="result-label">Volume líquido ao emissor</div>
      <div class="result-value">${fmt(d.liquido)}</div>
    </div>
    <div class="result-meta">
      <strong>${d.liquidoPct.toFixed(2).replace('.', ',')}%</strong> do volume bruto<br>
      Custo médio a.a.: <strong>${fmtPct(d.custoAA)}</strong><br>
      Prazo: <strong>${prazo} meses</strong> · ${indexador} + ${taxa}% a.a.
    </div>
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
      a.download = `bloxs_simulacao_${inst.label.toLowerCase().replace(/\s+/g,'_')}.html`;
      a.click();
    }
    setTimeout(() => URL.revokeObjectURL(url), 15000);
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copiado! Qualquer pessoa com este link verá a mesma simulação.');
    });
  }

  return (
    <div className={styles.root}>
      {/* Instrument tabs */}
      <div className={styles.instTabs}>
        {INST_KEYS.map((k) => (
          <button
            key={k}
            className={`${styles.tab} ${k === instKey ? styles.tabActive : ''}`}
            onClick={() => set({ inst: k })}
          >
            {instruments[k].label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {/* LEFT — Inputs */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Parâmetros da operação</div>

          <div className={styles.sectionLabel}>Emissão</div>

          <div className={styles.field}>
            <label>Volume bruto (R$)</label>
            <input type="number" value={volume} step="100000" onChange={(e) => set({ vol: e.target.value })} />
          </div>
          <div className={styles.field}>
            <label>Prazo (meses)</label>
            <input type="number" value={prazo} min="1" max="360" onChange={(e) => set({ prazo: e.target.value })} />
          </div>
          <div className={styles.field}>
            <label>Indexador</label>
            <select value={indexador} onChange={(e) => set({ idx: e.target.value })}>
              {INDEXADORES.map((i) => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label>Taxa indicativa (% a.a.)</label>
            <input type="number" value={taxa} step="0.25" onChange={(e) => set({ taxa: e.target.value })} />
          </div>

          <div className={styles.sectionLabel}>Custos de estruturação</div>
          {inst.costs.map((c) => {
            const perioLabel = c.periodicidade === 'mensal' ? ' × prazo (meses)' : c.periodicidade === 'anual' ? ' × anos' : '';
            const unitLabel = c.unit === 'pct' ? ' (% sobre volume)' : ` (R$${perioLabel})`;
            const minLabel = c.min_brl ? ` — mín. ${fmt(c.min_brl)}` : '';
            return (
              <div className={styles.field} key={c.id}>
                <label>
                  <Tooltip text={c.tooltip}>
                    {c.label}{unitLabel}{minLabel}
                  </Tooltip>
                </label>
                <input
                  type="number"
                  value={typeof costOverrides[c.id] === 'number' ? parseFloat(costOverrides[c.id].toFixed(6)) : costOverrides[c.id]}
                  step={c.unit === 'pct' ? 0.05 : c.periodicidade ? 100 : 1000}
                  min={c.min_brl || 0}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value) || 0;
                    const clamped = c.min_brl && v < c.min_brl ? c.min_brl : v;
                    handleCostChange(c.id, clamped);
                  }}
                />
              </div>
            );
          })}

          {/* Success fee — sempre ativo */}
          <div className={styles.successBox}>
            <div className={styles.successHeader}>
              <span className={styles.successTitle}>Success Fee</span>
            </div>
            <div className={styles.field}>
              <label>Tipo</label>
              <select value={successType} onChange={(e) => set({ stype: e.target.value })}>
                <option value="pct">% sobre volume</option>
                <option value="brl">R$ fixo</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>{successType === 'pct' ? 'Success fee (%)' : 'Success fee (R$)'}</label>
              <input type="number" value={successVal} step="0.25" onChange={(e) => set({ sval: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label>Descrição</label>
              <input type="text" value={successDesc} onChange={(e) => set({ sdesc: e.target.value })} />
            </div>
          </div>
        </div>

        {/* RIGHT — Results */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Resultado da simulação</div>

          <div className={styles.resultHero}>
            <div className={styles.resultLabel}>Volume líquido ao emissor</div>
            <div className={styles.resultValue}>{fmt(result.liquido)}</div>
            <div className={styles.resultSub}>{fmtPct(result.liquidoPct)} do volume bruto</div>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metric}>
              <div className={styles.ml}>Custo total</div>
              <div className={styles.mv}>{fmt(result.totalAll)}</div>
              <div className={styles.ms}>{fmtPct(result.custoPct)} do volume</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.ml}>Custo médio a.a.</div>
              <div className={styles.mv}>{fmtPct(result.custoAA)}</div>
              <div className={styles.ms}>{indexador} + {taxa}% a.a.</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.ml}>Success Fee</div>
              <div className={styles.mv}>{successOn && result.successAmt > 0 ? fmt(result.successAmt) : '—'}</div>
              <div className={styles.ms}>{successOn && result.successAmt > 0 ? fmtPct(volume > 0 ? result.successAmt / volume * 100 : 0) + ' do volume' : 'desativado'}</div>
            </div>
          </div>

          <div className={styles.cardTitle} style={{ marginTop: '12px' }}>Breakdown</div>
          {result.allRows.map((r) => (
            <div className={styles.breakdownRow} key={r.id || r.label}>
              <span className={styles.bl}>{r.label}</span>
              <span className={styles.bv}>
                {fmt(r.amount)}
                <span className={styles.bp}> ({fmtPct(volume > 0 ? r.amount / volume * 100 : 0)})</span>
              </span>
            </div>
          ))}
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>{fmt(result.totalAll)}</span>
          </div>

          <CostDonut rows={result.allRows} total={result.totalAll} />

          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={gerarPDF}>
              ↓ Gerar resumo PDF
            </button>
            <button className={styles.btnSecondary} onClick={copyLink}>
              🔗 Copiar link desta simulação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
