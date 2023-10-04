import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExchangeRateTable from './ExchangeRateTable';

function MainPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [exchangeRates, setExchangeRates] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };

  useEffect(() => {
    fetch('http://localhost:8000/exchange_rate')
      .then(response => response.json())
      .then(data => setExchangeRates(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container p-5 mt-5">
      <h1 className="text-center">메인페이지</h1>
      <div className="d-flex justify-content-center align-items-center p-5">
        <input
          type="text"
          className="form-control col-1 p-2 w-25 "
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={handleSearch} 
          className='bi bi-search p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="16" 
                 height="16" 
                 fill="currentColor" 
                 className="bi bi-search" 
                 viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
      <div className='card'>
        <div className='card-body p-3'>
          <h2 className="text-center mt-2">환율 정보</h2>
          <ExchangeRateTable exchangeRates={exchangeRates} />
        </div>      
      </div>

    </div>
  );
}

export default MainPage;
