import React, { useEffect, useRef } from 'react';
import {drawChart2} from './drawChart';

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
      <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '200px' }} />
    </div>
  );
}

export default ChartComponent;
