"use client";

import { useState, useMemo } from "react";
import { leaderboards, LeaderboardEntry } from "@/data/leaderboards";
import {
    Trophy,
    Medal,
    ChevronUp,
    ChevronDown,
    Flame,
    Search,
    InfoIcon,
    Users,
    BarChart3,
    Zap,
    Crown,
    Shield,
    ShieldCheck,
    Gem,
    Star,
    Flag,
    MessageSquare,
    MinusCircle,
    Calculator,
    RotateCcw
} from "lucide-react";

// Tier Configuration
const TIER_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; bar: string }> = {
    master: { label: "Master", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-200", bar: "bg-rose-500" },
    diamond: { label: "Diamond", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-200", bar: "bg-purple-500" },
    platinum: { label: "Platinum", color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-200", bar: "bg-cyan-500" },
    gold: { label: "Gold", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-200", bar: "bg-amber-500" },
    silver: { label: "Silver", color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-300", bar: "bg-slate-500" },
    bronze: { label: "Bronze", color: "text-orange-600", bg: "bg-orange-600/10", border: "border-orange-200", bar: "bg-orange-600" },
};

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

    // Stats Calculation
    const totalParticipants = 20;
    const totalWins = leaderboards.reduce((acc, curr) => acc + curr.hackathonsWon, 0);
    const totalParticipations = leaderboards.reduce((acc, curr) => acc + curr.hackathonsJoined, 0);
    const avgPoints = Math.round(leaderboards.reduce((acc, curr) => acc + curr.totalPoints, 0) / leaderboards.length);

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

                {/* 2. Tier Guide Accordion */}
                <TierGuide />

                {/* 3. Point Calculation Criteria */}
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

                    {/* Tier Distribution (Rightmost on XL) */}
                    <div className="lg:col-span-2 xl:col-span-1 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                            <BarChart3 className="w-3.5 h-3.5" />
                            티어 분포 (%)
                        </div>
                        <div className="space-y-2.5">
                            <TierBar label="Master" count={1} color="bg-rose-400" total={20} />
                            <TierBar label="Diamond" count={2} color="bg-violet-400" total={20} />
                            <TierBar label="Platinum" count={2} color="bg-emerald-400" total={20} />
                            <TierBar label="Gold" count={4} color="bg-amber-400" total={20} />
                            <TierBar label="Silver" count={6} color="bg-slate-400" total={20} />
                            <TierBar label="Bronze" count={5} color="bg-orange-400" total={20} />
                        </div>
                    </div>
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

// Sub-components

function StatCard({ icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) {
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

function TierBar({ label, count, color, total }: { label: string, count: number, color: string, total: number }) {
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

function TopRankCard({ entry, rank, medal, featured = false }: { entry: LeaderboardEntry; rank: number; medal: string; featured?: boolean }) {
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

function TableRow({ person }: { person: LeaderboardEntry }) {
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

// --------------------------------------------------------------------------------
// Tier Guide Sub-component (Interactive Accordion)
// --------------------------------------------------------------------------------

const TIER_DETAILS = [
    {
        id: "bronze",
        label: "Bronze",
        range: "0 ~ 999 포인트",
        desc: "해커톤 여정의 시작! 첫 발을 내딛은 용감한 참가자.",
        color: "text-orange-600",
        bg: "bg-orange-600/10",
        border: "border-orange-600/30",
        activeBg: "bg-orange-600",
        iconType: "shield"
    },
    {
        id: "silver",
        label: "Silver",
        range: "1,000 ~ 1,999 포인트",
        desc: "어느덧 익숙해진 현장. 꾸준히 성과를 쌓아가는 참가자.",
        color: "text-slate-500",
        bg: "bg-slate-500/10",
        border: "border-slate-500/30",
        activeBg: "bg-slate-500",
        iconType: "shield-star"
    },
    {
        id: "gold",
        label: "Gold",
        range: "2,000 ~ 2,999 포인트",
        desc: "숙련된 해커톤 플레이어. 탄탄한 기술력으로 팀을 승리로 이끕니다.",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        activeBg: "bg-amber-500",
        iconType: "shield-zap"
    },
    {
        id: "platinum",
        label: "Platinum",
        range: "3,000 ~ 4,499 포인트",
        desc: "탁월한 리더십과 실력. 해커톤 씬의 상위권 실력자.",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        activeBg: "bg-cyan-500",
        iconType: "shield-check"
    },
    {
        id: "diamond",
        label: "Diamond",
        range: "4,500 ~ 5,999 포인트",
        desc: "압도적인 퍼포먼스. 누구도 이들을 막을 수 없습니다.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        activeBg: "bg-purple-500",
        iconType: "gem"
    },
    {
        id: "master",
        label: "Master",
        range: "6,000+ 포인트",
        desc: "최상위 1% 전설. 해커톤 씬을 이끄는 마스터 참가자.",
        benefits: ["Master 전용 혜택 전부", "연간 해외 해커톤 초청", "커뮤니티 Ambassador 자격"],
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        border: "border-rose-500/30",
        activeBg: "bg-rose-500",
        iconType: "crown"
    }
];

function TierIcon({ type, className }: { type: string, className?: string }) {
    // Extract size and color classes
    const iconBase = className || '';

    switch (type) {
        case 'shield':
            return <Shield className={iconBase} />;
        case 'shield-star':
            return (
                <div className={`relative inline-block ${iconBase}`}>
                    <Shield className="w-full h-full" />
                    <Star className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[45%] h-[45%] fill-current" />
                </div>
            );
        case 'shield-zap':
            return (
                <div className={`relative inline-block ${iconBase}`}>
                    <Shield className="w-full h-full" />
                    <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] fill-current" />
                </div>
            );
        case 'shield-check':
            return <ShieldCheck className={iconBase} />;
        case 'gem':
            return <Gem className={iconBase} />;
        case 'crown':
            return <Crown className={iconBase} />;
        default:
            return <Shield className={iconBase} />;
    }
}

function TierGuide() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTier, setActiveTier] = useState(TIER_DETAILS[0]); // Default Bronze

    return (
        <div className="mb-12">
            <div className="bg-card rounded-2xl border border-text/10 overflow-hidden transition-all">
                {/* Accordion Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-6 px-8 flex items-center justify-between hover:bg-text/5 transition-all"
                >
                    <div className="flex items-center gap-3">
                        <InfoIcon className="w-4 h-4 text-sky-500" />
                        <span className="text-sm font-bold text-text tracking-tight">랭크 티어 가이드</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-text/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="p-8 pt-2 animate-in slide-in-from-top-4 duration-300">
                        {/* Tier Tabs */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            {TIER_DETAILS.map((tier) => (
                                <button
                                    key={tier.id}
                                    onClick={() => setActiveTier(tier)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 border transition-all ${activeTier.id === tier.id
                                        ? `${tier.activeBg} text-white border-transparent shadow-lg shadow-${tier.id}/20`
                                        : `bg-transparent text-text/40 border-text/10 hover:border-text/20`
                                        }`}
                                >
                                    <TierIcon type={tier.iconType} className={`w-3.5 h-3.5 ${activeTier.id === tier.id ? 'text-white' : tier.color}`} />
                                    {tier.label}
                                </button>
                            ))}
                        </div>

                        {/* Detail Card */}
                        <div className={`p-8 rounded-2xl border ${activeTier.border} ${activeTier.bg} mb-10 transition-all duration-300`}>
                            <div className="flex items-start gap-5 mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl ${activeTier.activeBg} text-white`}>
                                    <TierIcon type={activeTier.iconType} className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className={`text-2xl font-black mb-1 ${activeTier.color}`}>{activeTier.label}</h3>
                                    <p className="text-xs font-black text-text/30 uppercase tracking-widest">{activeTier.range}</p>
                                </div>
                            </div>

                            <p className="text-text/70 text-sm font-medium mb-1 leading-relaxed">
                                {activeTier.desc}
                            </p>
                        </div>

                        {/* Range Bar */}
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-text/20 uppercase tracking-widest ml-1">포인트 구간</p>
                            <div className="relative pt-2">
                                <div className="flex h-3 w-full rounded-full overflow-hidden bg-text/5">
                                    {TIER_DETAILS.map((tier) => (
                                        <div
                                            key={tier.id}
                                            className={`${tier.activeBg} flex-1 h-full transition-all duration-300 flex items-center justify-center text-[8px] font-black text-white/0 hover:text-white/100 cursor-default ${activeTier.id === tier.id ? 'opacity-100 ring-4 ring-text/10 relative z-10' : 'opacity-40'}`}
                                        >
                                        </div>
                                    ))}
                                </div>
                                <div className="relative h-6 mt-1.5 text-[9px] font-bold text-text/20">
                                    <span className="absolute left-0">0</span>
                                    <span className="absolute left-[16.66%]">1,000</span>
                                    <span className="absolute left-[33.33%]">2,000</span>
                                    <span className="absolute left-[50%]">3,000</span>
                                    <span className="absolute left-[66.66%]">4,500</span>
                                    <span className={`absolute left-[83.33%] ${activeTier.id === 'master' ? 'text-rose-500 font-black' : ''}`}>6,000+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function PointCalculationGuide() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('participation');

    const tabs = [
        { id: 'participation', label: '해커톤 참여', icon: <Flag className="w-4 h-4" /> },
        { id: 'awards', label: '수상 & 성과', icon: <Trophy className="w-4 h-4" /> },
        { id: 'team', label: '팀 기여', icon: <Users className="w-4 h-4" /> },
        { id: 'community', label: '커뮤니티 활동', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'deduction', label: '감점 항목', icon: <MinusCircle className="w-4 h-4" /> },
    ];

    const data: Record<string, { items: any[], theme: string, warning?: string }> = {
        participation: {
            theme: 'emerald',
            items: [
                { title: '해커톤 참여 완료', desc: '팀으로 끝까지 완주 시', pts: '+50' },
                { title: '솔로 참여 완료', desc: '1인 팀으로 완주 시', pts: '+30' },
                { title: '연속 참여 보너스', desc: '2회 이상 연속 참여마다', pts: '+20' },
                { title: '첫 참여', desc: '생애 첫 해커톤 참여', pts: '+10' },
            ]
        },
        awards: {
            theme: 'amber',
            items: [
                { title: '1등 (우승)', desc: '해커톤 최종 1위', pts: '+300' },
                { title: '2등', desc: '해커톤 최종 2위', pts: '+200' },
                { title: '3등', desc: '해커톤 최종 3위', pts: '+150' },
                { title: 'TOP 10 입상', desc: '10위 이내 입상', pts: '+80' },
                { title: '특별상 수상', desc: '심사위원 특별상 등', pts: '+100' },
            ]
        },
        team: {
            theme: 'purple',
            items: [
                { title: '팀장 역할 수행', desc: '팀 리더로 참여 시', pts: '+30' },
                { title: '팀원 모집 성공', desc: '모집글로 팀 완성 시', pts: '+15' },
                { title: '팀 리뷰 작성', desc: '팀원 상호 리뷰 완료', pts: '+10' },
            ]
        },
        community: {
            theme: 'cyan',
            items: [
                { title: '프로필 완성', desc: '스택, 링크 등 100% 작성', pts: '+20' },
                { title: '멘토링 제공', desc: '다른 팀 멘토링 1회', pts: '+25' },
                { title: '후기 작성', desc: '해커톤 참여 후기 게시', pts: '+15' },
                { title: '추천인 등록', desc: '신규 유저 초대 시', pts: '+10' },
            ]
        },
        deduction: {
            theme: 'rose',
            warning: '아래 항목은 포인트가 차감됩니다. 건전한 커뮤니티를 위해 규정을 준수해 주세요.',
            items: [
                { title: '팀 중도 이탈', desc: '해커톤 도중 팀 탈퇴', pts: '-50' },
                { title: '규정 위반', desc: '운영 규정 위반 확인 시', pts: '-100' },
                { title: '장기 미활동', desc: '3개월 이상 미참여 시 월별', pts: '-10' },
            ]
        }
    };

    const current = data[activeTab];

    return (
        <div className="bg-card rounded-2xl border border-text/10 overflow-hidden mb-12">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 px-8 flex items-center justify-between hover:bg-text/5 transition-all"
            >
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h3 className="text-sm font-bold text-text">포인트 산정 기준</h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-text/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="p-8 pt-2 animate-in slide-in-from-top-4 duration-300">
                    {/* Summary Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-text/5 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <Flag className="w-4 h-4 text-emerald-500" />
                            <div>
                                <p className="text-[15px] font-black text-emerald-500">+50pts</p>
                                <p className="text-[10px] text-text/40 font-bold">참여만 해도</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-text/10 pl-4">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            <div>
                                <p className="text-[15px] font-black text-amber-500">+300pts</p>
                                <p className="text-[10px] text-text/40 font-bold">우승 시</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-text/10 pl-4">
                            <Flame className="w-4 h-4 text-rose-500" />
                            <div>
                                <p className="text-[15px] font-black text-rose-500">보너스 ↑</p>
                                <p className="text-[10px] text-text/40 font-bold">연속 참여</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-text/10 pl-4">
                            <RotateCcw className="w-4 h-4 text-purple-500" />
                            <div>
                                <p className="text-[15px] font-black text-purple-500">~500pts/회</p>
                                <p className="text-[10px] text-text/40 font-bold">최대 획득</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${activeTab === tab.id
                                    ? `bg-${current.theme}-500 text-white shadow-lg shadow-${current.theme}-500/20`
                                    : 'bg-text/5 text-text/40 hover:bg-text/10'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content List */}
                    <div className={`rounded-2xl border p-1 overflow-hidden transition-all duration-300 ${activeTab === 'deduction' ? 'bg-rose-500/5 border-rose-500/20' :
                        activeTab === 'awards' ? 'bg-amber-500/5 border-amber-500/20' :
                            activeTab === 'participation' ? 'bg-emerald-500/5 border-emerald-500/20' :
                                activeTab === 'team' ? 'bg-purple-500/5 border-purple-500/20' :
                                    'bg-cyan-500/5 border-cyan-500/20'
                        }`}>
                        {current.warning && (
                            <div className="p-4 px-6 text-[11px] font-bold text-rose-500 flex items-center gap-2 opacity-60 italic">
                                <InfoIcon className="w-3.5 h-3.5" />
                                {current.warning}
                            </div>
                        )}
                        <div className="divide-y divide-text/5">
                            {current.items.map((item, idx) => (
                                <div key={idx} className="p-5 px-8 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === 'deduction' ? 'text-rose-500' : 'text-text/40'
                                            }`}>
                                            {activeTab === 'deduction' ? <MinusCircle className="w-4 h-4" /> : tabs.find(t => t.id === activeTab)?.icon}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-black text-text/80">{item.title}</p>
                                            <p className="text-[10px] font-semibold text-text/30">{item.desc}</p>
                                        </div>
                                    </div>
                                    <span className={`text-base font-black ${activeTab === 'deduction' ? 'text-rose-500' :
                                        activeTab === 'awards' ? 'text-amber-500' :
                                            'text-emerald-500'
                                        }`}>
                                        {item.pts}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-2 p-4 px-6 bg-text/5 rounded-xl text-[10px] font-bold text-text/40">
                        <InfoIcon className="w-4 h-4 text-text/20" />
                        포인트는 매주 월요일 오전 9시에 집계됩니다. 이의 신청은 해커톤 종료 후 7일 이내에 운영팀에 문의해 주세요.
                    </div>
                </div>
            )}
        </div>
    );
}

// Re-using check for benefits
const Check = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);
