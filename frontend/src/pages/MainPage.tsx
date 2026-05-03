import React, { useEffect, useState } from 'react';
import SearchInput from '../components/SearchInput';
import ExchangeRateTable from '../components/ExchangeRateTable';
import { LineChartView } from '../components/Charts';
import { DeltaPill } from '../components/Bits';
import { delta, fmt, fmtPct } from '../utils/format';
import type { KeyIndexState, KeyIndexResponse } from '../types/api';

function MainPage(): JSX.Element {
  const [keyIndex, setKeyIndex] = useState<KeyIndexState>({});
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    fetch('/key_index')
      .then(r => r.json())
      .then((data: KeyIndexResponse) => {
        const next: KeyIndexState = {};
        Object.keys(data).forEach(name => {
          const dates = Object.keys(data[name]);
          const last = data[name][dates[dates.length - 1]];
          const prev = data[name][dates[dates.length - 2]] ?? last;
          next[name] = { latest: last, prev, dates, values: dates.map(d => data[name][d]) };
        });
        setKeyIndex(next);
        const first = Object.keys(next)[0];
        if (first) setSelectedKey(first);
      })
      .catch(() => {});
  }, []);

  const indices = Object.keys(keyIndex);
  const sel = selectedKey ? keyIndex[selectedKey] : null;

  return (
    <div className="page">
      <section className="hero fade-in">
        <div className="eyebrow">실시간 한국 주식 정보</div>
        <h1 className="hero-title mt-3">
          종목 하나로<br />
          <span className="accent">시장의 흐름</span>까지 한눈에.
        </h1>
        <p className="hero-sub">가격 · 차트 · 재무제표 · 뉴스 · 예측까지, 검색 한 번으로.</p>
        <SearchInput variant="hero" toPage="/" placeholder="종목명 또는 코드 입력 (예: 삼성전자, 005930)" />
        <div className="hero-quick">
          {['삼성전자', 'SK하이닉스', 'NAVER', '카카오', '현대차'].map(t => (
            <a key={t} href={`/search/${encodeURIComponent(t)}`} className="hero-quick-tag">
              <span style={{ color: 'var(--text-3)' }}>#</span>{t}
            </a>
          ))}
        </div>
      </section>

      {indices.length > 0 && (
        <section className="mt-8 fade-in">
          <div className="ticker-row">
            {indices.map(name => {
              const d = keyIndex[name];
              const { diff, pct, isUp } = delta(d.latest, d.prev);
              return (
                <button key={name} className="ticker-cell" onClick={() => setSelectedKey(name)}
                  style={{
                    background: selectedKey === name ? 'var(--surface-2)' : 'transparent',
                    border: 'none', textAlign: 'left',
                    borderRight: '1px solid var(--border)', cursor: 'pointer',
                    borderTop: selectedKey === name ? '2px solid var(--brand)' : '2px solid transparent',
                  }}>
                  <div className="name">{name}</div>
                  <div className="val num">{fmt(d.latest, { dp: 2 })}</div>
                  <div className={'delta num ' + (isUp ? 'up' : 'down')}>
                    {isUp ? '▲' : '▼'} {Math.abs(diff).toFixed(2)} · {fmtPct(pct)}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="grid mt-6" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="card card-pad">
          {sel ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="eyebrow">선택한 지수</div>
                  <h2 className="h-2 mt-2">{selectedKey}</h2>
                  <div className="flex items-center gap-md mt-2">
                    <span className="num" style={{ fontSize: 32, fontWeight: 700 }}>
                      {fmt(sel.latest, { dp: 2 })}
                    </span>
                    <DeltaPill price={sel.latest} prev={sel.prev} big />
                  </div>
                </div>
              </div>
              <LineChartView labels={sel.dates} data={sel.values} height={260} />
            </>
          ) : (
            <div className="empty">지수 정보 불러오는 중…</div>
          )}
        </div>
        <ExchangeRateTable />
      </section>
    </div>
  );
}

export default MainPage;
