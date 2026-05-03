import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackLink } from '../components/Bits';
import type { PostForm } from '../types/api';

function WritePage(): JSX.Element {
  const [form, setForm] = useState<PostForm>({ title: '', author: '', password: '', content: '' });
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await fetch('/post/save/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (r.ok) { alert('게시글이 작성되었습니다.'); navigate('/post'); }
    else alert('작성에 실패했습니다.');
  };

  return (
    <div className="page-narrow fade-in">
      <BackLink to="/post">목록으로</BackLink>
      <div className="card card-pad-lg mt-4">
        <h1 className="h-1 mb-2">새 글 작성</h1>
        <p className="body-sm mb-6">비회원 게시판입니다. 비밀번호는 글 수정/삭제 시 사용됩니다.</p>
        <form onSubmit={submit}>
          <div className="field">
            <label className="field-label">제목</label>
            <input className="input" placeholder="제목을 입력하세요" required
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="grid grid-2 gap-md">
            <div className="field">
              <label className="field-label">작성자</label>
              <input className="input" placeholder="닉네임" required
                value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
            </div>
            <div className="field">
              <label className="field-label">비밀번호</label>
              <input className="input" type="password" placeholder="4자 이상" required
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              <span className="field-hint">수정·삭제 시 필요합니다.</span>
            </div>
          </div>
          <div className="field">
            <label className="field-label">내용</label>
            <textarea className="textarea" rows={10} placeholder="본문을 입력하세요" required
              value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
          </div>
          <div className="flex justify-between items-center mt-4">
            <a href="/post" className="btn btn-ghost">취소</a>
            <button type="submit" className="btn btn-primary">작성 완료</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WritePage;
