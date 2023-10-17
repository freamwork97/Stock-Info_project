import React, { useState } from 'react';

function WritePost() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 여기에서 게시글 작성 로직을 추가합니다.
    // 작성자, 제목, 내용을 이용하여 데이터를 저장하거나 전송하는 코드를 작성합니다.
  };

  return (
    <div className="container mt-4">
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">제목</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
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

export default WritePost;
