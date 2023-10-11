import React, { useEffect, useRef } from 'react';
import drawChart2 from './drawChart2';

function ChartComponent({ stockChart }) {
  const canvasRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    if (stockChart) {
      drawChart2(stockChart, canvasRef, myChart);
    }
  }, [stockChart]);

  return (
    <div>
      <h3 className="text-center mt-3">지수 차트</h3>
      <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '150px' }} />
    </div>
  );
}

export default ChartComponent;
