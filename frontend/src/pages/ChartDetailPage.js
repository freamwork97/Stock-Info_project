import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function ChartDetailPage() {
  const { searchTerm } = useParams();
  const [stockData, setStockData] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // 검색어(searchTerm)를 기반으로 데이터를 가져오는 함수 (fetchStockData)를 호출합니다.
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
    // 검색어를 기반으로 서버에서 데이터를 가져오는 비동기 함수입니다.
    // 실제로 사용하는 데이터 소스에 따라 수정되어야 합니다.
    // 예를 들어, API 요청을 사용하여 데이터를 가져올 수 있습니다.
    const response = await fetch(`http://localhost:8000/get_stock_price/${searchTerm}`);
    const data = await response.json();
    console.log(data)
    return {
      시가: data.시가,
      고가: data.고가,
      저가: data.저가,
      종가: data.종가,
    };
  };

  const drawCandlestickChart = (priceData, canvasRef) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    // Canvas를 클리어합니다.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const numDataPoints = priceData.시가.length;
  
    const candleWidth = 10;
    const xSpacing = 15;
  
    const maxPrice = Math.max(...priceData.고가);
    const minPrice = Math.min(...priceData.저가);
  
    for (let i = 0; i < numDataPoints; i++) {
      // const date = priceData.날짜[i];
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
        ctx.fillStyle = 'green';
      } else {
        ctx.fillStyle = 'red';
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
        <div className="chart-area">
          <h2 className='mt-3 mx-3'>
            차트<br></br>
            {searchTerm} 
            <canvas ref={canvasRef} width="800" height="500"></canvas>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ChartDetailPage;
