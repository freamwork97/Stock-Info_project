import React from 'react';

function Navi() {
  return (
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
            <a className="nav-link" href="/predict">주가예측</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/post">게시판</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/write">글작성</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navi;
