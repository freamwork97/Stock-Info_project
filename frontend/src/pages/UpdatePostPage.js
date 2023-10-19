import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPostPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState(""); // 수정할 내용 상태
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

  const handleEdit = async () => {
    const validPassword = prompt("비밀번호를 입력하세요:");
        if (validPassword === post.password) {
        try {
            const response = await fetch(`http://localhost:8000/posts/${id}/${content}/${validPassword}`, {
                method: "put", // 수정 요청은 PUT 메서드 사용
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ validPassword, content }), // 비밀번호와 수정할 내용 전송
            });
            const data = await response.json();
            if (response.ok) {
                // 수정 성공 시 해당 게시물의 상세 페이지로 이동
                navigate(`/post/${id}`);
            } else {
                // 수정 실패 시 에러 메시지 표시
                setErrorMessage(data.detail);
            }
        } catch (error) {
            console.error("게시물 수정 중 오류 발생:", error);
        }
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
      <textarea
        className="form-control mt-5"
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="mt-4">
        <button className="btn btn-primary ms-2" onClick={handleEdit}>
          게시물 수정
        </button>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default EditPostPage;
