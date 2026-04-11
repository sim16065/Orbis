"use client";

import { useState, useMemo } from "react";
import { leaderboards } from "@/data/leaderboards";
import {
    Trophy,
    Flame,
    Search,
    Users,
    BarChart3,
    Zap,
    Crown
} from "lucide-react";

// Components
import TierGuide from "./components/TierGuide";
import PointCalculationGuide from "./components/PointCalculationGuide";
import { StatCard, TierDistribution } from "./components/RankingStats";
import TopRankCard from "./components/TopRankingSection";
import { TableRow } from "./components/RankingTable";

// Constants
import { TIER_CONFIG } from "./constants";

export default function RankingsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTier, setSelectedTier] = useState<string>("전체");

    // Memoized Filtered List
    const filteredList = useMemo(() => {
        return leaderboards.filter(entry => {
            const matchesSearch = entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entry.displayName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTier = selectedTier === "전체" || entry.badge === selectedTier.toLowerCase();
            return matchesSearch && matchesTier;
        });
    }, [searchQuery, selectedTier]);

    const topThree = leaderboards.slice(0, 3);
    const otherRankings = filteredList.filter(entry => entry.rank > 3);

    return (
        <div className="min-h-screen bg-background pb-24 text-text transition-colors">
            {/* 1. Header Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm border border-amber-200">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <h1 className="text-4xl font-black tracking-tight">랭킹 대시보드</h1>
                        </div>
                        <p className="text-slate-500 font-medium">해커톤 참여와 성과를 기반으로 한 실시간 순위</p>
                    </div>
                </div>

                {/* 2. Information Accordions */}
                <TierGuide />
                <PointCalculationGuide />

                {/* 3. Stats Overview Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
                    <StatCard
                        icon={<Users className="w-5 h-5 text-sky-500" />}
                        label="내 랭킹 순위"
                        value="12위"
                        sub="전체 사용자 중 상위 5%"
                    />
                    <StatCard
                        icon={<Trophy className="w-5 h-5 text-amber-500" />}
                        label="나의 우승 횟수"
                        value="3회 우승"
                        sub="프로젝트 우승 메달 누적"
                    />
                    <StatCard
                        icon={<Flame className="w-5 h-5 text-rose-500" />}
                        label="연속 참여 횟수"
                        value="4회 연속"
                        sub="꾸준한 해커톤 활동 중"
                    />
                    <StatCard
                        icon={<Zap className="w-5 h-5 text-violet-500" />}
                        label="다음 티어까지"
                        value="Diamond까지"
                        sub="+150pts 남음"
                    />

                    <TierDistribution totalParticipants={20} />
                </div>

                {/* 4. TOP 3 (Hall of Fame) */}
                <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                    <Crown className="w-6 h-6 text-amber-500" />
                    TOP 3
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <TopRankCard entry={topThree[1]} rank={2} medal="🥈" />
                    <TopRankCard entry={topThree[0]} rank={1} medal="🥇" featured />
                    <TopRankCard entry={topThree[2]} rank={3} medal="🥉" />
                </div>

                {/* 5. Overall Rankings Table Section */}
                <div className="flex items-center gap-3 mb-8">
                    <BarChart3 className="w-6 h-6 text-slate-400" />
                    <h2 className="text-2xl font-black">전체 순위</h2>
                </div>

                <div className="bg-card border border-text/10 rounded-2xl overflow-hidden mb-12">
                    {/* Filters Header */}
                    <div className="p-8 pb-4 space-y-6">
                        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                            <div className="relative w-full lg:max-w-3xl">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="사용자명 혹은 닉네임 검색..."
                                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:border-primary/30 transition-all placeholder:text-slate-300"
                                />
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <select className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black appearance-none cursor-pointer">
                                    <option>포인트순</option>
                                    <option>참여순</option>
                                    <option>우승순</option>
                                </select>
                                <select className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black appearance-none cursor-pointer">
                                    <option>전체 기간</option>
                                    <option>최근 3달</option>
                                    <option>최근 1달</option>
                                </select>
                            </div>
                        </div>

                        {/* Chip Filters */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">티어 필터</p>
                                <div className="flex flex-wrap gap-2">
                                    {["전체", ...Object.keys(TIER_CONFIG).map(t => TIER_CONFIG[t].label)].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedTier(t === "전체" ? "전체" : t)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${(selectedTier === t)
                                                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                                : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                                                }`}
                                        >
                                            {t === "전체" && <span className="mr-1.5 opacity-50">🏁</span>}
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-slate-400 pl-1">{filteredList.length}명 표시 중</p>
                    </div>

                    {/* Desktop Table */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-y border-slate-100">
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">순위</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">사용자</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">포인트</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">참여</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">우승</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">연속</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">변동</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {otherRankings.map((person) => (
                                    <TableRow key={person.userId} person={person} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="text-center text-xs font-bold text-slate-300 mt-8">
                    포인트는 해커톤 참여, 수상, 팀 기여도를 기반으로 산정됩니다. 매주 월요일 업데이트.
                </p>
            </div>
        </div>
    );
}
