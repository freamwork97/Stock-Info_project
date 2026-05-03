// 포맷터 + delta 계산 유틸
export function fmt(n, opts = {}) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  if (opts.compact) {
    const a = Math.abs(n);
    if (a >= 1e12) return (n / 1e12).toFixed(2) + '조';
    if (a >= 1e8) return (n / 1e8).toFixed(0) + '억';
    if (a >= 1e4) return (n / 1e4).toFixed(0) + '만';
  }
  return n.toLocaleString('ko-KR', {
    maximumFractionDigits: opts.dp ?? 0,
    minimumFractionDigits: opts.dp ?? 0,
  });
}

export function fmtPct(n, dp = 2) {
  if (n === null || isNaN(n)) return '—';
  const sign = n > 0 ? '+' : '';
  return sign + n.toFixed(dp) + '%';
}

export function delta(price, prev) {
  const p = Number(price), pv = Number(prev);
  if (!pv) return { diff: 0, pct: 0, isUp: true };
  const diff = p - pv;
  const pct = (diff / pv) * 100;
  return { diff, pct, isUp: diff >= 0 };
}

export function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
