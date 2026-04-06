import { Team } from "@/data/teams";

interface CommunicationRulesProps {
    team: Team;
}

export function CommunicationRules({ team }: CommunicationRulesProps) {
    return (
        <section className="bg-card border border-text/10 rounded-3xl p-8">
            <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                <span className="text-2xl">💬</span> 커뮤니케이션 방식
            </h2>
            <p className="text-text/70 leading-relaxed text-sm font-medium">
                {team.communication}
            </p>
        </section>
    );
}
