"use client";

import { leaderboards } from "@/data/leaderboards";
import { Badge, Card } from "@/components/ui";

const badgeConfig: Record<string, { label: string; color: string; bg: string }> = {
    diamond: { label: "다이아몬드", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    platinum: { label: "플래티넘", color: "text-violet-400", bg: "bg-violet-500/10" },
    gold: { label: "골드", color: "text-amber-400", bg: "bg-amber-500/10" },
    silver: { label: "실버", color: "text-slate-300", bg: "bg-slate-500/10" },
    bronze: { label: "브론즈", color: "text-amber-700", bg: "bg-amber-700/10" },
};

export default function RankingsPage() {
    const topThree = leaderboards.slice(0, 3);
    const others = leaderboards.slice(3);

    return (
        <div className="min-h-screen px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        🏆 명예의 전당
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        해커톤에서의 성과를 바탕으로 산정된 통합 랭킹입니다.
                        매일 자정에 업데이트됩니다.
                    </p>
                </div>

                {/* 상위 3인 (포디움) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
                    {/* 2위 */}
                    <div className="order-2 md:order-1">
                        <PodiumCard entry={topThree[1]} rank={2} color="border-slate-300/30" />
                    </div>
                    {/* 1위 */}
                    <div className="order-1 md:order-2">
                        <PodiumCard entry={topThree[0]} rank={1} color="border-amber-400/30" main />
                    </div>
                    {/* 3위 */}
                    <div className="order-3 md:order-3">
                        <PodiumCard entry={topThree[2]} rank={3} color="border-amber-700/30" />
                    </div>
                </div>

                {/* 랭킹 리스트 */}
                <Card className="overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">순위</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">개발자</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase hidden md:table-cell">보유 기술</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">최근 해커톤</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">포인트</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {others.map((person) => (
                                <tr key={person.userId} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-500">{person.rank}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white overflow-hidden text-sm">
                                                {person.displayName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-white text-sm">{person.displayName}</p>
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-black uppercase ${badgeConfig[person.badge].color} ${badgeConfig[person.badge].bg}`}>
                                                        {person.badge}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500">@{person.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <div className="flex flex-wrap gap-1">
                                            {person.topSkills.slice(0, 2).map(skill => (
                                                <span key={skill} className="px-2 py-0.5 rounded bg-white/5 text-slate-400 text-[10px]">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-slate-400 truncate max-w-[150px]">{person.recentHackathon}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-violet-400">{person.totalPoints.toLocaleString()}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
}

function PodiumCard({ entry, rank, color, main = false }: { entry: any; rank: number; color: string; main?: boolean }) {
    const trophy = rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉";
    const badge = badgeConfig[entry.badge];

    return (
        <div className={`relative flex flex-col items-center ${main ? 'scale-110 md:mb-10' : ''}`}>
            <div className={`absolute -top-6 z-20 text-4xl`}>{trophy}</div>
            <Card className={`w-full p-8 text-center border-b-4 ${color} relative overflow-hidden backdrop-blur-md`}>
                {main && (
                    <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent pointer-events-none" />
                )}
                <div className={`w-20 h-20 rounded-full mx-auto mb-4 bg-slate-800 border-2 ${main ? 'border-amber-400' : 'border-white/10'} flex items-center justify-center font-black text-2xl text-white`}>
                    {entry.displayName.charAt(0)}
                </div>
                <h3 className="font-black text-xl text-white mb-1">{entry.displayName}</h3>
                <p className="text-slate-500 text-sm mb-3">@{entry.username}</p>

                <div className="inline-block px-3 py-1 rounded-full bg-white/5 mb-4">
                    <span className={`text-xs font-black uppercase ${badge.color}`}>{badge.label}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
                    <div className="text-center">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">포인트</p>
                        <p className="font-black text-violet-400 tracking-tighter">{entry.totalPoints.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">우승</p>
                        <p className="font-black text-emerald-400">{entry.hackathonsWon}회</p>
                    </div>
                </div>
            </Card>
            <div className={`mt-4 font-black text-4xl text-slate-800 italic`}>#{rank}</div>
        </div>
    );
}
