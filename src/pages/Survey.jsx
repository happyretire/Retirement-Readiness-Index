import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { questions, calculateScores, surveyCategories } from '../utils/surveyData';

const Survey = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    // 연령대는 Profile에서 전달받거나, 없으면 기본값 50으로 처리
    const ageRange = location.state?.ageRange || '50';

    const formatProgress = () => {
        return Math.round(((currentQuestionIndex) / questions.length) * 100);
    };

    const handleSelectOption = (score) => {
        const currentQ = questions[currentQuestionIndex];
        const newAnswer = {
            id: currentQ.id,
            category: currentQ.category,
            score
        };

        const newAnswers = [...answers, newAnswer];
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // 설문 완료! 결과 계산해서 페이지 이동
            const resultData = calculateScores(newAnswers, ageRange);
            navigate('/result', { state: { resultData, ageRange } });
        }
    };

    const currentQ = questions[currentQuestionIndex];
    const categoryInfo = surveyCategories.find(c => c.id === currentQ.category);

    return (
        <div className="animate-fade-in card" style={{ padding: '2rem 1.5rem' }}>
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${formatProgress()}%` }}></div>
            </div>
            <p style={{ textAlign: 'right', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {currentQuestionIndex + 1} / {questions.length}
            </p>

            <h2 className="text-primary font-bold mb-2" style={{ fontSize: 'var(--text-xl)' }}>
                {categoryInfo.title}
            </h2>
            <p className="text-muted mb-8" style={{ fontSize: 'var(--text-sm)', minHeight: '40px' }}>
                {categoryInfo.description}
            </p>

            <div className="form-group animate-fade-in" key={currentQ.id}>
                <label className="form-label" style={{ fontSize: 'var(--text-lg)', marginBottom: '2rem', lineHeight: '1.4' }}>
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
                            setAnswers(answers.filter((_, i) => i !== currentQuestionIndex - 1));
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
