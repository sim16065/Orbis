"use client";

import Link from "next/link";
import { useState } from "react";
import { Hackathon } from "@/data/hackathons";
import { Badge } from "@/components/ui";

interface HackathonCardProps {
    hackathon: Hackathon;
    isBookmarked?: boolean;
    onToggleBookmark?: (id: string) => void;
}

const statusConfig = {
    upcoming: { label: "모집중", color: "emerald" as const },
    ongoing: { label: "진행중", color: "violet" as const },
    ended: { label: "종료", color: "slate" as const },
};


const modeConfig = {
    online: "🌐 온라인",
    offline: "📍 오프라인",
    hybrid: "🔀 하이브리드",
};

export default function HackathonCard({
    hackathon,
    isBookmarked = false,
    onToggleBookmark,
}: HackathonCardProps) {
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setBookmarked(!bookmarked);
        onToggleBookmark?.(hackathon.id);
    };

    const status = statusConfig[hackathon.status];
    const progress = Math.round(
        (hackathon.participants / hackathon.maxParticipants) * 100
    );

    return (
        <Link href={`/hackathons/${hackathon.slug}`} className="group block">
            <div className="relative bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1.5">
                {/* 상단 그라데이션 배너 */}
                <div className="h-24 bg-gradient-to-br from-violet-600/40 via-indigo-600/30 to-fuchsia-600/40 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                        <Badge variant={status.color}>{status.label}</Badge>
                    </div>
                    {/* 북마크 버튼 */}
                    <button
                        onClick={handleBookmark}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-black/50 hover:scale-110"
                        aria-label="북마크"
                    >
                        {bookmarked ? (
                            <svg
                                className="w-4 h-4 text-amber-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        ) : (
                            <svg
                                className="w-4 h-4 text-white/60"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="p-5">
                    {/* 주최사 */}
                    <p className="text-xs text-slate-400 mb-1.5 font-medium">
                        {hackathon.organizer}
                    </p>

                    {/* 제목 */}
                    <h3 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-violet-300 transition-colors line-clamp-2">
                        {hackathon.title}
                    </h3>

                    {/* 설명 */}
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                        {hackathon.description}
                    </p>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {hackathon.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-xs border border-white/10"
                            >
                                {tag}
                            </span>
                        ))}
                        {hackathon.tags.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 text-xs border border-white/10">
                                +{hackathon.tags.length - 3}
                            </span>
                        )}
                    </div>

                    {/* 참여자 진행도 */}
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                            <span>{modeConfig[hackathon.mode]}</span>
                            <span>
                                {hackathon.participants.toLocaleString()} /{" "}
                                {hackathon.maxParticipants.toLocaleString()}명
                            </span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* 하단 정보 */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div>
                            <p className="text-xs text-slate-500 mb-0.5">총 상금</p>
                            <p className="text-violet-400 font-bold text-base">
                                {hackathon.prize}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500 mb-0.5">마감일</p>
                            <p className="text-slate-300 text-sm font-medium">
                                {new Date(hackathon.registrationDeadline).toLocaleDateString(
                                    "ko-KR",
                                    { month: "short", day: "numeric" }
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
