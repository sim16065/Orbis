import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    isLoading?: boolean;
}

export function Button({
    variant = "primary",
    size = "md",
    children,
    isLoading,
    className = "",
    ...props
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 focus:ring-violet-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40",
        secondary:
            "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm focus:ring-white/30",
        ghost:
            "text-slate-300 hover:text-white hover:bg-white/10 focus:ring-white/20",
        danger:
            "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 focus:ring-red-500",
        outline:
            "border border-violet-500 text-violet-400 hover:bg-violet-500/10 focus:ring-violet-500",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm gap-1.5",
        md: "px-5 py-2.5 text-sm gap-2",
        lg: "px-7 py-3.5 text-base gap-2.5",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
}

interface BadgeProps {
    children: React.ReactNode;
    variant?: "violet" | "emerald" | "amber" | "rose" | "sky" | "slate";
    className?: string;
}

export function Badge({
    children,
    variant = "violet",
    className = "",
}: BadgeProps) {
    const variants = {
        violet: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
        emerald: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        amber: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
        rose: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
        sky: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
        slate: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
    return (
        <div
            className={`bg-slate-800/60 border border-white/10 rounded-2xl backdrop-blur-sm ${hover
                    ? "transition-all duration-300 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1"
                    : ""
                } ${className}`}
        >
            {children}
        </div>
    );
}
