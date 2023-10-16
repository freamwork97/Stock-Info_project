import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchResultPage from './pages/SearchResultPage';
import ChartDetailPage from './pages/ChartDetailPage';
import BarChart from './test/etest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/*메인페이지*/}
        <Route path="/search/:searchTerm" element={<SearchResultPage />} /> {/*검색결과*/}
        <Route path="/chart/:searchTerm" element={<ChartDetailPage />} /> {/*차트상세*/}
        <Route path="/test" element={<BarChart />} /> {/*EchartTest*/}
      </Routes>
    </Router>
  );
}

export default App;
