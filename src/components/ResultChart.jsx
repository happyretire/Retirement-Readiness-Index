import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const ResultChart = ({ data, peerData, peerLabel }) => {
    // data 객체의 프로퍼티가 넘어온다고 가정: 
    // { financial: 80, residence: 90, health: 60, social: 70, career: 50 }

    const chartData = React.useMemo(() => ({
        labels: ['경제적 자립도', '주거 안정성', '건강/간병', '사회적 관계', '배움/여가'],
        datasets: [
            {
                label: '내 준비도',
                data: [
                    data?.financial || 0,
                    data?.residence || 0,
                    data?.health || 0,
                    data?.social || 0,
                    data?.career || 0
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.4)', // Ocean Blue
                borderColor: 'rgba(30, 64, 175, 1)', // Darker blue
                borderWidth: 2,
                pointBackgroundColor: 'rgba(30, 64, 175, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(30, 64, 175, 1)',
            },
            {
                label: peerLabel || '유사 그룹 평균',
                data: peerData || [65, 70, 55, 60, 45],
                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                borderColor: 'rgba(156, 163, 175, 0.5)',
                borderWidth: 1.5,
                borderDash: [5, 5],
                pointBackgroundColor: 'rgba(156, 163, 175, 0.8)',
                pointRadius: 3
            }
        ],
    }), [data, peerData, peerLabel]);

    const options = React.useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(0,0,0,0.1)'
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20,
                    backdropColor: 'transparent',
                    font: { size: 10 }
                },
                pointLabels: {
                    font: {
                        size: 13,
                        family: "'Pretendard', sans-serif",
                        weight: '600'
                    },
                    color: '#0F172A' // --text-main
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: { size: 12, family: "'Pretendard', sans-serif" }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)', // text-main
                titleFont: { size: 14, family: "'Pretendard', sans-serif" },
                bodyFont: { size: 13, family: "'Pretendard', sans-serif" },
                padding: 12,
                cornerRadius: 8
            }
        }
    }), []);

    return <Radar data={chartData} options={options} />;
};

export default React.memo(ResultChart);
