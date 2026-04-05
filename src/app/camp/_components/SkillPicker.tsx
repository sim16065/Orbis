import React, { useState, useMemo } from "react";

const ALL_SKILLS = [
    "React", "Next.js", "Vue.js", "Svelte", "Angular",
    "TypeScript", "JavaScript", "Python", "Go", "Rust", "Java",
    "Kotlin", "Swift", "Node.js", "FastAPI", "Django", "Spring Boot",
    "Express", "PostgreSQL", "MySQL", "MongoDB", "Redis",
    "Supabase", "Firebase", "Docker", "Kubernetes", "AWS",
    "GCP", "Azure", "LangChain", "OpenAI API", "HuggingFace",
    "PyTorch", "TensorFlow", "Solidity", "Web3.js", "Ethers.js",
    "Hardhat", "Tailwind CSS", "Figma", "GitHub", "Notion",
    "Discord", "Slack", "GraphQL", "REST API", "WebSocket", "gRPC"
];

interface SkillPickerProps {
    selectedSkills: string[];
    onToggleSkill: (skill: string) => void;
    title?: string;
    description?: string;
}

export const SkillPicker: React.FC<SkillPickerProps> = ({
    selectedSkills,
    onToggleSkill,
    title = "보유 기술 스택",
    description = "전체 스택에서 자유롭게 선택하세요"
}) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredSkills = useMemo(() =>
        ALL_SKILLS.filter(s => s.toLowerCase().includes(search.toLowerCase())),
        [search]
    );

    return (
        <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-end justify-between mb-3 px-1">
                <label className="block text-sm font-black text-text/80">{title}</label>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {selectedSkills.map(skill => (
                    <span key={skill} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-text/5 text-primary font-bold text-xs shadow-sm transition-all hover:border-primary/30">
                        {skill}
                        <button 
                            type="button"
                            onClick={() => onToggleSkill(skill)} 
                            className="text-text/20 hover:text-primary transition-colors ml-0.5"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                ))}
            </div>

            <div className="space-y-4">
                {!isPickerOpen ? (
                    <button 
                        type="button"
                        onClick={() => setIsPickerOpen(true)} 
                        className="flex items-center gap-1.5 text-sm text-text/40 hover:text-text/60 font-bold transition-colors ml-1"
                    >
                        <span className="text-lg leading-none">+</span> 스택 목록에서 선택하기
                    </button>
                ) : (
                    <>
                        <button 
                            type="button"
                            onClick={() => setIsPickerOpen(false)} 
                            className="flex items-center gap-1.5 text-sm text-text/40 hover:text-text/60 font-bold mb-1 transition-colors ml-1"
                        >
                            <span className="text-lg leading-none">−</span> 스택 목록 닫기
                        </button>
                        
                        <div className="bg-text/[0.03] border border-text/5 rounded-2xl p-6 animate-in slide-in-from-top-2 duration-300">
                            <div className="relative mb-5">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="스택 검색..."
                                    className="w-full p-4 rounded-xl bg-card border border-text/10 text-sm font-bold focus:outline-none focus:border-primary/50 shadow-sm placeholder-text/20"
                                />
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto no-scrollbar pr-1 overscroll-contain">
                                {filteredSkills.map(skill => {
                                    const isSelected = selectedSkills.includes(skill);
                                    return (
                                        <button
                                            type="button"
                                            key={skill}
                                            onClick={() => onToggleSkill(skill)}
                                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${isSelected
                                                ? 'bg-primary/10 border-primary/30 text-primary shadow-sm'
                                                : 'bg-card border-text/10 text-text/60 hover:border-text/30 hover:bg-text/5'
                                                }`}
                                        >
                                            {skill}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
