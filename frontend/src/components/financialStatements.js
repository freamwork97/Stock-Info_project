import React, { useEffect, useState } from 'react';

function FinancialStatements({ searchTerm }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`/financial_statements/${encodeURIComponent(searchTerm)}`)
      .then(r => r.json())
      .then(d => setRows(Array.isArray(d) ? d : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  if (loading) return <div className="empty">재무제표 불러오는 중…</div>;
  if (!rows.length) return <div className="empty">재무제표가 없습니다</div>;

  return (
    <div className="scroll-x">
      <table className="table table-clean">
        <thead>
          <tr>
            <th>사업연도</th>
            <th>계정명</th>
            <th>당기명</th>
            <th>당기일자</th>
            <th style={{ textAlign: 'right' }}>당기금액</th>
            <th>통화</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => (
            <tr key={i}>
              <td>{s.사업연도}</td>
              <td style={{ fontWeight: 500 }}>{s.계정명}</td>
              <td>{s.당기명}</td>
              <td className="num" style={{ color: 'var(--text-3)' }}>{s.당기일자}</td>
              <td className="num" style={{ textAlign: 'right' }}>{s.당기금액}</td>
              <td className="num" style={{ color: 'var(--text-3)' }}>{s.통화}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinancialStatements;
