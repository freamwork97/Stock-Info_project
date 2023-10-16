import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const Echart = ({ chartCss, chartOption }) => {
  // chartCss와 chartOption을 props으로 받기
  // 차트가 그려질 DOM 요소에 대한 참조자 chartRef를 생성하기
  const chartRef = useRef(null)

  // useEffect 훅
  useEffect(() => {
    // 컴포넌트가 마운트(mount)될 때 실행할 작업 정의하기
    const chartInstance = echarts.init(chartRef.current) // ECharts 초기화 및 인스턴스 생성하기
    chartInstance.setOption(chartOption) // 차트 옵션 설정하기

    // 차트 크기 조정 함수 정의하기: 화면 너비에 따라 반응형으로 작동하는 차트 만들기
    const resizeHandler = () => {
      chartInstance.resize() // 차트 크기 조절
    }

    // resize 이벤트 리스너를 추가하여 차트 크기 조절 핸들러 함수를 실행하기
    window.addEventListener('resize', resizeHandler)

    // 컴포넌트가 언마운트(unmount)될 때 실행할 작업 정의하기
    return () => {
      chartInstance.dispose() // 차트 인스턴스 제거하기
      window.removeEventListener('resize', resizeHandler) // resize 이벤트 리스너 제거하기
    }
  }, [chartOption]) // chartOption이 변경될 때마다 useEffect 훅이 실행됨

  // JSX 태그로 정의한 React 엘리먼트는 실제 DOM 엘리먼트로 변환됨
  return <div style={chartCss} ref={chartRef} />
}

export default Echart