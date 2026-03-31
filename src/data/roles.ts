export type RoleId = "frontend" | "backend" | "design" | "planning" | "ai" | "mobile" | "blockchain";

export const ROLE_LABELS: Record<RoleId, string> = {
    frontend: "프론트엔드",
    backend: "백엔드",
    design: "디자이너",
    planning: "기획자",
    ai: "AI/ML",
    mobile: "모바일",
    blockchain: "블록체인"
};

export const ROLES: { id: RoleId; label: string; defaultSkills: string[] }[] = [
    { id: "frontend", label: "프론트엔드", defaultSkills: ["React", "Next.js", "Vue", "TypeScript"] },
    { id: "backend", label: "백엔드", defaultSkills: ["Node.js", "Python", "Java", "Spring Boot", "Go"] },
    { id: "mobile", label: "모바일", defaultSkills: ["iOS", "Android", "Flutter", "React Native", "Swift"] },
    { id: "design", label: "디자이너", defaultSkills: ["Figma", "UI/UX", "Branding", "Prototyping"] },
    { id: "planning", label: "기획자", defaultSkills: ["Product Management", "Notion", "Agile", "PM"] },
    { id: "ai", label: "AI/ML", defaultSkills: ["Python", "PyTorch", "TensorFlow", "LLM", "CV"] },
    { id: "blockchain", label: "블록체인", defaultSkills: ["Solidity", "Web3.js", "Ethereum", "Hardhat"] }
];
