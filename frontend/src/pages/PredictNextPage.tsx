import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    fetch(`/stock/${encodeURIComponent(searchTerm)}`).then(r => r.json()).then((d: StockInfo) => setInfo(d)).catch(() => {});
    fetch(`/predict_stock/${encodeURIComponent(searchTerm)}`)
      .then(r => r.json())
      .then((d: PredictResponse) => setPred({
        dates: d.날짜, close: d.예측종가, high: d.예측고가, low: d.예측저가,
      }))
      .catch(() => setPred(null));
  }, [searchTerm]);

  // DB는 DESC(최신→과거) 순, 차트·lastClose 계산을 위해 ASC로 뒤집음
  const history = (info?.daily_prices || []).map(d => ({ date: d.date, close: +d.close })).filter(h => h.close).reverse();
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
        {history.length ? (
          <PredictChartView history={history} prediction={pred} height={400} />
        ) : (
          <div className="empty">차트 데이터를 불러오는 중…</div>
        )}
        <div className="card-pad mt-6" style={{ background: 'var(--surface-2)', borderRadius: 12, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
          ⚠️ 본 예측은 과거 가격 데이터에만 기반한 통계적 추정치입니다. 투자 결정의 참고 자료로만 활용해주세요.
        </div>
      </div>
    </div>
  );
}

export default PredictNextPage;
