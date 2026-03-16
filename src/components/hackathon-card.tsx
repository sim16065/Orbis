"use client";

import Link from "next/link";
import { useState } from "react";
import { Hackathon } from "@/data/hackathons";
import { Badge } from "@/components/ui";
import Image from "next/image";

interface HackathonCardProps {
    hackathon: Hackathon;
    isBookmarked?: boolean;
    onToggleBookmark?: (id: string) => void;
    viewMode?: "grid" | "list";
}

const statusConfig = {
    upcoming: {
        label: "모집중",
        variant: "emerald" as const,
        style: "!text-white border-emerald-600 bg-emerald-600/70 backdrop-blur-md",
    },
    ongoing: {
        label: "진행중",
        variant: "violet" as const,
        style: "!text-white border-violet-600 bg-violet-600/70 backdrop-blur-md",
    },
    ended: {
        label: "종료",
        variant: "slate" as const,
        style: "!text-white/90 border-white/10 bg-black/40 backdrop-blur-md",
    },
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
    viewMode = "grid",
}: HackathonCardProps) {
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    /* 날짜 계산 로직 */
    const now = new Date();
    const deadline = new Date(hackathon.registrationDeadline);
    const timeToDeadline = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(timeToDeadline / (1000 * 60 * 60 * 24));

    const dDayText = diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? "D-DAY" : "CLOSED";
    const showTimeInfo = hackathon.status === "upcoming";

    const currentStatus = statusConfig[hackathon.status];

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setBookmarked(!bookmarked);
        onToggleBookmark?.(hackathon.id);
    };

    return (
        <Link href={`/hackathons/${hackathon.slug}`} className="group block h-full">
            {viewMode === "list" ? (
                /* 리스트 뷰 레이아웃 */
                <div className="relative bg-text/5 border border-text/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 sm:flex h-full">
                    {/* 왼쪽 이미지 영역 */}
                    <div className="sm:w-72 sm:h-auto h-32 flex-shrink-0 relative overflow-hidden">
                        <Image
                            src={hackathon.imageUrl}
                            alt={hackathon.title}
                            fill
                            className={`object-cover transition-transform duration-700 filter 
                                ${hackathon.status === "ended"
                                    ? 'grayscale-0 saturate-[0.7] opacity-60 brightness-[1.1] contrast-[0.9]'
                                    : 'group-hover/card:scale-110'
                                }`}
                        />
                        {/* 종료 시 오버레이 */}
                        {hackathon.status === "ended" && <div className="absolute inset-0 bg-background/40" />}

                        <div className="absolute top-3 left-3 flex gap-2">
                            <Badge
                                variant={currentStatus.variant}
                                className={`h-6 min-w-[52px] justify-center px-2.5 text-[10px] leading-none font-black uppercase rounded-md backdrop-blur-md transition-all ${currentStatus.style}`}
                            >
                                {currentStatus.label}
                            </Badge>
                            {showTimeInfo && (
                                <Badge
                                    variant="secondary"
                                    className="h-6 min-w-[52px] justify-center px-2.5 text-[10px] leading-none font-black rounded-md bg-accent/90 text-white shadow-xl backdrop-blur-sm animate-pulse-slow"
                                >
                                    {dDayText}
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-[10px] text-text/40 tracking-widest font-bold uppercase">{hackathon.organizer}</p>
                            <button onClick={handleBookmark} className="z-10 p-1.5 rounded-full hover:bg-white/10 transition-colors">
                                <svg className={`w-4 h-4 ${bookmarked ? 'text-accent' : 'text-text/40'}`} fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </button>
                        </div>

                        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">{hackathon.title}</h3>
                        <p className="text-text/60 text-sm mb-4 line-clamp-2 leading-relaxed">{hackathon.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-text/5 mt-auto">
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] text-text/50 font-bold">💰 {hackathon.prize}</span>
                                <span className="text-[11px] text-text/50 font-bold">{modeConfig[hackathon.mode]}</span>
                            </div>
                            <span className="text-[11px] text-text/40 font-medium">참가 {hackathon.participants.toLocaleString()}팀</span>
                        </div>
                    </div>
                </div>
            ) : (
                /* 그리드 뷰 레이아웃 (Cinematic Style) */
                <div className="relative bg-text/5 border border-text/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)] hover:-translate-y-2 h-full flex flex-col group/card">

                    {/* 이미지 영역 */}
                    <div className="relative h-52 sm:h-56 overflow-hidden flex-shrink-0">
                        <Image
                            src={hackathon.imageUrl}
                            alt={hackathon.title}
                            fill
                            className={`object-cover transition-transform duration-700 filter 
                                ${hackathon.status === "ended"
                                    ? 'grayscale-0 saturate-[0.7] opacity-60 brightness-[1.1] contrast-[0.9]'
                                    : 'group-hover/card:scale-110'
                                }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

                        {/* 배지 */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <Badge
                                variant={currentStatus.variant}
                                className={`h-6 min-w-[52px] justify-center px-2.5 text-[10px] leading-none font-black uppercase rounded-md backdrop-blur-md transition-all ${currentStatus.style}`}
                            >
                                {currentStatus.label}
                            </Badge>
                            {showTimeInfo && (
                                <Badge
                                    variant="secondary"
                                    className="h-6 min-w-[52px] justify-center px-2.5 text-[10px] leading-none font-black rounded-md bg-accent/90 text-white shadow-xl backdrop-blur-sm animate-pulse-slow"
                                >
                                    {dDayText}
                                </Badge>
                            )}
                        </div>

                        <button onClick={handleBookmark} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/40 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-text hover:text-background transition-all">
                            <svg className={`w-4 h-4 ${bookmarked ? 'text-accent' : ''}`} fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </button>
                    </div>

                    {/* 텍스트 영역 */}
                    <div className="px-5 py-5 flex flex-col flex-1 -mt-4 relative z-10 bg-gradient-to-b from-transparent to-background/20">
                        <p className="text-[9px] text-text/30 mb-1 tracking-[0.2em] font-black uppercase">{hackathon.organizer}</p>
                        <h3 className="font-bold text-lg mb-4 leading-tight group-hover/card:text-primary transition-colors line-clamp-2">{hackathon.title}</h3>

                        <div className="flex items-end justify-between border-t border-text/5 pt-4 mt-auto">
                            <div className="flex flex-col">
                                <span className="text-[8px] text-text/30 tracking-widest font-bold uppercase">Location</span>
                                <span className="text-[11px] font-bold text-text/70">{modeConfig[hackathon.mode]}</span>
                            </div>

                            <div className="flex flex-col text-right">
                                <span className="text-[8px] text-text/30 tracking-widest font-bold uppercase">Total Prize</span>
                                <span className="text-primary font-black text-xl leading-none tracking-tighter italic">
                                    {hackathon.prize}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Link>
    );
}