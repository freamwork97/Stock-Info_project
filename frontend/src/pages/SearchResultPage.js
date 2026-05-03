import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import News from '../components/News';
import FinancialStatements from '../components/financialStatements';
import { Sparkline } from '../components/Charts';
import { DeltaPill, BackLink, Stat } from '../components/Bits';
import { delta, fmt } from '../utils/format';

function SearchResultPage() {
  const { searchTerm } = useParams();
  const [info, setInfo] = useState(null);
  const [price, setPrice] = useState({});
  const [tab, setTab] = useState('뉴스');

  useEffect(() => {
    fetch(`/stock/${encodeURIComponent(searchTerm)}`)
      .then(r => r.json())
      .then(setInfo)
      .catch(() => setInfo(null));
  }, [searchTerm]);

  useEffect(() => {
    let timer;
    const load = () => {
      fetch(`/get_stock_price/${encodeURIComponent(searchTerm)}`)
        .then(r => r.json())
        .then(setPrice)
        .catch(() => {});
    };
    load();
    timer = setInterval(load, 20000);
    return () => clearInterval(timer);
  }, [searchTerm]);

  const closes = (info?.daily_prices || []).map(d => Number(d.close ?? d.종가)).filter(Boolean);
  const cur = Number(price.종가) || closes[closes.length - 1];
  const prev = Number(price.전일종가) || closes[closes.length - 2];

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
            <Stat label="시가"     value={fmt(price.시가)} />
            <Stat label="고가"     value={fmt(price.고가)} cls="up" />
            <Stat label="저가"     value={fmt(price.저가)} cls="down" />
            <Stat label="거래량"   value={fmt(price.거래량, { compact: true })} />
            <Stat label="전일종가" value={fmt(price.전일종가)} />
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
          {['뉴스', '재무제표'].map(t => (
            <button key={t} className={'tab' + (tab === t ? ' is-active' : '')} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div style={{ padding: 22 }}>
          {tab === '뉴스' && <News searchTerm={searchTerm} />}
          {tab === '재무제표' && <FinancialStatements searchTerm={searchTerm} />}
        </div>
      </div>
    </div>
  );
}

export default SearchResultPage;
