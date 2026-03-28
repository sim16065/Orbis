"use client";

import { useState, useMemo } from "react";
import { hackathons } from "@/data/hackathons";
import HackathonCard from "@/components/hackathon-card";
import { useBookmarks } from "@/lib/hooks";

const STATUS_OPTIONS = [
    { value: "ongoing", label: "진행중", color: "bg-violet-500" },
    { value: "upcoming", label: "모집중", color: "bg-emerald-500" },
    { value: "ended", label: "종료", color: "bg-slate-500" },
];

const SORT_OPTIONS = [
    { value: "recent", label: "최신순" },
    { value: "deadline", label: "마감일 순" },
    { value: "participants", label: "참가자 많은 순" },
    { value: "prize", label: "상금 높은 순" },
];

export default function HackathonsPage() {
    const [search, setSearch] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("recent");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const { isBookmarked, toggleBookmark } = useBookmarks();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const resetFilters = () => {
        setSearch("");
        setSelectedStatuses([]);
    };

    const filtered = useMemo(() => {
        let result = hackathons.filter((h) => {
            const matchSearch =
                !search ||
                h.title.toLowerCase().includes(search.toLowerCase()) ||
                h.organizer.toLowerCase().includes(search.toLowerCase());

            const matchStatus = selectedStatuses.length === 0 || selectedStatuses.includes(h.status);

            return matchSearch && matchStatus;
        });

        result = [...result].sort((a, b) => {
            if (sortBy === "recent") {
                // 가상으로 등록일 역순 처리 (여기서는 시작일 기준)
                return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
            }
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
    }, [search, selectedStatuses, sortBy]);

    return (
        <div className="min-h-screen px-4 sm:px-6 py-10 bg-background text-text">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8">

                {/* 왼쪽 사이드바: 필터 */}
                <aside className="w-full lg:w-[280px] flex-shrink-0">
                    {/* 토글 버튼 추가 */}
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full lg:hidden flex items-center justify-between p-5 bg-text/[0.03] border border-text/10 rounded-2xl mb-4 transition-all active:scale-[0.98]">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-sm tracking-tight">상세 필터 설정</span>
                            {(selectedStatuses.length > 0) && (
                                <span className="bg-primary text-background text-[10px] px-1.5 py-0.5 rounded-full font-black">
                                    {selectedStatuses.length}
                                </span>
                            )}
                        </div>
                        <svg
                            className={`w-5 h-5 text-text/40 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className={`
                        ${isFilterOpen ? "max-h-[2000px] opacity-100 mb-8" : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"}
                        overflow-hidden transition-all duration-500 ease-in-out lg:block
                    `}>
                        <div className="bg-text/[0.02] border border-text/5 rounded-2xl p-6 lg:sticky lg:top-24">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-bold text-lg">필터</h3>
                                <button
                                    onClick={resetFilters}
                                    className="text-xs text-text/50 hover:text-text transition-colors"
                                >
                                    초기화
                                </button>
                            </div>

                            {/* 상태 필터 */}
                            <div className="mb-8">
                                <h4 className="font-bold text-sm mb-4">상태</h4>
                                <div className="space-y-3">
                                    {STATUS_OPTIONS.map(status => (
                                        <label key={status.value} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer appearance-none w-4 h-4 rounded-[4px] border border-text/20 checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                                                    checked={selectedStatuses.includes(status.value)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) setSelectedStatuses([...selectedStatuses, status.value]);
                                                        else setSelectedStatuses(selectedStatuses.filter(v => v !== status.value));
                                                    }}
                                                />
                                                <svg className="absolute w-3 h-3 top-0.5 left-0.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-text/70 group-hover:text-text transition-colors flex items-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
                                                {status.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* 메인 콘텐츠 (해커톤 리스트) */}
                <div className="flex-1 w-full flex flex-col">
                    {/* 상단 검색 및 정렬 바 */}
                    <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                        <div className="flex items-center gap-4">
                            <h2 className="font-bold text-text/80">
                                전체 <span className="text-text font-black">{filtered.length}</span>개 해커톤
                            </h2>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative">
                                <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="해커톤 검색..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-48 sm:w-64 pl-9 pr-3 py-2 rounded-xl bg-text/5 border border-text/10 placeholder-text/50 focus:outline-none focus:border-primary/50 focus:bg-text/10 transition-all text-sm"
                                />
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 rounded-xl bg-text/5 border border-text/10 text-sm focus:outline-none focus:border-primary/50 cursor-pointer text-text/80 font-medium"
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>

                            {/* 뷰 토글 버튼들 */}
                            <div className="flex bg-text/5 border border-text/10 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-text text-background shadow-sm" : "text-text/50 hover:text-text"}`}
                                    aria-label="그리드 뷰"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" /></svg>
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-text text-background shadow-sm" : "text-text/50 hover:text-text"}`}
                                    aria-label="리스트 뷰"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 해커톤 리스트 */}
                    {filtered.length > 0 ? (
                        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-5"}>
                            {filtered.map((h) => (
                                <HackathonCard
                                    key={h.id}
                                    hackathon={h}
                                    isBookmarked={isBookmarked(h.id)}
                                    onToggleBookmark={toggleBookmark}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-text/[0.02] border border-text/5 rounded-3xl mt-4">
                            <div className="text-6xl mb-4 opacity-50">🔍</div>
                            <h3 className="text-xl font-bold mb-2 text-text/80">
                                검색 결과가 없습니다
                            </h3>
                            <p className="opacity-50 text-sm">
                                필터 조건을 변경하거나 다른 검색어를 입력해보세요.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="mt-6 px-6 py-2 rounded-xl bg-primary text-background font-bold hover:opacity-90 transition-opacity"
                            >
                                필터 초기화하기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
