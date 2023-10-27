import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStockData } from '../components/fetchStockData';
import InputButton from '../components/InputButton';

function PredictNextPage() {
  const { searchTerm } = useParams();
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    fetchStockData(searchTerm, setCompanyInfo);
  }, [searchTerm]);

  return (
    <div className="container mt-4">
    <div className="row align-items-center">
      <div className="col">
        <h2>
          <a href={'/test'} className="fs-3 me-2">
            <svg xmlns="http://www.w3.org/2000/svg" 
                width="30" 
                height="30" 
                fill="currentColor" 
                className="bi bi-chevron-compact-left mb-2" 
                viewBox="0 0 16 16"
                color='gray'>
              <path fill-rule="evenodd" 
              d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
            </svg>
          </a>
          {companyInfo.company}({companyInfo.code})
        </h2>
      </div>
      <div className="col-3">
        <div className='w-100'>
          <InputButton IB={InputButton} toPage={'test'}/>
        </div>
      </div>
      <div className="card mt-4">
        <div className='d-flex justify-content-between '>
          <div className="chart-area table-responsive  flex-grow-1">
              <h2 className="mt-3 mx-3 fs-5">
                날짜 예측값 예측상한값 예측하한값 들어갈 위치
              </h2>
          </div>
        </div>
        <div>
          예측 차트 들어갈 위치
        </div>
      </div>
    </div>
  </div>  
  );
}

export default PredictNextPage;
