export interface SubmissionItem {
    title: string;
    required: boolean;
    description: string;
    caption?: string;
    icon?: "code" | "shield" | "video" | "file";
}

export interface HackathonSubmission {
    items: SubmissionItem[];
    notices: string[];
}

export interface EvaluationCriterion {
    title: string;
    weight: number;
}

export interface HackathonEvaluation {
    method?: string;
    criteria: EvaluationCriterion[];
}

export interface Hackathon {
    id: string;
    slug: string;
    title: string;
    organizer: string;
    description: string;
    longDescription: string;
    tags: string[];
    prize: string;
    prizeAmount: number;
    participants: number;
    maxParticipants: number;
    startDate: string;
    endDate: string;
    registrationDeadline: string;
    status: "upcoming" | "ongoing" | "ended";
    mode: "online" | "offline" | "hybrid";
    imageUrl: string;
    location?: string;
    submission: HackathonSubmission;
    evaluation: HackathonEvaluation;
}

export const hackathons: Hackathon[] = [
    {
        id: "1",
        slug: "ai-future-2026",
        title: "AI Future Hackathon 2026",
        organizer: "TechCorp Korea",
        description: "AI와 머신러닝을 활용한 미래 혁신 솔루션을 만들어 보세요.",
        longDescription:
            "AI Future Hackathon 2026는 인공지능 기술로 사회 문제를 해결하는 혁신적인 솔루션을 발굴하는 대회입니다. 의료, 교육, 환경 등 다양한 분야에서 AI를 활용한 프로젝트를 개발하고 전문가 심사위원들의 평가를 받아보세요. 팀 구성부터 최종 발표까지 48시간 동안 진행되는 강렬한 해킹 경험을 제공합니다.",
        tags: ["AI", "Machine Learning", "Deep Learning", "Python"],
        prize: "1억원",
        prizeAmount: 100000000,
        participants: 342,
        maxParticipants: 500,
        startDate: "2026-03-15",
        endDate: "2026-03-15",
        registrationDeadline: "2026-03-15",
        status: "ongoing",
        mode: "hybrid",
        imageUrl: "/hackathon.jpg",
        location: "서울 코엑스",
        submission: {
            items: [
                {
                    title: "프로젝트 소스코드",
                    required: true,
                    description: "GitHub 또는 GitLab 저장소 링크를 제출해주세요.",
                    icon: "code",
                },
                {
                    title: "모델 설명 문서",
                    required: true,
                    description: "사용한 모델 구조, 학습 방식, 추론 흐름을 문서로 정리해주세요.",
                    icon: "file",
                },
                {
                    title: "데모 영상",
                    required: true,
                    description: "3분 이내의 시연 영상 링크를 제출해주세요.",
                    caption: "YouTube, Vimeo 등 외부 링크 가능",
                    icon: "video",
                },
            ],
            notices: [
                "발표 자료는 PDF 형식으로 제출해주세요.",
                "README에 실행 방법과 의존성 설치 방법을 포함해주세요.",
                "모델 추론에 필요한 환경 정보와 버전을 명시해주세요.",
                "제출 링크는 심사위원이 접근 가능한 상태인지 확인해주세요.",
            ],
        },
        evaluation: {
            method: "각 팀은 5분 발표 후 3분 Q&A를 진행합니다.",
            criteria: [
                { title: "문제 해결력", weight: 25 },
                { title: "기술 구현", weight: 30 },
                { title: "AI 활용도", weight: 25 },
                { title: "확장 가능성", weight: 10 },
                { title: "발표력", weight: 10 },
            ],
        },
    },
    {
        id: "2",
        slug: "web3-builders-2026",
        title: "Web3 Builders Challenge",
        organizer: "BlockChain Foundation",
        description: "블록체인과 Web3 기술로 탈중앙화 미래를 설계하세요.",
        longDescription:
            "Web3 Builders Challenge는 블록체인 기술을 활용한 혁신적인 dApp을 개발하는 해커톤입니다. DeFi, NFT, DAO 등 Web3의 다양한 분야에서 솔루션을 구축해보세요. Ethereum, Solana, Polygon 등 다양한 체인을 지원하며, 멘토들의 기술 지원과 함께 진행됩니다.",
        tags: ["Blockchain", "Web3", "Solidity", "DeFi", "NFT"],
        prize: "5000만원",
        prizeAmount: 50000000,
        participants: 178,
        maxParticipants: 300,
        startDate: "2026-03-20",
        endDate: "2026-03-22",
        registrationDeadline: "2026-03-10",
        status: "ongoing",
        mode: "online",
        imageUrl: "/hackathon.jpg",
        submission: {
            items: [
                {
                    title: "스마트 컨트랙트 소스코드",
                    required: true,
                    description: "배포한 컨트랙트와 저장소 링크를 제출해주세요.",
                    icon: "code",
                },
                {
                    title: "배포 주소 및 테스트넷 정보",
                    required: true,
                    description: "컨트랙트 주소, 체인 정보, 테스트 계정을 함께 제출해주세요.",
                    icon: "file",
                },
                {
                    title: "데모 영상",
                    required: true,
                    description: "dApp 사용 흐름이 보이는 3분 이내 데모 영상을 제출해주세요.",
                    icon: "video",
                },
            ],
            notices: [
                "스마트 컨트랙트 주소와 ABI 정보를 함께 기재해주세요.",
                "테스트에 필요한 지갑 주소 또는 샘플 계정을 제공해주세요.",
                "외부 API 키가 필요한 경우 대체 테스트 방법을 README에 작성해주세요.",
                "제출 링크는 공개 또는 열람 가능한 상태여야 합니다.",
            ],
        },
        evaluation: {
            method: "각 팀은 6분 발표 후 라이브 데모와 Q&A를 진행합니다.",
            criteria: [
                { title: "프로토콜 완성도", weight: 25 },
                { title: "스마트 컨트랙트 구현", weight: 25 },
                { title: "실사용 가능성", weight: 20 },
                { title: "탈중앙화 적합성", weight: 20 },
                { title: "데모 완성도", weight: 10 },
            ],
        },
    },
    {
        id: "3",
        slug: "green-tech-hack",
        title: "Green Tech Hackathon",
        organizer: "환경부 x StartupHub",
        description: "환경 문제를 기술로 해결하는 그린테크 솔루션을 개발하세요.",
        longDescription:
            "지구 환경 위기를 기술로 해결하는 Green Tech Hackathon입니다. 탄소 중립, 재활용, 스마트 에너지 관리 등 환경 분야의 다양한 문제를 IoT, AI, 빅데이터 등의 기술로 해결하는 혁신 솔루션을 개발해보세요.",
        tags: ["IoT", "Sustainability", "CleanTech", "Data Science"],
        prize: "3000만원",
        prizeAmount: 30000000,
        participants: 256,
        maxParticipants: 256,
        startDate: "2026-02-01",
        endDate: "2026-02-03",
        registrationDeadline: "2026-01-20",
        status: "ended",
        mode: "offline",
        imageUrl: "/poster.jpg",
        location: "부산 벡스코",
        submission: {
            items: [
                {
                    title: "프로젝트 소스코드",
                    required: true,
                    description: "서비스 및 디바이스 제어 코드 저장소를 제출해주세요.",
                    icon: "code",
                },
                {
                    title: "환경 효과 설명서",
                    required: true,
                    description: "탄소 절감, 자원 절약 등 기대 효과를 문서로 제출해주세요.",
                    icon: "file",
                },
                {
                    title: "발표 자료",
                    required: true,
                    description: "최종 발표용 PDF 자료를 제출해주세요.",
                    icon: "file",
                },
            ],
            notices: [
                "IoT 디바이스가 포함된 경우 연결 구조를 다이어그램으로 설명해주세요.",
                "데이터 수집 방식과 측정 기준을 문서에 포함해주세요.",
                "발표 자료는 PDF 형식으로 제출해주세요.",
            ],
        },
        evaluation: {
            method: "각 팀은 5분 발표 후 2분 질의응답을 진행합니다.",
            criteria: [
                { title: "환경 기여도", weight: 30 },
                { title: "실현 가능성", weight: 20 },
                { title: "기술 활용도", weight: 20 },
                { title: "지속 가능성", weight: 20 },
                { title: "발표력", weight: 10 },
            ],
        },
    },
    {
        id: "4",
        slug: "healthcare-innovation",
        title: "Healthcare Innovation Sprint",
        organizer: "서울대병원 x KAIST",
        description: "헬스케어 난제를 해결하는 디지털 의료 솔루션을 만드세요.",
        longDescription:
            "Healthcare Innovation Sprint는 의료 현장의 실제 문제를 기술로 해결하는 해커톤입니다. 의사, 간호사, 환자 등 실제 이해관계자들과 함께 문제를 정의하고, 디지털 헬스케어 솔루션을 개발합니다.",
        tags: ["HealthTech", "AI", "Mobile", "Data Analytics"],
        prize: "7000만원",
        prizeAmount: 70000000,
        participants: 89,
        maxParticipants: 200,
        startDate: "2026-05-10",
        endDate: "2026-05-12",
        registrationDeadline: "2026-04-25",
        status: "upcoming",
        mode: "hybrid",
        imageUrl: "/poster.jpg",
        location: "서울 강남",
        submission: {
            items: [
                {
                    title: "프로젝트 소스코드",
                    required: true,
                    description: "애플리케이션 또는 서비스 저장소 링크를 제출해주세요.",
                    icon: "code",
                },
                {
                    title: "의료 데이터 처리 방안",
                    required: true,
                    description: "데이터 수집, 활용, 비식별화 및 보안 처리 방안을 문서로 제출해주세요.",
                    icon: "shield",
                },
                {
                    title: "데모 영상",
                    required: true,
                    description: "3분 이내의 데모 영상 링크를 제출해주세요.",
                    caption: "YouTube, Vimeo 등 외부 링크 제출 가능",
                    icon: "video",
                },
                {
                    title: "임상 시험 계획서",
                    required: false,
                    description: "해당하는 경우 참고 자료로 추가 제출할 수 있습니다.",
                    icon: "file",
                },
            ],
            notices: [
                "발표 자료는 PDF 형식으로 제출해주세요.",
                "프로젝트 실행 방법은 README.md에 포함해주세요.",
                "제출 링크는 열람 가능한 상태인지 확인해주세요.",
                "영상 링크는 재생 가능 여부를 반드시 확인해주세요.",
            ],
        },
        evaluation: {
            method: "각 팀은 7분 발표 후 전문가 패널 Q&A를 진행합니다.",
            criteria: [
                { title: "의료 문제 적합성", weight: 25 },
                { title: "기술 구현", weight: 20 },
                { title: "데이터 보안 및 윤리", weight: 25 },
                { title: "현장 적용 가능성", weight: 20 },
                { title: "발표력", weight: 10 },
            ],
        },
    },
    {
        id: "5",
        slug: "fintech-disrupt",
        title: "FinTech Disrupt 2026",
        organizer: "카카오페이 x 토스",
        description: "금융의 미래를 재정의하는 핀테크 혁신 솔루션을 개발하세요.",
        longDescription:
            "FinTech Disrupt 2026는 전통 금융 산업을 혁신하는 솔루션을 개발하는 해커톤입니다. 간편결제, 자산관리, 보험, 대출 등 금융의 모든 영역에서 혁신적인 아이디어를 제안하고 프로토타입을 만들어보세요.",
        tags: ["FinTech", "Payments", "Banking", "Crypto"],
        prize: "8000만원",
        prizeAmount: 80000000,
        participants: 215,
        maxParticipants: 400,
        startDate: "2026-06-05",
        endDate: "2026-06-07",
        registrationDeadline: "2026-05-20",
        status: "upcoming",
        mode: "online",
        imageUrl: "/hackathon.jpg",
        submission: {
            items: [
                {
                    title: "프로젝트 소스코드",
                    required: true,
                    description: "서비스 구현 코드와 저장소 링크를 제출해주세요.",
                    icon: "code",
                },
                {
                    title: "서비스 기획서",
                    required: true,
                    description: "문제 정의, 타깃 사용자, 수익 모델을 포함한 기획서를 제출해주세요.",
                    icon: "file",
                },
                {
                    title: "시연 영상",
                    required: true,
                    description: "핵심 기능이 보이는 3분 이내 시연 영상을 제출해주세요.",
                    icon: "video",
                },
            ],
            notices: [
                "금융 데이터 사용 시 출처와 처리 방식을 명시해주세요.",
                "테스트 계정이 필요한 경우 샘플 계정을 함께 제출해주세요.",
                "발표 자료는 PDF 형식으로 제출해주세요.",
            ],
        },
        evaluation: {
            method: "각 팀은 5분 발표와 3분 데모를 포함해 심사를 진행합니다.",
            criteria: [
                { title: "문제 해결력", weight: 20 },
                { title: "비즈니스 가능성", weight: 25 },
                { title: "기술 완성도", weight: 20 },
                { title: "사용자 경험", weight: 20 },
                { title: "발표력", weight: 15 },
            ],
        },
    },
    {
        id: "6",
        slug: "edu-hack-2026",
        title: "EduHack 2026",
        organizer: "교육부 x EdTech 협회",
        description: "교육의 불평등을 해소하는 에듀테크 솔루션을 만드세요.",
        longDescription:
            "EduHack 2026는 교육 접근성과 품질을 향상시키는 기술 솔루션을 개발하는 해커톤입니다. 개인화 학습, AI 튜터, 장애 학생 지원 등 교육의 다양한 문제를 해결해보세요.",
        tags: ["EdTech", "AI", "Mobile", "Accessibility"],
        prize: "2000만원",
        prizeAmount: 20000000,
        participants: 134,
        maxParticipants: 250,
        startDate: "2026-07-15",
        endDate: "2026-07-17",
        registrationDeadline: "2026-07-01",
        status: "upcoming",
        mode: "online",
        imageUrl: "/hackathon.jpg",
        submission: {
            items: [
                {
                    title: "프로젝트 소스코드",
                    required: true,
                    description: "웹 또는 앱 서비스 저장소 링크를 제출해주세요.",
                    icon: "code",
                },
                {
                    title: "데모 영상",
                    required: true,
                    description: "주요 학습 흐름을 보여주는 데모 영상을 제출해주세요.",
                    icon: "video",
                },
                {
                    title: "접근성 고려 문서",
                    required: false,
                    description: "접근성 설계 및 배려 요소를 정리한 문서를 추가 제출할 수 있습니다.",
                    icon: "file",
                },
            ],
            notices: [
                "교육 대상 사용자 시나리오를 README 또는 발표 자료에 포함해주세요.",
                "모바일 앱인 경우 설치 방법을 명확히 안내해주세요.",
                "발표 자료는 PDF 형식으로 제출해주세요.",
            ],
        },
        evaluation: {
            method: "각 팀은 5분 발표 후 심사위원 Q&A를 진행합니다.",
            criteria: [
                { title: "교육 효과성", weight: 30 },
                { title: "접근성", weight: 20 },
                { title: "사용자 경험", weight: 20 },
                { title: "기술 구현", weight: 15 },
                { title: "창의성", weight: 15 },
            ],
        },
    },
    {
        id: "7",
        slug: "cyber-defense-2026",
        title: "Cyber Defense Challenge",
        organizer: "국방부 x 보안뉴스",
        description: "국가 안보를 위협하는 사이버 공격에 대비한 방어 솔루션을 구축하세요.",
        longDescription:
            "Cyber Defense Challenge는 급변하는 사이버 위협 환경에서 국가 인프라를 보호하기 위한 혁신적인 보안 기술을 발굴합니다. 네트워크 보안, 암호화, 취약점 분석 등 보안 전 분야를 다루며, 화이트해커와 개발자들이 협력하여 실제 시나리오를 바탕으로 대응 방안을 제시합니다.",
        tags: ["Security", "Networking", "Encryption", "Cybersecurity"],
        prize: "4000만원",
        prizeAmount: 40000000,
        participants: 112,
        maxParticipants: 150,
        startDate: "2026-08-20",
        endDate: "2026-08-22",
        registrationDeadline: "2026-08-10",
        status: "upcoming",
        mode: "offline",
        imageUrl: "/hackathon.jpg",
        location: "서울 국방컨벤션",
        submission: {
            items: [
                {
                    title: "프로젝트 소스코드",
                    required: true,
                    description: "보안 솔루션 구현 코드와 저장소 링크를 제출해주세요.",
                    icon: "code",
                },
                {
                    title: "위협 모델 문서",
                    required: true,
                    description: "가정한 공격 시나리오와 방어 전략을 문서로 정리해주세요.",
                    icon: "shield",
                },
                {
                    title: "시연 영상",
                    required: true,
                    description: "탐지 또는 방어 흐름을 보여주는 데모 영상을 제출해주세요.",
                    icon: "video",
                },
            ],
            notices: [
                "실행에 필요한 네트워크 환경과 포트를 README에 명시해주세요.",
                "민감한 자격 증명은 저장소에 포함하지 마세요.",
                "발표 자료는 PDF 형식으로 제출해주세요.",
            ],
        },
        evaluation: {
            method: "각 팀은 6분 발표 후 공격 시나리오 기반 질의응답을 진행합니다.",
            criteria: [
                { title: "보안 효과성", weight: 30 },
                { title: "위협 대응 전략", weight: 25 },
                { title: "기술 구현", weight: 20 },
                { title: "실전 적용성", weight: 15 },
                { title: "발표력", weight: 10 },
            ],
        },
    },
    {
        id: "8",
        slug: "mobility-future-sprint",
        title: "Mobility Future Sprint",
        organizer: "현대자동차 x 네이버맵",
        description: "자율주행과 스마트 모빌리티가 가져올 새로운 이동 경험을 설계하세요.",
        longDescription:
            "미래 이동 수단은 단순한 운송을 넘어 삶의 공간이 됩니다. Mobility Future Sprint는 자율주행 API, 실시간 교통 데이터 등을 활용해 더욱 편리하고 안전한 이동 서비스를 개발하는 대회입니다. 도심 항공 모빌리티(UAM)와 목적지 기반 모빌리티(PBV) 시나리오를 환영합니다.",
        tags: ["Mobility", "AutoTech", "Mapping", "C++"],
        prize: "9000만원",
        prizeAmount: 90000000,
        participants: 156,
        maxParticipants: 300,
        startDate: "2026-03-01",
        endDate: "2026-03-03",
        registrationDeadline: "2026-02-15",
        status: "ongoing",
        mode: "hybrid",
        imageUrl: "/hackathon.jpg",
        location: "경기 현대차 연수원",
        submission: {
            items: [
                {
                    title: "프로젝트 소스코드",
                    required: true,
                    description: "서비스 또는 시뮬레이션 코드 저장소를 제출해주세요.",
                    icon: "code",
                },
                {
                    title: "서비스 시나리오 문서",
                    required: true,
                    description: "이동 시나리오, 사용자 흐름, 적용 도시 환경을 설명해주세요.",
                    icon: "file",
                },
                {
                    title: "데모 영상",
                    required: true,
                    description: "핵심 이동 경험이 보이는 3분 이내 영상을 제출해주세요.",
                    icon: "video",
                },
            ],
            notices: [
                "지도 API나 차량 API 사용 시 의존성을 명시해주세요.",
                "시뮬레이션 기반 결과물도 제출 가능합니다.",
                "발표 자료는 PDF 형식으로 제출해주세요.",
            ],
        },
        evaluation: {
            method: "각 팀은 5분 발표와 3분 서비스 시연으로 심사를 진행합니다.",
            criteria: [
                { title: "이동 경험 혁신성", weight: 25 },
                { title: "기술 구현", weight: 25 },
                { title: "안전성", weight: 20 },
                { title: "도시 적용 가능성", weight: 20 },
                { title: "발표 및 데모", weight: 10 },
            ],
        },
    },
    {
        id: "9",
        slug: "space-data-hack",
        title: "Space Data Hackathon",
        organizer: "KARI(항공우주연구원) x NASA API",
        description: "위성 데이터와 우주 정보를 활용해 지구의 난제를 해결해보세요.",
        longDescription:
            "위성에서 보내오는 방대한 데이터를 어떻게 활용할 수 있을까요? Space Data Hackathon은 위성 이미지 처리, 기후 변화 모니터링, 우주 자원 탐사 등 우주 데이터를 기반으로 한 창의적인 웹/앱 서비스를 모집합니다. 참가자들에게는 고해상도 위성 데이터 접근 권한이 제공됩니다.",
        tags: ["Space", "Data Science", "Satellite", "Cloud"],
        prize: "6000만원",
        prizeAmount: 60000000,
        participants: 94,
        maxParticipants: 200,
        startDate: "2026-09-12",
        endDate: "2026-09-14",
        registrationDeadline: "2026-09-01",
        status: "upcoming",
        mode: "online",
        imageUrl: "/hackathon.jpg",
        submission: {
            items: [
                {
                    title: "프로젝트 소스코드",
                    required: true,
                    description: "데이터 처리 및 서비스 구현 코드 저장소를 제출해주세요.",
                    icon: "code",
                },
                {
                    title: "데이터 활용 설명서",
                    required: true,
                    description: "사용한 위성 데이터와 처리 방식을 문서로 설명해주세요.",
                    icon: "file",
                },
                {
                    title: "시연 영상",
                    required: true,
                    description: "데이터 시각화 또는 분석 결과가 보이는 데모 영상을 제출해주세요.",
                    icon: "video",
                },
            ],
            notices: [
                "사용한 공개 데이터셋과 출처를 명시해주세요.",
                "재현 가능한 실행 방법을 README에 작성해주세요.",
                "발표 자료는 PDF 형식으로 제출해주세요.",
            ],
        },
        evaluation: {
            method: "각 팀은 6분 발표 후 데이터 활용 방식 중심의 Q&A를 진행합니다.",
            criteria: [
                { title: "데이터 활용도", weight: 30 },
                { title: "분석 정확성", weight: 20 },
                { title: "문제 해결력", weight: 20 },
                { title: "시각화 및 전달력", weight: 15 },
                { title: "확장 가능성", weight: 15 },
            ],
        },
    },
    {
        id: "10",
        slug: "indie-game-jam-2026",
        title: "K-Indie Game Jam 2026",
        organizer: "넥슨 x 게임물관리위원회",
        description: "48시간 안에 세상을 놀라게 할 인디 게임 프로토타입을 만드세요.",
        longDescription:
            "독창적인 아이디어 하나로 승부하는 K-Indie Game Jam입니다. 장르 제한 없이, 예술성과 게임성이 뛰어난 인디 게임을 개발합니다. 현업 게임 개발자들의 멘토링이 제공되며, 우수작은 실제 퍼블리싱 지원 기회를 얻을 수 있습니다.",
        tags: ["Game", "Unity", "Unreal", "C#"],
        prize: "3000만원",
        prizeAmount: 30000000,
        participants: 250,
        maxParticipants: 250,
        startDate: "2026-01-10",
        endDate: "2026-01-12",
        registrationDeadline: "2026-01-01",
        status: "ended",
        mode: "offline",
        imageUrl: "/hackathon.jpg",
        location: "판교 경기창조경제혁신센터",
        submission: {
            items: [
                {
                    title: "게임 빌드 파일",
                    required: true,
                    description: "실행 가능한 빌드 파일 또는 다운로드 링크를 제출해주세요.",
                    icon: "file",
                },
                {
                    title: "프로젝트 소스코드",
                    required: false,
                    description: "심사용으로 소스코드 저장소를 추가 제출할 수 있습니다.",
                    icon: "code",
                },
                {
                    title: "플레이 영상",
                    required: true,
                    description: "핵심 플레이 장면이 담긴 시연 영상을 제출해주세요.",
                    icon: "video",
                },
            ],
            notices: [
                "실행 환경과 조작 방법을 README에 포함해주세요.",
                "압축 파일 제출 시 실행 파일 위치를 명확히 표시해주세요.",
                "발표 자료는 PDF 형식으로 제출해주세요.",
            ],
        },
        evaluation: {
            method: "각 팀은 5분 플레이 시연 후 3분 질의응답을 진행합니다.",
            criteria: [
                { title: "게임성", weight: 30 },
                { title: "창의성", weight: 25 },
                { title: "완성도", weight: 20 },
                { title: "아트 및 사운드", weight: 15 },
                { title: "발표 및 시연", weight: 10 },
            ],
        },
    },
];