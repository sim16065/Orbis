import { ROLES, RoleId } from "@/data/roles";

interface FilterPopoverProps {
    isOpen: boolean;
    selectedRoles: RoleId[];
    selectedSkills: string[];
    isRecruitingOnly: boolean;
    onToggleRole: (roleId: RoleId) => void;
    onToggleSkill: (skill: string) => void;
    onToggleRecruitingOnly: (checked: boolean) => void;
    onReset: () => void;
}

export function FilterPopover({
    isOpen,
    selectedRoles,
    selectedSkills,
    isRecruitingOnly,
    onToggleRole,
    onToggleSkill,
    onToggleRecruitingOnly,
    onReset
}: FilterPopoverProps) {
    if (!isOpen) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-3 bg-background border border-text/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-200 z-50">
            <div className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* 필수 필터 (좌측) */}
                    <div className="flex-1 space-y-8">
                        {/* 모집 상태 */}
                        <div>
                            <h4 className="text-sm font-bold text-text/50 mb-4 tracking-tight uppercase">상태</h4>
                            <label className="flex items-center gap-3 cursor-pointer w-fit group">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={isRecruitingOnly}
                                    onChange={(e) => onToggleRecruitingOnly(e.target.checked)}
                                />
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isRecruitingOnly
                                    ? 'bg-primary border-primary text-background shadow-sm'
                                    : 'bg-text/5 border-text/20 group-hover:border-primary/50'
                                    }`}>
                                    {isRecruitingOnly && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                                <span className={`text-sm font-bold transition-colors ${isRecruitingOnly ? 'text-text' : 'text-text/70 group-hover:text-text'}`}>
                                    모집중인 팀만 보기
                                </span>
                            </label>
                        </div>

                        {/* 모집 직무 */}
                        <div>
                            <h4 className="text-sm font-bold text-text/50 mb-4 tracking-tight uppercase">포지션</h4>
                            <div className="flex flex-wrap gap-2">
                                {ROLES.map(role => (
                                    <button
                                        key={role.id}
                                        onClick={() => onToggleRole(role.id)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedRoles.includes(role.id)
                                            ? "bg-primary text-background shadow-md shadow-primary/20 hover:-translate-y-0.5"
                                            : "bg-background text-text/60 border border-text/10 hover:border-text/30 hover:bg-text/5"
                                            }`}
                                    >
                                        {role.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 수직 구분선 (PC) */}
                    <div className="hidden lg:block w-px bg-text/5" />

                    {/* 보조 필터 (우측) */}
                    <div className="flex-1">
                        {selectedRoles.length > 0 ? (
                            <div className="animate-in fade-in duration-300 min-h-[140px] p-5 bg-text/5 rounded-2xl border border-text/10 shadow-inner">
                                <div className="flex items-center gap-2 mb-4 text-xs font-bold text-primary">
                                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    선택한 포지션 스킬
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {ROLES.filter(r => selectedRoles.includes(r.id)).flatMap(r => r.defaultSkills || []).filter((skill, index, self) => self.indexOf(skill) === index).map(skill => (
                                        <button
                                            key={skill}
                                            onClick={() => onToggleSkill(skill)}
                                            className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all ${selectedSkills.includes(skill)
                                                ? "bg-primary/20 text-primary border border-primary/50 shadow-sm"
                                                : "bg-background text-text/60 border border-text/10 hover:border-primary/30 hover:text-text/90 shadow-sm"
                                                }`}
                                        >
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="min-h-[140px] p-5 bg-text/5 rounded-2xl border border-text/5 border-dashed flex items-center justify-center flex-col text-center opacity-60">
                                <svg className="w-8 h-8 text-text/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                                <p className="text-xs font-medium text-text/50 leading-relaxed">포지션을 먼저 선택하시면<br />관련 기술 스택이 팝업됩니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 하단 유틸 (초기화) */}
                <div className="flex items-center justify-end pt-5 border-t border-text/5 mt-4">
                    <button
                        onClick={onReset}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-text/40 hover:text-text/80 hover:bg-text/5 transition-colors flex items-center gap-1.5"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        전체 필터 초기화
                    </button>
                </div>
            </div>
        </div>
    );
}
