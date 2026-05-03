import React, { useEffect, useState } from 'react';

// ExchangeRateTable: 기존 props 방식(exchangeRates 배열 전달)과
// 자체 fetch 방식 모두 지원. props가 없으면 직접 API 호출.
function ExchangeRateTable({ exchangeRates: propRates }) {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    if (propRates) {
      setRates(propRates);
      return;
    }
    fetch('/exchange_rate')
      .then(r => r.json())
      .then(d => setRates(Array.isArray(d) ? d : []))
      .catch(() => setRates([]));
  }, [propRates]);

  return (
    <div className="card">
      <div className="card-header">
        <h3>환율</h3>
        <span className="body-sm">매매기준율</span>
      </div>
      <div style={{ padding: '8px 14px' }}>
        {rates.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-3)' }}>불러오는 중…</div>
        )}
        {rates.map(r => (
          <div key={r.currency} className="flex justify-between items-center"
            style={{ padding: '10px 8px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.currency}</div>
            <div className="num" style={{ fontSize: 14, fontWeight: 600 }}>{r.exchange_rate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExchangeRateTable;
