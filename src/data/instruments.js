// Valores de referência: Bloxs_Simulador_Custos_v2.xlsx (2025–2026)
export const instruments = {
  cri: {
    label: 'CRI',
    costs: [
      {
        id: 'laqus',
        label: 'Escrituração + Depósito + Custódia (Laqus, a.a.)',
        tooltip: 'Pacote flat fee Laqus: escrituração, depósito e custódia da NC. 0,07% a.a. sobre volume. Ref: proposta Laqus.',
        default: 14000, unit: 'brl', min_brl: 7000,
      },
      {
        id: 'estruturacao',
        label: 'Estruturação Bloxs (one-off)',
        tooltip: 'Fee único de constituição cobrado pela Bloxs Securitizadora.',
        default: 30000, unit: 'brl', min_brl: 30000,
      },
      {
        id: 'gestao',
        label: 'Taxa de Gestão CRI (R$/mês)',
        tooltip: 'R$ 3.000/mês cobrado pela Bloxs Securitizadora durante todo o prazo da operação.',
        default: 3000, unit: 'brl', min_brl: 3000,
        periodicidade: 'mensal',
      },
      {
        id: 'ag_fiduciario',
        label: 'Agente Fiduciário (R$/ano)',
        tooltip: 'Obrigatório em oferta pública. Terra / Lastro / Daycoval. R$ 20.000/ano.',
        default: 20000, unit: 'brl', min_brl: 20000,
        periodicidade: 'anual',
      },
      {
        id: 'escrituracao',
        label: 'Escrituração complementar (R$/mês)',
        tooltip: 'Escrituração adicional via parceiro 3P, R$ 1.000/mês.',
        default: 1000, unit: 'brl', min_brl: 0,
        periodicidade: 'mensal',
      },
    ],
  },
  cra: {
    label: 'CRA',
    costs: [
      {
        id: 'laqus',
        label: 'Escrituração + Depósito + Custódia (Laqus, a.a.)',
        tooltip: 'Pacote flat fee Laqus: escrituração, depósito e custódia. 0,07% a.a. sobre volume.',
        default: 7000, unit: 'brl', min_brl: 7000,
      },
      {
        id: 'estruturacao',
        label: 'Estruturação Bloxs (one-off)',
        tooltip: 'Fee único de constituição cobrado pela Bloxs Securitizadora.',
        default: 30000, unit: 'brl', min_brl: 30000,
      },
      {
        id: 'gestao',
        label: 'Taxa de Gestão CRA (R$/mês)',
        tooltip: 'R$ 3.000/mês cobrado pela Bloxs Securitizadora durante todo o prazo.',
        default: 3000, unit: 'brl', min_brl: 3000,
        periodicidade: 'mensal',
      },
      {
        id: 'ag_fiduciario',
        label: 'Agente Fiduciário (R$/ano)',
        tooltip: 'Obrigatório em CRA. Terra / Lastro / Daycoval. R$ 20.000/ano.',
        default: 20000, unit: 'brl', min_brl: 20000,
        periodicidade: 'anual',
      },
      {
        id: 'escrow',
        label: 'Conta Escrow (R$/mês)',
        tooltip: 'Conta escrow via parceiro 3P. R$ 200/mês.',
        default: 200, unit: 'brl', min_brl: 0,
        periodicidade: 'mensal',
      },
    ],
  },
  fidc: {
    label: 'Antecipação de Recebíveis (FIDC)',
    costs: [
      {
        id: 'estruturacao',
        label: 'Estruturação / Setup do Fundo (one-off)',
        tooltip: 'Fee único de constituição e setup do FIDC pela Bloxs / Estruturador.',
        default: 50000, unit: 'brl', min_brl: 50000,
      },
      {
        id: 'gestao',
        label: 'Taxa de Gestão (R$/mês)',
        tooltip: 'Gestor R2C / Bloxs: 0,30% a.a. ou R$ 15.000/mês. Ref: planilha FIDC.',
        default: 15000, unit: 'brl', min_brl: 15000,
        periodicidade: 'mensal',
      },
      {
        id: 'administracao',
        label: 'Taxa de Administração (R$/mês)',
        tooltip: 'Administrador Socopa / Oliveira Trust. R$ 20.000/mês.',
        default: 20000, unit: 'brl', min_brl: 20000,
        periodicidade: 'mensal',
      },
      {
        id: 'custodia',
        label: 'Taxa de Custódia (R$/mês)',
        tooltip: 'Custodiante 3P. R$ 1.500/mês.',
        default: 1500, unit: 'brl', min_brl: 1500,
        periodicidade: 'mensal',
      },
      {
        id: 'servicer',
        label: 'Servicer Provider (R$/mês)',
        tooltip: 'Operador especializado (Pagbem / Outros). Gestão dos recebíveis. R$ 70.000/mês.',
        default: 70000, unit: 'brl', min_brl: 5000,
        periodicidade: 'mensal',
      },
      {
        id: 'auditoria',
        label: 'Auditoria Externa (R$/ano)',
        tooltip: 'Baker Tilly / BDO. Obrigatória para FIDC. R$ 36.000/ano.',
        default: 36000, unit: 'brl', min_brl: 36000,
        periodicidade: 'anual',
      },
    ],
  },
  deb: {
    label: 'Debêntures',
    costs: [
      {
        id: 'estruturacao',
        label: 'Estruturação / Assessoria de Emissão (one-off)',
        tooltip: 'Fee único de estruturação pela Bloxs Capital Markets. R$ 20.000.',
        default: 20000, unit: 'brl', min_brl: 20000,
      },
      {
        id: 'registro_b3',
        label: 'Registro B3 / Cetip (one-off)',
        tooltip: 'Taxa de emissão B3. R$ 8.000 flat para volumes até R$ 50MM.',
        default: 8000, unit: 'brl', min_brl: 8000,
      },
      {
        id: 'juridico',
        label: 'Due Diligence Jurídica (one-off)',
        tooltip: 'Escritório jurídico. Estimado R$ 15.000.',
        default: 15000, unit: 'brl', min_brl: 0,
      },
      {
        id: 'ag_fiduciario',
        label: 'Agente Fiduciário (R$/ano)',
        tooltip: 'Terra / Lastro / Daycoval. R$ 20.000/ano.',
        default: 20000, unit: 'brl', min_brl: 20000,
        periodicidade: 'anual',
      },
      {
        id: 'escrituracao',
        label: 'Escriturador (R$/ano)',
        tooltip: 'Escriturador das debêntures. R$ 12.000/ano.',
        default: 12000, unit: 'brl', min_brl: 12000,
        periodicidade: 'anual',
      },
    ],
  },
  nc: {
    label: 'Nota Comercial',
    costs: [
      {
        id: 'laqus',
        label: 'Escrituração + Depósito + Custódia (Laqus, a.a.)',
        tooltip: 'Pacote Laqus: 0,07% a.a. sobre volume. Ref: proposta Laqus.',
        default: 7000, unit: 'brl', min_brl: 7000,
      },
      {
        id: 'estruturacao',
        label: 'Estruturação Bloxs (one-off)',
        tooltip: 'Fee único de constituição cobrado pela Bloxs Securitizadora.',
        default: 30000, unit: 'brl', min_brl: 30000,
      },
      {
        id: 'gestao',
        label: 'Taxa de Gestão NC (R$/mês)',
        tooltip: 'R$ 3.000/mês cobrado pela Bloxs Securitizadora durante todo o prazo.',
        default: 3000, unit: 'brl', min_brl: 3000,
        periodicidade: 'mensal',
      },
      {
        id: 'escrow',
        label: 'Conta Escrow (R$/mês)',
        tooltip: 'Conta escrow via parceiro 3P. R$ 200/mês.',
        default: 200, unit: 'brl', min_brl: 0,
        periodicidade: 'mensal',
      },
    ],
  },
  cvm88: {
    label: 'CVM 88',
    costs: [
      {
        id: 'estruturacao',
        label: 'Estruturação Bloxs (one-off)',
        tooltip: 'Fee único de estruturação para oferta regulada pela RCVM 88 (crowdfunding de investimento).',
        default: 30000, unit: 'brl', min_brl: 30000,
      },
      {
        id: 'laqus',
        label: 'Escrituração + Depósito + Custódia (Laqus, a.a.)',
        tooltip: 'Pacote Laqus aplicável à emissão CVM 88.',
        default: 7000, unit: 'brl', min_brl: 7000,
      },
      {
        id: 'gestao',
        label: 'Taxa de Gestão (R$/mês)',
        tooltip: 'Taxa mensal de gestão durante o prazo da operação.',
        default: 3000, unit: 'brl', min_brl: 3000,
        periodicidade: 'mensal',
      },
      {
        id: 'auditoria',
        label: 'Auditoria (R$/ano)',
        tooltip: 'Auditoria independente exigida pela regulação CVM 88.',
        default: 20000, unit: 'brl', min_brl: 0,
        periodicidade: 'anual',
      },
    ],
  },
  fundo: {
    label: 'Fundo (FII/FIP/FIDC)',
    costs: [
      {
        id: 'estruturacao',
        label: 'Estruturação de Fundo (one-off)',
        tooltip: 'Fee único de constituição e setup do fundo pela Bloxs / Estruturador.',
        default: 50000, unit: 'brl', min_brl: 50000,
      },
      {
        id: 'gestao',
        label: 'Taxa de Gestão (R$/mês)',
        tooltip: 'Gestor R2C / Bloxs: R$ 15.000/mês (0,30% a.a. sobre PL).',
        default: 15000, unit: 'brl', min_brl: 15000,
        periodicidade: 'mensal',
      },
      {
        id: 'administracao',
        label: 'Taxa de Administração (R$/mês)',
        tooltip: 'Administrador fiduciário Socopa / Oliveira Trust. R$ 20.000/mês.',
        default: 20000, unit: 'brl', min_brl: 20000,
        periodicidade: 'mensal',
      },
      {
        id: 'custodia',
        label: 'Taxa de Custódia (R$/mês)',
        tooltip: 'Custodiante 3P. R$ 1.500/mês.',
        default: 1500, unit: 'brl', min_brl: 1500,
        periodicidade: 'mensal',
      },
      {
        id: 'placement',
        label: 'Fee de Placement (one-off, % volume)',
        tooltip: 'Comissão de distribuição paga aos distribuidores. 1% sobre volume captado.',
        default: 1.0, unit: 'pct', min_brl: 0,
      },
    ],
  },
};

export const instrumentKeys = Object.keys(instruments);

export function calcInst(key, vol, prazo, overrides = {}) {
  const inst = instruments[key];
  let total = 0;
  const rows = [];

  inst.costs.forEach((c) => {
    const raw = overrides[c.id] !== undefined ? parseFloat(overrides[c.id]) || 0 : c.default;

    let amount;
    if (c.unit === 'pct') {
      amount = (vol * raw) / 100;
    } else if (c.periodicidade === 'mensal') {
      // custo mensal × prazo em meses
      amount = raw * prazo;
    } else if (c.periodicidade === 'anual') {
      // custo anual × anos (prazo em meses / 12)
      amount = raw * (prazo / 12);
    } else {
      // one-off
      amount = raw;
    }

    // aplica mínimo
    if (c.min_brl && amount < c.min_brl) amount = c.min_brl;

    total += amount;
    rows.push({ id: c.id, label: c.label, amount, unit: c.unit, val: raw, periodicidade: c.periodicidade });
  });

  const custoPct = vol > 0 ? (total / vol) * 100 : 0;
  const custoAA = prazo > 0 ? custoPct / (prazo / 12) : 0;
  return {
    total,
    rows,
    inst,
    custoPct,
    custoAA,
    liquido: vol - total,
    liquidoPct: vol > 0 ? ((vol - total) / vol) * 100 : 0,
  };
}
