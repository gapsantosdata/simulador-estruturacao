import { useState } from 'react';

const fmt = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CurrencyInput({ value, onChange, min, className, style }) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');

  const num = typeof value === 'number' && !isNaN(value) ? value : 0;

  function handleFocus() {
    setEditing(true);
    setRaw(num === 0 ? '' : String(num));
  }

  function handleBlur() {
    setEditing(false);
    // parse pt-BR ("1.000,50") or plain ("1000.50")
    const cleaned = raw.replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
    let parsed = parseFloat(cleaned) || 0;
    if (min !== undefined && parsed < min) parsed = min;
    onChange(parsed);
  }

  return (
    <input
      type="text"
      inputMode="decimal"
      value={editing ? raw : fmt.format(num)}
      onFocus={handleFocus}
      onChange={(e) => setRaw(e.target.value)}
      onBlur={handleBlur}
      className={className}
      style={style}
    />
  );
}
