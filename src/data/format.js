const _nf = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const _nf2 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const fmt = (v) => _nf.format(Math.round(v));

export const fmt2 = (v) => _nf2.format(v);

export const fmtPct = (v) =>
  v.toFixed(2).replace('.', ',') + '%';

export const fmtCompact = (v) => {
  if (v >= 1_000_000) return 'R$ ' + (v / 1_000_000).toFixed(1).replace('.', ',') + 'M';
  if (v >= 1_000) return 'R$ ' + (v / 1_000).toFixed(0) + 'K';
  return fmt(v);
};
