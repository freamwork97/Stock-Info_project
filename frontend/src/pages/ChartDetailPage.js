import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { newDrawCandlestickChart } from '../components/drawChart3';
import { fetchStockData } from '../components/fetchLongData';

function ChartDetailPage() {
  const { searchTerm } = useParams();
  const [stockData, setStockData] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchStockData(searchTerm).then(data => {
      setStockData(data);
    });
  }, [searchTerm]);

  useEffect(() => {
    if (stockData) {
      newDrawCandlestickChart(stockData, canvasRef);
    }
  }, [stockData]);

  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className="chart-area table-responsive">
          <h2 className='mt-3 mx-3'>
            차트<br></br>
            {searchTerm}
            <canvas ref={canvasRef} width="1600" height="500"></canvas>
          </h2>
        </div>
        <div id="info-box" className="mt-3 mx-3"></div>
      </div>
    </div>
  );
}

export default ChartDetailPage;
