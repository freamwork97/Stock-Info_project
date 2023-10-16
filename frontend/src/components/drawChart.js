// 간략한 주가 차트
import Chart from 'chart.js/auto';

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



export {drawChart,drawChart2};
