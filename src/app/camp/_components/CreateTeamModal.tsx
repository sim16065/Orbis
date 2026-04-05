import { useEffect, useRef, useState, useMemo } from "react";
import { Hackathon } from "@/data/hackathons";
import { SkillPicker } from "./SkillPicker";
import { ROLES, RoleId } from "@/data/roles";

interface CreateTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    hackathons: Hackathon[];
    onSubmit: (data: any) => void;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
    isOpen,
    onClose,
    hackathons,
    onSubmit
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        hackathonId: "",
        teamName: "",
        intro: "",
        communicationMethod: "",
        tools: [] as string[],
        // Step 2
        leaderRole: "" as RoleId | "",
        leaderSkills: [] as string[],
        links: [{ label: "", url: "" }] as { label: string; url: string }[],
        // Step 3
        positions: [
            { id: 1, role: "" as RoleId | "", count: 1, skills: [] as string[] }
        ],
        // Step 4
        problem: "",
        solution: "",
        features: [""],
        // Step 5
        timeline: [
            { date: "", task: "팀 모집 시작" },
            { date: "", task: "해커톤 시작" },
            { date: "", task: "최종 제출" }
        ] as { date: string; task: string }[]
    });

    const COLLAB_TOOLS = [
        "GitHub", "GitLab", "Notion", "Jira", "Linear",
        "Slack", "Discord", "Figma", "Confluence", "Trello"
    ];

    // ESC Key support & Body Scroll Lock
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStep(1);
            setFormData({
                hackathonId: "",
                teamName: "",
                intro: "",
                communicationMethod: "",
                tools: [],
                leaderRole: "",
                leaderSkills: [],
                links: [{ label: "", url: "" }],
                positions: [{ id: 1, role: "" as RoleId | "", count: 1, skills: [] }],
                problem: "",
                solution: "",
                features: [""],
                timeline: [
                    { date: "", task: "팀 모집 시작" },
                    { date: "", task: "해커톤 시작" },
                    { date: "", task: "최종 제출" }
                ]
            });
        }, 300);
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 5) {
            setStep(step + 1);
        } else {
            onSubmit(formData);
            handleClose();
        }
    };

    const handleBack = () => {
        setStep(Math.max(1, step - 1));
    };

    const addPosition = () => {
        setFormData(prev => ({
            ...prev,
            positions: [
                ...prev.positions,
                { id: Date.now(), role: "" as RoleId | "", count: 1, skills: [] as string[] }
            ]
        }));
    };

    const removePosition = (id: number) => {
        if (formData.positions.length <= 1) return;
        setFormData(prev => ({
            ...prev,
            positions: prev.positions.filter(p => p.id !== id)
        }));
    };

    const updatePosition = (id: number, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            positions: prev.positions.map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
    };

    const togglePositionSkill = (posId: number, skill: string) => {
        setFormData(prev => ({
            ...prev,
            positions: prev.positions.map(p => {
                if (p.id !== posId) return p;
                const newSkills = p.skills.includes(skill)
                    ? p.skills.filter(s => s !== skill)
                    : [...p.skills, skill];
                return { ...p, skills: newSkills };
            })
        }));
    };

    const toggleSkill = (skill: string) => {
        setFormData(prev => ({
            ...prev,
            leaderSkills: prev.leaderSkills.includes(skill)
                ? prev.leaderSkills.filter(s => s !== skill)
                : [...prev.leaderSkills, skill]
        }));
    };

    const toggleTool = (tool: string) => {
        setFormData(prev => ({
            ...prev,
            tools: prev.tools.includes(tool)
                ? prev.tools.filter(t => t !== tool)
                : [...prev.tools, tool]
        }));
    };

    const handleRoleChange = (roleId: RoleId) => {
        setFormData(prev => ({
            ...prev,
            leaderRole: roleId
        }));
    };

    const addLink = () => {
        setFormData({
            ...formData,
            links: [...formData.links, { label: "", url: "" }]
        });
    };

    const removeLink = (index: number) => {
        setFormData(prev => ({
            ...prev,
            links: prev.links.filter((_, i) => i !== index)
        }));
    };

    const updateLink = (index: number, field: "label" | "url", value: string) => {
        const newLinks = [...formData.links];
        (newLinks[index] as any)[field] = value;
        setFormData({ ...formData, links: newLinks });
    };

    // Feature Management
    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const removeFeature = (index: number) => {
        if (formData.features.length <= 1) return;
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    // Timeline Management
    const addTimelineRow = () => {
        setFormData(prev => ({
            ...prev,
            timeline: [...prev.timeline, { date: "", task: "" }]
        }));
    };

    const updateTimeline = (index: number, field: "date" | "task", value: string) => {
        const newTimeline = [...formData.timeline];
        (newTimeline[index] as any)[field] = value;
        setFormData(prev => ({ ...prev, timeline: newTimeline }));
    };

    const removeTimelineRow = (index: number) => {
        if (formData.timeline.length <= 1) return;
        setFormData(prev => ({
            ...prev,
            timeline: prev.timeline.filter((_, i) => i !== index)
        }));
    };

    const isNextDisabled = useMemo(() => {
        if (step === 1) {
            return !formData.hackathonId || !formData.teamName.trim() || !formData.intro.trim();
        }
        if (step === 2) {
            return !formData.leaderRole;
        }
        if (step === 3) {
            return formData.positions.some(pos => !pos.role);
        }
        return false;
    }, [step, formData]);

    if (!isOpen) return null;

    const selectedHackathon = hackathons.find(h => h.id === formData.hackathonId);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={handleClose}
            />

            {/* Modal Body */}
            <div
                ref={modalRef}
                className="relative w-full max-w-3xl bg-card text-text rounded-[2rem] shadow-2xl animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] flex flex-col overflow-hidden"
                role="dialog"
                aria-modal="true"
            >
                {/* Header Section */}
                <div className="p-8 pb-4 border-b border-text/5 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-text">팀 모집글 작성</h2>
                        <p className="text-sm text-text/40 font-bold mt-1">
                            {step === 1 ? "기본 정보" : step === 2 ? "팀장 정보" : step === 3 ? "모집 포지션" : step === 4 ? "프로젝트 아이디어" : "타임라인"} ({step}/5)
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-text/30 hover:text-text transition-colors p-1"
                        aria-label="닫기"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Fixed Progress Bar Section */}
                <div className="px-8 pt-6 pb-2 flex gap-2 border-b border-text/5 bg-card">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div
                            key={s}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${s <= step ? "bg-primary/70" : "bg-text/5"
                                }`}
                        />
                    ))}
                </div>

                <form onSubmit={handleNext} className="flex-1 overflow-y-auto no-scrollbar overscroll-contain">
                    {step === 1 && (
                        <div className="p-8 pb-4 flex flex-col gap-8 animate-in slide-in-from-right-4 duration-300">
                            {/* Hackathon Selection */}
                            <div>
                                <label className="block text-sm font-black text-text/80 mb-3">해커톤 선택 <span className="text-red-400">*</span></label>
                                <div className="relative">
                                    <select
                                        required
                                        value={formData.hackathonId}
                                        onChange={(e) => setFormData({ ...formData, hackathonId: e.target.value })}
                                        className="w-full px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer text-sm placeholder-text/20 font-bold font-bold"
                                    >
                                        <option value="" disabled className="bg-card">해커톤을 선택하세요</option>
                                        {hackathons
                                            .filter(h => h.status !== "ended")
                                            .map((h) => (
                                                <option key={h.id} value={h.id} className="bg-card">
                                                    {h.title}
                                                </option>
                                            ))}
                                    </select>
                                    <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Team Name */}
                            <div>
                                <label className="block text-sm font-black text-text/80 mb-3">팀명 <span className="text-red-400">*</span></label>
                                <input
                                    required
                                    type="text"
                                    placeholder="팀 이름을 입력하세요"
                                    value={formData.teamName}
                                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                    className="w-full px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text placeholder-text/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-bold"
                                />
                            </div>

                            {/* Team Intro */}
                            <div className="relative">
                                <label className="block text-sm font-black text-text/80 mb-3">팀 소개 <span className="text-red-400">*</span></label>
                                <textarea
                                    required
                                    placeholder="팀의 목표, 분위기, 원하는 팀원 스타일 등을 자유롭게 소개해주세요"
                                    value={formData.intro}
                                    onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                                    className="w-full h-36 px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text placeholder-text/20 focus:outline-none focus:border-primary/50 resize-none transition-all leading-relaxed text-sm font-bold"
                                    maxLength={500}
                                />
                                <div className="absolute right-4 bottom-4 text-[10px] text-text/30 font-bold">{formData.intro.length}/500</div>
                            </div>

                            {/* Communication Method */}
                            <div>
                                <label className="block text-sm font-black text-text/80 mb-3">소통 방식</label>
                                <textarea
                                    placeholder="예: Discord 데일리 스크럼, Notion 문서화, GitHub PR 코드 리뷰"
                                    value={formData.communicationMethod || ""}
                                    onChange={(e) => setFormData({ ...formData, communicationMethod: e.target.value })}
                                    className="w-full h-24 px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text placeholder-text/20 focus:outline-none focus:border-primary/50 resize-none transition-all leading-relaxed text-sm font-bold"
                                />
                            </div>

                            {/* Collaboration Tools */}
                            <div className="space-y-4">
                                <label className="block text-sm font-black text-text/80">협업 도구</label>
                                <div className="flex flex-wrap gap-2">
                                    {COLLAB_TOOLS.map(tool => (
                                        <button
                                            key={tool}
                                            type="button"
                                            onClick={() => toggleTool(tool)}
                                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${formData.tools.includes(tool)
                                                ? "bg-primary/10 border-primary/30 text-primary"
                                                : "bg-text/[0.03] border-transparent text-text/40 hover:bg-text/5"
                                                }`}
                                        >
                                            {tool}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="p-8 pb-4 flex flex-col gap-8 animate-in slide-in-from-right-4 duration-300">
                            {/* Info Box */}
                            <div className="bg-text/[0.02] border border-text/5 rounded-2xl p-4 flex gap-3 text-sm font-bold text-text/50">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>팀장(본인) 정보를 입력해주세요. 팀 상세 페이지에 표시됩니다.</p>
                            </div>

                            {/* Role Dropdown */}
                            <div>
                                <label className="block text-sm font-black text-text/80 mb-3">역할 <span className="text-red-400">*</span></label>
                                <div className="relative">
                                    <select
                                        required
                                        value={formData.leaderRole}
                                        onChange={(e) => handleRoleChange(e.target.value as RoleId)}
                                        className="w-full px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer text-sm font-bold placeholder-text/20"
                                    >
                                        <option value="" disabled className="bg-card">역할을 선택하세요</option>
                                        {ROLES.map((r) => (
                                            <option key={r.id} value={r.id} className="bg-card">
                                                {r.label}
                                            </option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Tech Stack Picker */}
                            <SkillPicker
                                selectedSkills={formData.leaderSkills}
                                onToggleSkill={toggleSkill}
                            />

                            {/* Links Section */}
                            <div className="space-y-4">
                                <label className="block text-sm font-black text-text/80 mb-1 ml-1">링크 (GitHub, 포트폴리오, SNS 등)</label>
                                {formData.links.map((link, idx) => (
                                    <div key={idx} className="flex gap-3 items-center animate-in fade-in slide-in-from-top-1">
                                        <input
                                            type="text"
                                            placeholder="링크 이름"
                                            value={link.label}
                                            onChange={(e) => updateLink(idx, "label", e.target.value)}
                                            className="w-32 px-4 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text placeholder-text/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-bold text-center"
                                        />
                                        <input
                                            type="url"
                                            placeholder="https://..."
                                            value={link.url}
                                            onChange={(e) => updateLink(idx, "url", e.target.value)}
                                            className="flex-1 px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text placeholder-text/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-bold"
                                        />
                                        {formData.links.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeLink(idx)}
                                                className="p-2 text-text/20 hover:text-red-400/60 transition-colors"
                                                aria-label="링크 삭제"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addLink}
                                    className="text-sm font-bold text-text/40 hover:text-text/60 transition-colors flex items-center gap-1.5 ml-1"
                                >
                                    <span className="text-xl leading-none">+</span> 링크 추가
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="p-8 pb-4 flex flex-col gap-8 animate-in slide-in-from-right-4 duration-300">
                            {/* Info Box */}
                            <div className="bg-text/[0.02] border border-text/5 rounded-2xl p-4 flex gap-3 text-sm font-bold text-text/50">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>모집할 포지션을 추가하고, 각 포지션에서 필요한 기술 스택을 선택하세요.</p>
                            </div>

                            <div className="space-y-6">
                                {formData.positions.map((pos, idx) => (
                                    <div key={pos.id} className="relative bg-text/[0.02] border border-text/5 rounded-3xl p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-black text-text/80">포지션 {idx + 1}</h3>
                                            {formData.positions.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removePosition(pos.id)}
                                                    className="text-text/30 hover:text-red-400/60 transition-colors p-1"
                                                    aria-label="포지션 삭제"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-black text-text/40 mb-3 uppercase tracking-wider">역할명 <span className="text-red-400">*</span></label>
                                                <div className="relative">
                                                    <select
                                                        required
                                                        value={pos.role}
                                                        onChange={(e) => updatePosition(pos.id, 'role', e.target.value as RoleId)}
                                                        className="w-full px-5 py-4 rounded-xl bg-card border border-text/5 text-text focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer text-sm font-bold"
                                                    >
                                                        <option value="" disabled>포지션 선택</option>
                                                        {ROLES.map((r) => (
                                                            <option key={r.id} value={r.id}>{r.label}</option>
                                                        ))}
                                                    </select>
                                                    <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="md:col-span-1">
                                                <label className="block text-xs font-black text-text/40 mb-3 uppercase tracking-wider">모집 인원</label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={10}
                                                    value={pos.count}
                                                    onChange={(e) => updatePosition(pos.id, 'count', Math.max(1, parseInt(e.target.value) || 1))}
                                                    className="w-full px-5 py-4 rounded-xl bg-card border border-text/5 text-text focus:outline-none focus:border-primary/50 transition-all text-sm font-bold"
                                                />
                                            </div>
                                        </div>

                                        <SkillPicker
                                            title="필요 기술 스택"
                                            description="해당 포지션 지원자에게 요구하는 기술들을 선택해주세요"
                                            selectedSkills={pos.skills}
                                            onToggleSkill={(skill) => togglePositionSkill(pos.id, skill)}
                                        />
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addPosition}
                                    className="w-full py-8 border-2 border-dashed border-text/10 rounded-3xl text-text/30 hover:text-text/50 hover:bg-text/[0.02] hover:border-text/20 transition-all flex flex-col items-center justify-center gap-2 group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-text/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="text-2xl font-light">+</span>
                                    </div>
                                    <span className="text-sm font-black uppercase tracking-widest">포지션 추가</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="p-8 pb-4 flex flex-col gap-8 animate-in slide-in-from-right-4 duration-300">
                            {/* Problem */}
                            <div className="space-y-3">
                                <label className="block text-sm font-black text-text/80">해결하려는 문제</label>
                                <textarea
                                    placeholder="어떤 문제를 해결하려 하나요? 현재 상황의 불편함이나 한계를 설명해주세요."
                                    value={formData.problem}
                                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                                    className="w-full h-32 px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text placeholder-text/20 focus:outline-none focus:border-primary/50 resize-none transition-all leading-relaxed text-sm font-bold"
                                />
                            </div>

                            {/* Solution */}
                            <div className="space-y-3">
                                <label className="block text-sm font-black text-text/80">솔루션</label>
                                <textarea
                                    placeholder="어떤 방식으로 문제를 해결할 건가요? 핵심 아이디어를 설명해주세요."
                                    value={formData.solution}
                                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                    className="w-full h-32 px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text placeholder-text/20 focus:outline-none focus:border-primary/50 resize-none transition-all leading-relaxed text-sm font-bold"
                                />
                            </div>

                            {/* Key Features */}
                            <div className="space-y-4">
                                <label className="block text-sm font-black text-text/80">핵심 기능</label>
                                <div className="space-y-3">
                                    {formData.features.map((feature, idx) => (
                                        <div key={idx} className="flex gap-4 items-center animate-in fade-in slide-in-from-top-1">
                                            <span className="text-xs font-black text-text/20 w-4">{idx + 1}.</span>
                                            <input
                                                type="text"
                                                placeholder={`핵심 기능 ${idx + 1}`}
                                                value={feature}
                                                onChange={(e) => updateFeature(idx, e.target.value)}
                                                className="flex-1 px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text placeholder-text/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-bold"
                                            />
                                            {formData.features.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(idx)}
                                                    className="p-2 text-text/20 hover:text-red-400/60 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="text-sm font-bold text-text/40 hover:text-text/60 transition-colors flex items-center gap-1.5 ml-8"
                                >
                                    <span className="text-xl leading-none">+</span> 기능 추가
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="p-8 pb-4 flex flex-col gap-8 animate-in slide-in-from-right-4 duration-300">
                            {/* Info Box */}
                            <div className="bg-text/[0.02] border border-text/5 rounded-2xl p-4 flex gap-3 text-sm font-bold text-text/50">
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>팀 모집부터 해커톤 제출까지의 일정을 입력해주세요.</p>
                            </div>

                            {/* Timeline Rows */}
                            <div className="space-y-3">
                                {formData.timeline.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-center animate-in fade-in slide-in-from-left-2 transition-all">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                        <input
                                            type="date"
                                            value={item.date}
                                            onChange={(e) => updateTimeline(idx, "date", e.target.value)}
                                            onClick={(e) => (e.target as any).showPicker?.()}
                                            className="w-36 px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text focus:outline-none focus:border-primary/50 transition-all text-xs font-bold cursor-pointer text-center [&::-webkit-calendar-picker-indicator]:hidden"
                                        />
                                        <input
                                            type="text"
                                            placeholder="일정 내용"
                                            value={item.task}
                                            onChange={(e) => updateTimeline(idx, "task", e.target.value)}
                                            className="flex-1 px-5 py-4 rounded-xl bg-text/[0.03] border border-text/5 text-text placeholder-text/20 focus:outline-none focus:border-primary/50 transition-all text-sm font-bold"
                                        />
                                        {formData.timeline.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTimelineRow(idx)}
                                                className="p-2 text-text/20 hover:text-red-400/60 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addTimelineRow}
                                    className="text-sm font-bold text-text/40 hover:text-text/60 transition-colors flex items-center gap-1.5 ml-5 mt-2"
                                >
                                    <span className="text-xl leading-none">+</span> 일정 추가
                                </button>
                            </div>

                            {/* Summary Box */}
                            <div className="mt-12">
                                <h3 className="text-sm font-black text-text/80 uppercase tracking-widest ml-1 mb-4">작성 내용 요약</h3>
                                <div className="bg-text/[0.02] border border-text/5 rounded-[2rem] p-8 space-y-4">
                                    <div className="flex gap-12 items-start text-sm font-bold">
                                        <span className="w-20 text-text/30 shrink-0">팀명</span>
                                        <span className="text-text/80">{formData.teamName || "—"}</span>
                                    </div>
                                    <div className="flex gap-12 items-start text-sm font-bold">
                                        <span className="w-20 text-text/30 shrink-0">해커톤</span>
                                        <span className="text-text/80">{selectedHackathon?.title || "—"}</span>
                                    </div>
                                    <div className="flex gap-12 items-start text-sm font-bold">
                                        <span className="w-20 text-text/30 shrink-0">팀장</span>
                                        <span className="text-text/80">{formData.leaderRole ? `본인 (${ROLES.find(r => r.id === formData.leaderRole)?.label || ""})` : "—"}</span>
                                    </div>
                                    <div className="flex gap-12 items-start text-sm font-bold">
                                        <span className="w-20 text-text/30 shrink-0">모집 포지션</span>
                                        <span className="text-text/80">
                                            {formData.positions.filter(p => p.role).map(p => ROLES.find(r => r.id === p.role)?.label).join(", ") || "—"}
                                        </span>
                                    </div>
                                    <div className="flex gap-12 items-start text-sm font-bold">
                                        <span className="w-20 text-text/30 shrink-0">기술 스택</span>
                                        <span className="text-text/80 break-words flex-1">
                                            {Array.from(new Set(formData.positions.flatMap(p => p.skills))).join(", ") || "—"}
                                        </span>
                                    </div>
                                    <div className="flex gap-12 items-start text-sm font-bold">
                                        <span className="w-20 text-text/30 shrink-0">협업 도구</span>
                                        <span className="text-text/80 break-words flex-1">
                                            {formData.tools.join(", ") || "—"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer Buttons Section */}
                    <div className="p-8 pt-0 mt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={step === 1 ? handleClose : handleBack}
                            className="px-8 py-4 rounded-xl font-black bg-transparent text-text border border-text/10 hover:bg-text/5 transition-colors text-sm min-w-[120px]"
                        >
                            {step === 1 ? "취소" : "이전"}
                        </button>
                        <div className="flex-1" />
                        <button
                            type="submit"
                            disabled={isNextDisabled}
                            className={`px-10 py-4 rounded-xl font-black bg-primary text-background transition-all text-sm min-w-[120px] shadow-lg shadow-primary/20 ${isNextDisabled
                                ? "opacity-30 cursor-not-allowed grayscale"
                                : "hover:opacity-90 active:scale-95"
                                }`}
                        >
                            {step === 5 ? "작성 완료" : "다음"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
