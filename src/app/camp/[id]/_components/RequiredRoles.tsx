import { Team } from "@/data/teams";
import { ROLE_LABELS, ROLES } from "@/data/roles";

interface RequiredRolesProps {
    team: Team;
}

export function RequiredRoles({ team }: RequiredRolesProps) {
    return (
        <section className="bg-card border border-text/10 rounded-3xl p-8">
            <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2">
                <span className="text-2xl">👤</span> 원하는 팀원
            </h2>
            <p className="text-sm font-medium text-text/50 mb-6">아래 역할 중 본인에게 맞는 포지션으로 지원해 주세요</p>

            <div className="space-y-4">
                {team.requiredRoles.length > 0 ? (
                    team.requiredRoles.map((roleId, idx) => {
                        const colors = [
                            { bg: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500', badgeInfo: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20', skill: 'border-text/10 bg-background text-text/80', listText: 'text-text/70' },
                            { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500', badgeInfo: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20', skill: 'border-text/10 bg-background text-text/80', listText: 'text-text/70' },
                            { bg: 'bg-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500', badgeInfo: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20', skill: 'border-text/10 bg-background text-text/80', listText: 'text-text/70' },
                        ];
                        const color = colors[idx % colors.length];
                        const roleData = ROLES.find((r) => r.id === roleId);

                        return (
                            <div key={roleId} className={`${color.bg} border ${color.border} rounded-2xl p-6`}>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className={`font-extrabold text-lg flex items-center gap-2 ${color.text}`}>
                                        <span className={`w-2.5 h-2.5 rounded-full ${color.dot}`}></span>
                                        {ROLE_LABELS[roleId]}
                                    </h3>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold border ${color.badgeInfo}`}>
                                        1명 모집
                                    </span>
                                </div>
                                <div className="mb-5">
                                    <p className="text-xs font-bold mb-2 opacity-60 text-text">필수 스킬</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(team.requiredSkillsByRole?.[roleId] || roleData?.defaultSkills || team.requiredSkills).map((skill) => (
                                            <span key={skill} className={`px-3 py-1.5 rounded-lg text-xs font-bold border shadow-sm ${color.skill}`}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold mb-2 opacity-60 text-text">우대 사항</p>
                                    <ul className={`text-sm space-y-1.5 ${color.listText} font-medium`}>
                                        <li className="flex items-center gap-2"><span className="opacity-40 text-xs">○</span> 관련 도메인(법률, 핀테크 등) 프로젝트 경험</li>
                                        <li className="flex items-center gap-2"><span className="opacity-40 text-xs">○</span> 팀 단위 협업 및 코드 리뷰 경험</li>
                                        <li className="flex items-center gap-2"><span className="opacity-40 text-xs">○</span> GitHub 생태계 활용 능숙자</li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="p-8 text-center border-2 border-dashed border-text/10 rounded-2xl">
                        <p className="text-text/50 font-medium">정해진 필수 포지션 제한이 없습니다. 자유롭게 지원해주세요!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
