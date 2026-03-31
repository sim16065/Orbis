"use client";

import { useState, useMemo } from "react";
import { teams } from "@/data/teams";
import TeamCard from "@/components/team-card";
import { useTeamApplications } from "@/lib/hooks";
import { hackathons } from "@/data/hackathons";

const ROLES = [
    { label: "프론트엔드", keywords: ["frontend", "react", "vue"] },
    { label: "백엔드", keywords: ["backend", "node", "python", "java", "go", "spring"] },
    { label: "모바일", keywords: ["mobile", "ios", "android", "flutter", "swift"] },
    { label: "디자이너", keywords: ["design", "ux", "ui"] },
    { label: "기획자", keywords: ["pm", "product", "manager"] },
    { label: "AI/ML", keywords: ["ml", "ai", "data", "deep"] },
    { label: "블록체인", keywords: ["solidity", "blockchain", "web3"] },
];

export default function CampPage() {
    const [search, setSearch] = useState("");
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [selectedHackathon, setSelectedHackathon] = useState("all");
    const { isApplied, applyToTeam } = useTeamApplications();

    const toggleRole = (roleLabel: string) => {
        setSelectedRoles(prev =>
            prev.includes(roleLabel) ? prev.filter(r => r !== roleLabel) : [...prev, roleLabel]
        );
    };

    const filteredTeams = useMemo(() => {
        return teams.filter(team => {
            const matchesSearch =
                team.name.toLowerCase().includes(search.toLowerCase()) ||
                team.hackathonTitle.toLowerCase().includes(search.toLowerCase()) ||
                team.description.toLowerCase().includes(search.toLowerCase());

            const matchesRoles =
                selectedRoles.length === 0 ||
                selectedRoles.some(roleLabel => {
                    const roleKeywords = ROLES.find(r => r.label === roleLabel)?.keywords || [];
                    // 요구 스킬이나 멤버 스킬 중 하나라도 롤 키워드에 매칭되면 통과 (OR 로직)
                    return team.requiredSkills.some(rs => roleKeywords.some(k => rs.toLowerCase().includes(k))) ||
                        team.members.some(m => m.skills.some(ms => roleKeywords.some(k => ms.toLowerCase().includes(k))));
                });

            const matchesHackathon =
                selectedHackathon === "all" || team.hackathonId === selectedHackathon;

            return matchesSearch && matchesRoles && matchesHackathon;
        });
    }, [search, selectedRoles, selectedHackathon]);

    return (
        <div className="min-h-screen px-6 py-12 bg-background text-text transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* 헤더 섹션 */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-text mb-3 tracking-tight">
                            👥 팀 빌딩 캠프
                        </h1>
                        <p className="text-text/60 text-lg">
                            함께 해커톤에 도전할 최고의 팀원을 찾아보세요.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 rounded-2xl bg-primary text-background font-bold shadow-lg shadow-primary/30 hover:opacity-90 hover:-translate-y-0.5 transition-all">
                            내 팀 만들기
                        </button>
                    </div>
                </div>

                {/* 필터 섹션 */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1 max-w-2xl">
                                <svg
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text/50"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="팀 명, 프로젝트 설명으로 빠르고 쉽게 검색..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-text/5 border border-text/10 text-text placeholder-text/50 focus:outline-none focus:border-primary/50 transition-all shadow-sm text-sm"
                                />
                            </div>

                            <select
                                value={selectedHackathon}
                                onChange={(e) => setSelectedHackathon(e.target.value)}
                                className="w-full sm:w-56 px-4 py-3 rounded-xl bg-text/5 border border-text/10 text-text focus:outline-none focus:border-primary/50 transition-all shadow-sm cursor-pointer appearance-none font-medium text-sm"
                                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1em" }}
                            >
                                <option value="all" className="bg-background text-text">전체 해커톤 검색</option>
                                {hackathons.filter(h => h.status === 'ongoing' || h.status === 'upcoming').map(h => (
                                    <option key={h.id} value={h.id} className="bg-background text-text">
                                        {h.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="text-text/60 text-sm self-center mr-2 font-medium tracking-tight">모집 직무:</span>
                            {ROLES.map(role => (
                                <button
                                    key={role.label}
                                    onClick={() => toggleRole(role.label)}
                                    className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${selectedRoles.includes(role.label)
                                        ? "bg-primary/20 text-primary border border-primary/50 shadow-sm"
                                        : "bg-text/5 text-text/60 border border-text/10 hover:border-text/30 hover:bg-text/10"
                                        }`}
                                >
                                    {role.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="bg-text/[0.03] border border-text/10 rounded-2xl p-5">
                            <h3 className="text-text font-bold mb-4 flex items-center gap-2">
                                📢 공지사항
                            </h3>
                            <ul className="space-y-3 text-sm text-text/60">
                                <li className="flex gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    팀 지원 시 자기소개를 정성껏 작성해주세요.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    부적절한 홍보 게시물은 삭제될 수 있습니다.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 팀 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeams.length > 0 ? (
                        filteredTeams.map((team) => (
                            <TeamCard
                                key={team.id}
                                team={team}
                                isApplied={isApplied(team.id)}
                                onApply={applyToTeam}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center border-2 border-dashed border-text/10 rounded-3xl mt-4 flex flex-col items-center">
                            <img src="/camp.png" alt="Empty Camp" className="w-24 h-24 object-contain mb-6" />
                            <h3 className="text-xl font-bold text-text/90 mb-2">조건에 맞는 팀이 없습니다.</h3>
                            <p className="text-text/60 font-medium">직접 팀을 만들고 멤버를 모집해보는 건 어떨까요?</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
