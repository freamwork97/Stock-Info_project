import React, { useState, useEffect } from 'react';
import ExchangeRateTable from '../components/ExchangeRateTable';
import InputButton from '../components/InputButton';
import ChartComponent from '../components/ChartComponent';

function MainPage() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [keyIndex, setKeyIndex] = useState({});
  const [selectedKey, setSelectedKey] = useState(null);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    // 환율 정보 가져오기
    fetch('http://localhost:8000/exchange_rate')
      .then(response => response.json())
      .then(data => setExchangeRates(data))
      .catch(error => console.error('Error:', error));

    // 주요 지수 정보 가져오기
    fetch('http://localhost:8000/key_index')
      .then(response => response.json())
      .then(data => {
        const keyIndexWithLatestClose = {};
        Object.keys(data).forEach(indexName => {
          const dates = Object.keys(data[indexName]);
          const latestDate = dates[dates.length - 1];
          const latestClose = data[indexName][latestDate];
          keyIndexWithLatestClose[indexName] = {
            latestClose,
            data: data[indexName]
          };
        });
        setKeyIndex(keyIndexWithLatestClose);
        handleKeyClick('코스피');
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleKeyClick = (indexName) => {
    setSelectedKey(indexName);
    setShowChart(true);
  };

  return (
    <div className="container p-5 mt-5">
      <h1 className="text-center mb-4">메인페이지</h1>
      <div className='w-25 mx-auto'>
        <InputButton IB={InputButton}/>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card mx-3 mt-5 mb-4">
            <div className="card-body p-3">
              <h2 className="text-center mb-3">환율 정보</h2>
                <ExchangeRateTable exchangeRates={exchangeRates} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card me-3 mt-5 mb-4">
              <div className="card-body p-3">
                <h2 className="text-center mb-3">주요 지수</h2>
                {Object.keys(keyIndex).map((indexName) => (
                  <div key={indexName}>
                    <div onClick={() => handleKeyClick(indexName)}>
                      {indexName}
                      <span> - 가격: {keyIndex[indexName].latestClose}</span>
                    </div>
                    {selectedKey === indexName && showChart && (
                      <div>
                        <ChartComponent stockChart={keyIndex[indexName].data} />
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
