"use client";

import { Medal, Flame, ChevronUp, ChevronDown } from "lucide-react";
import { LeaderboardEntry } from "@/data/leaderboards";
import { TIER_CONFIG, TIER_DETAILS } from "../constants";
import { TierIcon } from "./TierGuide";

export function TableRow({ person }: { person: LeaderboardEntry }) {
    const tier = TIER_CONFIG[person.badge];

    return (
        <tr className="group hover:bg-text/5 transition-all cursor-pointer">
            <td className="px-8 py-6">
                <span className="text-sm font-black text-text/40 tracking-tighter">{person.rank}</span>
            </td>
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-text/5 overflow-hidden border-2 border-card shadow-sm flex-shrink-0">
                        <img src={`${person.avatarUrl}`} alt={person.username} className="w-full h-full" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm font-black text-text">{person.username}</h4>
                            <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-xl font-bold border transition-all bg-card ${tier.color} ${tier.border}`}>
                                <TierIcon
                                    type={TIER_DETAILS.find(t => t.id === person.badge)?.iconType || 'shield'}
                                    className="w-3.5 h-3.5"
                                />
                                {tier.label}
                            </span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-8 py-6 text-right">
                <span className={`text-lg font-black italic tracking-tighter ${tier.color}`}>
                    {person.totalPoints.toLocaleString()}
                </span>
            </td>
            <td className="px-6 py-6 text-center">
                <span className="text-sm font-bold text-text/60">{person.hackathonsJoined}</span>
            </td>
            <td className="px-6 py-6 text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-amber-500">
                    <Medal className="w-4 h-4" />
                    <span className="text-xs font-black ml-1">{person.hackathonsWon}</span>
                </div>
            </td>
            <td className="px-6 py-6 text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-rose-500">
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
                    <span className="text-text/20">-</span>
                )}
            </td>
        </tr>
    );
}
