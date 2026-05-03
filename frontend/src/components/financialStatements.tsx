import React, { useEffect, useState } from 'react';
import type { FinancialStatement } from '../types/api';
import type { SearchTermProps } from '../types/components';
import { fmt } from '../utils/format';

// 억원 단위 금액을 조/억 compact 표시
function fmtBil(n: number | null): string {
  if (n === null || n === undefined) return '—';
  const abs = Math.abs(n);
  if (abs >= 10000) return (n / 10000).toFixed(1) + '조원';
  return n.toLocaleString('ko-KR') + '억원';
}

const IS_KEYS = ['매출액', '영업이익', '당기순이익'] as const;
const BS_KEYS = ['자산총계', '부채총계', '자본총계'] as const;

const CARD_LABELS: Record<string, string> = {
  매출액: '매출액', 영업이익: '영업이익', 당기순이익: '당기순이익',
  자산총계: '자산총계', 부채총계: '부채총계', 자본총계: '자본총계',
};

function FinancialStatements({ searchTerm }: SearchTermProps): JSX.Element {
  const [rows, setRows] = useState<FinancialStatement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/financial_statements/${encodeURIComponent(searchTerm)}`)
      .then(r => r.json())
      .then((d: FinancialStatement[]) => setRows(Array.isArray(d) ? d : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  if (loading) return <div className="empty">재무제표 불러오는 중…</div>;
  if (!rows.length) return <div className="empty">재무제표가 없습니다</div>;

  const byKey = (key: string) => rows.find(r => r.계정명 === key)?.당기금액 ?? null;
  const year = rows[0]?.사업연도 ?? '';
  const period = rows[0]?.당기명 ?? '';

  const isRows = rows.filter(r => r.재무제표구분 === 'IS');
  const bsRows = rows.filter(r => r.재무제표구분 === 'BS');

  return (
    <div>
      {/* 연도/기간 */}
      <div className="flex items-center gap-sm mb-4">
        <span className="chip">{year}년</span>
        <span className="body-sm" style={{ color: 'var(--text-3)' }}>{period} · 억원 단위</span>
      </div>

      {/* 핵심 지표 카드 */}
      <div className="grid grid-4 gap-md mb-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[...IS_KEYS, ...BS_KEYS].map(key => {
          const val = byKey(key);
          return (
            <div key={key} className="card card-pad" style={{ background: 'var(--surface-2)' }}>
              <div className="body-sm" style={{ color: 'var(--text-3)' }}>{CARD_LABELS[key]}</div>
              <div className="num mt-2" style={{ fontSize: 18, fontWeight: 700 }}>
                {fmtBil(val)}
              </div>
            </div>
          );
        })}
      </div>

      {/* BS / IS 테이블 나란히 */}
      <div className="grid gap-md" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Section title="재무상태표" rows={bsRows} />
        <Section title="손익계산서" rows={isRows} />
      </div>
    </div>
  );
}

function Section({ title, rows }: { title: string; rows: FinancialStatement[] }) {
  if (!rows.length) return null;
  return (
    <div>
      <div className="eyebrow mb-3">{title}</div>
      <table className="table table-clean" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>계정명</th>
            <th style={{ textAlign: 'right' }}>금액 (억원)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 500 }}>{r.계정명}</td>
              <td className="num" style={{ textAlign: 'right' }}>
                {r.당기금액 !== null ? fmt(r.당기금액) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinancialStatements;
