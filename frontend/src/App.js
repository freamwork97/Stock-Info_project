import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchResultPage from './pages/SearchResultPage';
import ChartDetailPage from './pages/ChartDetailPage';
import BarChart from './test/Etest';
import CandlestickChart from './test/EChartCandleTEST';
import InvestmentReportPage from './pages/InvestmentReportPage';

function App() {
  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">홈</a>
            </li>
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
  );
}

export default App;
