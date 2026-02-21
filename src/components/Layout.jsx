import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      {/* 글로벌 헤더 (필요시 '뒤로가기' 제공) */}
      <header style={{
        padding: '1rem',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        background: 'white'
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
          transform: 'translateX(-20px)',
          color: 'var(--text-main)',
          fontWeight: '700'
        }}>
          인생 2막 나침반
        </h1>
      </header>

      {/* 라우팅 컨텐츠 렌더링 */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
