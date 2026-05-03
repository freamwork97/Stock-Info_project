import React from 'react';
import { delta, fmt, fmtPct } from '../utils/format';
import type { DeltaPillProps, BackLinkProps, StatProps, MiniStatProps } from '../types/components';

export function DeltaPill({ price, prev, big = false, dp = 2 }: DeltaPillProps): JSX.Element {
  const { diff, pct, isUp } = delta(price, prev);
  const cls = 'chip ' + (isUp ? 'chip-up' : 'chip-down');
  const arrow = isUp ? '▲' : '▼';
  const style = big ? { height: 32, fontSize: 14, padding: '0 12px' } : undefined;
  return (
    <span className={cls} style={style}>
      <span>{arrow}</span>
      <span className="num">{fmt(Math.abs(diff))}</span>
      <span className="num">({fmtPct(pct, dp)})</span>
    </span>
  );
}

export function BackLink({ to, children = '뒤로' }: BackLinkProps): JSX.Element {
  return (
    <a href={to} className="btn btn-ghost btn-sm" style={{ paddingLeft: 6, color: 'var(--text-2)' }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </a>
  );
}

export function Stat({ label, value, cls }: StatProps): JSX.Element {
  return (
    <div>
      <div className="body-sm" style={{ fontSize: 12, color: 'var(--text-3)' }}>{label}</div>
      <div className={'num mt-2 ' + (cls || '')} style={{ fontSize: 16, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

export function MiniStat({ label, value, cls }: MiniStatProps): JSX.Element {
  return (
    <div className="card card-pad">
      <div className="body-sm" style={{ fontSize: 12 }}>{label}</div>
      <div className={'num mt-3 ' + (cls || '')} style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
