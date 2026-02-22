import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * HTML 요소를 이미지(PNG)로 캡처하여 다운로드합니다.
 */
export const downloadAsImage = async (element, fileName = 'k-rri-result.png') => {
    if (!element) return;

    try {
        // 캡처 전 최상단 이동
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 300));

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            // backgroundColor 설정 제거: 요소의 실제 배경색(다크모드 대응)을 사용하도록 함
            width: element.scrollWidth,
            height: element.scrollHeight,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            x: 0,
            y: 0
        });

        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = fileName;
        link.click();
    } catch (error) {
        console.error('Image capture failed:', error);
        alert('이미지 저장 중 오류가 발생했습니다.');
    }
};

/**
 * 캔버스를 지정한 y 좌표에서 세로로 분할합니다.
 */
const splitCanvas = (sourceCanvas, splitY) => {
    const topCanvas = document.createElement('canvas');
    topCanvas.width = sourceCanvas.width;
    topCanvas.height = splitY;
    topCanvas.getContext('2d').drawImage(
        sourceCanvas, 0, 0, sourceCanvas.width, splitY,
        0, 0, sourceCanvas.width, splitY
    );

    const bottomCanvas = document.createElement('canvas');
    bottomCanvas.width = sourceCanvas.width;
    bottomCanvas.height = sourceCanvas.height - splitY;
    bottomCanvas.getContext('2d').drawImage(
        sourceCanvas, 0, splitY, sourceCanvas.width, bottomCanvas.height,
        0, 0, sourceCanvas.width, bottomCanvas.height
    );

    return { topCanvas, bottomCanvas };
};

/**
 * HTML 요소를 PDF로 변환합니다.
 * - 원본 요소를 그대로 캡처 (복제 없음 = 렌더링 문제 없음)
 * - data-pdf-break 마커 또는 섹션 경계에서 스마트 페이지 분할
 */
export const downloadAsPDF = async (element, fileName = 'k-rri-result.pdf') => {
    if (!element) return;

    try {
        // 캡처 전 최상단 이동
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 200));

        // --- 1) 원본 요소 그대로 캡처 ---
        const scale = 2;
        const canvas = await html2canvas(element, {
            scale,
            useCORS: true,
            logging: false,
            backgroundColor: '#F8FAFC',
            width: element.scrollWidth,
            height: element.scrollHeight,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight
        });

        // --- 2) 페이지 분할 지점 계산 ---
        const margin = 8;
        const pageWidth = 210;
        const pageHeight = 297;
        const innerWidth = pageWidth - (margin * 2);  // 194mm
        const innerHeight = pageHeight - (margin * 2); // 281mm

        // 원본 요소 px → 캔버스 px 스케일
        const canvasScale = canvas.width / element.scrollWidth;

        // data-pdf-break 마커로 분할 지점 찾기
        let breakPx = 0;
        const marker = element.querySelector('[data-pdf-break]');
        if (marker && marker.offsetTop > 0) {
            breakPx = Math.round(marker.offsetTop * canvasScale);
        }

        // 마커 없으면 자식 요소 경계 기반 분할
        if (breakPx <= 0) {
            const page1MaxPx = Math.round((innerHeight / innerWidth) * canvas.width);
            for (const child of element.children) {
                const bottom = Math.round((child.offsetTop + child.offsetHeight) * canvasScale);
                if (bottom <= page1MaxPx) {
                    breakPx = bottom;
                }
            }
        }

        // 안전장치: breakPx가 유효하지 않으면 캔버스 절반에서 분할
        if (breakPx <= 0 || breakPx >= canvas.height) {
            breakPx = Math.round(canvas.height / 2);
        }

        // --- 3) 캔버스 분할 ---
        const { topCanvas, bottomCanvas } = splitCanvas(canvas, breakPx);

        // --- 4) PDF 생성 ---
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = innerWidth;

        // 페이지 1
        const img1H = (topCanvas.height * imgWidth) / topCanvas.width;
        pdf.addImage(
            topCanvas.toDataURL('image/jpeg', 0.92),
            'JPEG', margin, margin, imgWidth, img1H
        );

        // 페이지 2
        if (bottomCanvas.height > 10) {
            pdf.addPage();
            pdf.setFillColor(248, 250, 252);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');

            const img2H = (bottomCanvas.height * imgWidth) / bottomCanvas.width;
            pdf.addImage(
                bottomCanvas.toDataURL('image/jpeg', 0.92),
                'JPEG', margin, margin, imgWidth, img2H
            );
        }

        pdf.save(fileName);
    } catch (error) {
        console.error('PDF generation failed:', error);
        alert('PDF 저장 중 오류가 발생했습니다.');
    }
};
