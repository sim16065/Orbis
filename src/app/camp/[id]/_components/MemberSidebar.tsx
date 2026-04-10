import { Check } from "lucide-react";
import { Team } from "@/data/teams";
import { RoleId, ROLE_LABELS } from "@/data/roles";
import { users } from "@/data/users";
import { useMemo } from "react";

// --- Types ---
type TimelineStatus = 'past' | 'active' | 'pending';

interface MemberSidebarProps {
    team: Team;
    applied: boolean;
    openApplyModal: () => void;
    openInquiryModal: () => void;
}

// --- Sub-components ---

/**
 * Recruitment Status Card with progress bar and actions
 */
const StatusCard = ({ team, applied, onApply, onInquiry }: { team: Team, applied: boolean, onApply: () => void, onInquiry: () => void }) => {
    const progress = Math.round((team.members.length / team.maxMembers) * 100);
    const isFull = team.members.length >= team.maxMembers;

    return (
        <div className="bg-card border border-text/10 rounded-2xl p-6">
            <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-text text-sm">팀원 현황</span>
                <span className="font-black text-text text-sm">{team.members.length} / {team.maxMembers}명</span>
            </div>

            <div className="w-full bg-text/5 h-3 rounded-full overflow-hidden mb-2 shadow-inner">
                <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className="text-text/40 text-[10px] font-bold block mb-6">{progress}% 달성</span>

            <div className="flex flex-wrap gap-1.5 mb-6">
                {team.requiredRoles.map((r: RoleId) => (
                    <span key={r} className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-text/5 text-text/60 border border-text/5">
                        {ROLE_LABELS[r]}
                    </span>
                ))}
            </div>

            <div className="space-y-3">
                {team.isRecruiting && !isFull ? (
                    <button
                        onClick={onApply}
                        disabled={applied}
                        className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex justify-center items-center gap-2
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
                        className="w-full py-3.5 rounded-xl font-bold bg-text/5 text-text/40 border border-text/10 cursor-not-allowed"
                    >
                        {isFull ? '모집 정원 초과' : '모집 종료'}
                    </button>
                )}

                <button
                    onClick={onInquiry}
                    className="w-full py-3.5 rounded-xl font-bold bg-transparent text-text/70 border border-text/15 hover:bg-text/5 flex items-center justify-center gap-2 transition-colors text-sm"
                >
                    문의하기
                </button>
            </div>
        </div>
    );
};

/*
 * Individual Member Item for list
 */
const MemberItem = ({ userId, role, userMap, isLeader = false }: { userId: string, role: string, userMap: Map<string, any>, isLeader?: boolean }) => {
    const user = userMap.get(userId);
    if (!user) return null;

    return (
        <div className="flex items-center gap-4">
            <div className={`rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-text font-bold shadow-sm flex-shrink-0 overflow-hidden ${isLeader ? 'w-12 h-12 text-lg' : 'w-10 h-10 text-sm'}`}>
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                    user.name.charAt(0)
                )}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className={`font-extrabold text-text ${isLeader ? 'text-base' : 'text-sm'}`}>{user.name}</span>
                    {isLeader && (
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black rounded-full border border-amber-500/20">팀장</span>
                    )}
                </div>
                <p className="text-xs text-text/50 font-medium">{role}</p>
            </div>
        </div>
    );
};

/**
 * Visual Timeline Entry
 */
const TimelineItem = ({ task, date, status }: { task: string, date: string, status: TimelineStatus }) => {
    const dateObj = new Date(date);
    const dateLabel = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;

    const styles = {
        past: {
            dot: "bg-emerald-500 border-2 border-background",
            container: "opacity-60",
            title: "font-extrabold text-text/80",
            icon: <Check className="w-4 h-4 text-emerald-500" />
        },
        active: {
            dot: "bg-amber-500 border-2 border-background shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse",
            container: "",
            title: "font-black text-text",
            icon: null
        },
        pending: {
            dot: "bg-background border-2 border-text/20",
            container: "opacity-40",
            title: "font-bold text-text",
            icon: null
        }
    };

    const currentStyle = styles[status];

    return (
        <div className="relative pl-6">
            <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-1.5 ${currentStyle.dot}`} />
            <div className={`flex justify-between items-start ${currentStyle.container}`}>
                <div>
                    <p className={`text-sm ${currentStyle.title}`}>{task}</p>
                    <p className="text-[10px] font-black text-text/40 mt-1">{dateLabel}</p>
                </div>
                {currentStyle.icon}
            </div>
        </div>
    );
};

// --- Main Component ---

export function MemberSidebar({ team, applied, openApplyModal, openInquiryModal }: MemberSidebarProps) {
    const userMap = useMemo(() => new Map(users.map(u => [u.id, u])), []);

    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    // Used to track which item is the "next step" (active)
    const renderState = { activeFound: false };

    return (
        <div className="sticky top-24 space-y-6">
            {/* 1. Status & Actions */}
            <StatusCard
                team={team}
                applied={applied}
                onApply={openApplyModal}
                onInquiry={openInquiryModal}
            />

            {/* 2. Team Members */}
            <div className="bg-card border border-text/10 rounded-2xl p-6">
                <h3 className="font-extrabold text-sm text-text/60 mb-5">팀원 리스트</h3>
                <div className="space-y-6">
                    {/* Leader Section */}
                    {team.members.length > 0 && (
                        <MemberItem
                            userId={team.members[0].userId}
                            role={team.members[0].role}
                            userMap={userMap}
                            isLeader
                        />
                    )}

                    {/* Members List */}
                    <div className="space-y-4 pt-5 border-t border-text/5">
                        <p className="text-[10px] font-black text-text/30 uppercase tracking-widest mb-1">
                            Current Members
                        </p>
                        {team.members.slice(1).map((member) => (
                            <MemberItem
                                key={member.userId}
                                userId={member.userId}
                                role={member.role}
                                userMap={userMap}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Dynamic Timeline */}
            <div className="bg-card border border-text/10 rounded-2xl p-6">
                <h3 className="font-extrabold text-sm text-text/60 mb-6">타임라인</h3>
                <div className="relative border-l-2 border-text/5 ml-3 space-y-8 pb-2">
                    {team.timeline.map((event) => {
                        const eventDate = new Date(event.date);
                        eventDate.setHours(0, 0, 0, 0);

                        let status: TimelineStatus = 'pending';
                        if (eventDate < today) {
                            status = 'past';
                        } else if (!renderState.activeFound) {
                            status = 'active';
                            renderState.activeFound = true;
                        }

                        return (
                            <TimelineItem
                                key={event.task}
                                task={event.task}
                                date={event.date}
                                status={status}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
