"use client";

import { Crown } from "lucide-react";
import { LeaderboardEntry } from "@/data/leaderboards";
import { TIER_CONFIG } from "../constants";

export default function TopRankCard({ entry, rank, medal, featured = false }: { entry: LeaderboardEntry; rank: number; medal: string; featured?: boolean }) {
    const tier = TIER_CONFIG[entry.badge];
    return (
        <div className={`relative flex flex-col items-center ${featured ? 'md:z-10 md:scale-105' : 'md:mt-6'}`}>
            <div className="absolute -top-8 text-4xl animate-bounce">{medal}</div>

            <div className={`bg-white border rounded-[3rem] p-8 w-full text-center transition-all shadow-xl hover:shadow-2xl hover:-translate-y-2 ${featured ? 'border-amber-200 shadow-amber-500/5' : 'border-slate-100'}`}>
                <div className="relative mb-6 inline-block">
                    <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden border-4 border-slate-50 shadow-inner mx-auto">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.username}`} alt={entry.displayName} className="w-full h-full" />
                    </div>
                    <div className={`absolute -right-2 -bottom-2 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center font-black text-lg ${tier.bg} ${tier.color}`}>
                        {rank}
                    </div>
                </div>

                <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border mb-3 inline-block ${tier.bg} ${tier.color} ${tier.border}`}>
                        {tier.label}
                    </span>
                    <h3 className="text-xl font-black mb-1">{entry.username}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{entry.role}</p>
                </div>

                <div className="flex justify-center gap-1.5 mb-8">
                    {entry.topSkills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-400 text-[10px] font-bold border border-slate-100">
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="pt-6 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Total Points</p>
                    <div className={`text-4xl font-black italic tracking-tighter ${tier.color}`}>
                        {entry.totalPoints.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
