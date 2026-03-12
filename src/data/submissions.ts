export interface Submission {
    id: string;
    hackathonId: string;
    teamId: string;
    teamName: string;
    projectTitle: string;
    description: string;
    demoUrl?: string;
    repoUrl?: string;
    presentationUrl?: string;
    tags: string[];
    submittedAt: string;
    score?: number;
    rank?: number;
    awards?: string[];
}

export const submissions: Submission[] = [
    {
        id: "s1",
        hackathonId: "3",
        teamId: "eco1",
        teamName: "GreenMinds",
        projectTitle: "EcoScan - AI 재활용 분류 앱",
        description:
            "스마트폰 카메라로 쓰레기를 촬영하면 AI가 분류 방법을 알려주는 앱. 90% 이상의 정확도 달성.",
        demoUrl: "https://ecoscan.demo.com",
        repoUrl: "https://github.com/greenminds/ecoscan",
        tags: ["AI", "Mobile", "Computer Vision", "Sustainability"],
        submittedAt: "2025-02-03T18:30:00",
        score: 94.5,
        rank: 1,
        awards: ["대상 (1천만원)", "ESG 특별상"],
    },
    {
        id: "s2",
        hackathonId: "3",
        teamId: "eco2",
        teamName: "CleanFuture",
        projectTitle: "스마트 탄소 발자국 트래커",
        description:
            "일상 생활 패턴을 분석해 개인 탄소 발자국을 계산하고 절감 방법을 추천하는 서비스.",
        demoUrl: "https://carbontrack.demo.com",
        repoUrl: "https://github.com/cleanfuture/carbontrack",
        tags: ["Data Science", "IoT", "Mobile", "Gamification"],
        submittedAt: "2025-02-03T17:45:00",
        score: 91.2,
        rank: 2,
        awards: ["금상 (5백만원)"],
    },
    {
        id: "s3",
        hackathonId: "3",
        teamId: "eco3",
        teamName: "SolarPunk",
        projectTitle: "커뮤니티 태양광 쉐어링 플랫폼",
        description:
            "아파트 단지 내 태양광 패널의 전력을 주민들이 공유하고 정산하는 블록체인 기반 플랫폼.",
        repoUrl: "https://github.com/solarpunk/solar-share",
        tags: ["Blockchain", "Energy", "Community", "Web3"],
        submittedAt: "2025-02-03T18:00:00",
        score: 88.7,
        rank: 3,
        awards: ["은상 (3백만원)"],
    },
    {
        id: "s4",
        hackathonId: "3",
        teamId: "eco4",
        teamName: "AquaGuard",
        projectTitle: "실시간 수질 모니터링 IoT 시스템",
        description:
            "저비용 IoT 센서로 하천 수질을 실시간 모니터링하고 오염 원인을 분석하는 시스템.",
        repoUrl: "https://github.com/aquaguard/watermon",
        tags: ["IoT", "Sensors", "Data Analytics", "Environment"],
        submittedAt: "2025-02-03T16:30:00",
        score: 85.3,
        rank: 4,
        awards: ["동상 (1백만원)"],
    },
    {
        id: "s5",
        hackathonId: "3",
        teamId: "eco5",
        teamName: "GrowBot",
        projectTitle: "스마트 도시농업 자동화 키트",
        description:
            "AI와 IoT를 결합한 베란다 농업 자동화 키트. 식물 상태를 분석하고 자동으로 물과 영양분을 공급.",
        demoUrl: "https://growbot.demo.com",
        repoUrl: "https://github.com/growbot/urbangrow",
        tags: ["IoT", "AI", "AgriTech", "Hardware"],
        submittedAt: "2025-02-03T17:00:00",
        score: 82.8,
        rank: 5,
    },
];
