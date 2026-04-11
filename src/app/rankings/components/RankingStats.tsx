"use client";

import { BarChart3 } from "lucide-react";

export function StatCard({ icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) {
    return (
        <div className="bg-card border border-text/10 rounded-2xl p-6 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-text/5 flex items-center justify-center mb-6">
                {icon}
            </div>
            <div>
                <p className="text-[11px] font-black text-text/40 uppercase tracking-widest mb-1.5">{label}</p>
                <div className="flex items-end justify-between">
                    <h3 className="text-2xl font-black text-text">{value}</h3>
                </div>
                <p className="text-[10px] text-text/20 font-bold mt-2">{sub}</p>
            </div>
        </div>
    );
}

export function TierBar({ label, count, color, total }: { label: string, count: number, color: string, total: number }) {
    const percentage = (count / total) * 100;
    return (
        <div className="flex items-center gap-3">
            <span className="w-16 text-[10px] font-black text-text/40 uppercase">{label}</span>
            <div className="flex-1 bg-text/5 h-1.5 rounded-full overflow-hidden">
                <div className={`${color} h-full rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }} />
            </div>
            <span className="w-8 text-[10px] font-black text-text/20 text-right">{Math.round(percentage)}%</span>
        </div>
    );
}

export function TierDistribution({ totalParticipants }: { totalParticipants: number }) {
    return (
        <div className="lg:col-span-2 xl:col-span-1 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                <BarChart3 className="w-3.5 h-3.5" />
                티어 분포 (%)
            </div>
            <div className="space-y-2.5">
                <TierBar label="Master" count={1} color="bg-rose-400" total={totalParticipants} />
                <TierBar label="Diamond" count={2} color="bg-violet-400" total={totalParticipants} />
                <TierBar label="Platinum" count={2} color="bg-emerald-400" total={totalParticipants} />
                <TierBar label="Gold" count={4} color="bg-amber-400" total={totalParticipants} />
                <TierBar label="Silver" count={6} color="bg-slate-400" total={totalParticipants} />
                <TierBar label="Bronze" count={5} color="bg-orange-400" total={totalParticipants} />
            </div>
        </div>
    );
}
