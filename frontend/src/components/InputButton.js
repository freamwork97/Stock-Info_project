import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function InputButton({ IB }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedCompanies, setSuggestedCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      // API 호출을 통해 종목명 가져오기
      if (searchTerm) {
          fetch(`http://localhost:8000/company_names/?prefix=${searchTerm}`)
              .then(response => response.json())
              .then(data => setSuggestedCompanies(data.slice(0, 5)));
              
      }else {
        setSuggestedCompanies([]); // 검색어가 없을 때 목록 초기화
      }
  }, [searchTerm]);

  const handleSearch = () => {
      navigate(`/search/${searchTerm}`);
  };

  const handleSuggestionClick = (company) => {
      setSearchTerm(company);
      setSuggestedCompanies([]);
  };


  return (
    <form>
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control col-1 p-2 me-2"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            <button
                type='submit'
                onClick={handleSearch} 
                className='p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        fill="currentColor" 
                        className="bi bi-search" 
                        viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
        </div>
          {suggestedCompanies.length > 0 && (
            <ul className="list-group" 
                style={{ 
                      position: "absolute", 
                      zIndex: 1000,
                    }}>
              {suggestedCompanies.map((company, index) => (
                <li key={index}
                    className="list-group-item"
                    onClick={() => handleSuggestionClick(company)}
                  >
                  {company}
                </li>
                ))}
            </ul>
            )}
    </form>
  );
}

export default InputButton;
