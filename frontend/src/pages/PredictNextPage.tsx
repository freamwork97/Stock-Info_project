import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PredictChartView } from '../components/Charts';
import { BackLink, DeltaPill } from '../components/Bits';
import SearchInput from '../components/SearchInput';
import { fmt } from '../utils/format';
import type { StockInfo, PredictionData, PredictResponse } from '../types/api';

function PredictNextPage(): JSX.Element {
  const { searchTerm = '' } = useParams<{ searchTerm: string }>();
  const [info, setInfo] = useState<StockInfo | null>(null);
  const [pred, setPred] = useState<PredictionData | null>(null);
  const [ready, setReady] = useState(false);   // 두 fetch 모두 완료 시 true
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setReady(false); setElapsed(0);

    // 주가 정보와 예측을 병렬로 fetch, 둘 다 완료되면 한 번에 state 업데이트
    const stockFetch = fetch(`/stock/${encodeURIComponent(searchTerm)}`).then(r => r.json()) as Promise<StockInfo>;
    const predictFetch = fetch(`/predict_stock/${encodeURIComponent(searchTerm)}`).then(r => r.json()) as Promise<PredictResponse>;

    Promise.all([stockFetch, predictFetch])
      .then(([stockData, predData]) => {
        setInfo(stockData);
        setPred({ dates: predData.날짜, close: predData.예측종가, high: predData.예측고가, low: predData.예측저가 });
        setReady(true);
      })
      .catch(() => setReady(true));   // 에러나도 스피너 해제
  }, [searchTerm]);

  // 경과 시간 카운터
  useEffect(() => {
    if (ready) return;
    const t = window.setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [ready]);

  // useMemo로 history 참조 고정 → PredictChartView useEffect 불필요한 재실행 방지
  const history = useMemo(
    () => (info?.daily_prices || []).map(d => ({ date: d.date, close: +d.close })).filter(h => h.close).reverse(),
    [info]
  );
  const lastClose = history[history.length - 1]?.close;
  const lastPred = pred?.close?.[pred.close.length - 1];

  return (
    <div className="page fade-in">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-md">
        <BackLink to="/predict">예측 메인으로</BackLink>
        <div className="flex gap-sm">
          <SearchInput variant="inline" toPage="predict" placeholder="다른 종목 예측" />
          <Link className="btn btn-outline btn-sm" to={`/search/${encodeURIComponent(searchTerm)}`}>
            {info?.company || searchTerm} 정보 →
          </Link>
        </div>
      </div>
      <div className="card card-pad-lg">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-md">
          <div>
            <div className="eyebrow">Prophet 예측</div>
            <h1 className="h-1 mt-2">
              {info?.company || searchTerm}
              {info?.code && <span className="body-sm" style={{ marginLeft: 8 }}>{info.code}</span>}
            </h1>
          </div>
          {lastClose != null && lastPred != null && (
            <div className="flex gap-md items-center">
              <div>
                <div className="body-sm">현재가</div>
                <div className="num mt-2" style={{ fontSize: 22, fontWeight: 700 }}>{fmt(lastClose)}원</div>
              </div>
              <div style={{ color: 'var(--text-3)', fontSize: 24 }}>→</div>
              <div>
                <div className="body-sm">예측 (마지막 시점)</div>
                <div className={'num mt-2 ' + (lastPred >= lastClose ? 'up' : 'down')} style={{ fontSize: 22, fontWeight: 700 }}>
                  {fmt(lastPred)}원
                </div>
              </div>
              <DeltaPill price={lastPred} prev={lastClose} big />
            </div>
          )}
        </div>
        {ready && pred && history.length ? (
          <PredictChartView history={history} prediction={pred} height={400} />
        ) : (
          <div style={{ height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <svg width="36" height="36" viewBox="0 0 36 36" style={{ animation: 'spin 1s linear infinite', color: 'var(--brand)' }}>
              <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
            </svg>
            <div style={{ fontWeight: 600, color: 'var(--text-2)' }}>
              {`Prophet 예측 계산 중… (${elapsed}초 경과)`}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-3)' }}>보통 30~60초 소요됩니다</div>
          </div>
        )}
        <div className="card-pad mt-6" style={{ background: 'var(--surface-2)', borderRadius: 12, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
          ⚠️ 본 예측은 과거 가격 데이터에만 기반한 통계적 추정치입니다. 투자 결정의 참고 자료로만 활용해주세요.
        </div>
      </div>
    </div>
  );
}

export default PredictNextPage;
