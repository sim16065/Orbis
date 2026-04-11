"use client";

import { LeaderboardEntry } from "@/data/leaderboards";
import { TIER_CONFIG, TIER_DETAILS } from "../constants";
import { TierIcon } from "./TierGuide";

export default function TopRankCard({ entry, rank, featured = false }: { entry: LeaderboardEntry; rank: number; featured?: boolean }) {
    const tier = TIER_CONFIG[entry.badge];
    
    // Prestige configuration based on rank
    const prestige = {
        1: { border: "border-amber-400/50 shadow-amber-500/20", glow: "shadow-[0_0_50px_rgba(251,191,36,0.15)]", badgeBg: "bg-gradient-to-br from-amber-300 to-amber-600", scale: "scale-110 z-10" },
        2: { border: "border-slate-300/50 shadow-slate-400/10", glow: "", badgeBg: "bg-gradient-to-br from-slate-200 to-slate-400", scale: "scale-100 opacity-95" },
        3: { border: "border-orange-300/50 shadow-orange-500/10", glow: "", badgeBg: "bg-gradient-to-br from-orange-500 to-orange-900", scale: "scale-95 opacity-90" },
    }[rank as 1 | 2 | 3] || { border: "border-text/10", glow: "", badgeBg: "bg-text/20", scale: "scale-100" };

    return (
        <div className={`relative flex flex-col items-center transition-all duration-700 ${prestige.scale}`}>
            <div className={`bg-card border-2 rounded-[3rem] p-8 pb-10 w-full text-center shadow-xl ${prestige.border} ${prestige.glow}`}>
                <div className="relative mb-8 inline-block">
                    <div className={`w-28 h-28 rounded-full bg-text/5 overflow-hidden border-4 border-card shadow-inner mx-auto transition-transform duration-500 ${rank === 1 ? 'w-32 h-32 ring-4 ring-amber-400/20' : ''}`}>
                        <img src={`${entry.avatarUrl}`} alt={entry.username} className="w-full h-full object-cover" />
                    </div>
                    <div className={`absolute -right-1 -bottom-1 w-11 h-11 rounded-full border-4 border-card flex items-center justify-center font-black text-white shadow-lg ${prestige.badgeBg}`}>
                        {rank}
                    </div>
                </div>

                <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-xl font-bold border mb-3 bg-card shadow-sm ${tier.color} ${tier.border}`}>
                        <TierIcon
                            type={TIER_DETAILS.find(t => t.id === entry.badge)?.iconType || 'shield'}
                            className="w-4 h-4"
                        />
                        {tier.label}
                    </span>
                    <h3 className="text-xl font-black mb-1 text-text">{entry.username}</h3>
                </div>

                <div className="flex justify-center gap-1.5 mb-8">
                    {entry.topSkills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 rounded-xl bg-text/5 text-text/40 text-[10px] font-bold border border-text/10">
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="pt-6 border-t border-text/10">
                    <p className="text-[10px] font-black text-text/20 uppercase tracking-widest mb-1">Total Points</p>
                    <div className={`text-4xl font-black italic tracking-tighter ${tier.color}`}>
                        {entry.totalPoints.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
