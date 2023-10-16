import React, { useEffect } from 'react';
import * as echarts from 'echarts'

const CandlestickChart = () => {
  useEffect(() => {
    // 차트를 그릴 DOM 엘리먼트 가져오기
    const chartDom = document.getElementById('candlestickChart');
    // eCharts 인스턴스 생성
    const myChart = echarts.init(chartDom);

    // 차트 옵션 설정
    const option = {
      title: {
        text: '캔들스틱 차트 예제', // 차트 제목
      },
      tooltip: {
        trigger: 'axis', // 툴팁 표시 위치 (축 기준)
        axisPointer: {
          type: 'cross', // 툴팁 표시 방식 (십자선)
        },
      },
      xAxis: {
        data: ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05', '2023-10-06', '2023-10-07'],
        // x축 데이터 (시간, 날짜 등)
      },
      yAxis: {},
      series: [
        {
          type: 'candlestick', // 차트 유형: 캔들스틱
          data: [
            [100, 110, 90, 105], // [시가, 종가, 저가, 고가]
            [110, 115, 100, 105],
            [105, 115, 95, 110],
            [110, 120, 100, 115],
            [115, 125, 105, 120],
            [120, 130, 110, 125],
            [125, 135, 115, 130],
          ], // 시계열 데이터
        },
      ],
    };

    // 차트에 옵션 적용
    myChart.setOption(option);

    // 컴포넌트가 언마운트 될 때 차트 해제
    return () => {
      myChart.dispose();
    };
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 함

  return <div id="candlestickChart" style={{ width: '100%', height: '500px' }} />;
};

export default CandlestickChart;
