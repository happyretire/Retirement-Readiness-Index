import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ShieldCheck } from 'lucide-react';

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
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img
                        src="/images/main_garden.png"
                        alt="K-RRI 홈 가든 씬"
                        style={{
                            width: '230px',
                            height: '230px',
                            objectFit: 'cover',
                            borderRadius: '24px',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                            background: 'var(--card-bg)'
                        }}
                    />
                </div>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                    K-RRI 진단
                </h2>
                <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)' }}>
                    4060 세대를 위한<br />한국형 은퇴 준비도 나침반
                </p>
            </div>

            <div style={{
                background: 'var(--card-bg)',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.5rem',
                textAlign: 'left',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.8', wordBreak: 'keep-all', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Leaf size={20} color="var(--success)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span>이 진단은 은퇴를 준비하시는 분들이 <strong>편안한 마음으로</strong> 현재 자신의 위치를 돌아보고, 앞으로의 방향을 찾으시는 데 작은 도움이 되고자 제작되었습니다.</span>
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '0.75rem', wordBreak: 'keep-all', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <ShieldCheck size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span><strong>개인정보를 수집하지 않으며</strong>, 모든 응답은 진단 결과 확인 용도로만 사용됩니다. 안심하고 솔직하게 답해 주세요.</span>
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center', lineHeight: '1.6' }}>
                    ⓒ Dunam&ensp;|&ensp;
                    <a href="https://cafe.naver.com/retireclass" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                        행복한 은퇴를 꿈꾸는 사람들
                    </a>
                </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/profile')}
                    style={{ padding: '1.25rem' }}
                >
                    1분 진단 시작하기
                </button>
                <p style={{ marginTop: '1rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                    *회원가입 없이 즉시 확인 가능합니다
                </p>
            </div>
        </div>
    );
};

export default Home;
