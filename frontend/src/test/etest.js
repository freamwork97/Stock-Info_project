import React from 'react'
import Echart from './echarttest'

const BarChart = () => {
  // 차트 CSS 정의하기
  const chartCss = {
    width: '600px',
    height: '400px'
  }

  // 차트 옵션 정의하기
  const chartOption = {
    // 차트 제목
    title: {
      text: 'ECharts 기본 예제: React',
    },
    // 범례명
    legend: {
      data: ['빈도'],
      top: 20,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category', // 범주형 차트
      data: ['월', '화', '수', '목', '금', '토', '일'],
    },
    series: [
      {
        name: '빈도',
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar', // 막대 차트
      },
    ],
  }

  return <Echart chartCss={chartCss} chartOption={chartOption} />
}

export default BarChart