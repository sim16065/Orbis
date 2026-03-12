"use client";

import { useState, useMemo } from "react";
import { teams } from "@/data/teams";
import TeamCard from "@/components/team-card";
import { useTeamApplications } from "@/lib/hooks";

const SKILL_FILTERS = ["React", "FastAPI", "Solidity", "Python", "Node.js", "Design", "ML Engineering"];

export default function CampPage() {
    const [search, setSearch] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const { isApplied, applyToTeam } = useTeamApplications();

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const filteredTeams = useMemo(() => {
        return teams.filter(team => {
            const matchesSearch =
                team.name.toLowerCase().includes(search.toLowerCase()) ||
                team.hackathonTitle.toLowerCase().includes(search.toLowerCase()) ||
                team.description.toLowerCase().includes(search.toLowerCase());

            const matchesSkills =
                selectedSkills.length === 0 ||
                selectedSkills.every(s => team.requiredSkills.includes(s) || team.members.some(m => m.skills.includes(s)));

            return matchesSearch && matchesSkills;
        });
    }, [search, selectedSkills]);

    return (
        <div className="min-h-screen px-6 py-12">
            <div className="max-w-7xl mx-auto">
                {/* 헤더 섹션 */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white mb-3">
                            👥 팀 빌딩 캠프
                        </h1>
                        <p className="text-slate-400 text-lg">
                            함께 해커톤에 도전할 최고의 팀원을 찾아보세요.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 rounded-2xl bg-violet-600 text-white font-bold shadow-lg shadow-violet-500/30 hover:bg-violet-500 transition-all">
                            내 팀 만들기
                        </button>
                    </div>
                </div>

                {/* 필터 섹션 */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
                    <div className="lg:col-span-3 space-y-6">
                        <div className="relative">
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="팀 명, 해커톤 명, 프로젝트 설명으로 검색..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 transition-all shadow-sm"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="text-slate-500 text-sm self-center mr-2 font-medium">인기 스택:</span>
                            {SKILL_FILTERS.map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${selectedSkills.includes(skill)
                                            ? "bg-violet-600/20 text-violet-300 border border-violet-500/50"
                                            : "bg-slate-800 text-slate-400 border border-white/5 hover:border-white/20"
                                        }`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-5">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                📢 공지사항
                            </h3>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li className="flex gap-2">
                                    <span className="text-violet-500">•</span>
                                    팀 지원 시 자기소개를 정성껏 작성해주세요.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-violet-500">•</span>
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
                        <div className="col-span-full py-24 text-center">
                            <div className="text-6xl mb-6">🏜️</div>
                            <h3 className="text-xl font-bold text-white mb-2">조건에 맞는 팀이 없습니다.</h3>
                            <p className="text-slate-500">직접 팀을 만들고 멤버를 모집해보는 건 어떨까요?</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
