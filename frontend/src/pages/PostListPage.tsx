import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import type { Post } from '../types/api';

const PER_PAGE = 8;

function PostListPage(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('/post')
      .then(r => r.json())
      .then((d: Post[]) => setPosts(Array.isArray(d) ? d : []))
      .catch(() => setPosts([]));
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const list = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="page-narrow fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="eyebrow">커뮤니티</div>
          <h1 className="h-1 mt-2">투자자 게시판</h1>
          <div className="body-sm mt-2">총 {posts.length}개의 글</div>
        </div>
        <Link to="/write" className="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          글쓰기
        </Link>
      </div>

      <div className="card">
        <div className="post-row" style={{ background: 'var(--surface-2)', fontSize: 12.5, color: 'var(--text-3)', fontWeight: 500 }}>
          <div>번호</div><div>제목</div><div>작성자</div><div>작성일</div><div></div>
        </div>
        {list.length === 0 && <div className="empty">게시글이 없습니다</div>}
        {list.map(p => (
          <Link key={p.id} className="post-row" to={`/post/${p.id}`}>
            <div className="num">{p.id}</div>
            <div className="title">{p.title}</div>
            <div className="meta">{p.author}</div>
            <div className="meta">{(p.created_at || '').slice(0, 10)}</div>
            <div></div>
          </Link>
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default PostListPage;
