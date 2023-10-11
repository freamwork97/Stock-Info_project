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
  
  export default fetchStockData;
  