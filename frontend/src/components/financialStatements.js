import React, { useState, useEffect } from 'react';

function FinancialStatements({ searchTerm }) {
  const [financialStatements, setFinancialStatements] = useState([]);

  useEffect(() => {
    const fetchFinancialStatements = async () => {
      try {
        const response = await fetch(`http://localhost:8000/financial_statements/${searchTerm}`);
        const data = await response.json();
        setFinancialStatements(data);
      } catch (error) {
        console.error('Error fetching financial statements:', error);
      }
    };

    fetchFinancialStatements();
  }, [searchTerm]);

  return (
    <div>
      <h2 className="mb-4">재무제표</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="bg-dark text-white">
            <tr>
              <th scope="col">사업연도</th>
              <th scope="col">계정명</th>
              <th scope="col">당기명</th>
              <th scope="col">당기일자</th>
              <th scope="col">당기금액</th>
              <th scope="col">통화</th>
            </tr>
          </thead>
          <tbody>
            {financialStatements.map((statement, index) => (
              <tr key={index}>
                <td>{statement.사업연도}</td>
                <td>{statement.계정명}</td>
                <td>{statement.당기명}</td>
                <td>{statement.당기일자}</td>
                <td>{statement.당기금액}</td>
                <td>{statement.통화}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinancialStatements;
