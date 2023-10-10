import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import InputButton from '../components/InputButton';
import FinancialStatements from '../components/financialStatements';
import News from '../components/News';
import fetchStockData from '../components/fetchStockData';
import drawChart from '../components/drawChart';
import fetchStockPrice from '../components/fetchLatestClose';

function SearchResultPage() {
  const { searchTerm } = useParams();
  const [companyInfo, setCompanyInfo] = useState({});
  const [stockChart, setStockChart] = useState([]);
  const [stockprice, setStockPrice] = useState([]);
  const [stockprice2, setStockPrice2] = useState([]);
  const canvasRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    fetchStockData(searchTerm, setCompanyInfo, setStockChart, setStockPrice);
  }, [searchTerm]);

  useEffect(() => {
    drawChart(stockChart, canvasRef, myChart);
  }, [stockChart]);

  useEffect(() => {
    fetchStockPrice(searchTerm, setStockPrice2);
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <div className="container mt-5">
      <div className='w-25 input-group'>
        <a href='/' className="fs-3 me-2">메인</a>
        <InputButton IB={InputButton}/>
      </div>
      <div className="row">
        <div className="col-md-8">
          <News searchTerm={searchTerm}/>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <div className="company-info mb-4">
                <h2>
                  {companyInfo.company} 
                  ({companyInfo.code}) 
                </h2>
                <h3>
                현재가: {stockprice2.종가}
              </h3>
              </div>
              <div className="stock-chart">
                <ul className="list-unstyled">
                  {stockprice.map((data, index) => (
                    <li key={index}>
                      Date: {data.date}<br></br>
                      전일종가: {data.close}<br></br>
                      시가: {stockprice2.시가}<br></br>
                      고가: {stockprice2.고가}<br></br>
                      저가: {stockprice2.저가}
                    </li>
                  ))}
                </ul>
                <canvas ref={canvasRef} width="100" height="50"></canvas>
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
