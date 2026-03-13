"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    { href: "/hackathons", label: "해커톤" },
    { href: "/camp", label: "팀 찾기" },
    { href: "/rankings", label: "랭킹" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl flex justify-center">
                <div className="w-full max-w-[1440px] px-6 h-16 flex items-center justify-between">                {/* 로고 */}
                    {/* 로고 */}
                    <Link href="/" className="relative flex items-center group transition-transform hover:scale-105">
                        <div className="absolute -inset-2 bg-violet-600/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img src="/orbislogo.png" alt="로고" className="h-7 w-auto relative z-10" />
                    </Link>

                    {/* 2. 중간 여백: 이 div가 나머지 공간을 다 차지해서 메뉴를 우측으로 밀어냅니다. */}
                    <div className="flex items-center gap-12">
                        {/* 네비게이션 */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map(({ href, label }) => (

                                <Link
                                    key={href}
                                    href={href}
                                    className={`text-sm font-medium transition-colors ${pathname.startsWith(href) ? "text-emerald-400" : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        {/* 우측 액션 */}
                        <div className="flex items-center gap-4">
                            {isLoggedIn ? (
                                // 로그인 상태일 때
                                <div className="flex items-center gap-4">                                {/* 프로필 아바타 (예시) */}
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 border border-white/10" /><button
                                        onClick={() => setIsLoggedIn(false)}
                                        className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            ) : (
                                // 로그아웃 상태일 때
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsLoggedIn(true)}
                                        className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
                                    >
                                        로그인
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* 모바일 하단 네비게이션 */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-white/10 backdrop-blur-xl">
                <div className="flex">
                    {navItems.map(({ href, label }) => {
                        const isActive = pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex-1 flex flex-col items-center gap-1.5 py-4 text-sm font-bold transition-colors ${isActive ? "text-violet-400" : "text-slate-400"
                                    }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
