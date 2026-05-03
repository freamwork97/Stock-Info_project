import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Navi() {
  const [q, setQ] = useState('');
  const [suggest, setSuggest] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);

  const links = [
    { label: '홈', to: '/' },
    { label: '주가예측', to: '/predict' },
    { label: '커뮤니티', to: '/post' },
  ];
  const active = location.pathname;

  useEffect(() => {
    if (!q) { setSuggest([]); return; }
    fetch(`/company_names/?prefix=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then(data => setSuggest((data || []).slice(0, 6)))
      .catch(() => setSuggest([]));
  }, [q]);

  useEffect(() => {
    const onClick = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const submit = e => {
    e?.preventDefault?.();
    const t = q.trim();
    if (!t) return;
    setOpen(false); setQ('');
    navigate(`/search/${encodeURIComponent(t)}`);
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-mark">S</div>
          <span>스톡인포</span>
        </Link>
        <div className="nav-links">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={'nav-link' + (active === l.to || (l.to !== '/' && active.startsWith(l.to)) ? ' is-active' : '')}>
              {l.label}
            </Link>
          ))}
        </div>
        <form className="nav-search" onSubmit={submit} ref={ref}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            placeholder="종목 검색"
            value={q}
            onChange={e => { setQ(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
          />
          {open && suggest.length > 0 && (
            <div className="hero-suggest" style={{ top: 'calc(100% + 8px)' }}>
              {suggest.map((name, i) => (
                <div key={i} className="hero-suggest-item"
                  onMouseDown={() => { setOpen(false); setQ(''); navigate(`/search/${encodeURIComponent(name)}`); }}>
                  <strong>{name}</strong>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Navi;
