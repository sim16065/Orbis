"use client";

import { Team } from "@/data/teams";
import { Button, Badge } from "@/components/ui";

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
        <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10">
            {/* 헤더 */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold text-lg">{team.name}</h3>
                        {team.isRecruiting ? (
                            <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs text-emerald-400 font-medium">
                                    모집중
                                </span>
                            </span>
                        ) : (
                            <span className="text-xs text-slate-500 font-medium">
                                모집완료
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-violet-400 font-medium">
                        🏆 {team.hackathonTitle}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-500 mb-0.5">팀원</p>
                    <p className="text-white font-bold text-lg">
                        {team.members.length}
                        <span className="text-slate-500 text-sm font-normal">
                            /{team.maxMembers}
                        </span>
                    </p>
                </div>
            </div>

            {/* 설명 */}
            <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                {team.description}
            </p>

            {/* 현재 팀원 */}
            <div className="mb-4">
                <p className="text-xs text-slate-500 mb-2 font-medium">현재 팀원</p>
                <div className="flex -space-x-2">
                    {team.members.map((member, idx) => (
                        <div
                            key={member.id}
                            className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]
                                } border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold shadow-md`}
                            title={`${member.name} - ${member.role}`}
                        >
                            {member.name.charAt(0)}
                        </div>
                    ))}
                    {/* 빈 슬롯 표시 */}
                    {Array.from({ length: Math.min(openSlots, 3) }).map((_, i) => (
                        <div
                            key={`empty-${i}`}
                            className="w-9 h-9 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5"
                        >
                            <svg
                                className="w-3.5 h-3.5 text-white/30"
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
                    <p className="text-xs text-slate-500 mb-2 font-medium">
                        🔍 찾고 있는 스킬
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {team.requiredSkills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="violet">
                                {skill}
                            </Badge>
                        ))}
                        {team.requiredSkills.length > 3 && (
                            <Badge variant="slate">+{team.requiredSkills.length - 3}</Badge>
                        )}
                    </div>
                </div>
            )}

            {/* 팀원 역할 목록 */}
            <div className="mb-4 space-y-1.5">
                {team.members.slice(0, 2).map((member) => (
                    <div
                        key={member.id}
                        className="flex items-center gap-2 text-xs text-slate-400"
                    >
                        <span className="text-slate-600">•</span>
                        <span className="font-medium text-slate-300">{member.name}</span>
                        <span className="text-slate-500">{member.role}</span>
                    </div>
                ))}
                {team.members.length > 2 && (
                    <p className="text-xs text-slate-600">
                        외 {team.members.length - 2}명
                    </p>
                )}
            </div>

            {/* 하단 액션 */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <p className="text-xs text-slate-500">
                    {openSlots > 0 ? `${openSlots}명 모집 중` : "팀원 모집 완료"}
                </p>
                {team.isRecruiting ? (
                    <Button
                        variant={isApplied ? "ghost" : "primary"}
                        size="sm"
                        onClick={() => onApply?.(team.id)}
                        disabled={isApplied}
                    >
                        {isApplied ? "✓ 지원완료" : "팀 합류 신청"}
                    </Button>
                ) : (
                    <Button variant="ghost" size="sm" disabled>
                        모집 종료
                    </Button>
                )}
            </div>
        </div>
    );
}
