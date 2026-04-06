import { Check } from "lucide-react";
import { Team } from "@/data/teams";
import { ROLE_LABELS } from "@/data/roles";
import { users } from "@/data/users";

interface MemberSidebarProps {
    team: Team;
    applied: boolean;
    openApplyModal: () => void;
    openInquiryModal: () => void;
}

export function MemberSidebar({ team, applied, openApplyModal, openInquiryModal }: MemberSidebarProps) {
    const leaderUser = team.members.length > 0 ? users.find(u => u.id === team.members[0].userId) : null;
    const teamMembers = team.members.slice(1).map(member => ({
        ...member,
        user: users.find(u => u.id === member.userId)
    }));

    return (
        <div className="sticky top-24 space-y-6">
            {/* Status Box */}
            <div className="bg-card border border-text/10 rounded-2xl p-6">
                <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-text text-sm">팀원 현황</span>
                    <span className="font-black text-text text-sm">{team.members.length} / {team.maxMembers}명</span>
                </div>

                <div className="w-full bg-text/5 h-3 rounded-full overflow-hidden mb-2 shadow-inner">
                    <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(team.members.length / team.maxMembers) * 100}%` }}
                    />
                </div>
                <span className="text-text/40 text-[10px] font-bold block mb-6">{Math.round((team.members.length / team.maxMembers) * 100)}% 달성</span>

                <div className="flex flex-wrap gap-1.5 mb-6">
                    {team.requiredRoles.map((r) => (
                        <span key={r} className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-text/5 text-text/60 border border-text/5">
                            {ROLE_LABELS[r]}
                        </span>
                    ))}
                </div>

                {team.isRecruiting ? (
                    <button
                        onClick={openApplyModal}
                        disabled={applied}
                        className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex justify-center items-center gap-2 mb-3
                        ${applied
                                ? 'bg-text/5 text-text/50 border border-text/10 cursor-not-allowed'
                                : 'bg-primary text-background hover:opacity-90 shadow-lg shadow-primary/20'
                            }
                        `}
                    >
                        {applied ? '지원 완료' : '지원하기'}
                    </button>
                ) : (
                    <button
                        disabled
                        className="w-full py-3.5 rounded-xl font-bold bg-text/5 text-text/40 border border-text/10 cursor-not-allowed mb-3"
                    >
                        모집이 종료된 팀입니다
                    </button>
                )}

                <button
                    onClick={openInquiryModal}
                    className="w-full py-3.5 rounded-xl font-bold bg-transparent text-text/70 border border-text/15 hover:bg-text/5 flex items-center justify-center gap-2 transition-colors text-sm"
                >
                    문의하기
                </button>
            </div>

            {/* Team Member Box */}
            <div className="bg-card border border-text/10 rounded-2xl p-6">
                <h3 className="font-extrabold text-sm text-text/60 mb-5">팀장</h3>
                {team.members.length > 0 && leaderUser && (
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-text font-bold text-lg shadow-sm flex-shrink-0 overflow-hidden">
                            {leaderUser.avatarUrl ? (
                                <img src={leaderUser.avatarUrl} alt={leaderUser.name} className="w-full h-full object-cover" />
                            ) : (
                                leaderUser.name.charAt(0)
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-extrabold text-text">{leaderUser.name}</span>
                                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black rounded-full border border-amber-500/20">팀장</span>
                            </div>
                            <p className="text-xs text-text/60 mb-3 font-medium">{team.members[0].role}</p>
                        </div>
                    </div>
                )}

                <h3 className="font-extrabold text-sm text-text/60 mb-4 pt-5 border-t border-text/5">현재 팀원</h3>
                <div className="space-y-4">
                    {teamMembers.map((member) => (
                        <div key={member.userId} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-text font-bold text-sm shadow-sm flex-shrink-0 overflow-hidden">
                                {member.user?.avatarUrl ? (
                                    <img src={member.user.avatarUrl} alt={member.user.name} className="w-full h-full object-cover" />
                                ) : (
                                    member.user?.name.charAt(0)
                                )}
                            </div>
                            <div>
                                <span className="font-extrabold text-sm block text-text">{member.user?.name}</span>
                                <span className="text-xs text-text/50 font-medium">{member.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-card border border-text/10 rounded-2xl p-6">
                <h3 className="font-extrabold text-sm text-text/60 mb-6">타임라인</h3>
                <div className="relative border-l-2 border-text/5 ml-3 space-y-6 pb-2">
                    {(() => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0); // Zero out for exact date comparison
                        let activeFound = false;

                        return team.timeline.map((event, idx) => {
                            const eventDate = new Date(event.date);
                            eventDate.setHours(0, 0, 0, 0);

                            const isPast = eventDate < today;
                            const isToday = eventDate.getTime() === today.getTime();

                            // Format YYYY-MM-DD to M/D
                            const dateLabel = `${eventDate.getMonth() + 1}/${eventDate.getDate()}`;

                            let status: 'past' | 'active' | 'pending' = 'pending';

                            if (isPast) {
                                status = 'past';
                            } else if (!activeFound) {
                                status = 'active';
                                activeFound = true;
                            }

                            return (
                                <div key={idx} className="relative pl-6">
                                    {status === 'past' ? (
                                        <>
                                            <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1 border-2 border-background" />
                                            <div className="flex justify-between items-start opacity-60">
                                                <div>
                                                    <p className="text-sm font-extrabold text-text/80">{event.task}</p>
                                                    <p className="text-[10px] font-bold text-text/40 mt-1">{dateLabel}</p>
                                                </div>
                                                <Check className="w-4 h-4 text-emerald-500" />
                                            </div>
                                        </>
                                    ) : status === 'active' ? (
                                        <>
                                            <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-[7px] top-1.5 border-2 border-background shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse" />
                                            <div>
                                                <p className="text-sm font-black text-text">{event.task}</p>
                                                <p className="text-[10px] font-black text-text/40">{dateLabel}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="absolute w-3 h-3 bg-background rounded-full -left-[7px] top-1.5 border-2 border-text/20" />
                                            <p className="text-sm font-bold text-text">{event.task}</p>
                                            <p className="text-[10px] font-black text-text/40">{dateLabel}</p>
                                        </>
                                    )}
                                </div>
                            );
                        });
                    })()}
                </div>
            </div>
        </div>
    );
}
