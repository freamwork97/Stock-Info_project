import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { newDrawCandlestickChart } from '../components/drawChart3';
import { fetchLongData } from '../components/fetchLongData';
import fetchStockData from '../components/fetchStockData';

function ChartDetailPage() {
  const { searchTerm } = useParams();
  const [LongData, setLongData] = useState(null);
  const canvasRef = useRef(null);
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    fetchLongData(searchTerm).then(data => {
      setLongData(data);
    });
  }, [searchTerm]);

  useEffect(() => {
    fetchStockData(searchTerm, setCompanyInfo);
  }, [searchTerm]);

  useEffect(() => {
    if (LongData) {
      newDrawCandlestickChart(LongData, canvasRef);
    }
  }, [LongData]);

  return (
    <div className='container mt-4'>
      <h2>
        {companyInfo.company}
        ({companyInfo.code})
      </h2>
      <div className='card mt-4'>
        <div className="chart-area table-responsive">
          <h2 className='mt-3 mx-3'>
            <canvas ref={canvasRef} width="1500" height="500"></canvas>
          </h2>
        </div>
        <div id="info-box" className="mt-3 mx-3 mb-2"></div>
      </div>
    </div>
  );
}

export default ChartDetailPage;
