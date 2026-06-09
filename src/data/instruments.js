// Valores de referência: Bloxs_Simulador_Custos_v2.xlsx (2025–2026)
export const instruments = {
  cri: {
    label: 'CRI',
    costs: [
      {
        id: 'laqus',
        label: 'Escrituração + Depósito + Custódia (a.a.)',
        tooltip: 'Pacote de escrituração, depósito e custódia do CRI. 0,07% a.a. sobre volume.',
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
        tooltip: 'Obrigatório em oferta pública. R$ 20.000/ano.',
        default: 20000, unit: 'brl', min_brl: 20000,
        periodicidade: 'anual',
      },
      {
        id: 'escrituracao',
        label: 'Escrituração complementar (R$/mês)',
        tooltip: 'Escrituração adicional via parceiro. R$ 1.000/mês.',
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
        label: 'Escrituração + Depósito + Custódia (a.a.)',
        tooltip: 'Pacote de escrituração, depósito e custódia do CRA. 0,07% a.a. sobre volume.',
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
        tooltip: 'Obrigatório em CRA. R$ 20.000/ano.',
        default: 20000, unit: 'brl', min_brl: 20000,
        periodicidade: 'anual',
      },
      {
        id: 'escrow',
        label: 'Conta Escrow (R$/mês)',
        tooltip: 'Conta escrow para movimentação dos recursos. R$ 200/mês.',
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
        tooltip: 'Fee único de constituição e setup do FIDC pela Bloxs.',
        default: 50000, unit: 'brl', min_brl: 50000,
      },
      {
        id: 'gestao',
        label: 'Taxa de Gestão (R$/mês)',
        tooltip: 'Gestão do FIDC pela Bloxs: 0,30% a.a. ou R$ 15.000/mês.',
        default: 15000, unit: 'brl', min_brl: 15000,
        periodicidade: 'mensal',
      },
      {
        id: 'administracao',
        label: 'Taxa de Administração (R$/mês)',
        tooltip: 'Administrador fiduciário. R$ 20.000/mês.',
        default: 20000, unit: 'brl', min_brl: 20000,
        periodicidade: 'mensal',
      },
      {
        id: 'custodia',
        label: 'Taxa de Custódia (R$/mês)',
        tooltip: 'Custódia dos ativos do fundo. R$ 1.500/mês.',
        default: 1500, unit: 'brl', min_brl: 1500,
        periodicidade: 'mensal',
      },
      {
        id: 'servicer',
        label: 'Servicer Provider (R$/mês)',
        tooltip: 'Operador especializado para gestão dos recebíveis. R$ 70.000/mês.',
        default: 70000, unit: 'brl', min_brl: 5000,
        periodicidade: 'mensal',
      },
      {
        id: 'auditoria',
        label: 'Auditoria Externa (R$/ano)',
        tooltip: 'Auditoria independente obrigatória para FIDC. R$ 36.000/ano.',
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
        tooltip: 'Assessoria jurídica especializada. Estimado R$ 15.000.',
        default: 15000, unit: 'brl', min_brl: 0,
      },
      {
        id: 'ag_fiduciario',
        label: 'Agente Fiduciário (R$/ano)',
        tooltip: 'Agente fiduciário das debêntures. R$ 20.000/ano.',
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
        label: 'Escrituração + Depósito + Custódia (a.a.)',
        tooltip: 'Pacote de escrituração, depósito e custódia da NC. 0,07% a.a. sobre volume.',
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
        tooltip: 'Conta escrow para movimentação dos recursos. R$ 200/mês.',
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
        label: 'Escrituração + Depósito + Custódia (a.a.)',
        tooltip: 'Pacote de escrituração, depósito e custódia aplicável à emissão CVM 88.',
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
        tooltip: 'Fee único de constituição e setup do fundo pela Bloxs.',
        default: 50000, unit: 'brl', min_brl: 50000,
      },
      {
        id: 'gestao',
        label: 'Taxa de Gestão (R$/mês)',
        tooltip: 'Gestão do fundo pela Bloxs: R$ 15.000/mês (0,30% a.a. sobre PL).',
        default: 15000, unit: 'brl', min_brl: 15000,
        periodicidade: 'mensal',
      },
      {
        id: 'administracao',
        label: 'Taxa de Administração (R$/mês)',
        tooltip: 'Administrador fiduciário. R$ 20.000/mês.',
        default: 20000, unit: 'brl', min_brl: 20000,
        periodicidade: 'mensal',
      },
      {
        id: 'custodia',
        label: 'Taxa de Custódia (R$/mês)',
        tooltip: 'Custódia dos ativos do fundo. R$ 1.500/mês.',
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

export const optionalServices = [
  {
    id: 'medicao_obra',
    label: 'Medição de Obra',
    tooltip: 'Empresa especializada para medição de obras em operações de CRI/CRA imobiliário. Custo mensal durante o prazo da obra.',
    default: 3000,
    unit: 'brl',
    periodicidade: 'mensal',
  },
  {
    id: 'legal_opinion',
    label: 'Legal Opinion',
    tooltip: 'Parecer jurídico emitido por escritório especializado sobre a estrutura da operação. Custo one-off.',
    default: 15000,
    unit: 'brl',
  },
  {
    id: 'cerc',
    label: 'CERC',
    tooltip: 'Central de Recebíveis — plataforma de registro e controle de recebíveis. Custo mensal de operação.',
    default: 2000,
    unit: 'brl',
    periodicidade: 'mensal',
  },
  {
    id: 'b3_servicer',
    label: 'B3 (registro/listagem)',
    tooltip: 'Taxa de registro ou listagem adicional na B3, quando aplicável à estrutura da operação.',
    default: 8000,
    unit: 'brl',
  },
  {
    id: 'outros',
    label: 'Outros',
    tooltip: 'Campo livre para especificar qualquer serviço adicional não listado acima.',
    default: 0,
    unit: 'brl',
    isOther: true,
  },
];

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
      amount = raw * prazo;
    } else if (c.periodicidade === 'anual') {
      amount = raw * (prazo / 12);
    } else {
      amount = raw;
    }

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
