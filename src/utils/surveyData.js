// 설문 영역 정의 (K-RRI 5대 핵심 지표)
export const surveyCategories = [
    { id: 'financial', title: '경제적 자립도', description: '연금, 자산, 부채 및 자녀 지원 리스크 점검' },
    { id: 'residence', title: '주거 안정성', description: '인프라 접근성 및 주택 자산 유동화 의지' },
    { id: 'health', title: '건강 및 간병', description: '규칙적 건강관리 및 장기간병 리스크 대비' },
    { id: 'social', title: '사회적 관계', description: '배우자 소통 및 수평적 네트워크 구축' },
    { id: 'career', title: '배움과 능동적 여가', description: '디지털 생존력 및 지속가능한 소일거리 역량' }
];

// 공통 5점 리커트 척도 옵션
const likertOptions = [
    { text: '전혀 아니에요', score: 1 },
    { text: '아닌 편이에요', score: 2 },
    { text: '보통이에요', score: 3 },
    { text: '그런 편이에요', score: 4 },
    { text: '매우 그래요', score: 5 }
];

export const questions = [
    // 1. 경제적 자립도 (Financial)
    { id: 'f1', category: 'financial', text: '은퇴 후 생활비의 70% 이상을 국민연금이나 개인연금 같은 고정 소득으로 준비해 두셨나요?', options: likertOptions },
    { id: 'f2', category: 'financial', text: '은퇴할 즈음에는 대출금을 모두 갚거나, 전체 자산에 비해 빚을 10% 미만으로 줄일 확실한 계획이 있으신가요?', options: likertOptions },
    { id: 'f3', category: 'financial', text: '갑작스럽게 병원비나 목돈이 필요할 때 바로 꺼내 쓸 수 있는 비상금(약 6개월 치 생활비)이 있으신가요?', options: likertOptions },
    { id: 'f4', category: 'financial', text: '물가가 오르거나 경제 상황이 변할 때를 대비해, 예금·주식·채권 등 여러 곳에 돈을 나누어 안전하게 관리하시나요?', options: likertOptions },
    { id: 'f5', category: 'financial', text: '자녀의 결혼이나 교육비로 얼마까지만 지원할지 상한선을 정하고, 가족과 미리 합의해 두셨나요?', options: likertOptions },

    // 2. 주거 안정성 (Residence)
    { id: 'r1', category: 'residence', text: '은퇴 후에도 월세나 전세금 걱정 없이 마음 편히 살 수 있는 \'내 집(자가)\'이 있으신가요?', options: likertOptions },
    { id: 'r2', category: 'residence', text: '나이가 들어 외출이 힘들어질 때를 생각하면, 지금 사는 곳(혹은 살 계획인 곳)은 병원과 마트, 대중교통을 이용하기 편한가요?', options: likertOptions },
    { id: 'r3', category: 'residence', text: '생활비가 부족해지면 주택연금에 가입하거나 더 작은 집으로 이사하여 현금을 확보할 생각이 있으신가요?', options: likertOptions },
    { id: 'r4', category: 'residence', text: '지금(또는 은퇴 후에) 사는 집의 관리비나 세금 등 유지 비용은 은퇴 후 소득으로도 충분히 감당할 수 있는 수준인가요?', options: likertOptions },
    { id: 'r5', category: 'residence', text: '자녀가 모두 독립하고 부부(혼자)만 남게 되었을 때, 지금의 집 크기나 방 개수가 관리하기에 적당한가요?', options: likertOptions },

    // 3. 신체적 건강 (Health)
    { id: 'h1', category: 'health', text: '일주일에 3번 이상, 한 번에 30분 넘게 땀이 날 정도로 꾸준히 운동하고 계신가요?', options: likertOptions },
    { id: 'h2', category: 'health', text: '최근 2년 안에 종합 건강검진을 받았고, 내 몸의 약한 부분이나 조심해야 할 질환을 잘 알고 계신가요?', options: likertOptions },
    { id: 'h3', category: 'health', text: '큰 병에 걸리거나 오랫동안 간병을 받아야 할 때, 가족에게 짐이 되지 않을 만큼의 보험이나 예비 자산이 있나요?', options: likertOptions },
    { id: 'h4', category: 'health', text: '평소에 잠을 푹 자고 식사를 골고루 잘 챙겨 드시며, 과한 술이나 담배를 멀리하고 계신가요?', options: likertOptions },
    { id: 'h5', category: 'health', text: '은퇴 전후로 마음이 헛헛하거나 스트레스를 받을 때, 기분을 좋게 푸는 자신만의 방법이 있으신가요?', options: likertOptions },

    // 4. 사회적 관계 및 심리 (Social & Psych)
    { id: 's1', category: 'social', text: '은퇴하고 나서 하루를 어떻게 보내고 돈은 어떻게 쓸지 배우자(또는 가족)와 충분히 이야기 나누셨나요?', options: likertOptions },
    { id: 's2', category: 'social', text: '회사 밖에서도 일주일에 한 번 이상 즐겁게 수다를 떨거나 취미를 함께할 지인이나 모임이 서너 군데 있으신가요?', options: likertOptions },
    { id: 's3', category: 'social', text: '\'과장\'이나 \'부장\' 같은 명함이 사라지더라도, 인간관계에 위축되지 않을 마음의 준비가 되어 계신가요?', options: likertOptions },
    { id: 's4', category: 'social', text: '은퇴 후에 하루 종일 생기게 될 나만의 자유 시간을 어떻게 채워 나갈지 대략적인 시간표를 짜보신 적이 있나요?', options: likertOptions },
    { id: 's5', category: 'social', text: '내가 그동안 쌓은 경험과 재능을 사회에 기부하거나 봉사하면서 새로운 보람을 찾을 계획이 있으신가요?', options: likertOptions },

    // 5. 배움과 능동적 여가 (Career & Learning)
    { id: 'c1', category: 'career', text: '지금 다니는 직장을 그만두더라도, 한 달에 적은 생활비라도 꾸준히 벌 수 있는 나만의 기술이나 소일거리가 있나요?', options: likertOptions },
    { id: 'c2', category: 'career', text: '은행 앱 이체, 식당 키오스크 주문, 스마트폰 기차 예매 등 새로운 디지털 기기를 혼자서 쓰는 데 어려움이 없으신가요?', options: likertOptions },
    { id: 'c3', category: 'career', text: '일과는 상관없이, 오랫동안 푹 빠져서 남들에게 가르쳐 줄 수 있을 만큼 전문성을 쌓은 취미나 특기가 있나요?', options: likertOptions },
    { id: 'c4', category: 'career', text: '최근 1년 안에 구청이나 전문 기관에서 여는 노후 설계 특강이나 새로운 것을 배우는 교육 프로그램에 참여해 보신 적이 있나요?', options: likertOptions },
    { id: 'c5', category: 'career', text: '내가 일하며 얻은 소중한 지식과 노하우를 후배 세대나 다른 사람들에게 친절하게 나누어 줄 의향이 있으신가요?', options: likertOptions }
];

export const calculateScores = (answers, ageRange) => {
    // answers: [{ id, category, score: 1~5 }]
    const rawScores = { financial: 0, residence: 0, health: 0, social: 0, career: 0 };

    answers.forEach(ans => {
        rawScores[ans.category] += ans.score;
    });

    // Calculate 100-point converted score: ((raw_score - 5) / 20) * 100
    const convertedScores = {};
    Object.keys(rawScores).forEach(cat => {
        const raw = rawScores[cat];
        // Convert 5~25 range to 0~100 range
        convertedScores[cat] = Math.round(((raw - 5) / 20) * 100);
    });

    // Apply age weighting algorithm
    // 40s: High focus on Financial and Career
    // 50s: Focus on Residence and Financial
    // 60s: High focus on Health and Social Networks

    let weights;
    if (ageRange === '40') {
        weights = { financial: 1.2, residence: 0.9, health: 0.9, social: 0.8, career: 1.2 };
    } else if (ageRange === '50') {
        weights = { financial: 1.1, residence: 1.2, health: 1.0, social: 0.9, career: 0.8 };
    } else { // 60s
        weights = { financial: 0.9, residence: 1.0, health: 1.3, social: 1.1, career: 0.7 };
    }

    // Calculate Final Weighted Total score
    let totalScore = 0;
    let totalWeight = 0;

    Object.keys(convertedScores).forEach(cat => {
        totalScore += convertedScores[cat] * weights[cat];
        totalWeight += weights[cat];
    });

    totalScore = Math.round(totalScore / totalWeight);

    return { ...convertedScores, total: totalScore };
};
