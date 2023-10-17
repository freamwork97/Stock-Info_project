// WriteReportPage.js
import React, { useState } from 'react';

function WritePage() {
  const [author, setAuthor] = useState(''); // 작성자 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [content, setContent] = useState(''); // 내용 상태

  const handleSubmit = (e) => {
    e.preventDefault();

    // 여기에 글쓰기 로직을 추가하면 됩니다.
    // 작성자, 비밀번호, 내용을 이용하여 데이터를 저장하거나 전송하는 코드를 작성합니다.

    console.log(author, password, content);
  };

  return (
    <div className="container mt-4">
      <h2>투자 리포트 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">작성자</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">비밀번호</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">내용</label>
          <textarea
            className="form-control"
            id="content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">작성 완료</button>
      </form>
    </div>
  );
}

export default WritePage;
