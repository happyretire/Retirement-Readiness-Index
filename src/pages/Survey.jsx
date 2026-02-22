import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { questions, calculateScores, surveyCategories } from '../utils/surveyData';

const introData = {
    financial: {
        image: 'images/intro_financial.png',
        color: '#D97706',
        bgColor: '#FEF3C7',
        message: "차곡차곡 모아온 내일\n수확의 시간을 점검합니다"
    },
    residence: {
        image: 'images/intro_residence.png',
        color: '#EA580C',
        bgColor: '#FFEDD5',
        message: "마음 편히 쉴 수 있는\n나만의 보금자리를 그립니다"
    },
    health: {
        image: 'images/intro_health.png',
        color: '#059669',
        bgColor: '#D1FAE5',
        message: "흔들림 없는 인생 2막\n튼튼한 방어막을 세웁니다"
    },
    social: {
        image: 'images/intro_social.png',
        color: '#DB2777',
        bgColor: '#FCE7F3',
        message: "명함 없이도 환영받는\n온기 가득한 만남을 향해 갑니다"
    },
    career: {
        image: 'images/intro_career.png',
        color: '#4F46E5',
        bgColor: '#E0E7FF',
        message: "새로운 지혜의 발견\n설레는 배움의 돛을 올립니다"
    }
};

const Survey = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    // Extract individual profile fields from Profile.jsx
    const {
        ageRange = '50',
        gender = 'female',
        job = 'employee',
        totalAsset = 5,
        realEstateRatio = 70,
        childrenStatus = 'independent'
    } = location.state || {};

    // profileData를 개별 필드로부터 구성
    const profileData = useMemo(() => ({ ageRange, gender, job, totalAsset, realEstateRatio, childrenStatus }), [ageRange, gender, job, totalAsset, realEstateRatio, childrenStatus]);

    // 이미지 프리로딩 (네트워크 딜레이 방역)
    useEffect(() => {
        Object.values(introData).forEach((data) => {
            const img = new Image();
            img.src = data.image;
        });
    }, []);

    // 새로 추가된 Intro(표지) 관련 상태
    const [showIntro, setShowIntro] = useState(true);
    const [currentCategory, setCurrentCategory] = useState(questions[0].category);

    const getProgress = () => {
        return Math.round((currentQuestionIndex / questions.length) * 100);
    };

    const handleSelectOption = useCallback((score) => {
        const currentQ = questions[currentQuestionIndex];
        const newAnswer = {
            id: currentQ.id,
            category: currentQ.category,
            score
        };

        const newAnswers = [...answers, newAnswer];
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            const nextQ = questions[currentQuestionIndex + 1];
            // 영역이 바뀌면 다시 표지(Intro) 띄우기
            if (nextQ.category !== currentQ.category) {
                setShowIntro(true);
                setCurrentCategory(nextQ.category);
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // 설문 완료! 결과 계산해서 페이지 이동
            const resultData = calculateScores(newAnswers, ageRange);
            navigate('/result', { state: { resultData, ageRange, profileData } });
        }
    }, [currentQuestionIndex, answers, ageRange, profileData, navigate]);

    // 표지 렌더링
    if (showIntro) {
        const info = introData[currentCategory];
        const categoryInfo = surveyCategories.find(c => c.id === currentCategory);

        return (
            <div className="animate-fade-in card text-center" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', minHeight: '60vh', justifyContent: 'center' }}>
                {/* 프로그레스 바 영역 (Intro일 땐 숨김) */}
                {!showIntro && (
                    <div style={{ padding: '2rem 1.5rem 1rem', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span className="font-bold text-main" style={{ fontSize: 'var(--text-md)' }}>
                                {categoryInfo?.title}
                            </span>
                            <span className="font-semibold text-primary">
                                {getProgress()}%
                            </span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${getProgress()}%` }}
                            ></div>
                        </div>
                    </div>
                )}
                <img
                    src={info.image}
                    alt={`${categoryInfo.title} 일러스트`}
                    style={{
                        width: '180px',
                        height: '180px',
                        objectFit: 'contain',
                        borderRadius: '16px',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        background: 'var(--card-bg)'
                    }}
                />
                <p className="font-semibold mb-2" style={{ color: info.color, letterSpacing: '0.05em' }}>
                    STEP {surveyCategories.findIndex(c => c.id === currentCategory) + 1}
                </p>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                    {categoryInfo.title}
                </h2>

                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.7',
                    wordBreak: 'keep-all',
                    whiteSpace: 'pre-line',
                    marginBottom: '3rem'
                }}>
                    {info.message}
                </p>

                <button
                    className="btn btn-primary"
                    onClick={() => setShowIntro(false)}
                    style={{ padding: '1rem 3rem', fontSize: 'var(--text-md)', borderRadius: '999px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                >
                    진단 시작하기
                </button>
            </div>
        );
    }

    // 본 질문 렌더링
    const currentQ = questions[currentQuestionIndex];
    const categoryInfo = surveyCategories.find(c => c.id === currentQ.category);

    return (
        <div className="animate-fade-in card" style={{ padding: '2rem 1.5rem', minHeight: '60vh' }}>
            {/* 프로그레스 바 영역 (Intro일 땐 숨김) */}
            {!showIntro && (
                <div style={{ paddingBottom: '1rem', position: 'sticky', top: 0, zIndex: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span className="font-bold text-main" style={{ fontSize: 'var(--text-md)' }}>
                            {categoryInfo?.title}
                        </span>
                        <span className="font-semibold text-primary">
                            {getProgress()}%
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${getProgress()}%` }}
                        ></div>
                    </div>
                </div>
            )}

            <p style={{ textAlign: 'right', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {currentQuestionIndex + 1} / {questions.length}
            </p>

            <div className="form-group animate-fade-in" key={currentQ.id}>
                <label className="form-label" style={{ fontSize: 'var(--text-lg)', marginBottom: '2rem', lineHeight: '1.4', wordBreak: 'keep-all' }}>
                    {currentQ.text}
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {currentQ.options.map((option, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className="btn btn-outline"
                            style={{
                                textAlign: 'left',
                                justifyContent: 'flex-start',
                                padding: '1.25rem 1.5rem',
                                height: 'auto',
                                whiteSpace: 'normal',
                                lineHeight: '1.4',
                                fontSize: 'var(--text-md)'
                            }}
                            onClick={() => handleSelectOption(option.score)}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        if (currentQuestionIndex > 0) {
                            const prevQ = questions[currentQuestionIndex - 1];
                            // 이전 문항이 다른 카테고리면 표지는 스킵하고 바로 이전 질문으로
                            if (prevQ.category !== currentQ.category) {
                                setCurrentCategory(prevQ.category);
                            }
                            setAnswers(answers.slice(0, -1)); // answers.filter 대신 확실하게 배열의 마지막 원소 제거
                            setCurrentQuestionIndex(currentQuestionIndex - 1);
                        } else {
                            navigate(-1);
                        }
                    }}
                >
                    {currentQuestionIndex === 0 ? '이전 화면' : '이전 문항'}
                </button>
            </div>
        </div>
    );
};

export default Survey;
