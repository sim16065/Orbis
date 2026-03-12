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
    difficulty: "beginner" | "intermediate" | "advanced";
    mode: "online" | "offline" | "hybrid";
    imageUrl: string;
    location?: string;
}

export const hackathons: Hackathon[] = [
    {
        id: "1",
        slug: "ai-future-2025",
        title: "AI Future Hackathon 2025",
        organizer: "TechCorp Korea",
        description: "AI와 머신러닝을 활용한 미래 혁신 솔루션을 만들어 보세요.",
        longDescription:
            "AI Future Hackathon 2025는 인공지능 기술로 사회 문제를 해결하는 혁신적인 솔루션을 발굴하는 대회입니다. 의료, 교육, 환경 등 다양한 분야에서 AI를 활용한 프로젝트를 개발하고 전문가 심사위원들의 평가를 받아보세요. 팀 구성부터 최종 발표까지 48시간 동안 진행되는 강렬한 해킹 경험을 제공합니다.",
        tags: ["AI", "Machine Learning", "Deep Learning", "Python"],
        prize: "1억원",
        prizeAmount: 100000000,
        participants: 342,
        maxParticipants: 500,
        startDate: "2025-04-15",
        endDate: "2025-04-17",
        registrationDeadline: "2025-04-01",
        status: "upcoming",
        difficulty: "intermediate",
        mode: "hybrid",
        imageUrl: "/images/hackathon-ai.jpg",
        location: "서울 코엑스",
    },
    {
        id: "2",
        slug: "web3-builders-2025",
        title: "Web3 Builders Challenge",
        organizer: "BlockChain Foundation",
        description: "블록체인과 Web3 기술로 탈중앙화 미래를 설계하세요.",
        longDescription:
            "Web3 Builders Challenge는 블록체인 기술을 활용한 혁신적인 dApp을 개발하는 해커톤입니다. DeFi, NFT, DAO 등 Web3의 다양한 분야에서 솔루션을 구축해보세요. Ethereum, Solana, Polygon 등 다양한 체인을 지원하며, 멘토들의 기술 지원과 함께 진행됩니다.",
        tags: ["Blockchain", "Web3", "Solidity", "DeFi", "NFT"],
        prize: "5천만원",
        prizeAmount: 50000000,
        participants: 178,
        maxParticipants: 300,
        startDate: "2025-03-20",
        endDate: "2025-03-22",
        registrationDeadline: "2025-03-10",
        status: "ongoing",
        difficulty: "advanced",
        mode: "online",
        imageUrl: "/images/hackathon-web3.jpg",
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
        prize: "3천만원",
        prizeAmount: 30000000,
        participants: 256,
        maxParticipants: 256,
        startDate: "2025-02-01",
        endDate: "2025-02-03",
        registrationDeadline: "2025-01-20",
        status: "ended",
        difficulty: "beginner",
        mode: "offline",
        imageUrl: "/images/hackathon-green.jpg",
        location: "부산 벡스코",
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
        prize: "7천만원",
        prizeAmount: 70000000,
        participants: 89,
        maxParticipants: 200,
        startDate: "2025-05-10",
        endDate: "2025-05-12",
        registrationDeadline: "2025-04-25",
        status: "upcoming",
        difficulty: "intermediate",
        mode: "hybrid",
        imageUrl: "/images/hackathon-health.jpg",
        location: "서울 강남",
    },
    {
        id: "5",
        slug: "fintech-disrupt",
        title: "FinTech Disrupt 2025",
        organizer: "카카오페이 x 토스",
        description: "금융의 미래를 재정의하는 핀테크 혁신 솔루션을 개발하세요.",
        longDescription:
            "FinTech Disrupt 2025는 전통 금융 산업을 혁신하는 솔루션을 개발하는 해커톤입니다. 간편결제, 자산관리, 보험, 대출 등 금융의 모든 영역에서 혁신적인 아이디어를 제안하고 프로토타입을 만들어보세요.",
        tags: ["FinTech", "Payments", "Banking", "Crypto"],
        prize: "8천만원",
        prizeAmount: 80000000,
        participants: 215,
        maxParticipants: 400,
        startDate: "2025-06-05",
        endDate: "2025-06-07",
        registrationDeadline: "2025-05-20",
        status: "upcoming",
        difficulty: "advanced",
        mode: "online",
        imageUrl: "/images/hackathon-fintech.jpg",
    },
    {
        id: "6",
        slug: "edu-hack-2025",
        title: "EduHack 2025",
        organizer: "교육부 x EdTech 협회",
        description: "교육의 불평등을 해소하는 에듀테크 솔루션을 만드세요.",
        longDescription:
            "EduHack 2025는 교육 접근성과 품질을 향상시키는 기술 솔루션을 개발하는 해커톤입니다. 개인화 학습, AI 튜터, 장애 학생 지원 등 교육의 다양한 문제를 해결해보세요.",
        tags: ["EdTech", "AI", "Mobile", "Accessibility"],
        prize: "2천만원",
        prizeAmount: 20000000,
        participants: 134,
        maxParticipants: 250,
        startDate: "2025-07-15",
        endDate: "2025-07-17",
        registrationDeadline: "2025-07-01",
        status: "upcoming",
        difficulty: "beginner",
        mode: "online",
        imageUrl: "/images/hackathon-edu.jpg",
    },
];
