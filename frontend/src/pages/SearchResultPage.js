import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import InputButton from '../components/InputButton';
import FinancialStatements from '../components/financialStatements';
import News from '../components/News';
import fetchStockData from '../components/fetchStockData';
import drawChart from '../components/drawChart';


function SearchResultPage() {
  const { searchTerm } = useParams();
  const [companyInfo, setCompanyInfo] = useState({});
  const [stockChart, setStockChart] = useState([]);
  const [stockprice, setStockPrice] = useState([]);
  const canvasRef = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    fetchStockData(searchTerm, setCompanyInfo, setStockChart, setStockPrice);
  }, [searchTerm]);

  useEffect(() => {
    drawChart(stockChart, canvasRef, myChart);
  }, [stockChart]);

  return (
    <div className="container mt-5">
      <div className='w-25'>
        <InputButton  IB={InputButton}/>
      </div>
      <div className="row">
        <div className="col-md-8">
          <News searchTerm={searchTerm}/>
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

        {/* 재무제표 정보 */}
        <FinancialStatements searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default SearchResultPage;
