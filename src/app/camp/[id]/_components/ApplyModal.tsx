import { useState } from "react";
import { Team } from "@/data/teams";
import { ROLE_LABELS, ROLES, RoleId } from "@/data/roles";

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

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    team: Team;
    onSubmit: () => void;
}

export function ApplyModal({ isOpen, onClose, team, onSubmit }: ApplyModalProps) {
    const [name, setName] = useState("");
    const [intro, setIntro] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("");

    // Tech Stack State
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [isSkillPickerOpen, setIsSkillPickerOpen] = useState(false);
    const [skillSearch, setSkillSearch] = useState("");

    // Links State
    const [links, setLinks] = useState<{ type: string, url: string }[]>([]);
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [draftLink, setDraftLink] = useState({ type: "", url: "" });

    // File Upload State
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    if (!isOpen) return null;

    const toggleSkill = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleRoleSelect = (roleId: string) => {
        setSelectedRole(roleId);
        const roleData = ROLES.find(r => r.id === roleId);

        // 상세 페이지(RequiredRoles)와 로직을 완벽히 일치시킵니다.
        // 1. 팀장이 해당 포지션에 커스텀 스킬을 정했는가?
        // 2. 아니면 해당 직군의 시스템 기본 추천 스킬인가?
        // 3. 그것도 아니면 팀 전체 필수 스킬인가?
        const displaySkills = team.requiredSkillsByRole?.[roleId as RoleId] || roleData?.defaultSkills || team.requiredSkills;

        setSelectedSkills(displaySkills);
    };

    const confirmAddLink = () => {
        if (draftLink.url.trim()) {
            setLinks([...links, { type: draftLink.type.trim() || "Link", url: draftLink.url.trim() }]);
            setDraftLink({ type: "", url: "" });
            setIsAddingLink(false);
        }
    };
    const removeLink = (index: number) => setLinks(links.filter((_, i) => i !== index));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).filter(
                newFile => !files.some(existingFile => existingFile.name === newFile.name)
            );
            setFiles([...files, ...newFiles]);
            e.target.value = ''; // Reset input to allow selecting same file again
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files).filter(
                newFile => !files.some(existingFile => existingFile.name === newFile.name)
            );
            setFiles([...files, ...newFiles]);
        }
    };

    const removeFile = (index: number) => setFiles(files.filter((_, i) => i !== index));
    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const filteredSkills = ALL_SKILLS.filter(s => s.toLowerCase().includes(skillSearch.toLowerCase()));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto w-full h-full">
            <div className="bg-background border border-text/10 w-full max-w-xl rounded-[2rem] p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-auto">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-text/40 hover:text-text transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <h3 className="text-2xl font-bold mb-1 tracking-tight flex items-center gap-2">
                    팀 지원하기
                </h3>
                <p className="text-sm text-text/60 mb-8 font-medium">
                    {team.name}에 지원합니다
                </p>

                <div className="space-y-6 mb-8">
                    {/* 지원 포지션 */}
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">지원 포지션</label>
                        <div className="flex gap-3">
                            {team.requiredRoles.map((roleId, idx) => {
                                const isSelected = selectedRole === roleId;
                                const colors = [
                                    { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
                                    { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
                                    { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' }
                                ];
                                const color = colors[idx % colors.length];

                                return (
                                    <button
                                        key={roleId}
                                        onClick={() => handleRoleSelect(roleId)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-bold text-sm transition-all duration-200 ${isSelected
                                            ? `${color.border} ${color.bg} ${color.text} shadow-sm`
                                            : 'border-text/10 bg-text/5 text-text/60 hover:bg-text/10 hover:text-text/80'
                                            }`}
                                    >
                                        <span className={`w-2 h-2 rounded-full ${isSelected ? color.dot : 'bg-text/30'}`} />
                                        {ROLE_LABELS[roleId as keyof typeof ROLE_LABELS]}
                                        <span className="px-2 py-0.5 rounded bg-text/10 text-xs font-black">1명</span>
                                    </button>
                                );
                            })}
                        </div>
                        {!selectedRole && (
                            <p className="mt-3 text-xs text-text/40 font-medium animate-in fade-in slide-in-from-top-1 duration-300 transition-all">
                                포지션을 선택하면 관련 기술 스택이 자동으로 추천됩니다
                            </p>
                        )}
                    </div>

                    {/* 보유 기술 스택 - 포지션 선택 시에만 표시 */}
                    {selectedRole && (
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
                                            <button onClick={() => toggleSkill(skill)} className="hover:text-black dark:hover:text-white transition-colors">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                {!isSkillPickerOpen ? (
                                    <button onClick={() => setIsSkillPickerOpen(true)} className="flex items-center gap-1.5 text-sm text-text/60 hover:text-text font-medium transition-colors">
                                        <span className="text-lg leading-none tracking-tight">+</span> 전체 스택에서 추가하기
                                    </button>
                                ) : (
                                    <div className="mt-4 pt-4 border-t border-text/10 animate-in slide-in-from-top-2 duration-200">
                                        <button onClick={() => setIsSkillPickerOpen(false)} className="flex items-center gap-1.5 text-sm text-text/60 hover:text-text font-medium mb-3 transition-colors">
                                            <span className="text-lg leading-none tracking-tight">−</span> 전체 스택 접기
                                        </button>
                                        <input
                                            type="text"
                                            value={skillSearch}
                                            onChange={(e) => setSkillSearch(e.target.value)}
                                            placeholder="스택 검색..."
                                            className="w-full p-3 rounded-xl bg-background border border-text/10 text-sm mb-4 focus:outline-none focus:border-primary/50 shadow-inner"
                                        />
                                        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto overscroll-contain pr-2">
                                            {filteredSkills.map(skill => {
                                                const isSelected = selectedSkills.includes(skill);
                                                return (
                                                    <button
                                                        key={skill}
                                                        onClick={() => toggleSkill(skill)}
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
                    )}

                    {/* 자기소개 */}
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">간단 자기소개</label>
                        <textarea
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                            className="w-full h-28 p-4 rounded-xl bg-text/5 border border-text/10 text-text placeholder-text/30 focus:outline-none focus:border-primary/50 resize-none transition-colors text-sm leading-relaxed overscroll-contain"
                            placeholder="간단한 경력, 지원 동기를 적어주세요 (최대 500자)"
                            maxLength={500}
                        />
                        <div className="text-right text-xs text-text/40 mt-1 font-medium">{intro.length}/500</div>
                    </div>

                    {/* 링크 첨부 */}
                    <div>
                        <div className="flex items-end justify-between mb-2">
                            <label className="block text-sm font-bold text-text mb-0">링크 첨부</label>
                        </div>
                        <div className="space-y-3 mb-3">
                            {links.map((link, idx) => (
                                <div key={idx} className="flex gap-2 items-center group/linkrow">
                                    <div className="px-4 py-3.5 rounded-xl bg-text/5 border border-text/10 text-sm font-bold text-text w-32 shrink-0 truncate">
                                        {link.type}
                                    </div>
                                    <div className="relative flex-1">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                        </span>
                                        <div className="w-full p-3.5 pl-10 rounded-xl bg-text/5 border border-text/10 text-sm text-text truncate">
                                            {link.url}
                                        </div>
                                    </div>
                                    <button onClick={() => removeLink(idx)} className="p-3.5 text-text/40 hover:text-red-500 transition-colors shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {isAddingLink ? (
                            <div className="flex gap-2 items-center p-3 rounded-2xl bg-text/5 border border-text/10 mb-3 animate-in fade-in zoom-in-95 duration-200">
                                <input
                                    type="text"
                                    value={draftLink.type}
                                    onChange={(e) => setDraftLink({ ...draftLink, type: e.target.value })}
                                    className="p-3 rounded-xl bg-background border border-text/10 text-sm font-bold text-text focus:outline-none focus:border-primary/50 transition-colors w-32 shrink-0 placeholder-text/30"
                                    placeholder="Github"
                                    autoFocus
                                />
                                <input
                                    type="url"
                                    value={draftLink.url}
                                    onChange={(e) => setDraftLink({ ...draftLink, url: e.target.value })}
                                    className="flex-1 p-3 rounded-xl bg-background border border-text/10 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder-text/30"
                                    placeholder="https://..."
                                    onKeyDown={(e) => e.key === 'Enter' && confirmAddLink()}
                                />
                                <button onClick={confirmAddLink} className="px-4 py-3 rounded-xl font-bold bg-primary/80 text-background hover:bg-primary transition-colors text-sm shrink-0">
                                    추가
                                </button>
                                <button onClick={() => { setIsAddingLink(false); setDraftLink({ type: "", url: "" }); }} className="p-3 text-text/40 hover:text-text transition-colors shrink-0">
                                    <span className="text-xl leading-none">×</span>
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setIsAddingLink(true)} className="flex items-center gap-1.5 text-sm text-text/60 hover:text-text font-medium transition-colors ml-1">
                                <span className="text-lg leading-none w-4 flex justify-center tracking-tight">⊕</span> 링크 추가
                            </button>
                        )}
                    </div>

                    {/* 파일 첨부 */}
                    <div>
                        <div className="flex items-end justify-between mb-2">
                            <label className="block text-sm font-bold text-text mb-0">파일 첨부</label>
                        </div>

                        <div className="space-y-3 mb-3">
                            {files.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-text/5 border border-text/10 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center border border-text/10 shrink-0">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text mb-0.5 tracking-tight">{file.name}</p>
                                            <p className="text-xs text-text/50 font-medium">{formatSize(file.size)}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFile(idx)} className="p-2 text-text/40 hover:text-text transition-colors">
                                        <span className="text-xl leading-none">×</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <label
                            className={`cursor-pointer border-2 border-dashed transition-all duration-200 rounded-xl p-5 flex items-center justify-center gap-2 group w-full text-center ${isDragging
                                ? 'border-primary bg-primary/5 scale-[1.02]'
                                : 'border-text/10 hover:border-text/30 hover:bg-text/[0.02]'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <svg className={`w-5 h-5 transition-colors ${isDragging ? 'text-primary' : 'text-text/40 group-hover:text-text'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            <span className={`text-sm font-bold transition-colors ${isDragging ? 'text-primary' : 'text-text/60 group-hover:text-text'}`}>
                                {isDragging ? '업로드' : '파일 선택 또는 드래그'}
                            </span>
                            <input type="file" multiple onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.zip,.jpg,.png" />
                        </label>
                        <p className="mt-2 text-xs text-text/40 font-medium">PDF, DOC, 이미지, ZIP 파일 지원</p>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 rounded-xl font-bold bg-transparent text-text border border-text/10 hover:bg-text/5 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={() => {
                            alert("지원이 완료되었습니다!");
                            onSubmit();
                        }}
                        className="flex-1 py-4 rounded-xl font-bold bg-primary text-background hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                    >
                        지원 제출
                    </button>
                </div>
            </div>
        </div>
    );
}
