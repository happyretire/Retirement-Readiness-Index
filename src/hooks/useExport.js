import { useState } from 'react';
import html2canvas from 'html2canvas';
import { downloadAsPDF } from '../utils/exportUtils';

export const useExport = () => {
    const [isExporting, setIsExporting] = useState(false);

    const exportToImage = async (elementId, filename = 'KRRI_Result.png') => {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            setIsExporting(true);

            // 캡처 전 스크롤 조정
            // .main-content 컨테이너가 있다면 해당 컨테이너를 스크롤
            const scrollContainer = document.querySelector('.main-content');
            if (scrollContainer) {
                scrollContainer.scrollTo(0, 0);
            } else {
                window.scrollTo(0, 0);
            }

            // 렌더링 안정화를 위해 대기
            await new Promise(r => setTimeout(r, 500));

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                scrollX: 0,
                scrollY: 0,
                onclone: (clonedDoc) => {
                    const theme = document.documentElement.getAttribute('data-theme') || 'light';
                    clonedDoc.documentElement.setAttribute('data-theme', theme);

                    const clonedElement = clonedDoc.getElementById(elementId);
                    if (clonedElement) {
                        // 캡처 시 배경색 누락 방지
                        clonedElement.style.background = theme === 'dark' ? '#0F172A' : '#F8FAFC';
                        // 푸터 등 하단 요소가 잘리지 않도록 강제로 높이 확보
                        clonedElement.style.height = 'auto';
                        clonedElement.style.minHeight = element.scrollHeight + 'px';
                    }
                },
                // width/height 명시적 지정 시 하단이 잘릴 수 있으므로 
                // html2canvas가 엘리먼트 크기를 스스로 계산하도록 맡기되,
                // windowWidth/windowHeight는 컨텐츠를 담기에 충분한 크기로 지정
                windowWidth: 1200, // 충분한 너비
                windowHeight: element.scrollHeight + 100 // 충분한 높이 + 여유분
            });

            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = filename;
            link.click();
        } catch (error) {
            console.error('이미지 저장 중 오류 발생:', error);
            alert('이미지 저장에 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setIsExporting(false);
        }
    };

    const exportToPDF = async (elementId, filename = 'KRRI_Result.pdf') => {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            setIsExporting(true);

            // 캡처 전 스크롤 조정
            const scrollContainer = document.querySelector('.main-content');
            if (scrollContainer) {
                scrollContainer.scrollTo(0, 0);
            }

            // 렌더링 안정화를 위해 대기
            await new Promise(r => setTimeout(r, 500));

            // exportUtils의 downloadAsPDF 함수 호출
            await downloadAsPDF(element, filename);
        } catch (error) {
            console.error('PDF 저장 중 오류 발생:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return { exportToImage, exportToPDF, isExporting };
};
