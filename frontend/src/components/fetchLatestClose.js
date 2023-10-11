const fetchStockPrice = async (searchTerm, setStockPrice2) => {
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
      거래량: data.거래량.slice(-1)[0]
    };
    setStockPrice2(latestPrices);
  } catch (error) {
    console.error('Error fetching latest stock prices:', error);
  }
};

export default fetchStockPrice;
