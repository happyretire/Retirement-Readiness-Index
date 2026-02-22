import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Info, BarChart3, Gauge, Lightbulb, Heart, TrendingUp, TrendingDown } from 'lucide-react';
import ResultChart from '../components/ResultChart';
import { surveyCategories } from '../utils/surveyData';
import { getPersona, getStatusText, getPrescriptionTitle, getPrescriptionDesc, getAgeComment, getSpecialInsight, getPeerComparisonContext, SCORE_TIER } from '../utils/resultRules';

const getStatusIcon = (score) => {
    if (score >= SCORE_TIER.HIGH) return <CheckCircle size={24} className="text-success" color="var(--success)" />;
    if (score >= SCORE_TIER.MID) return <Info size={24} className="text-warning" color="var(--warning)" />;
    return <AlertTriangle size={24} className="text-danger" color="var(--danger)" />;
};

const getStatusTextColorClass = (score) => {
    if (score >= SCORE_TIER.HIGH) return 'text-success';
    if (score >= SCORE_TIER.MID) return 'text-warning';
    return 'text-danger';
};

// Component: PersonaCard
const PersonaCard = ({ persona }) => (
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
);

// Component: InsightCard
const InsightCard = ({ specialInsight }) => {
    if (!specialInsight) return null;
    return (
        <div className="card animate-fade-in mb-6" style={{
            border: specialInsight.type === 'warning' ? '2px solid var(--warning)' : specialInsight.type === 'success' ? '2px solid var(--success)' : '2px solid var(--primary)',
            background: specialInsight.type === 'warning' ? 'var(--rx-bg-amber)' : specialInsight.type === 'success' ? 'var(--rx-bg-green)' : 'var(--primary-light)'
        }}>
            <h3 className={`font-bold mb-3 ${specialInsight.type === 'warning' ? 'text-warning' : specialInsight.type === 'success' ? 'text-success' : 'text-primary'}`} style={{
                fontSize: 'var(--text-md)',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>
                {specialInsight.title}
            </h3>
            <p className="text-main" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                {specialInsight.desc}
            </p>
        </div>
    );
};

// Component: ScoreCard
const ScoreCard = ({ resultData, peerComparison, isAboveAverage, scoreDiff }) => (
    <div className="card text-center py-6 mb-6">
        <p className="text-muted mb-2 font-bold" style={{ fontSize: '1rem' }}>
            나의 K-RRI 종합 점수
        </p>
        <div className="text-primary" style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1', marginBottom: '1.5rem' }}>
            {resultData.total}<span className="text-muted" style={{ fontSize: '1.5rem' }}>점</span>
        </div>

        <div style={{ background: 'var(--bg-color)', padding: '1.25rem 1rem', borderRadius: '12px', display: 'inline-block', width: '100%', border: '1px solid var(--border-color)' }}>
            <p className="font-bold text-main" style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                <BarChart3 size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.25rem' }} /> {peerComparison.label} ({peerComparison.averageScore}점) 대비
            </p>
            <p className={`font-bold ${isAboveAverage ? 'text-primary' : 'text-danger'}`} style={{ fontSize: '1.2rem' }}>
                {Math.abs(scoreDiff)}점 {isAboveAverage ? <><TrendingUp size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> 높습니다!</> : <><TrendingDown size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> 부족합니다.</>}
            </p>
        </div>
    </div>
);

// Component: DiagnosticList
const DiagnosticList = ({ surveyCategories, resultData, peerComparison }) => (
    <div className="card mb-6">
        <h3 className="font-bold text-primary mb-4" style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <Gauge size={24} /> 5대 영역 심층 진단
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {surveyCategories.map((cat, index) => {
                const score = resultData[cat.id];
                const icon = getStatusIcon(score);
                const colorClass = getStatusTextColorClass(score);
                const peerScore = peerComparison.data[index];
                return (
                    <div key={cat.id} style={{ borderBottom: index < surveyCategories.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: index < surveyCategories.length - 1 ? '1.5rem' : '0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {icon}
                                <span className="font-bold text-main" style={{ fontSize: 'var(--text-md)' }}>{cat.title}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.1rem' }}>
                                <span className={`font-bold ${colorClass}`} style={{ fontSize: 'var(--text-lg)' }}>{score}점</span>
                                <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                    (비교군: {peerScore}점)
                                </span>
                            </div>
                        </div>
                        <p className="text-muted" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                            {getStatusText(cat.id, score)}
                        </p>
                    </div>
                );
            })}
        </div>
    </div>
);

// Component: PrescriptionList
const PrescriptionList = ({ worstTwo }) => (
    <div className="card mb-6" style={{ border: '2px solid var(--danger)', background: 'var(--card-bg)' }}>
        <h3 className="font-bold text-danger mb-4" style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lightbulb size={24} /> 우선 보완 처방전 (TOP 2)
        </h3>
        <p className="text-muted mb-4" style={{ fontSize: 'var(--text-sm)' }}>
            가장 취약한 영역을 보완하기 위해 <strong>오늘 당장 실천할 수 있는 행동 지침</strong>입니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {worstTwo.map((cat) => (
                <div key={cat.id} style={{ background: 'var(--rx-bg-amber)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--rx-border-amber)' }}>
                    <strong className="text-danger" style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--text-md)', lineHeight: '1.4' }}>
                        {getPrescriptionTitle(cat.id, cat.score)}
                    </strong>
                    <p className="text-main" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
                        {getPrescriptionDesc(cat.id, cat.score)}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { resultData, ageRange, profileData } = location.state || {};

    // Find worst 2 categories for prescriptions
    const worstTwo = React.useMemo(() => {
        if (!resultData) return [];
        return surveyCategories.map(cat => ({
            id: cat.id,
            title: cat.title,
            score: resultData[cat.id]
        })).sort((a, b) => a.score - b.score).slice(0, 2);
    }, [resultData]);

    // If directly accessed without taking survey, redirect
    if (!resultData) {
        return (
            <div className="text-center mt-8">
                <p className="mb-4">진단 결과가 없습니다.</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>처음으로</button>
            </div>
        );
    }

    const persona = React.useMemo(() => getPersona(resultData), [resultData]);
    const specialInsight = React.useMemo(() => getSpecialInsight(profileData, resultData), [profileData, resultData]);
    const peerComparison = React.useMemo(() => getPeerComparisonContext(profileData), [profileData]);

    const scoreDiff = React.useMemo(() => resultData.total - peerComparison.averageScore, [resultData, peerComparison]);
    const isAboveAverage = React.useMemo(() => scoreDiff >= 0, [scoreDiff]);

    return (
        <div className="animate-fade-in pb-8">
            <div id="result-capture-area" style={{
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center',
                background: 'var(--bg-color)',
                padding: '1rem',
                paddingBottom: '2.5rem' // 하단 정보 누락 방지를 위한 패딩 추가
            }}>
                {/* 리포트 헤더 템플릿 영역 */}
                <div style={{ padding: '0.5rem 0.5rem 1.5rem', borderBottom: '2px solid var(--border-color)', marginBottom: '1.5rem', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '1px' }}>RETIREMENT READINESS INDEX</span>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)', margin: '0.25rem 0 0', letterSpacing: '-0.5px' }}>
                                나의 K-RRI 은퇴 준비 리포트
                            </h1>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            발행일: {new window.Date().toLocaleDateString('ko-KR')}
                        </span>
                    </div>
                </div>

                <PersonaCard persona={persona} />
                <InsightCard specialInsight={specialInsight} />
                <ScoreCard resultData={resultData} peerComparison={peerComparison} isAboveAverage={isAboveAverage} scoreDiff={scoreDiff} />

                <div className="card mb-6" style={{ height: '350px', position: 'relative' }}>
                    <ResultChart data={resultData} peerData={peerComparison.data} peerLabel={peerComparison.label} />
                    <p className="text-center text-muted mt-4" style={{ fontSize: '0.8rem', position: 'absolute', bottom: '15px', width: 'calc(100% - 3rem)' }}>
                        * 회색 영역은 나와 비슷한 조건의 그룹 평균을 나타냅니다.
                    </p>
                </div>

                {/* 첫 번째 PDF 분할 지점: 요약 및 차트 끝 */}
                <div data-pdf-break style={{ height: '0px', width: '100%', margin: '0' }}></div>

                <DiagnosticList surveyCategories={surveyCategories} resultData={resultData} peerComparison={peerComparison} />

                {/* 두 번째 PDF 분할 지점: 세부 영역 진단 끝 */}
                <div data-pdf-break style={{ height: '0px', width: '100%', margin: '0' }}></div>

                <PrescriptionList worstTwo={worstTwo} />

                <div className="card mb-8" style={{ background: 'var(--primary-light)', border: '1px solid var(--border-color)' }}>
                    <h3 className="font-bold text-primary mb-4" style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <Heart size={22} /> 빛나는 인생 2막, {ageRange}대를 응원합니다
                    </h3>
                    <p className="text-main" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.7', wordBreak: 'keep-all' }}>
                        {getAgeComment(ageRange)}
                    </p>
                </div>

                {/* 이미지 캡처 영역 내부에 포함시킨 푸터 */}
                <footer style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: '1.8' }}>
                        ⓒ Dunam
                    </p>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>
                        카페 : <a href="https://cafe.naver.com/retireclass" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>행복한 은퇴를 꿈꾸는 사람들</a>
                    </p>
                </footer>
            </div>

            <div style={{ marginTop: '2rem', padding: '0 1rem', maxWidth: '600px', margin: '2rem auto 0', textAlign: 'center' }}>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/')}
                    style={{ width: '100%', padding: '1rem', fontSize: 'var(--text-md)' }}
                >
                    진단 다시하기 (처음으로)
                </button>
            </div>
        </div>
    );
};

export default Result;
