import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

function SearchResultPage() {
  const { searchTerm } = useParams();
  const [news, setNews] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({});
  const [stockChart, setStockChart] = useState([]);
  const [stockprice, setStockPrice] = useState([]);
  const canvasRef = useRef(null);
  const myChart = useRef(null);

  const [searchTerm2, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchTerm2}`);
  };

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
           <div className="d-flex justify-content-left align-items-center p-1">
        <input
          type="text"
          className="form-control col-1 p-2 w-25 "
          placeholder="검색어를 입력하세요"
          value={searchTerm2}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={handleSearch} 
          className='bi bi-search p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="16" 
                 height="16" 
                 fill="currentColor" 
                 class="bi bi-search" 
                 viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
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
