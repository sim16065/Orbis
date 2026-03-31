"use client";

import { Team } from "@/data/teams";
import { Button } from "@/components/ui";
import Link from "next/link";

interface TeamCardProps {
    team: Team;
    isApplied?: boolean;
    onApply?: (teamId: string) => void;
}

const avatarColors = [
    "from-violet-500 to-purple-600",
    "from-indigo-500 to-blue-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
];

export default function TeamCard({
    team,
    isApplied = false,
    onApply,
}: TeamCardProps) {
    const openSlots = team.maxMembers - team.members.length;

    return (
        <Link
            href={`/camp/${team.id}`}
            className="block bg-text/[0.02] border border-text/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group"
        >
            {/* 헤더 */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-text font-bold text-lg leading-tight">{team.name}</h3>
                    </div>
                    <p className="text-xs text-primary font-bold mt-1.5 opacity-90">
                        🏆 {team.hackathonTitle}
                    </p>
                </div>
                <div className="text-right flex flex-col items-end">
                    {team.isRecruiting ? (
                        <span className="flex items-center gap-1.5 mb-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                                모집중
                            </span>
                        </span>
                    ) : (
                        <span className="text-[10px] text-text/40 font-bold mb-1.5 bg-text/5 px-2 py-0.5 rounded-full border border-text/10">
                            모집완료
                        </span>
                    )}
                    <p className="text-text font-black text-lg">
                        {team.members.length}
                        <span className="text-text/50 font-medium text-sm ml-0.5">
                            /{team.maxMembers}
                        </span>
                    </p>
                </div>
            </div>

            {/* 설명 */}
            <p className="text-text/70 text-sm mb-4 leading-relaxed line-clamp-2">
                {team.description}
            </p>

            {/* 현재 팀원 */}
            <div className="mb-4">
                <p className="text-xs text-text/50 mb-2 font-medium">현재 팀원</p>
                <div className="flex -space-x-2">
                    {team.members.map((member, idx) => (
                        <div
                            key={member.id}
                            className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]
                                } border-2 border-background flex items-center justify-center text-white text-xs font-bold shadow-md relative z-10`}
                            title={`${member.name} - ${member.role}`}
                        >
                            {member.name.charAt(0)}
                        </div>
                    ))}
                    {/* 빈 슬롯 표시 */}
                    {Array.from({ length: Math.min(openSlots, 3) }).map((_, i) => (
                        <div
                            key={`empty-${i}`}
                            className="w-9 h-9 rounded-full border-2 border-dashed border-text/20 flex items-center justify-center bg-text/[0.03] relative z-0"
                        >
                            <svg
                                className="w-3.5 h-3.5 text-text/30"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>

            {/* 필요 스킬 */}
            {team.requiredSkills.length > 0 && (
                <div className="mb-4">
                    <p className="text-xs text-text/50 mb-2 font-medium">
                        🔍 찾고 있는 직무/스킬
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {team.requiredSkills.slice(0, 3).map((skill) => (
                            <span key={skill} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                                {skill}
                            </span>
                        ))}
                        {team.requiredSkills.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-text/5 text-text/60 border border-text/10">+{team.requiredSkills.length - 3}</span>
                        )}
                    </div>
                </div>
            )}

            {/* 팀원 역할 목록 */}
            <div className="mb-4 space-y-1.5">
                {team.members.slice(0, 2).map((member) => (
                    <div
                        key={member.id}
                        className="flex items-center gap-2 text-xs text-text/60"
                    >
                        <span className="text-text/30">•</span>
                        <span className="font-bold text-text/90">{member.name}</span>
                        <span className="text-text/50">{member.role}</span>
                    </div>
                ))}
                {team.members.length > 2 && (
                    <p className="text-xs text-text/40 pt-1">
                        외 {team.members.length - 2}명
                    </p>
                )}
            </div>

            {/* 하단 액션 */}
            <div className="flex items-center justify-between pt-4 border-t border-text/10 mt-2">
                <p className="text-xs text-text/50 font-medium">
                    {openSlots > 0 ? `${openSlots}명 모집 중` : "팀원 모집 완료"}
                </p>
                {team.isRecruiting ? (
                    <div className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center ${isApplied
                        ? "bg-text/5 text-text/50 border border-text/5"
                        : "bg-primary text-background shadow-md shadow-primary/20 group-hover:bg-primary/90"
                        }`}>
                        {isApplied ? "✓ 지원 완료" : "상세보기 및 지원"}
                    </div>
                ) : (
                    <div className="px-4 py-1.5 text-xs font-bold rounded-lg bg-text/5 text-text/40 border border-text/5 flex items-center justify-center">
                        모집 종료
                    </div>
                )}
            </div>
        </Link>
    );
}
