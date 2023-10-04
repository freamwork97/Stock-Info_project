import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchResultPage from './pages/SearchResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/*메인페이지*/}
        <Route path="/search/:searchTerm" element={<SearchResultPage />} /> {/*검색결과*/}
      </Routes>
    </Router>
  );
}

export default App;
