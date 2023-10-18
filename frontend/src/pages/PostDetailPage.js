import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetailPage() {
  let { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate(); 
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/post/${id}`);
        const data = await response.json();
        setPost(data[0]);
        console.log(data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    const validPassword = prompt("비밀번호를 입력하세요:");
    if (validPassword === post.password) {
      try {
        const response = await fetch(`http://localhost:8000/posts/${id}?password=${validPassword}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          navigate('/post');
        } else {
          setErrorMessage(data.detail);
        }
      } catch (error) {
        console.error("게시물 삭제 중 오류 발생:", error);
      }
    }
  };

  const handleEdit = () => {
    const validPassword = prompt("비밀번호를 입력하세요:");
    if (validPassword === post.password) {
      navigate(`/update/${id}`);
    }
  };

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
        <div className='text-start'>
          <button onClick={handleDelete}>게시물 삭제</button>
          <button onClick={handleEdit}>게시물 수정</button>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
      </div>
      <hr />
      <div className='text-start p-1'>
        <p className='fs-6'>
          작성자 | 작성일
        </p>
        <p className='fs-3'>
          댓글내용
        </p>
      </div>
      <hr />

    </div>
  );
}

export default PostDetailPage;
