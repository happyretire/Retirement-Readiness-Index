import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Share2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import ResultChart from '../components/ResultChart';
import { surveyCategories } from '../utils/surveyData';
import { getPersona, getStatusText, getPrescriptionTitle, getPrescriptionDesc, getAgeComment } from '../utils/resultRules';

const getStatusIcon = (score) => {
    if (score >= 80) return <CheckCircle size={24} className="text-success" color="var(--success)" />;
    if (score >= 50) return <Info size={24} className="text-warning" color="var(--warning)" />;
    return <AlertTriangle size={24} className="text-danger" color="var(--danger)" />;
};

const getStatusColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 50) return 'var(--warning)';
    return 'var(--danger)';
};

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { resultData, ageRange } = location.state || {};

    // If directly accessed without taking survey, redirect
    if (!resultData) {
        return (
            <div className="text-center mt-8">
                <p className="mb-4">진단 결과가 없습니다.</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>처음으로</button>
            </div>
        );
    }

    // Find worst 2 categories for prescriptions
    const sortedCategories = surveyCategories.map(cat => ({
        id: cat.id,
        title: cat.title,
        score: resultData[cat.id]
    })).sort((a, b) => a.score - b.score);

    const worstTwo = sortedCategories.slice(0, 2);
    const persona = getPersona(resultData);

    return (
        <div className="animate-fade-in pb-8">
            <div className="text-center mb-6 mt-4">
                <h2 className="font-bold text-main mb-2" style={{ fontSize: 'var(--text-xl)' }}>
                    나의 K-RRI 진단 결과
                </h2>
                <div style={{ background: 'var(--primary-light)', padding: '1.25rem', borderRadius: '12px', marginTop: '1.5rem', border: '1px solid var(--primary)' }}>
                    <h3 className="text-primary font-bold mb-3" style={{ fontSize: 'var(--text-lg)' }}>
                        {persona.title}
                    </h3>
                    <p className="text-main" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                        {persona.desc}
                    </p>
                </div>
            </div>

            <div className="card text-center py-6 mb-6">
                <p className="text-muted mb-2 font-bold" style={{ fontSize: 'var(--text-sm)' }}>
                    {ageRange}대 맞춤형 종합 점수
                </p>
                <div style={{ fontSize: '4.5rem', fontWeight: '800', color: 'var(--primary)', lineHeight: '1' }}>
                    {resultData.total}<span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>점</span>
                </div>
            </div>

            <div className="card mb-6" style={{ height: '350px', position: 'relative' }}>
                <ResultChart data={resultData} />
                <p className="text-center text-muted mt-4" style={{ fontSize: '0.8rem', position: 'absolute', bottom: '15px', width: 'calc(100% - 3rem)' }}>
                    * 회색 영역은 동일 연령대의 평균 준비도를 나타냅니다.
                </p>
            </div>

            <div className="card mb-6">
                <h3 className="font-bold text-primary mb-4" style={{ fontSize: 'var(--text-lg)' }}>
                    🚥 5대 영역 심층 진단
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {surveyCategories.map((cat, index) => {
                        const score = resultData[cat.id];
                        const icon = getStatusIcon(score);
                        const color = getStatusColor(score);
                        return (
                            <div key={cat.id} style={{ borderBottom: index < surveyCategories.length - 1 ? '1px solid #E2E8F0' : 'none', paddingBottom: index < surveyCategories.length - 1 ? '1.5rem' : '0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {icon}
                                        <span className="font-bold text-main" style={{ fontSize: 'var(--text-md)' }}>{cat.title}</span>
                                    </div>
                                    <span className="font-bold" style={{ color: color, fontSize: 'var(--text-lg)' }}>{score}점</span>
                                </div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    {getStatusText(cat.id, score)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="card mb-6" style={{ border: '2px solid var(--danger)', background: '#fff' }}>
                <h3 className="font-bold text-danger mb-4" style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    💡 우선 보완 처방전 (TOP 2)
                </h3>
                <p className="text-muted mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                    가장 취약한 영역을 보완하기 위해 <strong>오늘 당장 실천할 수 있는 행동 지침</strong>입니다.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {worstTwo.map((cat, idx) => (
                        <div key={cat.id} style={{ background: '#FFF5F5', padding: '1.25rem', borderRadius: '8px' }}>
                            <strong style={{ display: 'block', color: 'var(--danger)', marginBottom: '0.5rem', fontSize: 'var(--text-md)', lineHeight: '1.4' }}>
                                {getPrescriptionTitle(cat.id)}
                            </strong>
                            <p style={{ color: 'var(--text-main)', fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                                {getPrescriptionDesc(cat.id)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card mb-8" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                <h3 className="font-bold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'white' }}>
                    💌 {ageRange}대 동년배 분들께
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: '#E2E8F0', lineHeight: '1.7' }}>
                    {getAgeComment(ageRange)}
                </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button className="btn btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem' }}>
                    <Download size={20} /> 결과 저장
                </button>
                <button className="btn btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem' }}>
                    <Share2 size={20} /> 부부 공유
                </button>
            </div>

            <button
                className="btn btn-outline w-full mt-4"
                onClick={() => navigate('/')}
                style={{ padding: '1rem' }}
            >
                다시 검사하기 (메인으로)
            </button>
        </div>
    );
};

export default Result;
