// 종목명에 따른 주식정보 가져오기(종목명, 주가정보) 데이터베이스에 저장된 정보
const fetchStockData = async (searchTerm, setCompanyInfo, setStockChart) => {
    try {
      const response = await fetch(`http://localhost:8000/stock/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch company info');
      }
      const data = await response.json();
      setCompanyInfo(data);
      const latestData = data.daily_prices.slice(0, 7); // 차트 그리기 위해
      setStockChart(latestData);
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  };

  
// 데이터 좀 많이 가져오기
const fetchLongData = async (searchTerm) => {
  const response = await fetch(`http://localhost:8000/get_stock_price/${searchTerm}`);
  const data = await response.json();
  return {
    날짜: data.날짜,
    시가: data.시가,
    고가: data.고가,
    저가: data.저가,
    종가: data.종가,
    거래량: data.거래량
  };
};  

// 검색어 따른 주가 가져오기
const fetchStockPrice = async (searchTerm, setStockPrice) => {
  try {
    const response = await fetch(`http://localhost:8000/get_stock_price/${searchTerm}`);
    if (!response.ok) {
      throw new Error('Failed to fetch latest stock prices');
    }
    const data = await response.json();
    const latestPrices = {
      고가: data.고가.slice(-1)[0],
      전일종가:data.종가.slice(-2)[0],
      시가: data.시가.slice(-1)[0],
      저가: data.저가.slice(-1)[0],
      종가: data.종가.slice(-1)[0],
      거래량: data.거래량.slice(-1)[0],
    };
    setStockPrice(latestPrices);
  } catch (error) {
    console.error('Error fetching latest stock prices:', error);
  }
};

  export {fetchStockData,fetchLongData,fetchStockPrice};
  