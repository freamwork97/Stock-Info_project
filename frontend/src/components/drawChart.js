import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';
import * as echarts from 'echarts';

// 간략한 주가 차트
const drawChart = (stockChart, canvasRef, myChart) => {
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

    const ctx = canvasRef.current.getContext('2d');

    if (myChart.current) {
      myChart.current.destroy();
    }

    myChart.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
    });

    return () => {
      myChart.current.destroy();
    };
  }
};

// 주요지수 차트
const drawChart2 = (stockChart, canvasRef, myChart) => {
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

  const ctx = canvasRef.current.getContext('2d');

  if (myChart.current) {
      myChart.current.destroy();
  }

  myChart.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
  });

  return () => {
      myChart.current.destroy();
  };
};

// 캔들 스틱
const CandlestickChart = ({ priceData }) => {
  useEffect(() => {
    if (priceData) {
      const chartDom = document.getElementById('candlestickChart');
      const myChart = echarts.init(chartDom);
      const upColor = 'red';
      const downColor = 'blue';
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        xAxis: {
          data: priceData.날짜,
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 98,
        end: 100
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '92%',
        start: 98,
        end: 100
      }
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
              color: upColor,
              color0: downColor,
              borderColor: undefined,
              borderColor0: undefined
            }
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [priceData]);

  return <div id="candlestickChart" style={{ width: '100%', height: '500px' }} />;
};


export {drawChart,drawChart2,CandlestickChart};
