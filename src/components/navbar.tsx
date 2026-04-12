"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
    { href: "/hackathons", label: "해커톤" },
    { href: "/camp", label: "팀 찾기" },
    { href: "/rankings", label: "랭킹" },
];

interface NavLinkProps {
    href: string;
    label: string;
    isActive: boolean;
    isMobile?: boolean;
}

const NavLink = ({
    href,
    label,
    isActive,
    isMobile = false
}: NavLinkProps) => {
    const baseStyle = "transition-colors font-bold";
    const desktopStyle = `text-sm ${isActive ? "text-primary" : "text-text/60 hover:text-text"}`;
    const mobileStyle = `flex-1 flex flex-col items-center gap-1.5 py-4 text-sm ${isActive ? "text-primary" : "text-text/60"}`;

    return (
        <Link href={href} className={isMobile ? `${baseStyle} ${mobileStyle}` : `${baseStyle} ${desktopStyle}`}>
            {label}
        </Link>
    );
};

export default function Navbar() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("theme") as "light" | "dark" ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    // Hydration 이슈 방지: 클라이언트 마운트 전에는 아무것도 렌더링하지 않거나 플레이스홀더를 보여줍니다.
    if (!mounted) return null;

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-text/10 bg-background/80 backdrop-blur-xl flex justify-center">
                <div className="w-full max-w-[1440px] px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="relative flex items-center group">
                        <div className="absolute -inset-2 bg-primary/20 blur-lg rounded-full opacity-0" />
                        <img src="/orbislogo.png" alt="로고" className="h-30 w-auto relative z-10" />
                    </Link>

                    <div className="flex items-center gap-10">
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.href}
                                    {...item}
                                    isActive={pathname.startsWith(item.href)}
                                />
                            ))}
                        </nav>

                        <div className="flex items-center gap-6">
                            {isLoggedIn ? (
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border border-text/10 shadow-sm" />
                                    <button
                                        onClick={() => setIsLoggedIn(false)}
                                        className="text-[12px] font-bold text-text/60 hover:text-text transition-colors bg-text/5 px-3 py-1 rounded-md"                                    >
                                        로그아웃
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsLoggedIn(true)}
                                        className="text-xs font-medium text-text/60 hover:text-text transition-colors bg-text/5 px-3 py-1 rounded-md"
                                    >
                                        로그인
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={toggleTheme}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-text/5 hover:bg-text/10 border border-text/10 transition-all text-text/60 hover:text-text"
                                aria-label="테마 전환"
                            >
                                {theme === "light" ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 border-t border-text/10 backdrop-blur-xl">
                <div className="flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            {...item}
                            isActive={pathname.startsWith(item.href)}
                            isMobile={true}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}