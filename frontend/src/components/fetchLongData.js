// 데이터 좀 많이 가져오기
export const fetchLongData = async (searchTerm) => {
    const response = await fetch(`http://localhost:8000/get_stock_price/${searchTerm}`);
    const data = await response.json();
    return {
      날짜: data.날짜,
      시가: data.시가,
      고가: data.고가,
      저가: data.저가,
      종가: data.종가,
      거래량: data.거래량
    };
  };