import React, { useState, useEffect } from 'react';

function News({ searchTerm }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:8000/news/${searchTerm}`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [searchTerm]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">뉴스</h2>
        <ul className="list-unstyled">
          {news.map((item, index) => (
            <li key={index} className="mb-3">
              <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default News;
