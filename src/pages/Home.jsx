import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '80vh',
            textAlign: 'center'
        }}>

            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    width: '80px', height: '80px',
                    backgroundColor: 'var(--primary-light)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'var(--primary)'
                }}>
                    <Compass size={40} />
                </div>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                    K-RRI 진단
                </h2>
                <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)' }}>
                    4060 세대를 위한<br />한국형 은퇴 준비도 나침반
                </p>
            </div>

            <div style={{ marginTop: 'auto', marginBottom: '2rem' }}>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/profile')}
                    style={{ padding: '1.25rem' }}
                >
                    1분 진단 시작하기
                </button>
                <p style={{ marginTop: '1rem', fontSize: 'var(--text-sm)', color: '#94A3B8' }}>
                    *회원가입 없이 즉시 확인 가능합니다
                </p>
            </div>
        </div>
    );
};

export default Home;
