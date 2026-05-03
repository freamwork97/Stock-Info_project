import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { Line } from 'react-chartjs-2';
import type { ChartData } from 'chart.js';
import type { DailyPrice, StockPriceResponse } from '../types/api';

// 간략한 주가 차트
const drawChart = (
  stockChart: DailyPrice[],
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  myChart: React.MutableRefObject<Chart | null>
): (() => void) | undefined => {
  if (stockChart.length > 0) {
    const chartData = {
      labels: stockChart.reverse().map(data => data.date),
      datasets: [
        {
          label: 'Closing Price',
          data: stockChart.map(data => data.close),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    if (myChart.current) {
      myChart.current.destroy();
    }

    myChart.current = new Chart(ctx, {
      type: 'line',
      data: chartData as ChartData,
    });

    return () => {
      myChart.current?.destroy();
    };
  }
};

// 주요지수 차트
const drawChart2 = (
  stockChart: Record<string, number>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  myChart: React.MutableRefObject<Chart | null>
): (() => void) | undefined => {
  const dates = Object.keys(stockChart);
  const prices = Object.values(stockChart);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Closing Price',
        data: prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return;

  if (myChart.current) {
    myChart.current.destroy();
  }

  myChart.current = new Chart(ctx, {
    type: 'line',
    data: chartData,
  });

  return () => {
    myChart.current?.destroy();
  };
};

// 이평선 계산 — 기간 미만 구간은 '-' 문자열로 채움
const calculateMovingAverage = (data: number[], period: number): (number | string)[] => {
  const result: (number | string)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j];
    }
    result.push((sum / period).toFixed(2));
  }
  return result;
};

interface MovingAverageColors {
  [period: number]: string;
}

// 이평선 차트
const drawMovingAverages = (
  myChart: echarts.ECharts,
  priceData: StockPriceResponse,
  selectedMovingAverages: number[],
  movingAverageColors: MovingAverageColors
): void => {
  const movingAverages = selectedMovingAverages.map(period =>
    calculateMovingAverage(priceData.종가, period)
  );

  const series = selectedMovingAverages.map((period, index) => ({
    type: 'line',
    data: movingAverages[index],
    smooth: true,
    lineStyle: { color: movingAverageColors[period] },
    itemStyle: { color: movingAverageColors[period] },
    name: `MA${period}`,
  }));

  myChart.setOption({
    series: [...(myChart.getOption().series as object[]), ...series],
  });
};

interface CandlestickChartProps {
  priceData: StockPriceResponse | null;
  selectedMovingAverages: number[];
  movingAverageColors: MovingAverageColors;
}

// 캔들 스틱
const CandlestickChart = ({ priceData, selectedMovingAverages, movingAverageColors }: CandlestickChartProps): JSX.Element => {
  useEffect(() => {
    if (priceData) {
      const chartDom = document.getElementById('candlestickChart');
      if (!chartDom) return;
      const myChart = echarts.init(chartDom);
      const upColor = 'red';
      const downColor = 'blue';
      const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        xAxis: { data: priceData.날짜 },
        yAxis: { scale: true, splitArea: { show: true } },
        dataZoom: [
          { type: 'inside', xAxisIndex: [0, 1], start: 98, end: 100 },
          { show: true, xAxisIndex: [0, 1], type: 'slider', top: '92%', start: 98, end: 100 },
        ],
        series: [
          {
            type: 'candlestick',
            data: priceData.시가.map((_, i) => [
              priceData.시가[i],
              priceData.종가[i],
              priceData.저가[i],
              priceData.고가[i],
            ]),
            itemStyle: {
              color: upColor, color0: downColor,
              borderColor: undefined, borderColor0: undefined,
            },
          },
        ],
      };

      myChart.setOption(option);
      drawMovingAverages(myChart, priceData, selectedMovingAverages, movingAverageColors);

      return () => { myChart.dispose(); };
    }
  }, [priceData, selectedMovingAverages, movingAverageColors]);

  return <div id="candlestickChart" style={{ width: '100%', height: '500px' }} />;
};

interface PredictChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartOptions: any;
}

// 예측 차트
const PredictChart = ({ chartData, chartOptions }: PredictChartProps): JSX.Element => (
  <div className="card mt-4">
    <div className="d-flex justify-content-between">
      <div className="chart-area table-responsive flex-grow-1" style={{ width: '100%', height: '400px' }}>
        {chartData && <Line data={chartData} options={chartOptions} />}
      </div>
    </div>
  </div>
);

export { drawChart, drawChart2, CandlestickChart, PredictChart };
