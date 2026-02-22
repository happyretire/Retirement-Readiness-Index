import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft, Sun, Moon } from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('k-rri-theme');
    if (saved) return saved === 'dark';
    return true; // 기본 모드: 다크
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('k-rri-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="app-container">
      <header style={{
        padding: '1rem',
        borderBottom: `1px solid var(--border-color)`,
        display: 'flex',
        alignItems: 'center',
        background: 'var(--header-bg)',
        transition: 'background-color 0.3s ease'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-muted)'
          }}
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 style={{
          margin: '0 auto',
          fontSize: '1.25rem',
          color: 'var(--text-main)',
          fontWeight: '700'
        }}>
          인생 2막 나침반
        </h1>
        <button
          className="theme-toggle"
          onClick={() => setIsDark(!isDark)}
          aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </header>

      <main className="main-content">
        <Outlet />
        <footer style={{
          padding: '2rem 1rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-color)',
          marginTop: '2rem'
        }}>
          <p>© 2026 Dunam. All rights reserved.</p>
          <p style={{ marginTop: '0.4rem', opacity: 0.8 }}>인생 2막 나침반 Version 0.8.0</p>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
