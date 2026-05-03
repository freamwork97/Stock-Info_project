import React, { useEffect, useState } from 'react';
import type { NewsItem } from '../types/api';
import type { SearchTermProps } from '../types/components';

function News({ searchTerm }: SearchTermProps): JSX.Element {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/news/${encodeURIComponent(searchTerm)}`)
      .then(r => r.json())
      .then((d: NewsItem[]) => setNews(Array.isArray(d) ? d : []))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  if (loading) return <div className="empty">뉴스 불러오는 중…</div>;
  if (!news.length) return <div className="empty">관련 뉴스가 없습니다</div>;

  return (
    <div>
      {news.map((n, i) => (
        <a key={i} className="news-item" href={n.link} target="_blank" rel="noopener noreferrer">
          <div className="news-thumb" aria-hidden="true">
            {n.thumbnail ? (
              <img
                src={n.thumbnail}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <svg viewBox="0 0 96 72" preserveAspectRatio="none">
                <rect width="96" height="72" fill={`hsl(${(i * 47) % 360}, 60%, 65%)`} />
                <text x="48" y="44" textAnchor="middle" fill="white" fontSize="22" fontFamily="serif" fontWeight="700">
                  {(searchTerm || '').slice(0, 1)}
                </text>
              </svg>
            )}
          </div>
          <div className="news-content">
            <div className="news-title">{n.title}</div>
            <div className="news-meta"><span>네이버뉴스</span></div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default News;
