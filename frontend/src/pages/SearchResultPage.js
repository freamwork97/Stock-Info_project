import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import InputButton from '../components/InputButton';

function SearchResultPage() {
  const { searchTerm } = useParams();
  const [news, setNews] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const [stockChart, setStockChart] = useState([]);
  const [stockprice, setStockPrice] = useState([]);
  const canvasRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    // 뉴스
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:8000/news/${searchTerm}`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    // 주식데이터
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/stock/${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch company info');
        }
        const data = await response.json();
        setCompanyInfo(data);
        const latestData = data.daily_prices.slice(0, 7); // 차트를 위해서 7일치 데이터베이스에 저장되어있는 데이터
        setStockChart(latestData);
        const latestData2 = data.daily_prices.slice(0, 1); 
        // 하루의 데이터 고민중 전일가만 가져오게할지(현 상태 유지)
        // 검색할때마다 바뀌게 만들지(fastapi쪽 수정 따로 라이브러리 활용)
        setStockPrice(latestData2);
      } catch (error) {
        console.error('Error fetching company info:', error);
      }
    };

    fetchNews();
    fetchCompanyInfo();
  }, [searchTerm]);

  // 주식차트
  useEffect(() => {
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
  }, [stockChart]);

  return (
    <div className="container mt-5">
      <div className='w-25'>
        <InputButton  IB={InputButton}/>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">뉴스</h2>
              <ul className="list-unstyled">
                {news.map((item, index) => (
                  <li key={index} className="mb-3">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <div className="company-info mb-4">
                <h2>{companyInfo.company} ({companyInfo.code})</h2>
              </div>
              <div className="stock-chart">
                <h2>주가 정보</h2>
                <ul className="list-unstyled">
                  {stockprice.map((data, index) => (
                    <li key={index}>
                      Date: {data.date}<br></br>
                      Open: {data.open}<br></br> 
                      High: {data.high}<br></br>
                      Low: {data.low}<br></br>
                      Close: {data.close}
                    </li>
                  ))}
                </ul>
                <canvas ref={canvasRef} width="100" height="50"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultPage;
