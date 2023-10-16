import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {fetchStockData, fetchLongData} from '../components/fetchStockData';
import {CandlestickChart} from '../components/drawChart';


function ChartDetailPage() {
  const { searchTerm } = useParams();
  const [priceData, setPriceData] = useState(null);
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    fetchLongData(searchTerm).then(data => {
      setPriceData(data); 
    });
  }, [searchTerm]);

  useEffect(() => {
    fetchStockData(searchTerm, setCompanyInfo);
  }, [searchTerm]);

  return (
    <div className='container mt-4'>
      <h2>
        {companyInfo.company}
        ({companyInfo.code})
      </h2>
      <div className='card mt-4'>
        <div id='chart-area' className="chart-area table-responsive">
          <h2 className='mt-3 mx-3'>
            <CandlestickChart priceData={priceData} />
          </h2>
        </div>
        <div id="info-box" className="mt-3 mx-3 mb-2"></div>
      </div>
    </div>
  );
}

export default ChartDetailPage;