import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WritePost() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch('http://localhost:8000/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author, content }),
    });
  
    if (response.ok) {
      alert('게시글이 작성되었습니다.');
      navigate(`/post`);
    } else {
      alert('게시글 작성에 실패했습니다.');
    }
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
