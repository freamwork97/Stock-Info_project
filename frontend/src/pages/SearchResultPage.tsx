import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import News from '../components/News';
import FinancialStatements from '../components/financialStatements';
import { Sparkline } from '../components/Charts';
import { DeltaPill, BackLink, Stat } from '../components/Bits';
import { delta, fmt } from '../utils/format';
import type { StockInfo, LatestStockPrice } from '../types/api';

function SearchResultPage(): JSX.Element {
  const { searchTerm = '' } = useParams<{ searchTerm: string }>();
  const [info, setInfo] = useState<StockInfo | null>(null);
  const [price, setPrice] = useState<LatestStockPrice | null>(null);

  useEffect(() => {
    fetch(`/stock/${encodeURIComponent(searchTerm)}`)
      .then(r => r.json())
      .then((d: StockInfo) => setInfo(d))
      .catch(() => setInfo(null));
  }, [searchTerm]);

  useEffect(() => {
    let timer: number;
    const load = () => {
      fetch(`/get_stock_price/${encodeURIComponent(searchTerm)}`)
        .then(r => r.json())
        .then((d: { 날짜: string[]; 시가: number[]; 고가: number[]; 저가: number[]; 종가: number[]; 거래량: number[] }) => {
          setPrice({
            고가: d.고가.slice(-1)[0],
            전일종가: d.종가.slice(-2)[0],
            시가: d.시가.slice(-1)[0],
            저가: d.저가.slice(-1)[0],
            종가: d.종가.slice(-1)[0],
            거래량: d.거래량.slice(-1)[0],
          });
        })
        .catch(() => {});
    };
    load();
    timer = window.setInterval(load, 20000);
    return () => clearInterval(timer);
  }, [searchTerm]);

  // DB는 DESC(최신→과거) 순, 차트·fallback 계산을 위해 ASC로 뒤집음
  const closes = (info?.daily_prices || [])
    .map(d => Number(d.close ?? 0))
    .filter(Boolean)
    .reverse();
  const cur = price?.종가 ?? closes[closes.length - 1];
  const prev = price?.전일종가 ?? closes[closes.length - 2];

  return (
    <div className="page fade-in">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-md">
        <BackLink to="/">홈으로</BackLink>
        <div className="flex gap-sm">
          <SearchInput variant="inline" toPage="/" placeholder="다른 종목 검색" />
          <Link className="btn btn-outline btn-sm" to={`/chart/${encodeURIComponent(searchTerm)}`}>상세 차트 →</Link>
          <Link className="btn btn-outline btn-sm" to={`/predict/${encodeURIComponent(searchTerm)}`}>주가 예측</Link>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        <div className="card card-pad-lg">
          <div className="flex items-center gap-md mb-3">
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'var(--brand-soft)', color: 'var(--brand-strong)',
              display: 'grid', placeItems: 'center',
              fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)',
            }}>{(info?.company || searchTerm).slice(0, 1)}</div>
            <div>
              <div className="flex items-center gap-sm">
                <h1 className="h-1">{info?.company || searchTerm}</h1>
                {info?.code && <span className="chip">{info.code}</span>}
              </div>
              <div className="body-sm mt-2">KRX · 종가 기준</div>
            </div>
          </div>

          <div className="flex items-end gap-md mt-4">
            <div className={'price-big num ' + (delta(cur, prev).isUp ? 'up' : 'down')}>
              {fmt(cur)}<span style={{ fontSize: 22, fontWeight: 500, marginLeft: 4 }}>원</span>
            </div>
            {prev && <DeltaPill price={cur} prev={prev} big />}
          </div>

          {closes.length > 1 && (
            <div className="mt-6"><Sparkline data={closes} height={120} /></div>
          )}

          <div className="grid grid-4 mt-6 gap-md">
            <Stat label="시가"     value={fmt(price?.시가)} />
            <Stat label="고가"     value={fmt(price?.고가)} cls="up" />
            <Stat label="저가"     value={fmt(price?.저가)} cls="down" />
            <Stat label="거래량"   value={fmt(price?.거래량, { compact: true })} />
            <Stat label="전일종가" value={fmt(price?.전일종가)} />
          </div>
        </div>

        <div className="card card-pad-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="h-2">관련 뉴스</h2>
          </div>
          <div className="scroll-y" style={{ maxHeight: 540 }}>
            <News searchTerm={searchTerm} />
          </div>
        </div>
      </div>

      <div className="card mt-6">
        <div className="tabs" style={{ paddingTop: 4 }}>
          <button className="tab is-active">재무제표</button>
        </div>
        <div style={{ padding: 22 }}>
          <FinancialStatements searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
}

export default SearchResultPage;
