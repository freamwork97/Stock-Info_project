import React from 'react';
import { useParams } from 'react-router-dom';

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
    }
]

function PostDetailPage() {
  let { id } = useParams();
  const post = samplePosts.find(post => post.id.toString() === id);

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{post.title}</h2>
      <p>작성자: {post.author}</p>
      <p>작성일: {post.created_at}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetailPage;
