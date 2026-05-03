import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navi from './components/Navi';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import SearchResultPage from './pages/SearchResultPage';
import ChartDetailPage from './pages/ChartDetailPage';
import PostListPage from './pages/PostListPage';
import WritePage from './pages/WritePage';
import PostDetailPage from './pages/PostDetailPage';
import UpdatePostPage from './pages/UpdatePostPage';
import PredictPrePage from './pages/PredictPrePage';
import PredictNextPage from './pages/PredictNextPage';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navi />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search/:searchTerm" element={<SearchResultPage />} />
          <Route path="/chart/:searchTerm" element={<ChartDetailPage />} />
          <Route path="/post" element={<PostListPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/update/:id" element={<UpdatePostPage />} />
          <Route path="/predict" element={<PredictPrePage />} />
          <Route path="/predict/:searchTerm" element={<PredictNextPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
