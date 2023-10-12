import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import fetchStockPrice from '../components/fetchLatestClose';
import fetchStockData from '../components/fetchStockData';
import drawChart from '../components/drawChart';

function ChartDetailPage() {
  const { searchTerm } = useParams();
  console.log(searchTerm)
  const [stockprice, setStockPrice] = useState([]);
  console.log(stockprice)
  const [companyInfo, setCompanyInfo] = useState({});
  const canvasRef = useRef(null);
  const myChart = useRef(null);
  const [stockChart, setStockChart] = useState([]);

  useEffect(() => {
    fetchStockData(searchTerm, setCompanyInfo,setStockChart);
  }, [searchTerm]);

  useEffect(() => {
    fetchStockPrice(searchTerm, setStockPrice);
    console.log(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    drawChart(stockChart, canvasRef, myChart);
  }, [stockChart]);

  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className="chart-area">
          <h2 className='mt-3 mx-3'>
            차트<br></br>
            {companyInfo.company} 
            ({companyInfo.code}) 
            {/* {stockprice.전체종가} */}
            <canvas ref={canvasRef} width="100" height="50"></canvas>

          </h2>
        </div>
      </div>
      <div className='card mt-4'>
        <div className="indicators">보조지표 설정 영역</div>
      </div>
    </div>
  );
}

export default ChartDetailPage;
