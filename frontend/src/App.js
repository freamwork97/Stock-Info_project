import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchResultPage from './pages/SearchResultPage';
import ChartDetailPage from './pages/ChartDetailPage';
import PostListPage from './pages/PostListPage';
import WritePage from './pages/WritePage';
import PostDetailPage from './pages/PostDetailPage';
import UpdatePostPage from './pages/UpdatePostPage';
import Navi from './components/Navi';
import PredictPrePage from './pages/PredictPrePage';
import PredictNextPage from './pages/PredictNextPage';

function App() {
  return (
    <div className="container mt-4">
      <Navi/>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} /> {/*메인페이지*/}
          <Route path="/search/:searchTerm" element={<SearchResultPage />} /> {/*검색결과*/}
          <Route path="/chart/:searchTerm" element={<ChartDetailPage />} /> {/*차트상세*/}
          <Route path='/post' element={<PostListPage/>}/> {/*게시판*/}
          <Route path="/write" element={<WritePage/>} /> {/* 글쓰기 */}
          <Route path="/post/:id" element={<PostDetailPage/>} /> {/*게시글상세내용*/}
          <Route path="/update/:id" element={<UpdatePostPage/>} /> {/*게시글수정*/}
          <Route path="/predict" element={<PredictPrePage/>}/> {/*예측검색페이지*/}
          <Route path="/predict/:searchTerm" element={<PredictNextPage/>}/> {/*예측검색페이지*/}
        </Routes>
      </Router>
      <footer className="bg-dark text-white text-center py-2" style={{ fontSize: '1.4rem' }}>
        <p>&copy; windra</p>
      </footer>
    </div>
    
  );
}

export default App;
