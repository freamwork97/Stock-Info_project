// 캔들스틱
export const newDrawCandlestickChart = (priceData, canvasRef) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const infoBox = document.getElementById('info-box');
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const numDataPoints = priceData.시가.length;
    const candleWidth = 5;
    const xSpacing = 1;
    const maxPrice = Math.max(...priceData.고가);
    const minPrice = Math.min(...priceData.저가);
    let prevMonth = null;
  
    canvas.addEventListener('mousemove', handleMouseMove);
  
    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      
      const dataIndex = Math.floor(x / (candleWidth + xSpacing));
      if (dataIndex >= 0 && dataIndex < numDataPoints) {
        const date = priceData.날짜[dataIndex];
        const high = priceData.고가[dataIndex];
        const low = priceData.저가[dataIndex];
        const open = priceData.시가[dataIndex];
        const close = priceData.종가[dataIndex];
  
        const infoText = `날짜: ${date}, 시가: ${open}, 종가: ${close}, 저가: ${low}, 고가: ${high}`;
  
        infoBox.innerText = infoText;
      }
    }
  
    for (let i = 0; i < numDataPoints; i++) {
      const date = priceData.날짜[i];
      const month = date.substring(4, 6);
  
      if (month !== prevMonth) {
        const monthStart = date.substring(0, 6);
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.fillText(monthStart, i * (candleWidth + xSpacing), canvas.height - 10);
        prevMonth = month;
      }
  
      const high = priceData.고가[i];
      const low = priceData.저가[i];
      const open = priceData.시가[i];
      const close = priceData.종가[i];
  
      const xPosition = i * (candleWidth + xSpacing);
      const yPositionHigh = canvas.height - ((high - minPrice) / (maxPrice - minPrice) * canvas.height);
      const yPositionLow = canvas.height - ((low - minPrice) / (maxPrice - minPrice) * canvas.height);
      const yPositionOpen = canvas.height - ((open - minPrice) / (maxPrice - minPrice) * canvas.height);
      const yPositionClose = canvas.height - ((close - minPrice) / (maxPrice - minPrice) * canvas.height);
  
      if (close > open) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = 'blue';
      }
  
      ctx.fillRect(xPosition, yPositionOpen, candleWidth, yPositionClose - yPositionOpen);
  
      ctx.strokeStyle = ctx.fillStyle;
      ctx.beginPath();
      ctx.moveTo(xPosition + candleWidth / 2, yPositionHigh);
      ctx.lineTo(xPosition + candleWidth / 2, yPositionClose);
      ctx.moveTo(xPosition + candleWidth / 2, yPositionLow);
      ctx.lineTo(xPosition + candleWidth / 2, yPositionOpen);
      ctx.stroke();
    }
  };
  