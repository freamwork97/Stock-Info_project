import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const postsPerPage = 4; // 페이지 당 게시물 수

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
  const [post, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/post');
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mt-4">
      <h2>게시물 목록</h2>
      {currentPosts.map(post => (
        <PostListItem key={post.id} post={post} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(post.length / postsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default PostListPage;
