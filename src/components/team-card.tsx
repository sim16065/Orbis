import Link from "next/link";
import { Team } from "@/data/teams";
import { users } from "@/data/users";
import { ROLE_LABELS } from "@/data/roles";

interface TeamCardProps {
    team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
    const openSlots = team.maxMembers - team.members.length;

    // Resolve user data for avatars
    const teamMembersWithUsers = team.members.map(m => users.find(u => u.id === m.userId)).filter(u => u !== undefined);

    return (
        <Link
            href={`/camp/${team.id}`}
            className="block h-full bg-card border border-text/10 rounded-[2rem] p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-md group"
        >
            {/* 헤더 */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                    <h3 className="text-xl font-black text-text mb-2 tracking-tight">
                        {team.name}
                    </h3>
                    <p className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md inline-block border border-primary/20 line-clamp-1">
                        {team.hackathonTitle}
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

            {/* 본문 요약 */}
            <p className="text-text/70 text-sm leading-relaxed mb-6 line-clamp-2 min-h-[40px]">
                {team.description}
            </p>

            {/* 현재 멤버 프로필 사진 미리보기 */}
            <div className="flex items-center gap-3 mb-5">
                <div className="flex -space-x-2">
                    {teamMembersWithUsers.map((user, idx) => (
                        <div
                            key={user!.id || idx}
                            className="w-8 h-8 rounded-full bg-text/10 border-2 border-background flex items-center justify-center shadow-sm"
                        >
                            {user!.avatarUrl ? (
                                <img src={user!.avatarUrl} alt={user!.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-[10px] font-bold text-text/60">
                                    {user!.name.charAt(0)}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 필요 스킬 */}
            <div className="mb-4">
                <div className="flex flex-wrap gap-1.5 min-h-[22px]">
                    {team.requiredRoles.length > 0 && (
                        <>
                            {team.requiredRoles.slice(0, 3).map((roleId, idx) => (
                                <span key={`${roleId}-${idx}`} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                                    {ROLE_LABELS[roleId]}
                                </span>
                            ))}
                            {team.requiredRoles.length > 3 && (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-text/5 text-text/60 border border-text/10">+{team.requiredRoles.length - 3}</span>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* 하단 액션 */}
            <div className="flex items-center justify-between pt-4 border-t border-text/10 mt-2">
                <p className="text-xs text-text/50 font-medium">
                    {openSlots > 0 ? `${openSlots}명 모집 중` : "팀원 모집 완료"}
                </p>
                <div className="flex -space-x-1">
                    {team.requiredSkills.slice(0, 3).map((skill, i) => (
                        <div
                            key={i}
                            className="group/skill relative w-6 h-6 rounded border-2 border-background flex items-center justify-center text-[8px] font-black bg-text/5 text-text/60 shadow-sm"
                        >
                            {skill.substring(0, 1).toUpperCase()}
                            <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 translate-y-1 pointer-events-none group-hover/skill:opacity-100 group-hover/skill:translate-y-0 transition-all duration-150 whitespace-nowrap z-10 font-bold shadow-lg">
                                {skill}
                            </div>
                        </div>
                    ))}
                    {team.requiredSkills.length > 3 && (
                        <div className="w-6 h-6 rounded border-2 border-background flex items-center justify-center text-[8px] font-black bg-text/10 text-text/70 shadow-sm">
                            +
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
