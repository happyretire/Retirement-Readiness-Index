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

        // data-pdf-break 마커들로 분할 지점(배열) 찾기
        const breakPoints = [];
        const markers = element.querySelectorAll('[data-pdf-break]');
        const elementRect = element.getBoundingClientRect();

        markers.forEach(marker => {
            const relativeTop = marker.getBoundingClientRect().top - elementRect.top;
            if (relativeTop > 0) {
                breakPoints.push(Math.round(relativeTop * canvasScale));
            }
        });

        // 분할 지점이 없으면 캔버스 절반에서 임의 분할 (기존 폴백 로직 유지)
        if (breakPoints.length === 0) {
            breakPoints.push(Math.round(canvas.height / 2));
        }

        // --- 3) 캔버스 다중 분할 ---
        const pageCanvases = [];
        let currentY = 0;

        for (let i = 0; i < breakPoints.length; i++) {
            const splitY = breakPoints[i];
            const segmentHeight = splitY - currentY;

            if (segmentHeight > 0) {
                const segmentCanvas = document.createElement('canvas');
                segmentCanvas.width = canvas.width;
                segmentCanvas.height = segmentHeight;
                segmentCanvas.getContext('2d').drawImage(
                    canvas, 0, currentY, canvas.width, segmentHeight,
                    0, 0, canvas.width, segmentHeight
                );
                pageCanvases.push(segmentCanvas);
            }
            currentY = splitY;
        }

        // 마지막 남은 영역 캡처
        const lastSegmentHeight = canvas.height - currentY;
        if (lastSegmentHeight > 0) {
            const segmentCanvas = document.createElement('canvas');
            segmentCanvas.width = canvas.width;
            segmentCanvas.height = lastSegmentHeight;
            segmentCanvas.getContext('2d').drawImage(
                canvas, 0, currentY, canvas.width, lastSegmentHeight,
                0, 0, canvas.width, lastSegmentHeight
            );
            pageCanvases.push(segmentCanvas);
        }

        // --- 4) PDF 생성 ---
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = innerWidth;

        pageCanvases.forEach((pageCanvas, index) => {
            // 빈 페이지 방지 방어 코드
            if (pageCanvas.height <= 10) return;

            if (index > 0) {
                pdf.addPage();
                pdf.setFillColor(248, 250, 252);
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');
            }

            const imgRatio = (pageCanvas.height * imgWidth) / pageCanvas.width;

            // 페이지가 A4 세로 높이보다 길면 잘리지 않도록 강제 축소 맞춤 처리
            let imgH = imgRatio;
            let currentImgWidth = imgWidth;
            let marginX = margin;

            if (imgH > innerHeight) {
                const resizeRatio = innerHeight / imgH;
                currentImgWidth = imgWidth * resizeRatio;
                imgH = innerHeight;
                marginX = margin + ((imgWidth - currentImgWidth) / 2); // 중앙 정렬
            }

            pdf.addImage(
                pageCanvas.toDataURL('image/jpeg', 0.95),
                'JPEG', marginX, margin, currentImgWidth, imgH
            );
        });

        pdf.save(fileName);
    } catch (error) {
        console.error('PDF generation failed:', error);
        alert('PDF 저장 중 오류가 발생했습니다.');
    }
};
