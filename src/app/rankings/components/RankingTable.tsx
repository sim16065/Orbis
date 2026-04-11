"use client";

import { Medal, Flame, ChevronUp, ChevronDown } from "lucide-react";
import { LeaderboardEntry } from "@/data/leaderboards";
import { TIER_CONFIG } from "../constants";

export function TableRow({ person }: { person: LeaderboardEntry }) {
    const tier = TIER_CONFIG[person.badge];
    const maxPoints = 7000;
    const progress = (person.totalPoints / maxPoints) * 100;

    return (
        <tr className="group hover:bg-slate-50/50 transition-all cursor-pointer">
            <td className="px-8 py-6">
                <span className="text-sm font-black text-slate-400 tracking-tighter">{person.rank}</span>
            </td>
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.username}`} alt={person.displayName} className="w-full h-full" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm font-black text-slate-800">{person.username}</h4>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase border ${tier.bg} ${tier.color} ${tier.border}`}>
                                {tier.label}
                            </span>
                            {person.streak >= 5 && <Flame className="w-3.5 h-3.5 text-rose-500" />}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {person.role} · {person.recentHackathon}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-8 py-6">
                <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-base font-black italic tracking-tighter ${tier.color}`}>
                        {person.totalPoints.toLocaleString()}
                    </span>
                    <div className="w-16 bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div className={`h-full ${tier.bar}`} style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </td>
            <td className="px-6 py-6 text-center">
                <span className="text-sm font-bold text-slate-500">{person.hackathonsJoined}</span>
            </td>
            <td className="px-6 py-6 text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 text-amber-500 border border-amber-100/50">
                    <Medal className="w-4 h-4" />
                    <span className="text-xs font-black ml-1">{person.hackathonsWon}</span>
                </div>
            </td>
            <td className="px-6 py-6 text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 text-rose-500 border border-rose-100/50">
                    <Flame className="w-4 h-4" />
                    <span className="text-xs font-black ml-1">{person.streak}</span>
                </div>
            </td>
            <td className="px-8 py-6 text-center">
                {person.change > 0 ? (
                    <div className="flex items-center justify-center gap-1 text-emerald-500 font-bold text-xs">
                        <ChevronUp className="w-4 h-4" />
                        {person.change}
                    </div>
                ) : person.change < 0 ? (
                    <div className="flex items-center justify-center gap-1 text-rose-500 font-bold text-xs">
                        <ChevronDown className="w-4 h-4" />
                        {Math.abs(person.change)}
                    </div>
                ) : (
                    <span className="text-slate-300">-</span>
                )}
            </td>
        </tr>
    );
}
