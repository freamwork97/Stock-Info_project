import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InputButton from '../components/InputButton';
import FinancialStatements from '../components/financialStatements';
import News from '../components/News';
import {fetchStockData,fetchStockPrice} from '../components/fetchStockData';
import {drawChart} from '../components/drawChart';

function SearchResultPage() {
  const { searchTerm } = useParams();
  const [companyInfo, setCompanyInfo] = useState({});
  const [stockChart, setStockChart] = useState([]);
  const [stockprice, setStockPrice] = useState([]);
  const canvasRef = useRef(null);
  const myChart = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/Chart/${searchTerm}`);
  };

  const fetchStockPriceData = () => {
    fetchStockPrice(searchTerm, setStockPrice);
  };
  
  useEffect(() => {
    fetchStockData(searchTerm, setCompanyInfo, setStockChart);
  }, [searchTerm]);

  useEffect(() => {
    drawChart(stockChart, canvasRef, myChart);
  }, [stockChart]);

  useEffect(() => {
    fetchStockPrice(searchTerm, setStockPrice);
    console.log(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    fetchStockPriceData(); // 초기 데이터 호출

    const interval = setInterval(fetchStockPriceData, 20000); // 20초마다 호출

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 clearInterval
  });

  return (
    <div className="container mt-5">
      <div className='input-group'>
        <a href='/' className="fs-3 me-2">
        <svg xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="30" 
              fill="currentColor" 
              className="bi bi-chevron-compact-left mb-2" 
              viewBox="0 0 16 16"
              color='gray'>
            <path fill-rule="evenodd" 
            d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
          </svg>
        </a>
        <InputButton IB={InputButton} />
      </div>
      <div className="row">
        <div className="col-md-8">
          <News searchTerm={searchTerm}/>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <div className="company-info mb-4">
                <h2 onClick={handleSearch}>
                  {companyInfo.company} 
                  ({companyInfo.code}) 
                </h2>
                <h3>
                현재가: {stockprice.종가}
              </h3>
              </div>
              <div className="stock-chart">
                <ul className="list-unstyled">
                      전일종가: {stockprice.전일종가}<br></br>
                      시가: {stockprice.시가}<br></br>
                      고가: {stockprice.고가}<br></br>
                      저가: {stockprice.저가}<br></br>
                      거래량: {stockprice.거래량}
                </ul>
                <canvas onClick={handleSearch} ref={canvasRef} width="100" height="50"></canvas>
              </div>
            </div>
          </div>
          <hr></hr>
        </div>
        {/* 재무제표 정보 */}
        <FinancialStatements searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default SearchResultPage;
