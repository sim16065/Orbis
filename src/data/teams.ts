export interface TeamMember {
    id: string;
    name: string;
    role: string;
    skills: string[];
    avatarUrl?: string;
    github?: string;
}

export interface Team {
    id: string;
    name: string;
    hackathonId: string;
    hackathonTitle: string;
    description: string;
    members: TeamMember[];
    maxMembers: number;
    requiredSkills: string[];
    isRecruiting: boolean;
    createdAt: string;
}

export const teams: Team[] = [
    {
        id: "t1",
        name: "Nova Builders",
        hackathonId: "1",
        hackathonTitle: "AI Future Hackathon 2025",
        description:
            "AI를 활용한 의료 진단 보조 솔루션을 개발 중입니다. ML 엔지니어와 백엔드 개발자를 찾고 있어요! 더 길게 한번 만들어볼게요",
        members: [
            {
                id: "m1",
                name: "김민준",
                role: "팀장 / AI 엔지니어",
                skills: ["Python", "TensorFlow", "FastAPI"],
                avatarUrl: "",
                github: "minjun-kim",
            },
            {
                id: "m2",
                name: "이수연",
                role: "프론트엔드 개발자",
                skills: ["React", "TypeScript", "Figma"],
                avatarUrl: "",
                github: "suyeon-lee",
            },
        ],
        maxMembers: 4,
        requiredSkills: ["ML Engineering", "Backend (Python)", "Data Science"],
        isRecruiting: true,
        createdAt: "2025-03-10",
    },
    {
        id: "t2",
        name: "Chain Wizards",
        hackathonId: "2",
        hackathonTitle: "Web3 Builders Challenge",
        description:
            "DeFi 프로토콜 개발팀입니다. Solidity 개발자와 프론트엔드 개발자를 모집 중입니다.",
        members: [
            {
                id: "m3",
                name: "박지훈",
                role: "블록체인 개발자",
                skills: ["Solidity", "Ethereum", "Web3.js"],
                avatarUrl: "",
                github: "jihoon-park",
            },
            {
                id: "m4",
                name: "최예린",
                role: "스마트 컨트랙트",
                skills: ["Solidity", "Hardhat", "OpenZeppelin"],
                avatarUrl: "",
                github: "yerin-choi",
            },
        ],
        maxMembers: 5,
        requiredSkills: ["Solidity", "React/Next.js", "UI/UX Design"],
        isRecruiting: true,
        createdAt: "2025-03-12",
    },
    {
        id: "t3",
        name: "EcoSense",
        hackathonId: "1",
        hackathonTitle: "AI Future Hackathon 2025",
        description:
            "스마트 재활용 분류 AI 시스템을 개발합니다. 풀스택 개발자를 찾습니다!",
        members: [
            {
                id: "m5",
                name: "정다은",
                role: "PM / 기획",
                skills: ["Product Management", "Figma", "Notion"],
                avatarUrl: "",
                github: "",
            },
            {
                id: "m6",
                name: "한승우",
                role: "백엔드 개발자",
                skills: ["Node.js", "PostgreSQL", "Docker"],
                avatarUrl: "",
                github: "seungwoo-han",
            },
            {
                id: "m7",
                name: "윤서진",
                role: "ML 엔지니어",
                skills: ["Python", "PyTorch", "OpenCV"],
                avatarUrl: "",
                github: "seojin-yun",
            },
        ],
        maxMembers: 5,
        requiredSkills: ["Frontend (React)", "Mobile (Flutter or React Native)"],
        isRecruiting: true,
        createdAt: "2025-03-08",
    },
    {
        id: "t4",
        name: "HealthPulse",
        hackathonId: "4",
        hackathonTitle: "Healthcare Innovation Sprint",
        description:
            "환자 모니터링 IoT + AI 플랫폼 개발. 팀 구성 완료, 열정적인 멘토 구함!",
        members: [
            {
                id: "m8",
                name: "송지우",
                role: "iOS 개발자",
                skills: ["Swift", "HealthKit", "CoreML"],
                avatarUrl: "",
                github: "jiwoo-song",
            },
            {
                id: "m9",
                name: "임도현",
                role: "AI 엔지니어",
                skills: ["Python", "Keras", "LSTM"],
                avatarUrl: "",
                github: "dohyun-lim",
            },
            {
                id: "m10",
                name: "강민서",
                role: "백엔드 / DevOps",
                skills: ["Go", "Kubernetes", "AWS"],
                avatarUrl: "",
                github: "minseo-kang",
            },
            {
                id: "m11",
                name: "조하린",
                role: "UX 디자이너",
                skills: ["Figma", "User Research", "Prototyping"],
                avatarUrl: "",
                github: "",
            },
        ],
        maxMembers: 4,
        requiredSkills: [],
        isRecruiting: false,
        createdAt: "2025-03-05",
    },
    {
        id: "t5",
        name: "FinFlow",
        hackathonId: "5",
        hackathonTitle: "FinTech Disrupt 2025",
        description:
            "AI 기반 개인 자산관리 서비스 개발. 경험 있는 백엔드 개발자와 데이터 분석가를 찾습니다.",
        members: [
            {
                id: "m12",
                name: "나현우",
                role: "풀스택 개발자",
                skills: ["Next.js", "Spring Boot", "MySQL"],
                avatarUrl: "",
                github: "hyunwoo-na",
            },
        ],
        maxMembers: 4,
        requiredSkills: ["Backend (Java/Spring)", "Data Analytics", "UI/UX"],
        isRecruiting: true,
        createdAt: "2025-03-14",
    },
    {
        id: "t6",
        name: "LumiLearn",
        hackathonId: "6",
        hackathonTitle: "EduHack 2025",
        description:
            "시각 장애 학생을 위한 AI 학습 도우미 개발. 접근성과 교육에 열정 있는 분 환영!",
        members: [
            {
                id: "m13",
                name: "백지민",
                role: "프론트엔드 개발자",
                skills: ["React", "Accessibility", "TypeScript"],
                avatarUrl: "",
                github: "jimin-baek",
            },
            {
                id: "m14",
                name: "오준혁",
                role: "AI 엔지니어",
                skills: ["Python", "NLP", "TTS/STT"],
                avatarUrl: "",
                github: "junhyeok-oh",
            },
        ],
        maxMembers: 4,
        requiredSkills: ["Mobile Developer", "UX/Accessibility Designer"],
        isRecruiting: true,
        createdAt: "2025-03-11",
    },
];
