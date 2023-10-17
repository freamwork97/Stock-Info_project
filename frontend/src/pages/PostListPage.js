// PostListPage.js
import React from 'react';

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
  }
];

function PostListItem({ post }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text text-ellipsis">{post.content}</p>
        <p className="card-text">
          작성자: {post.author} | 작성일: {post.created_at}
        </p>
      </div>
    </div>
  );
}

function PostListPage() {
  return (
    <div className="container mt-4">
      <h2>게시물 목록</h2>
      {samplePosts.map(post => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostListPage;
