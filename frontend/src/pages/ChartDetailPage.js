import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStockData, fetchLongData } from '../components/fetchStockData';
import { CandlestickChart } from '../components/drawChart';

function ChartDetailPage() {
  const { searchTerm } = useParams();
  const [priceData, setPriceData] = useState(null);
  const [companyInfo, setCompanyInfo] = useState({});
  const [selectedMovingAverages, setSelectedMovingAverages] = useState([]);
  const [movingAverageColors] = useState({
    5: 'green',
    20: 'purple',
    60: 'orange',
    120: 'blue',
    200: 'pink',
    225: 'brown',
    720: 'cyan',
  });

  const handleMovingAverageSelect = (period) => {
    setSelectedMovingAverages((prevSelected) =>
      prevSelected.includes(period)
        ? prevSelected.filter((p) => p !== period)
        : [...prevSelected, period]
    );
  };

  useEffect(() => {
    fetchLongData(searchTerm).then((data) => {
      setPriceData(data);
    });
  }, [searchTerm]);

  useEffect(() => {
    fetchStockData(searchTerm, setCompanyInfo);
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      <h2>
        <a href={'/search/' + searchTerm} className="fs-3 me-2">
          이전
        </a>
        {companyInfo.company}({companyInfo.code})
      </h2>
      <div className="card mt-4">
        <div id="chart-area" className="chart-area table-responsive">
          <h2 className="mt-3 mx-3">
            <label>
              <input
                type="checkbox"
                checked={selectedMovingAverages.includes(5)}
                onChange={() => handleMovingAverageSelect(5)}
              />
              5일 이동평균
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedMovingAverages.includes(20)}
                onChange={() => handleMovingAverageSelect(20)}
              />
              20일 이동평균
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedMovingAverages.includes(60)}
                onChange={() => handleMovingAverageSelect(60)}
              />
              60일 이동평균
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedMovingAverages.includes(120)}
                onChange={() => handleMovingAverageSelect(120)}
              />
              120일 이동평균
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedMovingAverages.includes(200)}
                onChange={() => handleMovingAverageSelect(200)}
              />
              200일 이동평균
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedMovingAverages.includes(225)}
                onChange={() => handleMovingAverageSelect(225)}
              />
              225일 이동평균
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedMovingAverages.includes(720)}
                onChange={() => handleMovingAverageSelect(720)}
              />
              720일 이동평균
            </label>
            <CandlestickChart priceData={priceData} selectedMovingAverages={selectedMovingAverages} movingAverageColors={movingAverageColors} />
          </h2>
        </div>
        <div id="info-box" className="mt-3 mx-3 mb-2"></div>
      </div>
    </div>
  );
}

export default ChartDetailPage;
