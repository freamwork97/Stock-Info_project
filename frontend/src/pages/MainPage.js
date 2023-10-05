import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import ExchangeRateTable from '../components/ExchangeRateTable';
import InputButton from '../components/InputButton';
function MainPage() {
  // const [searchTerm, setSearchTerm] = useState('');
  const [exchangeRates, setExchangeRates] = useState([]);
  // const navigate = useNavigate();

  // const handleSearch = () => {
  //   navigate(`/search/${searchTerm}`);
  // };

  useEffect(() => {
    fetch('http://localhost:8000/exchange_rate')
      .then(response => response.json())
      .then(data => setExchangeRates(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container p-5 mt-5">
      <h1 className="text-center">메인페이지</h1>
      <div className='w-25 d-flex justify-content-center mx-auto'>
        <InputButton  IB={InputButton}/>
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
