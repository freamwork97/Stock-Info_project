import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { drawChart2 } from './drawChart';

interface ChartComponentProps {
  stockChart: Record<string, number>;
}

function ChartComponent({ stockChart }: ChartComponentProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const myChart = useRef<Chart | null>(null);

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
