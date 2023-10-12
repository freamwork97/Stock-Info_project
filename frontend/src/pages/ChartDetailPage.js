import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import fetchStockPrice from '../components/fetchLatestClose';


function ChartDetailPage() {
  const { searchTerm } = useParams();
  console.log(searchTerm)
  const [stockprice, setStockPrice] = useState([]);
  console.log(stockprice)

  useEffect(() => {
    fetchStockPrice(searchTerm, setStockPrice);
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <div className="chart-area">상세한 차트 영역</div>
      <div className="indicators">보조지표 설정 영역</div>
    </div>
  );
}

export default ChartDetailPage;
