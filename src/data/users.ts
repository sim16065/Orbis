export interface User {
    id: string;
    name: string;
    skills: string[];
    avatarUrl?: string;
    github?: string;
}

export const users: User[] = [
    {
        id: "u1",
        name: "김민준",
        skills: ["Python", "TensorFlow", "FastAPI"],
        avatarUrl: "https://i.pravatar.cc/150?u=u1",
    },
    {
        id: "u2",
        name: "이수연",
        skills: ["React", "TypeScript", "Figma"],
        avatarUrl: "https://i.pravatar.cc/150?u=u2",
    },
    {
        id: "u3",
        name: "박지훈",
        skills: ["Solidity", "Ethereum", "Web3.js"],
        avatarUrl: "https://i.pravatar.cc/150?u=u3",
    },
    {
        id: "u4",
        name: "최예린",
        skills: ["Solidity", "Hardhat", "OpenZeppelin"],
        avatarUrl: "https://i.pravatar.cc/150?u=u4",
    },
    {
        id: "u5",
        name: "정다은",
        skills: ["Product Management", "Figma", "Notion"],
        avatarUrl: "https://i.pravatar.cc/150?u=u5",
    },
    {
        id: "u6",
        name: "한승우",
        skills: ["Node.js", "PostgreSQL", "Docker"],
        avatarUrl: "https://i.pravatar.cc/150?u=u6",
    },
    {
        id: "u7",
        name: "윤서진",
        skills: ["Python", "PyTorch", "OpenCV"],
        avatarUrl: "https://i.pravatar.cc/150?u=u7",
    },
    {
        id: "u8",
        name: "송지우",
        skills: ["Swift", "HealthKit", "CoreML"],
        avatarUrl: "https://i.pravatar.cc/150?u=u8",
    },
    {
        id: "u9",
        name: "임도현",
        skills: ["Python", "Keras", "LSTM"],
        avatarUrl: "https://i.pravatar.cc/150?u=u9",
    },
    {
        id: "u10",
        name: "강민서",
        skills: ["Go", "Kubernetes", "AWS"],
        avatarUrl: "https://i.pravatar.cc/150?u=u10",
    },
    {
        id: "u11",
        name: "조하린",
        skills: ["Figma", "User Research", "Prototyping"],
        avatarUrl: "https://i.pravatar.cc/150?u=u11",
    },
    {
        id: "u12",
        name: "나현우",
        skills: ["Next.js", "Spring Boot", "MySQL"],
        avatarUrl: "https://i.pravatar.cc/150?u=u12",
    },
    {
        id: "u13",
        name: "백지민",
        skills: ["React", "Accessibility", "TypeScript"],
        avatarUrl: "https://i.pravatar.cc/150?u=u13",
    },
    {
        id: "u14",
        name: "오준혁",
        skills: ["Python", "NLP", "TTS/STT"],
        avatarUrl: "https://i.pravatar.cc/150?u=u14",
    },
    {
        id: "u15",
        name: "강승민",
        skills: ["Java", "Spring Boot", "MySQL"],
        avatarUrl: "https://i.pravatar.cc/150?u=u15",
    }
];
