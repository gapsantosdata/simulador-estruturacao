import { useMemo } from 'react';
import { instruments, calcInst, optionalServices } from '../data/instruments';
import { fmt, fmtPct } from '../data/format';
import { useUrlState } from '../hooks/useUrlState';
import Tooltip from './Tooltip';
import CostDonut from './CostDonut';
import CurrencyInput from './CurrencyInput';
import styles from './Simulator.module.css';

const INDEXADORES = ['CDI', 'IPCA+', 'IGPM+', 'Prefixado'];
const INST_KEYS = Object.keys(instruments);
const SUCCESS_MIN_PCT = 2;

// formatter pt-BR para PDF (independente do locale do browser)
const nfBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtN = (v) => nfBRL.format(Math.round(v));
const fmtP = (v) => v.toFixed(2).replace('.', ',') + '%';

export default function Simulator() {
  const { get, set } = useUrlState();

  const instKey = get('inst', 'cri');
  const volume = parseFloat(get('vol', 10000000)) || 10000000;
  const prazo = parseFloat(get('prazo', 36)) || 36;
  const indexador = get('idx', 'CDI');
  const taxa = parseFloat(get('taxa', 12.5)) || 12.5;
  const successType = get('stype', 'pct');
  const successVal = Math.max(SUCCESS_MIN_PCT, parseFloat(get('sval', 2)) || 2);
  const successDesc = get('sdesc', 'Distribuição');

  const inst = instruments[instKey] || instruments.cri;

  // Optional services
  const svcEnabled = useMemo(() => {
    const o = {};
    optionalServices.forEach((s) => { o[s.id] = get(`svc_${s.id}`, '0') === '1'; });
    return o;
  }, [get]);

  const svcValues = useMemo(() => {
    const o = {};
    optionalServices.forEach((s) => { o[s.id] = parseFloat(get(`svcval_${s.id}`, s.default)) || 0; });
    return o;
  }, [get]);

  const outrosDesc = get('svcdesc_outros', '');
  const outrosPeriod = get('svcperiod_outros', 'mensal');

  function handleSvcToggle(id) {
    set({ [`svc_${id}`]: svcEnabled[id] ? '0' : '1' });
  }

  function handleSvcValueChange(id, val) {
    set({ [`svcval_${id}`]: val });
  }

  // Per-cost overrides
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
    const successAmt = successType === 'pct' ? (volume * successVal) / 100 : successVal;

    const svcRows = [];
    let svcTotal = 0;
    optionalServices.forEach((s) => {
      if (!svcEnabled[s.id]) return;
      const val = svcValues[s.id];
      if (!val) return;
      const period = s.isOther ? outrosPeriod : s.periodicidade;
      let amount;
      if (period === 'mensal') amount = val * prazo;
      else if (period === 'anual') amount = val * (prazo / 12);
      else amount = val;
      svcTotal += amount;
      const label = s.isOther ? (outrosDesc || 'Outros') : s.label;
      svcRows.push({ id: s.id, label, amount });
    });

    const totalAll = r.total + successAmt + svcTotal;
    const liquido = volume - totalAll;
    const custoPct = volume > 0 ? (totalAll / volume) * 100 : 0;
    const liquidoPct = volume > 0 ? (liquido / volume) * 100 : 0;
    const custoAA = prazo > 0 ? custoPct / (prazo / 12) : 0;
    const allRows = [...r.rows, ...svcRows];
    if (successAmt > 0) allRows.push({ id: 'success', label: successDesc || 'Success fee', amount: successAmt });
    return { ...r, successAmt, svcTotal, totalAll, liquido, custoPct, liquidoPct, custoAA, allRows };
  }, [instKey, volume, prazo, costOverrides, successType, successVal, successDesc, svcEnabled, svcValues, outrosDesc, outrosPeriod]);

  function handleCostChange(id, val) {
    set({ [`cost_${id}`]: val });
  }

  function gerarPDF() {
    const d = result;
    const now = new Date();
    const dataStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const paramsRows = [
      ['Instrumento', inst.label],
      ['Volume bruto', fmtN(volume)],
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
          <td class="cost-val">${fmtN(r.amount)}</td>
          <td class="cost-pct">${pct}</td>
        </tr>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Bloxs — Simulação ${inst.label}</title>
<style>
  @page { size: A4 portrait; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #1a1a1a; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .header { background: #185FA5; color: #fff; padding: 14px 32px; display: flex; justify-content: space-between; align-items: center; }
  .header-left { font-size: 15px; font-weight: 700; letter-spacing: -0.2px; }
  .header-right { font-size: 10px; opacity: 0.82; }
  .body { padding: 28px 32px 90px; }
  .title { font-size: 20px; font-weight: 700; color: #185FA5; margin-bottom: 3px; }
  .divider { border: none; border-top: 2px solid #185FA5; margin: 6px 0 4px; }
  .date { font-size: 10px; color: #aaa; margin-bottom: 24px; }
  .section { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin: 22px 0 8px; padding-bottom: 5px; border-bottom: 1px solid #e5e7eb; }
  .params-table { width: 100%; border-collapse: collapse; }
  .param-key { width: 160px; padding: 5px 10px; color: #6b7280; font-size: 11px; }
  .param-val { padding: 5px 10px; font-size: 11px; font-weight: 600; color: #1a1a1a; }
  .costs-table { width: 100%; border-collapse: collapse; }
  .costs-table thead th { text-align: left; padding: 6px 10px; font-size: 9px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid #e5e7eb; }
  .costs-table thead th:not(:first-child) { text-align: right; }
  .cost-label { padding: 6px 10px; font-size: 11px; color: #374151; }
  .cost-val { padding: 6px 10px; text-align: right; font-size: 11px; font-weight: 600; color: #1a1a1a; white-space: nowrap; }
  .cost-pct { padding: 6px 10px; text-align: right; font-size: 10px; color: #9ca3af; white-space: nowrap; }
  .alt td { background: #f9fafb; }
  .total-row td { padding: 9px 10px; font-weight: 700; font-size: 12px; color: #1a1a1a; border-top: 2px solid #185FA5; }
  .result-box { background: #EBF5FD; border: 1.5px solid #185FA5; border-radius: 8px; padding: 18px 24px; margin-top: 22px; display: table; width: 100%; }
  .result-left { display: table-cell; vertical-align: middle; }
  .result-right { display: table-cell; vertical-align: middle; text-align: right; }
  .result-label { font-size: 9px; font-weight: 700; color: #0C447C; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 5px; }
  .result-value { font-size: 28px; font-weight: 700; color: #185FA5; letter-spacing: -0.5px; }
  .result-meta { font-size: 11px; color: #374151; line-height: 1.8; }
  .result-meta strong { color: #185FA5; }
  .footer { position: fixed; bottom: 0; left: 0; right: 0; height: 34px; background: #f5f7fa; border-top: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; font-size: 9px; color: #9ca3af; }
  @media print { body { background: #fff; } .footer { position: fixed; bottom: 0; } }
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
  <table class="params-table"><tbody>${paramsRows}</tbody></table>
  <div class="section">Breakdown de custos</div>
  <table class="costs-table">
    <thead>
      <tr>
        <th style="text-align:left">Item</th>
        <th style="text-align:right">Valor</th>
        <th style="text-align:right">% Volume</th>
      </tr>
    </thead>
    <tbody>
      ${costRows}
      <tr class="total-row">
        <td class="cost-label">Custo total de estruturação</td>
        <td class="cost-val">${fmtN(d.totalAll)}</td>
        <td class="cost-pct">${fmtP(d.custoPct)}</td>
      </tr>
    </tbody>
  </table>
  <div class="result-box">
    <div class="result-left">
      <div class="result-label">Volume líquido ao emissor</div>
      <div class="result-value">${fmtN(d.liquido)}</div>
    </div>
    <div class="result-right">
      <div class="result-meta">
        <strong>${d.liquidoPct.toFixed(2).replace('.', ',')}%</strong> do volume bruto<br>
        Custo médio a.a.: <strong>${fmtP(d.custoAA)}</strong><br>
        Prazo: <strong>${prazo} meses</strong> · ${indexador} + ${taxa}% a.a.
      </div>
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
      a.download = `bloxs_simulacao_${inst.label.toLowerCase().replace(/\s+/g, '_')}.html`;
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
            <CurrencyInput
              value={volume}
              min={0}
              onChange={(v) => set({ vol: v })}
            />
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
            const rawVal = costOverrides[c.id];
            const numVal = typeof rawVal === 'number' ? rawVal : parseFloat(rawVal) || 0;
            return (
              <div className={styles.field} key={c.id}>
                <label>
                  <Tooltip text={c.tooltip}>
                    {c.label}{unitLabel}{minLabel}
                  </Tooltip>
                </label>
                {c.unit === 'pct' ? (
                  <input
                    type="number"
                    value={numVal}
                    step={0.05}
                    min={c.min_brl || 0}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value) || 0;
                      handleCostChange(c.id, c.min_brl && v < c.min_brl ? c.min_brl : v);
                    }}
                  />
                ) : (
                  <CurrencyInput
                    value={numVal}
                    min={c.min_brl || 0}
                    onChange={(v) => handleCostChange(c.id, v)}
                  />
                )}
              </div>
            );
          })}

          {/* Serviços adicionais — antes do Success Fee */}
          <div className={styles.servicerBox}>
            <div className={styles.successHeader}>
              <span className={styles.successTitle}>Serviços adicionais (opcional)</span>
            </div>
            {optionalServices.map((s) => {
              const enabled = svcEnabled[s.id];
              const perioLabel = s.isOther
                ? { mensal: 'R$/mês', anual: 'R$/ano', 'one-off': 'R$ one-off' }[outrosPeriod]
                : s.periodicidade === 'mensal' ? 'R$/mês' : s.periodicidade === 'anual' ? 'R$/ano' : 'R$ one-off';
              return (
                <div key={s.id} className={styles.servicerItem}>
                  <div className={styles.servicerRow}>
                    <label className={styles.servicerCheck}>
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => handleSvcToggle(s.id)}
                      />
                      <Tooltip text={s.tooltip}>
                        <span className={enabled ? styles.servicerLabelOn : styles.servicerLabel}>
                          {s.label}
                        </span>
                      </Tooltip>
                    </label>
                    {enabled && (
                      <CurrencyInput
                        value={svcValues[s.id]}
                        min={0}
                        onChange={(v) => handleSvcValueChange(s.id, v)}
                        className={styles.servicerInput}
                      />
                    )}
                  </div>
                  {enabled && s.isOther && (
                    <div className={styles.outrosFields}>
                      <input
                        type="text"
                        className={styles.outrosDesc}
                        placeholder="Especifique o serviço..."
                        value={outrosDesc}
                        onChange={(e) => set({ svcdesc_outros: e.target.value })}
                      />
                      <select
                        className={styles.outrosPeriod}
                        value={outrosPeriod}
                        onChange={(e) => set({ svcperiod_outros: e.target.value })}
                      >
                        <option value="one-off">One-off</option>
                        <option value="mensal">Mensal</option>
                        <option value="anual">Anual</option>
                      </select>
                    </div>
                  )}
                  {enabled && (
                    <div className={styles.servicerHint}>{perioLabel}</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Success fee */}
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
              <label>
                {successType === 'pct' ? `Success fee (% — mín. ${SUCCESS_MIN_PCT}%)` : 'Success fee (R$)'}
              </label>
              {successType === 'pct' ? (
                <input
                  type="number"
                  value={successVal}
                  step="0.25"
                  min={SUCCESS_MIN_PCT}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value) || SUCCESS_MIN_PCT;
                    set({ sval: Math.max(SUCCESS_MIN_PCT, v) });
                  }}
                />
              ) : (
                <CurrencyInput
                  value={successVal}
                  min={0}
                  onChange={(v) => set({ sval: v })}
                />
              )}
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
              <div className={styles.mv}>{result.successAmt > 0 ? fmt(result.successAmt) : '—'}</div>
              <div className={styles.ms}>{result.successAmt > 0 ? fmtPct(volume > 0 ? result.successAmt / volume * 100 : 0) + ' do volume' : '—'}</div>
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
