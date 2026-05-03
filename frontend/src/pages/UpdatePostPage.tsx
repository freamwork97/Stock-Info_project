import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackLink } from '../components/Bits';
import type { Post } from '../types/api';

function UpdatePostPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/post/${id}`)
      .then(r => r.json())
      .then((d: Post[]) => {
        const p = d?.[0];
        if (p) { setPost(p); setContent(p.content || ''); }
      });
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await fetch(`/posts/${id}/${encodeURIComponent(content)}/${encodeURIComponent(password)}`, { method: 'PUT' });
    if (r.ok) { alert('수정되었습니다.'); navigate(`/post/${id}`); }
    else alert('수정에 실패했습니다. 비밀번호를 확인하세요.');
  };

  return (
    <div className="page-narrow fade-in">
      <BackLink to={`/post/${id}`}>게시물로</BackLink>
      <div className="card card-pad-lg mt-4">
        <h1 className="h-1 mb-4">게시글 수정</h1>
        {post && <p className="body-sm mb-6">제목: {post.title}</p>}
        <form onSubmit={submit}>
          <div className="field">
            <label className="field-label">내용</label>
            <textarea className="textarea" rows={12} required
              value={content} onChange={e => setContent(e.target.value)} />
          </div>
          <div className="field" style={{ maxWidth: 280 }}>
            <label className="field-label">비밀번호</label>
            <input className="input" type="password" required
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="flex justify-between items-center mt-4">
            <a href={`/post/${id}`} className="btn btn-ghost">취소</a>
            <button type="submit" className="btn btn-primary">수정 완료</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePostPage;
