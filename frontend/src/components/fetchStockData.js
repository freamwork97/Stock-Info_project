const fetchStockData = async (searchTerm, setCompanyInfo, setStockChart, setStockPrice) => {
    try {
      const response = await fetch(`http://localhost:8000/stock/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch company info');
      }
      const data = await response.json();
      setCompanyInfo(data);
      const latestData = data.daily_prices.slice(0, 7); // 차트 그리기 위해
      setStockChart(latestData);
      const latestData2 = data.daily_prices.slice(0, 1); // 전일
      setStockPrice(latestData2);
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
  };
  
  export default fetchStockData;
  