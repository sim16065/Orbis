import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Team } from "@/data/teams";
import { Hackathon } from "@/data/hackathons";

interface TeamHeaderProps {
    team: Team;
    hackathon?: Hackathon;
}

export function TeamHeader({ team, hackathon }: TeamHeaderProps) {
    return (
        <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
                {team.isRecruiting ? (
                    <span className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">모집중</span>
                    </span>
                ) : (
                    <span className="text-xs text-text/40 font-bold bg-text/5 px-3 py-1 rounded-full border border-text/10">
                        모집완료
                    </span>
                )}
                <Link href={`/hackathons/${hackathon?.slug || ""}`} className="inline-flex items-center gap-2 text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors">
                    {team.hackathonTitle}
                    <ExternalLink size={12} className="group-hover:opacity-70 transition-opacity" />
                </Link>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight">
                {team.name}
            </h1>

            <p className="text-lg text-text/70 leading-relaxed max-w-3xl whitespace-pre-line">
                {team.description}
            </p>
        </div>
    );
}
