import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const CandlestickChart = ({ priceData }) => {
    useEffect(() => {
      if (priceData) {
        const chartDom = document.getElementById('candlestickChart');
        const myChart = echarts.init(chartDom);
  
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
          yAxis: {},
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
                priceData.시가[i], // 시가
                priceData.종가[i], // 종가
                priceData.저가[i], // 저가
                priceData.고가[i], // 고가
              ]),
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
  
export default CandlestickChart;
