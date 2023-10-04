import React from 'react';

function ExchangeRateTable({ exchangeRates }) {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">통화</th>
            <th scope="col">환율</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map(rate => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.exchange_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExchangeRateTable;
