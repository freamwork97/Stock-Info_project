import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchResultPage from './pages/SearchResultPage';
import ChartDetailPage from './pages/ChartDetailPage';
import BarChart from './test/Etest';
import CandlestickChart from './test/EChartCandleTEST';
import PostListPage from './pages/PostListPage';
import WritePage from './pages/WritePage';

function App() {
  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">메인</a>
        <button className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/Post">게시판</a>
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
          <Route path='/Post' element={<PostListPage/>}/> {/*게시판*/}
          <Route path="/write" element={<WritePage/>} /> {/* 글쓰기 */}
          <Route path="/test.bar" element={<BarChart />} /> {/*EchartTest*/}
          <Route path="/test.candle" element={<CandlestickChart />} /> {/*EchartTest*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
