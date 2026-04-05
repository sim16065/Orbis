import { RoleId } from "./roles";

// Users refer to the standalone user.ts data
export interface TeamMember {
    userId: string;
    role: string;
}

export interface Team {
    id: string;
    name: string;
    hackathonId: string;
    hackathonTitle: string;
    description: string;
    members: TeamMember[];
    maxMembers: number;
    requiredRoles: RoleId[];
    requiredSkills: string[];
    // New: Role-specific required skills specified by the team leader
    requiredSkillsByRole?: Partial<Record<RoleId, string[]>>;
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
            "AI를 활용한 의료 진단 보조 솔루션을 개발 중입니다. ML 엔지니어와 백엔드 개발자를 찾고 있어요!",
        members: [
            { userId: "u1", role: "팀장 / AI 엔지니어" },
            { userId: "u2", role: "프론트엔드 개발자" },
        ],
        maxMembers: 4,
        requiredRoles: ["ai", "backend"],
        requiredSkills: ["ML Engineering", "Backend (Python)", "Data Science"],
        requiredSkillsByRole: {
            ai: ["Python", "PyTorch", "TensorFlow"],
            backend: ["Node.js", "Python", "Java"]
        },
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
            { userId: "u3", role: "블록체인 개발자" },
            { userId: "u4", role: "스마트 컨트랙트" },
        ],
        maxMembers: 5,
        requiredRoles: ["blockchain", "frontend", "design"],
        requiredSkills: ["Solidity", "React/Next.js", "UI/UX Design"],
        requiredSkillsByRole: {
            blockchain: ["Solidity", "Web3.js", "Ethereum"],
            frontend: ["React", "Next.js", "Vue"],
            design: ["Figma", "UI/UX", "Branding"]
        },
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
            { userId: "u5", role: "PM / 기획" },
            { userId: "u6", role: "백엔드 개발자" },
            { userId: "u7", role: "ML 엔지니어" },
        ],
        maxMembers: 5,
        requiredRoles: ["frontend", "mobile"],
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
            { userId: "u8", role: "iOS 개발자" },
            { userId: "u9", role: "AI 엔지니어" },
            { userId: "u10", role: "백엔드 / DevOps" },
            { userId: "u11", role: "UX 디자이너" },
        ],
        maxMembers: 4,
        requiredRoles: [],
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
            { userId: "u12", role: "풀스택 개발자" },
        ],
        maxMembers: 4,
        requiredRoles: ["backend", "ai", "design"],
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
            { userId: "u13", role: "프론트엔드 개발자" },
            { userId: "u14", role: "AI 엔지니어" },
        ],
        maxMembers: 4,
        requiredRoles: ["mobile", "design"],
        requiredSkills: ["Mobile Developer", "UX/Accessibility Design"],
        isRecruiting: true,
        createdAt: "2025-03-11",
    },
];
