import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkline } from '../components/Charts';
import { fmt, fmtPct } from '../utils/format';

interface TopStock {
  rank: number;
  ticker: string;
  name: string;
  sector: string;
  close: number;
  changes: number;
  changes_ratio: number;
  volume: number;
  market_cap: number;
  sparkline: number[];
}

function MarketPage(): JSX.Element {
  const [topStocks, setTopStocks] = useState<TopStock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/market_top?limit=20')
      .then(r => r.json())
      .then((data: TopStock[]) => {
        setTopStocks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page fade-in">
      <div className="mb-6">
        <div className="eyebrow">한국 주식 시장</div>
        <h1 className="h-1 mt-2">마켓 전체보기</h1>
      </div>

      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 700, fontSize: 15 }}>시가총액 상위</span>
          <span className="body-sm" style={{ color: 'var(--text-3)' }}>
            {topStocks.length}개 종목
          </span>
        </div>

        {loading ? (
          <div className="empty">데이터를 불러오는 중&hellip;</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table table-clean" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th>종목명</th>
                  <th>코드</th>
                  <th>섹터</th>
                  <th style={{ textAlign: 'right' }}>현재가</th>
                  <th style={{ textAlign: 'right' }}>전일대비</th>
                  <th style={{ textAlign: 'right' }}>등락률</th>
                  <th style={{ textAlign: 'right' }}>거래량</th>
                  <th style={{ textAlign: 'right' }}>시가총액</th>
                  <th style={{ textAlign: 'center', width: 120 }}>차트</th>
                </tr>
              </thead>
              <tbody>
                {topStocks.map(s => {
                  const isUp = s.changes_ratio >= 0;
                  return (
                    <tr key={s.ticker}>
                      <td style={{ color: 'var(--text-3)', fontWeight: 500 }}>{s.rank}</td>
                      <td>
                        <Link to={`/search/${encodeURIComponent(s.name)}`} style={{ fontWeight: 700 }}>
                          {s.name}
                        </Link>
                      </td>
                      <td className="num" style={{ color: 'var(--text-3)' }}>{s.ticker}</td>
                      <td>
                        {s.sector
                          ? <span className="chip">{s.sector}</span>
                          : <span style={{ color: 'var(--text-4)' }}>—</span>
                        }
                      </td>
                      <td className="num" style={{ textAlign: 'right', fontWeight: 700 }}>
                        {fmt(s.close)}
                      </td>
                      <td className="num" style={{ textAlign: 'right', color: isUp ? 'var(--up)' : 'var(--down)' }}>
                        {isUp ? `+${fmt(s.changes)}` : fmt(s.changes)}
                      </td>
                      <td className={'num ' + (isUp ? 'up' : 'down')} style={{ textAlign: 'right' }}>
                        {fmtPct(s.changes_ratio)}
                      </td>
                      <td className="num" style={{ textAlign: 'right', color: 'var(--text-2)' }}>
                        {fmt(s.volume, { compact: true })}
                      </td>
                      <td className="num" style={{ textAlign: 'right', color: 'var(--text-2)' }}>
                        {fmt(s.market_cap, { compact: true })}
                      </td>
                      <td style={{ width: 120, paddingTop: 8, paddingBottom: 8 }}>
                        <Sparkline data={s.sparkline} height={36} fill={false} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketPage;
