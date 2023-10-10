const fetchStockPrice = async (searchTerm, setStockPrice2) => {
    try {
      const response = await fetch(`http://localhost:8000/get_stock_price/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch latest close price');
      }
      const data2 = await response.json();
      console.log(data2.slice(-1)[0])
      setStockPrice2(data2.slice(-1)[0]);
    } catch (error) {
      console.error('Error fetching latest close price:', error);
    }
  };
  
  export default fetchStockPrice;