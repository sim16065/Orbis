"use client";

import { useState, useRef, useEffect } from "react";
import { Team } from "@/data/teams";
import { TeamCard } from "@/components/team-card";
import { hackathons } from "@/data/hackathons";
import { ROLES } from "@/data/roles";
import { FilterPopover } from "@/components/filter-popover";
import { CreateTeamModal } from "./_components/CreateTeamModal";
import { useCampTeams } from "./_hooks/useCampTeams";

/**
 * Senior Refactor: CampPage
 * Centralizes state in `useCampTeams` hook.
 * Simplifies JSX for better readability.
 */
export default function CampPage() {
    // 1. Core Logic & State (Custom Hook)
    const { state, actions } = useCampTeams();

    // 2. UI-only States
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // 3. Effect: Handle outside click for filter popover
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };

        if (isFilterOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isFilterOpen]);

    // 4. Action Handlers
    const handleAddTeam = (data: any) => {
        const selectedHack = hackathons.find(h => h.id === data.hackathonId);
        const leaderRole = ROLES.find(r => r.id === data.leaderRole)?.label || "개발자";

        const newTeam: Team = {
            id: Date.now().toString(),
            name: data.teamName,
            hackathonId: data.hackathonId,
            hackathonTitle: selectedHack?.title || "해커톤",
            description: data.intro,
            members: [
                { userId: "u_me", role: `팀장 / ${leaderRole}` }
            ],
            maxMembers: data.positions.reduce((acc: number, p: any) => acc + p.count, 0) + 1,
            requiredRoles: data.positions.map((p: any) => p.role).filter(Boolean),
            requiredSkills: Array.from(new Set(data.positions.flatMap((p: any) => p.skills))),
            requiredSkillsByRole: data.positions.reduce((acc: any, p: any) => {
                if (p.role) acc[p.role] = p.skills;
                return acc;
            }, {}),
            problem: data.problem,
            solution: data.solution,
            keyFeatures: data.keyFeatures,
            timeline: data.timeline,
            communication: data.communicationMethod,
            isRecruiting: true,
            createdAt: new Date().toISOString().split('T')[0]
        };

        actions.addTeam(newTeam);
        setIsCreateModalOpen(false);
        alert("🎉 새로운 팀이 성공적으로 창설되었습니다!");
    };

    return (
        <div className="min-h-screen px-6 py-12 bg-background text-text transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* 헤더 섹션 */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-text mb-3 tracking-tight">
                            👥 팀 찾기
                        </h1>
                        <p className="text-text/60 text-lg">
                            함께 해커톤에 도전할 최고의 팀원을 찾아보세요.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-6 py-3 rounded-2xl bg-primary text-background font-bold shadow-lg shadow-primary/30 hover:opacity-90 hover:-translate-y-0.5 transition-all"
                    >
                        팀 만들기
                    </button>
                </header>

                {/* 필터 & 검색 섹션 */}
                <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
                    <div className="lg:col-span-3 space-y-6">
                        <div className="relative" ref={filterRef}>
                            <div className="flex flex-col sm:flex-row gap-3 relative z-30">
                                {/* 검색 입력 */}
                                <div className="relative flex-1 max-w-2xl">
                                    <SearchIcon />
                                    <input
                                        type="text"
                                        placeholder="팀 명, 프로젝트 설명으로 빠르고 쉽게 검색..."
                                        value={state.search}
                                        onChange={(e) => actions.setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-text/5 border border-text/10 text-text placeholder-text/50 focus:outline-none focus:border-primary/50 transition-all shadow-sm text-sm"
                                    />
                                </div>

                                {/* Hackathon Select */}
                                <select
                                    value={state.selectedHackathon}
                                    onChange={(e) => actions.setSelectedHackathon(e.target.value)}
                                    className="w-full sm:w-56 px-4 py-3 rounded-xl bg-text/5 border border-text/10 text-text focus:outline-none focus:border-primary/50 transition-all shadow-sm cursor-pointer appearance-none font-medium text-sm"
                                    style={{
                                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "right 1rem center",
                                        backgroundSize: "1em"
                                    }}
                                >
                                    <option value="all">전체 해커톤 검색</option>
                                    {hackathons.filter(h => h.status !== 'ended').map(h => (
                                        <option key={h.id} value={h.id}>{h.title}</option>
                                    ))}
                                </select>

                                {/* Filter Toggle Button */}
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className={`px-5 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 font-bold text-sm h-full ${state.activeFilterCount > 0
                                        ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 shadow-sm"
                                        : "bg-text/5 text-text border-text/10 hover:bg-text/10"
                                        }`}
                                >
                                    <FilterIcon />
                                    <span className="hidden sm:inline">필터</span>
                                    {state.activeFilterCount > 0 && <FilterBadge count={state.activeFilterCount} />}
                                </button>
                            </div>

                            <FilterPopover
                                isOpen={isFilterOpen}
                                selectedRoles={state.selectedRoles}
                                selectedSkills={state.selectedSkills}
                                isRecruitingOnly={state.isRecruitingOnly}
                                onToggleRole={actions.toggleRole}
                                onToggleSkill={actions.toggleSkill}
                                onToggleRecruitingOnly={actions.setIsRecruitingOnly}
                                onReset={actions.resetFilters}
                            />
                        </div>
                    </div>

                    {/* Announcement Aside */}
                    <div className="hidden lg:block">
                        <AnnouncementBox />
                    </div>
                </section>

                {/* 팀 그리드 */}
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.filteredTeams.length > 0 ? (
                        state.filteredTeams.map((team: Team) => (
                            <TeamCard key={team.id} team={team} />
                        ))
                    ) : (
                        <EmptyState />
                    )}
                </main>
            </div>

            <CreateTeamModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                hackathons={hackathons}
                onSubmit={handleAddTeam}
            />
        </div>
    );
}

// --- Icons & Small Utils ---

const SearchIcon = () => (
    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const FilterIcon = () => (
    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const FilterBadge = ({ count }: { count: number }) => (
    <span className="w-4 h-4 rounded-full bg-primary text-background flex items-center justify-center text-[10px] ml-1 shadow-sm font-black">
        {count}
    </span>
);

const AnnouncementBox = () => (
    <div className="bg-text/[0.03] border border-text/10 rounded-2xl p-5">
        <h3 className="text-text font-bold mb-4 flex items-center gap-2">📢 공지사항</h3>
        <ul className="space-y-3 text-sm text-text/60">
            <li className="flex gap-2"><span className="text-primary font-bold">•</span> 팀 지원 시 자기소개를 정성껏 작성해주세요.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span> 부적절한 홍보 게시물은 삭제될 수 있습니다.</li>
        </ul>
    </div>
);

const EmptyState = () => (
    <div className="col-span-full py-24 text-center border-2 border-dashed border-text/10 rounded-3xl mt-4 flex flex-col items-center">
        <img src="/camp.png" alt="Empty" className="w-24 h-24 object-contain mb-6 opacity-30" />
        <h3 className="text-xl font-bold text-text/90 mb-2">조건에 맞는 팀이 없습니다.</h3>
        <p className="text-text/60 font-medium">직접 팀을 만들고 멤버를 모집해보는 건 어떨까요?</p>
    </div>
);
