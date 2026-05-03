import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CandleChartView } from '../components/Charts';
import { BackLink, MiniStat, DeltaPill } from '../components/Bits';
import SearchInput from '../components/SearchInput';
import { fmt, delta } from '../utils/format';

function ChartDetailPage() {
  const { searchTerm } = useParams();
  const [info, setInfo] = useState(null);
  const [period, setPeriod] = useState('일봉');
  const [days, setDays] = useState(120);
  const [movingAverages, setMovingAverages] = useState([5, 20, 60]);

  useEffect(() => {
    fetch(`/stock/${encodeURIComponent(searchTerm)}`)
      .then(r => r.json()).then(setInfo).catch(() => setInfo(null));
  }, [searchTerm]);

  // daily_prices in info has date,open,high,low,close,volume
  const allCandles = useMemo(() => {
    return (info?.daily_prices || []).map(d => ({
      date: d.date, open: +d.open, high: +d.high,
      low: +d.low, close: +d.close, volume: +d.volume,
    })).filter(c => !isNaN(c.close));
  }, [info]);

  const candles = useMemo(() => {
    const slice = allCandles.slice(-days);
    if (period === '주봉') return aggregate(slice, 'week');
    if (period === '월봉') return aggregate(slice, 'month');
    return slice;
  }, [allCandles, days, period]);

  const last = candles[candles.length - 1] || {};
  const prev = candles[candles.length - 2] || {};
  const { isUp } = delta(last.close, prev.close);

  const periodOptions = [
    { l: '1개월', v: 22 }, { l: '3개월', v: 66 },
    { l: '6개월', v: 132 }, { l: '1년', v: 240 },
  ];
  const maOptions = [5, 20, 60, 120, 200];
  const maColors = { 5: '#22c55e', 20: '#a855f7', 60: '#f59e0b', 120: '#3b82f6', 200: '#ec4899' };

  function toggleMA(p) {
    setMovingAverages(arr => arr.includes(p) ? arr.filter(x => x !== p) : [...arr, p].sort((a, b) => a - b));
  }

  return (
    <div className="page fade-in">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-md">
        <BackLink to={`/search/${encodeURIComponent(searchTerm)}`}>{info?.company || searchTerm} 정보로</BackLink>
        <div className="flex gap-sm">
          <SearchInput variant="inline" toPage="chart" placeholder="다른 종목 차트" />
          <Link className="btn btn-outline btn-sm" to={`/predict/${encodeURIComponent(searchTerm)}`}>주가 예측</Link>
        </div>
      </div>

      <div className="card card-pad-lg">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-md">
          <div>
            <div className="eyebrow">차트 상세</div>
            <h1 className="h-1 mt-2">
              {info?.company || searchTerm}
              {info?.code && <span className="body-sm" style={{ marginLeft: 8 }}>{info.code}</span>}
            </h1>
            {last.close && (
              <div className="flex items-center gap-md mt-3">
                <span className={'num ' + (isUp ? 'up' : 'down')} style={{ fontSize: 30, fontWeight: 700 }}>
                  {fmt(last.close)}원
                </span>
                {prev.close && <DeltaPill price={last.close} prev={prev.close} big />}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-md items-center">
            <div className="segment">
              {['일봉', '주봉', '월봉'].map(p => (
                <button key={p} className={'segment-btn' + (period === p ? ' is-active' : '')}
                  onClick={() => setPeriod(p)}>{p}</button>
              ))}
            </div>
            <div className="segment">
              {periodOptions.map(p => (
                <button key={p.l} className={'segment-btn' + (days === p.v ? ' is-active' : '')}
                  onClick={() => setDays(p.v)}>{p.l}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-sm mb-4">
          <span className="body-sm" style={{ alignSelf: 'center', marginRight: 8 }}>이동평균선</span>
          {maOptions.map(p => (
            <button key={p} onClick={() => toggleMA(p)} className="chip"
              style={{
                cursor: 'pointer',
                background: movingAverages.includes(p) ? maColors[p] + '22' : 'var(--surface-hover)',
                color: movingAverages.includes(p) ? maColors[p] : 'var(--text-3)',
                fontWeight: movingAverages.includes(p) ? 600 : 500,
                border: movingAverages.includes(p) ? `1px solid ${maColors[p]}55` : '1px solid transparent',
              }}>
              <span style={{ width: 8, height: 8, borderRadius: 50, background: maColors[p], opacity: movingAverages.includes(p) ? 1 : 0.4, display: 'inline-block' }} />
              MA{p}
            </button>
          ))}
        </div>

        {candles.length > 0 ? (
          <CandleChartView candles={candles} movingAverages={movingAverages} height={460} />
        ) : (
          <div className="empty">차트 데이터를 불러오는 중…</div>
        )}
      </div>

      {last.close && (
        <div className="grid grid-4 mt-6 gap-md">
          <MiniStat label="시가"   value={fmt(last.open)} />
          <MiniStat label="고가"   value={fmt(last.high)} cls="up" />
          <MiniStat label="저가"   value={fmt(last.low)}  cls="down" />
          <MiniStat label="거래량" value={fmt(last.volume, { compact: true })} />
        </div>
      )}
    </div>
  );
}

function aggregate(candles, kind) {
  const out = [];
  let cur = null;
  candles.forEach(c => {
    const d = new Date(c.date);
    const k = kind === 'month' ? c.date.slice(0, 7)
      : `${d.getFullYear()}-W${Math.floor((d.getDate() + 6) / 7)}-${d.getMonth()}`;
    if (!cur || cur._k !== k) {
      if (cur) out.push(cur);
      cur = { ...c, _k: k };
    } else {
      cur.high = Math.max(cur.high, c.high);
      cur.low = Math.min(cur.low, c.low);
      cur.close = c.close;
      cur.volume += c.volume;
    }
  });
  if (cur) out.push(cur);
  return out;
}

export default ChartDetailPage;
