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
        "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90 focus:ring-primary shadow-lg shadow-primary/25 hover:shadow-primary/40",
        secondary:
            "bg-text/5 text-text border border-text/10 hover:bg-text/10 backdrop-blur-sm focus:ring-text/30",
        ghost:
            "text-text/70 hover:text-text hover:bg-text/10 focus:ring-text/20",
        danger:
            "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 focus:ring-red-500",
        outline:
            "border border-primary text-primary hover:bg-primary/10 focus:ring-primary",
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
    variant?: "violet" | "emerald" | "amber" | "rose" | "sky" | "slate" | "primary" | "secondary" | "accent";
    className?: string;
}

export function Badge({
    children,
    variant = "primary",
    className = "",
}: BadgeProps) {
    const variants: Record<string, string> = {
        // Semantic overrides for legacy variants to fit the current theme
        violet: "bg-violet-500/10 text-violet-400 border border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.1)]",
        emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
        amber: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
        sky: "bg-sky-500/10 text-sky-400 border border-sky-500/30",
        rose: "bg-rose-500/10 text-rose-400 border border-rose-500/30",
        slate: "bg-text/5 text-text/50 border border-text/10 opacity-70",
        // Direct semantic variants
        primary: "bg-primary/15 text-text font-bold border border-primary/30",
        secondary: "bg-secondary/15 text-text font-bold border border-secondary/30",
        accent: "bg-accent/15 text-text font-bold border border-accent/30",
    };


    return (
        <span className={`inline-flex items-center ${variants[variant] || variants.primary} ${className}`}>
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
            className={`bg-card border border-text/10 rounded-[2rem] p-8 transition-all duration-300 ${hover
                ? "hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                : ""
                } ${className}`}
        >
            {children}
        </div>
    );
}

