import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SearchInputProps } from '../types/components';

function SearchInput({ variant = 'hero', toPage = '/', placeholder = '종목명 또는 코드 입력' }: SearchInputProps): JSX.Element {
  const [q, setQ] = useState('');
  const [suggest, setSuggest] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!q) { setSuggest([]); return; }
    fetch(`/company_names/?prefix=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then((data: string[]) => setSuggest((data || []).slice(0, 6)))
      .catch(() => setSuggest([]));
  }, [q]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const go = (term: string) => {
    if (!term) return;
    setOpen(false); setQ('');
    if (toPage === 'predict') navigate(`/predict/${encodeURIComponent(term)}`);
    else if (toPage === 'chart') navigate(`/chart/${encodeURIComponent(term)}`);
    else navigate(`/search/${encodeURIComponent(term)}`);
  };

  const submit = (e: React.FormEvent) => { e.preventDefault(); go(q.trim()); };

  if (variant === 'hero') {
    return (
      <form className="hero-search" onSubmit={submit} ref={ref}>
        <input placeholder={placeholder}
          value={q}
          onChange={e => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)} />
        <button className="hero-search-btn" type="submit" aria-label="검색">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        {open && suggest.length > 0 && (
          <div className="hero-suggest">
            {suggest.map((s, i) => (
              <div key={i} className="hero-suggest-item" onMouseDown={() => go(s)}>
                <strong>{s}</strong>
              </div>
            ))}
          </div>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={submit} ref={ref} style={{ position: 'relative', maxWidth: 360 }}>
      <div className="nav-search" style={{ width: '100%' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input placeholder={placeholder}
          value={q}
          onChange={e => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)} />
      </div>
      {open && suggest.length > 0 && (
        <div className="hero-suggest">
          {suggest.map((s, i) => (
            <div key={i} className="hero-suggest-item" onMouseDown={() => go(s)}>
              <strong>{s}</strong>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}

export default SearchInput;
