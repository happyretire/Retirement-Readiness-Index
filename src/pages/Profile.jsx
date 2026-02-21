import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    // 1. 기본 인적 사항
    const [ageRange, setAgeRange] = useState('50');
    const [gender, setGender] = useState('male');

    // 2. 경제적 기초 데이터 (슬라이더 활용)
    const [totalAsset, setTotalAsset] = useState(5); // 0~20 (단위: 억)
    const [realEstateRatio, setRealEstateRatio] = useState(70); // 0~100 (%)

    // 3. 가족 및 부양 환경
    const [childrenStatus, setChildrenStatus] = useState('independent');

    // UI 텍스트 포맷터
    const formatAsset = (val) => {
        if (val === 0) return '없음';
        if (val >= 20) return '20억 이상';
        return `${val}억 원`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 데이터 취합 후 Survey로 전달
        navigate('/survey', {
            state: {
                ageRange,
                gender,
                totalAsset,
                realEstateRatio,
                childrenStatus
            }
        });
    };

    return (
        <div className="animate-fade-in card" style={{ padding: '2rem 1.5rem' }}>
            <h2 className="text-primary font-bold mb-4" style={{ fontSize: 'var(--text-xl)' }}>
                기초 정보 설정
            </h2>
            <div style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                <p className="text-main" style={{ fontSize: 'var(--text-sm)' }}>
                    🔒 <strong>안심하세요!</strong> 입력하신 개인정보와 자산 규모는 앱 종료 시 <strong>즉시 삭제</strong>되며, 오직 정밀한 은퇴 수명 계산을 위해서만 1회성으로 사용됩니다.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* 1. 기본 인적 사항 */}
                <div className="form-group mb-8">
                    <label className="form-label" style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem' }}>연령 및 성별</label>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', marginTop: '1rem' }}>
                        {['40', '50', '60'].map(val => (
                            <button
                                key={val}
                                type="button"
                                className={`btn ${ageRange === val ? 'btn-primary' : 'btn-outline'}`}
                                style={{ padding: '0.75rem', fontSize: 'var(--text-md)' }}
                                onClick={() => setAgeRange(val)}
                            >
                                {val}대
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            type="button"
                            className={`btn ${gender === 'male' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ padding: '0.75rem', fontSize: 'var(--text-md)' }}
                            onClick={() => setGender('male')}
                        >
                            남성
                        </button>
                        <button
                            type="button"
                            className={`btn ${gender === 'female' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ padding: '0.75rem', fontSize: 'var(--text-md)' }}
                            onClick={() => setGender('female')}
                        >
                            여성
                        </button>
                    </div>
                </div>

                {/* 2. 경제적 기초 (슬라이더) */}
                <div className="form-group mb-8">
                    <label className="form-label" style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem' }}>자산 현황 대략적 입력 (구간 선택)</label>

                    <div className="mt-4">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="font-semibold text-main">총 자산 규모 (부동산 포함)</span>
                            <span className="font-bold text-primary">{formatAsset(totalAsset)}</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="20" step="1"
                            value={totalAsset}
                            onChange={(e) => setTotalAsset(parseInt(e.target.value))}
                            className="range-slider"
                        />
                    </div>

                    <div className="mt-6">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="font-semibold text-main">부동산(집)이 차지하는 비중</span>
                            <span className="font-bold text-primary">{realEstateRatio}%</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="100" step="10"
                            value={realEstateRatio}
                            onChange={(e) => setRealEstateRatio(parseInt(e.target.value))}
                            className="range-slider"
                        />
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            *현금화하기 쉬운 금융자산이 얼마나 있는지 파악하기 위함입니다.
                        </p>
                    </div>
                </div>

                {/* 3. 가족 및 자녀 상태 */}
                <div className="form-group mb-8">
                    <label className="form-label" style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem' }}>자녀 독립 상태</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                        {[
                            { id: 'none', label: '자녀 없음' },
                            { id: 'student', label: '미성년/학생 (절대적 지원 필요)' },
                            { id: 'preparing', label: '취업/결혼 준비 중 (목돈 지출 예정)' },
                            { id: 'independent', label: '모두 독립 완료 (추가 큰 지출 없음)' }
                        ].map(opt => (
                            <button
                                key={opt.id}
                                type="button"
                                className={`btn ${childrenStatus === opt.id ? 'btn-primary' : 'btn-outline'}`}
                                style={{ padding: '1rem', fontSize: 'var(--text-md)', textAlign: 'left', justifyContent: 'flex-start' }}
                                onClick={() => setChildrenStatus(opt.id)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-4" style={{ padding: '1.25rem' }}>
                    정밀 진단 시작하기
                </button>
            </form>
        </div>
    );
};

export default Profile;
