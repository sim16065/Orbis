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
}

export const SkillPicker: React.FC<SkillPickerProps> = ({ selectedSkills, onToggleSkill }) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredSkills = useMemo(() =>
        ALL_SKILLS.filter(s => s.toLowerCase().includes(search.toLowerCase())),
        [search]
    );

    return (
        <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-end justify-between mb-2">
                <label className="block text-sm font-bold text-text mb-0">보유 기술 스택</label>
                <span className="text-xs font-bold text-primary">{selectedSkills.length}개 선택</span>
            </div>
            <div className="bg-text/5 border border-text/10 rounded-2xl p-5">
                <p className="text-[13px] text-text/60 mb-4 font-medium tracking-tight">해당 포지션 추천 스킬이 자동 선택됐어요. 자유롭게 수정하세요</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSkills.map(skill => (
                        <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/70 text-text/90 font-bold text-sm shadow-sm transition-transform hover:-translate-y-0.5">
                            {skill}
                            <button onClick={() => onToggleSkill(skill)} className="hover:text-black dark:hover:text-white transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </span>
                    ))}
                </div>

                {!isPickerOpen ? (
                    <button onClick={() => setIsPickerOpen(true)} className="flex items-center gap-1.5 text-sm text-text/60 hover:text-text font-medium transition-colors">
                        <span className="text-lg leading-none tracking-tight">+</span> 전체 스택 보기
                    </button>
                ) : (
                    <div className="mt-4 pt-4 border-t border-text/10 animate-in slide-in-from-top-2 duration-200">
                        <button onClick={() => setIsPickerOpen(false)} className="flex items-center gap-1.5 text-sm text-text/60 hover:text-text font-medium mb-3 transition-colors">
                            <span className="text-lg leading-none tracking-tight">−</span> 전체 스택 접기
                        </button>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="스택 검색..."
                            className="w-full p-3 rounded-xl bg-background border border-text/10 text-sm mb-4 focus:outline-none focus:border-primary/50 shadow-inner"
                        />
                        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto overscroll-contain pr-2">
                            {filteredSkills.map(skill => {
                                const isSelected = selectedSkills.includes(skill);
                                return (
                                    <button
                                        key={skill}
                                        onClick={() => onToggleSkill(skill)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 border ${isSelected
                                            ? 'bg-primary/70 border-primary/20 text-text/90 shadow-sm'
                                            : 'bg-background border-text/10 text-text/70 hover:border-text/30 hover:bg-text/5'
                                            }`}
                                    >
                                        {isSelected && <span className="mr-1.5 text-xs text-text/80">✔</span>}
                                        {skill}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
