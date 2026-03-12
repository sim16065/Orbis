"use client";

import { useState, useMemo } from "react";
import { hackathons } from "@/data/hackathons";
import HackathonCard from "@/components/hackathon-card";
import { useBookmarks } from "@/lib/hooks";

const STATUS_FILTERS = [
    { value: "all", label: "전체" },
    { value: "upcoming", label: "모집중" },
    { value: "ongoing", label: "진행중" },
    { value: "ended", label: "종료" },
];

const MODE_FILTERS = [
    { value: "all", label: "전체" },
    { value: "online", label: "온라인" },
    { value: "offline", label: "오프라인" },
    { value: "hybrid", label: "하이브리드" },
];


const SORT_OPTIONS = [
    { value: "deadline", label: "마감일 순" },
    { value: "participants", label: "참가자 많은 순" },
    { value: "prize", label: "상금 높은 순" },
];

export default function HackathonsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [modeFilter, setModeFilter] = useState("all");
    const [sortBy, setSortBy] = useState("deadline");
    const { isBookmarked, toggleBookmark } = useBookmarks();

    const filtered = useMemo(() => {
        let result = hackathons.filter((h) => {
            const matchSearch =
                !search ||
                h.title.toLowerCase().includes(search.toLowerCase()) ||
                h.organizer.toLowerCase().includes(search.toLowerCase()) ||
                h.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
            const matchStatus = statusFilter === "all" || h.status === statusFilter;
            const matchMode = modeFilter === "all" || h.mode === modeFilter;
            return matchSearch && matchStatus && matchMode;
        });

        result = [...result].sort((a, b) => {
            if (sortBy === "deadline")
                return (
                    new Date(a.registrationDeadline).getTime() -
                    new Date(b.registrationDeadline).getTime()
                );
            if (sortBy === "participants") return b.participants - a.participants;
            if (sortBy === "prize") return b.prizeAmount - a.prizeAmount;
            return 0;
        });

        return result;
    }, [search, statusFilter, modeFilter, sortBy]);

    return (
        <div className="min-h-screen px-6 py-10">
            <div className="max-w-7xl mx-auto">
                {/* 헤더 */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-white mb-2">
                        ⚡ 해커톤 탐색
                    </h1>
                    <p className="text-slate-400 text-lg">
                        {hackathons.length}개의 해커톤이 당신을 기다리고 있습니다
                    </p>
                </div>

                {/* 검색 */}
                <div className="relative mb-6">
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="해커톤 이름, 주최사, 기술 스택으로 검색..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-800/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-slate-800 transition-all text-sm"
                    />
                </div>

                {/* 필터 + 정렬 */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {/* 상태 필터 */}
                    <div className="flex gap-1.5 bg-slate-800/60 border border-white/10 rounded-xl p-1">
                        {STATUS_FILTERS.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setStatusFilter(f.value)}
                                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${statusFilter === f.value
                                    ? "bg-violet-600 text-white shadow-md"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    {/* 모드 필터 */}
                    <div className="flex gap-1.5 bg-slate-800/60 border border-white/10 rounded-xl p-1">
                        {MODE_FILTERS.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setModeFilter(f.value)}
                                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${modeFilter === f.value
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>


                    {/* 정렬 */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="ml-auto px-4 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-violet-500/50 cursor-pointer"
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 결과 수 */}
                <p className="text-slate-500 text-sm mb-6">
                    {filtered.length}개의 해커톤
                </p>

                {/* 해커톤 그리드 */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((h) => (
                            <HackathonCard
                                key={h.id}
                                hackathon={h}
                                isBookmarked={isBookmarked(h.id)}
                                onToggleBookmark={toggleBookmark}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-white mb-2">
                            검색 결과가 없습니다
                        </h3>
                        <p className="text-slate-400">
                            다른 검색어나 필터를 시도해보세요
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
