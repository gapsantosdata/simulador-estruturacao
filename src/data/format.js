export const fmt = (v) =>
  'R$ ' +
  Math.round(v).toLocaleString('pt-BR');

export const fmtPct = (v) =>
  v.toFixed(2).replace('.', ',') + '%';

export const fmtCompact = (v) => {
  if (v >= 1_000_000) return 'R$ ' + (v / 1_000_000).toFixed(1).replace('.', ',') + 'M';
  if (v >= 1_000) return 'R$ ' + (v / 1_000).toFixed(0) + 'K';
  return fmt(v);
};
