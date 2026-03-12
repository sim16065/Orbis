"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "홈", icon: "🏠" },
    { href: "/hackathons", label: "해커톤", icon: "⚡" },
    { href: "/camp", label: "팀 모집", icon: "👥" },
    { href: "/rankings", label: "랭킹", icon: "🏆" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl flex justify-center">
            <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* 로고 */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                        <span className="text-white font-black text-sm">O</span>
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">
                        orbis
                    </span>
                </Link>

                {/* 네비게이션 */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map(({ href, label, icon }) => {
                        const isActive =
                            href === "/" ? pathname === "/" : pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 px-5 py-2.5 rounded-xl text-lg font-bold transition-all duration-200 ${isActive
                                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/30 shadow-inner"
                                    : "text-slate-300 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                <span>{icon}</span>
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* 우측 액션 */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/hackathons"
                        className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200"
                    >
                        <span>⚡</span>
                        참가 신청
                    </Link>
                </div>
            </div>

            {/* 모바일 하단 네비게이션 */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-white/10 backdrop-blur-xl">
                <div className="flex">
                    {navItems.map(({ href, label, icon }) => {
                        const isActive =
                            href === "/" ? pathname === "/" : pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex-1 flex flex-col items-center gap-1.5 py-4 text-sm font-bold transition-colors ${isActive ? "text-violet-400" : "text-slate-400"
                                    }`}
                            >
                                <span className="text-2xl">{icon}</span>
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}
