import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

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
      drawCandlestickChart(stockData, canvasRef);
    }
  }, [stockData]);

  const fetchStockData = async (searchTerm) => {
    const response = await fetch(`http://localhost:8000/get_stock_price/${searchTerm}`);
    const data = await response.json();
    return {
      날짜: data.날짜,
      시가: data.시가,
      고가: data.고가,
      저가: data.저가,
      종가: data.종가,
    };
  };

  const drawCandlestickChart = (priceData, canvasRef) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const infoBox = document.getElementById('info-box');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const numDataPoints = priceData.시가.length;
    const candleWidth = 5;
    const xSpacing = 1;
    const maxPrice = Math.max(...priceData.고가);
    const minPrice = Math.min(...priceData.저가);
    let prevMonth = null;

    canvas.addEventListener('mousemove', handleMouseMove);

    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const dataIndex = Math.floor(x / (candleWidth + xSpacing));
      if (dataIndex >= 0 && dataIndex < numDataPoints) {
        const date = priceData.날짜[dataIndex];
        const high = priceData.고가[dataIndex];
        const low = priceData.저가[dataIndex];
        const open = priceData.시가[dataIndex];
        const close = priceData.종가[dataIndex];

        const infoText = `날짜: ${date}, 시가: ${open}, 종가: ${close}, 저가: ${low}, 고가: ${high}`;

        infoBox.innerText = infoText;
      }
    }

    for (let i = 0; i < numDataPoints; i++) {
      const date = priceData.날짜[i];
      const month = date.substring(4, 6);

      if (month !== prevMonth) {
        const monthStart = date.substring(0, 6);
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.fillText(monthStart, i * (candleWidth + xSpacing), canvas.height - 10);
        prevMonth = month;
      }

      const high = priceData.고가[i];
      const low = priceData.저가[i];
      const open = priceData.시가[i];
      const close = priceData.종가[i];
  
      const xPosition = i * (candleWidth + xSpacing);
      const yPositionHigh = canvas.height - ((high - minPrice) / (maxPrice - minPrice) * canvas.height);
      const yPositionLow = canvas.height - ((low - minPrice) / (maxPrice - minPrice) * canvas.height);
      const yPositionOpen = canvas.height - ((open - minPrice) / (maxPrice - minPrice) * canvas.height);
      const yPositionClose = canvas.height - ((close - minPrice) / (maxPrice - minPrice) * canvas.height);
  
      if (close > open) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = 'blue';
      }
  
      ctx.fillRect(xPosition, yPositionOpen, candleWidth, yPositionClose - yPositionOpen);
  
      ctx.strokeStyle = ctx.fillStyle;
      ctx.beginPath();
      ctx.moveTo(xPosition + candleWidth / 2, yPositionHigh);
      ctx.lineTo(xPosition + candleWidth / 2, yPositionClose);
      ctx.moveTo(xPosition + candleWidth / 2, yPositionLow);
      ctx.lineTo(xPosition + candleWidth / 2, yPositionOpen);
      ctx.stroke();
    }
  };

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
