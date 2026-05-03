import React, { useEffect, useRef, useState } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import type { FinancialData } from '../types/api';
import type { SearchTermProps } from '../types/components';
import { fmt, getCSSVar } from '../utils/format';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function fmtBil(n: number | null | undefined): string {
  if (n == null) return '—';
  const abs = Math.abs(n);
  if (abs >= 10000) return (n / 10000).toFixed(1) + '조원';
  return n.toLocaleString('ko-KR') + '억원';
}

const CARD_ITEMS = [
  { key: '매출액',    section: 'income'  as const },
  { key: '영업이익',  section: 'income'  as const },
  { key: '당기순이익', section: 'income' as const },
  { key: '자산총계',  section: 'balance' as const },
  { key: '부채총계',  section: 'balance' as const },
  { key: '자본총계',  section: 'balance' as const },
];

const CHART_KEYS = ['매출액', '영업이익', '당기순이익'];
const CHART_COLORS = ['#3b82f6', '#22c55e', '#f59e0b'];

function IncomeChart({ years, income }: { years: string[]; income: FinancialData['income'] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chart.current) chart.current.destroy();
    const text = getCSSVar('--text-3');
    const grid = getCSSVar('--border');

    chart.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: years,
        datasets: CHART_KEYS.filter(k => income[k]).map((k, i) => ({
          label: k,
          data: income[k].map(v => v ?? 0),
          backgroundColor: CHART_COLORS[i] + 'cc',
          borderColor: CHART_COLORS[i],
          borderWidth: 1,
          borderRadius: 4,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: text, font: { size: 12 } } },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${fmtBil(ctx.parsed.y)}`,
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: text } },
          y: {
            grid: { color: grid },
            ticks: {
              color: text,
              callback: v => {
                const n = Number(v);
                if (Math.abs(n) >= 10000) return (n / 10000).toFixed(0) + '조';
                return n.toLocaleString('ko-KR');
              },
            },
          },
        },
      },
    });
    return () => { chart.current?.destroy(); };
  }, [years, income]);

  return <canvas ref={ref} />;
}

function DataTable({
  title, keys, years, data,
}: {
  title: string;
  keys: string[];
  years: string[];
  data: Record<string, (number | null)[]>;
}) {
  const rows = keys.filter(k => data[k]);
  if (!rows.length) return null;
  return (
    <div>
      <div className="eyebrow mb-3">{title}</div>
      <div className="scroll-x">
        <table className="table table-clean" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>계정명</th>
              {years.map(y => <th key={y} style={{ textAlign: 'right' }}>{y}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(key => (
              <tr key={key}>
                <td style={{ fontWeight: 500 }}>{key}</td>
                {data[key].map((v, i) => (
                  <td key={i} className="num" style={{ textAlign: 'right' }}>
                    {v != null ? fmt(v) : '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FinancialStatements({ searchTerm }: SearchTermProps): JSX.Element {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/financial_statements/${encodeURIComponent(searchTerm)}`)
      .then(r => r.json())
      .then((d: FinancialData) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  if (loading) return <div className="empty">재무제표 불러오는 중…</div>;
  if (!data) return <div className="empty">재무제표가 없습니다</div>;

  const { years, income, balance } = data;
  const latestIdx = years.length - 1;
  const latestYear = years[latestIdx];

  return (
    <div>
      {/* 연도 범위 */}
      <div className="flex items-center gap-sm mb-4">
        <span className="chip">{years[0]} – {latestYear}</span>
        <span className="body-sm" style={{ color: 'var(--text-3)' }}>
          {latestYear}년 기준 · 억원 단위
        </span>
      </div>

      {/* 핵심 지표 카드 (최신 연도) */}
      <div className="grid gap-md mb-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {CARD_ITEMS.map(({ key, section }) => {
          const arr = (section === 'income' ? income : balance)[key];
          const val = arr ? arr[latestIdx] : null;
          return (
            <div key={key} className="card card-pad" style={{ background: 'var(--surface-2)' }}>
              <div className="body-sm" style={{ color: 'var(--text-3)' }}>{key}</div>
              <div className="num mt-2" style={{ fontSize: 18, fontWeight: 700 }}>
                {fmtBil(val)}
              </div>
            </div>
          );
        })}
      </div>

      {/* 연도별 추이 바 차트 */}
      <div className="card card-pad mb-6" style={{ background: 'var(--surface-2)' }}>
        <div className="eyebrow mb-3">연도별 손익 추이 (억원)</div>
        <div style={{ height: 240 }}>
          <IncomeChart years={years} income={income} />
        </div>
      </div>

      {/* BS / IS 테이블 */}
      <div className="grid gap-md" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <DataTable
          title="재무상태표"
          keys={['자산총계', '유동자산', '부채총계', '유동부채', '자본총계']}
          years={years}
          data={balance}
        />
        <DataTable
          title="손익계산서"
          keys={['매출액', '매출총이익', '영업이익', '당기순이익', 'EBITDA']}
          years={years}
          data={income}
        />
      </div>
    </div>
  );
}

export default FinancialStatements;
