import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchResultPage from './pages/SearchResultPage';
import ChartDetailPage from './pages/ChartDetailPage';
import BarChart from './test/Etest';
import CandlestickChart from './test/EChartCandleTEST';
import InvestmentReportPage from './pages/InvestmentReportPage';
import background from "./img/background.jpg";
function App() {
  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    width: '100%',
  };
  const containerBlurStyle = {
    position: 'relative',
    backdropFilter: 'blur(1px)', // 조절 가능한 흐림 정도
  };
  
  return (
    <div className="container mt-4" style={containerStyle}>
      <div className="container" style={containerBlurStyle}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">메인</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/Report">투자리포트</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/test">테스트</a>
            </li>
          </ul>
        </div>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} /> {/*메인페이지*/}
          <Route path="/search/:searchTerm" element={<SearchResultPage />} /> {/*검색결과*/}
          <Route path="/chart/:searchTerm" element={<ChartDetailPage />} /> {/*차트상세*/}
          <Route path='/Report' element={<InvestmentReportPage/>}/> {/*투자리포트*/}
          <Route path="/test.bar" element={<BarChart />} /> {/*EchartTest*/}
          <Route path="/test.candle" element={<CandlestickChart />} /> {/*EchartTest*/}
        </Routes>
      </Router>
    </div>
    </div>
  );
}

export default App;
