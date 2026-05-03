import type React from 'react';
import type { StockInfo, DailyPrice, StockPriceResponse, LatestStockPrice } from '../types/api';

const fetchStockData = async (
  searchTerm: string,
  setCompanyInfo: React.Dispatch<React.SetStateAction<StockInfo | null>>,
  setStockChart: React.Dispatch<React.SetStateAction<DailyPrice[]>>
): Promise<void> => {
  try {
    const response = await fetch(`/stock/${searchTerm}`);
    if (!response.ok) throw new Error('Failed to fetch company info');
    const data: StockInfo = await response.json();
    setCompanyInfo(data);
    setStockChart(data.daily_prices.slice(0, 7));
  } catch (error) {
    console.error('Error fetching company info:', error);
  }
};

const fetchLongData = async (searchTerm: string): Promise<StockPriceResponse> => {
  const response = await fetch(`/get_stock_price/${searchTerm}`);
  const data: StockPriceResponse = await response.json();
  return {
    날짜: data.날짜,
    시가: data.시가,
    고가: data.고가,
    저가: data.저가,
    종가: data.종가,
    거래량: data.거래량,
  };
};

const fetchStockPrice = async (
  searchTerm: string,
  setStockPrice: React.Dispatch<React.SetStateAction<LatestStockPrice | null>>
): Promise<void> => {
  try {
    const response = await fetch(`/get_stock_price/${searchTerm}`);
    if (!response.ok) throw new Error('Failed to fetch latest stock prices');
    const data: StockPriceResponse = await response.json();
    const latestPrices: LatestStockPrice = {
      고가: data.고가.slice(-1)[0],
      전일종가: data.종가.slice(-2)[0],
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

export { fetchStockData, fetchLongData, fetchStockPrice };
