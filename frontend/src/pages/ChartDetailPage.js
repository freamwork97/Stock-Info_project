import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { newDrawCandlestickChart } from '../components/drawChart3';
import {fetchStockData, fetchLongData} from '../components/fetchStockData';

function ChartDetailPage() {
  const { searchTerm } = useParams();
  const [LongData, setLongData] = useState(null);
  const canvasRef = useRef(null);
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    if (LongData) {
      newDrawCandlestickChart(LongData, canvasRef);
      scrollToRight();
    }
  }, [LongData]);

  const scrollToRight = () => {
    const chartArea = document.getElementById('chart-area');
    chartArea.scrollLeft = chartArea.scrollWidth;
  };

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
        <div id='chart-area' className="chart-area table-responsive">
          <h2 className='mt-3 mx-3'>
            <canvas ref={canvasRef} width="4000" height="400" ></canvas>
          </h2>
        </div>
        <div id="info-box" className="mt-3 mx-3 mb-2"></div>
      </div>
    </div>
  );
}

export default ChartDetailPage;