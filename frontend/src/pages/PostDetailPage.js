import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetailPage() {
  let { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/post/${id}`);
        const data = await response.json();
        setPost(data[0]); // 첫 번째 요소를 가져옴
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // id가 변경될 때마다 다시 불러옴

  if (!post) {
    return <div className="container mt-4 text-center">게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mt-4 text-center">
      <div className="fs-5 d-flex justify-content-between">
        <p>작성자: {post.author}</p>
        <p>작성일: {post.created_at}</p>
      </div>
      <h2 className="text-start mt-5 fs-1 fw-bold text-danger-emphasis">{post.title}</h2>
      <p className="text-start mt-5 fs-3">{post.content}</p>
    </div>
  );
}

export default PostDetailPage;
