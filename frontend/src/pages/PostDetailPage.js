import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BackLink } from '../components/Bits';

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/post/${id}`)
      .then(r => r.json())
      .then(d => setPost(d?.[0] || null))
      .catch(() => setPost(null));
  }, [id]);

  const handleDelete = async () => {
    const pw = prompt('비밀번호를 입력하세요:');
    if (pw !== post?.password) return;
    const r = await fetch(`/posts/${id}?password=${encodeURIComponent(pw)}`, { method: 'DELETE' });
    const data = await r.json();
    if (r.ok) navigate('/post');
    else setError(data.detail);
  };

  const handleEdit = () => {
    const pw = prompt('비밀번호를 입력하세요:');
    if (pw === post?.password) navigate(`/update/${id}`);
  };

  if (!post) {
    return <div className="page-narrow"><div className="empty">게시물을 불러오는 중…</div></div>;
  }

  return (
    <div className="page-narrow fade-in">
      <BackLink to="/post">목록으로</BackLink>
      <article className="card card-pad-lg mt-4">
        <h1 className="h-1">{post.title}</h1>
        <div className="flex items-center justify-between mt-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-sm">
            <div className="avatar">{post.author?.slice(0, 1)}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{post.author}</div>
              <div className="body-sm" style={{ fontSize: 12 }}>{(post.created_at || '').slice(0, 19)}</div>
            </div>
          </div>
          <div className="flex gap-sm">
            <button className="btn btn-outline btn-sm" onClick={handleEdit}>수정</button>
            <button className="btn btn-outline btn-sm" style={{ color: 'var(--down)' }} onClick={handleDelete}>삭제</button>
          </div>
        </div>
        <div className="mt-6" style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--text-2)', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
        {error && <div className="mt-3" style={{ color: 'var(--down)' }}>{error}</div>}
      </article>
    </div>
  );
}

export default PostDetailPage;
