import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const postsPerPage = 4; // 페이지 당 게시물 수

const samplePosts = [
  {
    id: 1,
    title: '첫 번째 게시물',
    author: '작성자1',
    content: '첫 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 10:00:00'
  },
  {
    id: 2,
    title: '두 번째 게시물',
    author: '작성자2',
    content: '두 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 11:00:00'
  },
  {
    id: 3,
    title: '세 번째 게시물',
    author: '작성자3',
    content: '세 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 4,
    title: '네 번째 게시물',
    author: '작성자4',
    content: '샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 5,
    title: '세 번째 게시물',
    author: '작성자3',
    content: '세 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 6,
    title: '네 번째 게시물',
    author: '작성자4',
    content: '샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 7,
    title: '세 번째 게시물',
    author: '작성자3',
    content: '세 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 8,
    title: '네 번째 게시물',
    author: '작성자4',
    content: '샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 9,
    title: '세 번째 게시물',
    author: '작성자3',
    content: '세 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 10,
    title: '네 번째 게시물',
    author: '작성자4',
    content: '샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 11,
    title: '세 번째 게시물',
    author: '작성자3',
    content: '세 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 12,
    title: '네 번째 게시물',
    author: '작성자4',
    content: '샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 13,
    title: '세 번째 게시물',
    author: '작성자3',
    content: '세 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 14,
    title: '네 번째 게시물',
    author: '작성자4',
    content: '샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 15,
    title: '세 번째 게시물',
    author: '작성자3',
    content: '세 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 16,
    title: '네 번째 게시물',
    author: '작성자4',
    content: '샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 17,
    title: '세 번째 게시물',
    author: '작성자3',
    content: '세 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 18,
    title: '네 번째 게시물',
    author: '작성자4',
    content: '샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플샘플',
    created_at: '2023-10-04 12:00:00'
  },
  {
    id: 19,
    title: '세 번째 게시물',
    author: '작성자3',
    content: '세 번째 게시물의 내용입니다.',
    created_at: '2023-10-04 12:00:00'
  },

];

function PostListItem({ post }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h5>
        <p className="card-text">
          작성자: {post.author} | 작성일: {post.created_at}
        </p>
      </div>
    </div>
  );
}

function PostListPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = samplePosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mt-4">
      <h2>게시물 목록</h2>
      {currentPosts.map(post => (
        <PostListItem key={post.id} post={post} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(samplePosts.length / postsPerPage)}
        onPageChange={handlePageChange}
      />
      <Link to="/write" className="btn btn-primary mb-3">글쓰기</Link>
    </div>
  );

}

export default PostListPage;
