"use client";

import Link from "next/link";
import { Hackathon } from "@/data/hackathons";
import { Badge } from "@/components/ui";
import Image from "next/image";

interface HackathonCardProps {
    hackathon: Hackathon;
    isBookmarked?: boolean;
    onToggleBookmark?: (id: string) => void;
    viewMode?: "grid" | "list";
}

const statusConfig: Record<
    Hackathon["status"],
    {
        label: string;
        variant: "emerald" | "violet" | "slate";
        style: string;
    }
> = {
    upcoming: {
        label: "모집중",
        variant: "emerald",
        style: "!text-white border-emerald-600 bg-emerald-600/70 backdrop-blur-md",
    },
    ongoing: {
        label: "진행중",
        variant: "violet",
        style: "!text-white border-violet-600 bg-violet-600/70 backdrop-blur-md",
    },
    ended: {
        label: "종료",
        variant: "slate",
        style: "!text-white/90 border-white/10 bg-black/40 backdrop-blur-md",
    },
};

const modeConfig: Record<Hackathon["mode"], string> = {
    online: "🌐 온라인",
    offline: "📍 오프라인",
    hybrid: "🔀 하이브리드",
};

const badgeBaseClass =
    "inline-flex h-6 min-w-[52px] items-center justify-center px-2.5 text-[10px] leading-none font-black rounded-md";

function getDDayText(registrationDeadline: string) {
    const now = new Date();
    const deadline = new Date(registrationDeadline);
    const timeToDeadline = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(timeToDeadline / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `D-${diffDays}`;
    if (diffDays === 0) return "D-DAY";
    return "CLOSED";
}

export default function HackathonCard({
    hackathon,
    isBookmarked = false,
    onToggleBookmark,
    viewMode = "grid",
}: HackathonCardProps) {
    const bookmarked = isBookmarked;
    const isEnded = hackathon.status === "ended";
    const showTimeInfo = hackathon.status === "upcoming";
    const currentStatus = statusConfig[hackathon.status];
    const dDayText = getDDayText(hackathon.registrationDeadline);

    const imageClassName = `object-cover filter ${isEnded
        ? "grayscale-0 saturate-[0.7] opacity-60 brightness-[1.1] contrast-[0.9]"
        : ""
        }`;

    const handleBookmark = () => {
        onToggleBookmark?.(hackathon.id);
    };

    const renderStatusBadges = (position: "list" | "grid") => (
        <div className={position === "list" ? "absolute top-3 left-3 flex gap-2" : "absolute top-4 left-4 flex gap-2"}>
            <Badge
                variant={currentStatus.variant}
                className={`${badgeBaseClass} uppercase transition-all ${currentStatus.style}`}
            >
                {currentStatus.label}
            </Badge>

            {showTimeInfo && (
                <Badge
                    variant="secondary"
                    className={`${badgeBaseClass} bg-accent/90 text-white shadow-xl backdrop-blur-sm animate-pulse-slow`}
                >
                    {dDayText}
                </Badge>
            )}
        </div>
    );

    return viewMode === "list" ? (
        // 리스트 뷰
        <div className="relative h-full">
            <Link
                href={`/hackathons/${hackathon.slug}`}
                className={viewMode === "list" ? "group block h-full" : "group/card block h-full"}
            >
                <div className="relative h-full overflow-hidden rounded-2xl border border-text/10 bg-text/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 sm:flex">
                    <div className="relative h-32 flex-shrink-0 overflow-hidden sm:h-auto sm:w-72">
                        <Image
                            src={hackathon.imageUrl}
                            alt={hackathon.title}
                            fill
                            className={imageClassName}
                        />

                        {isEnded && <div className="absolute inset-0 bg-background/40" />}

                        {renderStatusBadges("list")}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                        <div className="mb-1 pr-10">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text/40">
                                {hackathon.organizer}
                            </p>
                        </div>

                        <h3 className="mb-2 line-clamp-1 text-xl font-bold transition-colors group-hover:text-primary">
                            {hackathon.title}
                        </h3>

                        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text/60">
                            {hackathon.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between border-t border-text/5 pt-4">
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-bold text-text/50">
                                    💰 {hackathon.prize}
                                </span>
                                <span className="text-[11px] font-bold text-text/50">
                                    {modeConfig[hackathon.mode]}
                                </span>
                            </div>

                            <span className="text-[11px] font-medium text-text/40">
                                참가 {hackathon.participants.toLocaleString()}팀
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            <button
                type="button"
                onClick={handleBookmark}
                aria-label={bookmarked ? "북마크 해제" : "북마크 추가"}
                aria-pressed={bookmarked}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-background/40 backdrop-blur-md transition-all hover:bg-text hover:text-background"
            >
                <svg
                    className={`h-4 w-4 ${bookmarked ? "text-accent" : ""}`}
                    fill={bookmarked ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
            </button>
        </div>
    ) : (

        // 그리드 뷰
        <div className="relative h-full">
            <Link
                href={`/hackathons/${hackathon.slug}`}
                className="group/card block h-full"
            >
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-text/10 bg-text/5 transition-all duration-500 group-hover/card:-translate-y-2 group-hover/card:border-primary/40 group-hover/card:shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)]">                    <div className="relative h-52 flex-shrink-0 overflow-hidden sm:h-56">
                    <Image
                        src={hackathon.imageUrl}
                        alt={hackathon.title}
                        fill
                        className={imageClassName}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

                    {renderStatusBadges("grid")}


                </div>

                    <div className="relative z-10 -mt-4 flex flex-1 flex-col bg-gradient-to-b from-transparent to-background/20 px-5 py-5">
                        <p className="mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-text/30">
                            {hackathon.organizer}
                        </p>

                        <h3 className="mb-4 line-clamp-2 text-lg font-bold leading-tight transition-colors group-hover/card:text-primary">
                            {hackathon.title}
                        </h3>

                        <div className="mt-auto flex items-end justify-between border-t border-text/5 pt-4">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-bold uppercase tracking-widest text-text/30">
                                    Location
                                </span>
                                <span className="text-[11px] font-bold text-text/70">
                                    {modeConfig[hackathon.mode]}
                                </span>
                            </div>

                            <div className="flex flex-col text-right">
                                <span className="text-[8px] font-bold tracking-widest text-text/30">
                                    총 상금
                                </span>
                                <span className="text-xl font-black leading-none tracking-tighter italic text-primary">
                                    {hackathon.prize}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            <button
                type="button"
                onClick={handleBookmark}
                aria-label={bookmarked ? "북마크 해제" : "북마크 추가"}
                aria-pressed={bookmarked}
                className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-background/40 backdrop-blur-md transition-all hover:bg-text hover:text-background"
            >
                <svg
                    className={`h-4 w-4 ${bookmarked ? "text-accent" : "text-text/40"}`}
                    fill={bookmarked ? "currentColor" : "none"}
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
            </button>
        </div>
    )
}