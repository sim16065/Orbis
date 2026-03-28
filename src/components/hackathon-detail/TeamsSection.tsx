import { Badge, Button, Card } from "../ui";
import Link from "next/link";
import { Team } from "@/data/teams";

type TeamsSectionProps = {
    teams: Team[];
};

export function TeamsSection({ teams }: TeamsSectionProps) {
    return (
        <section id="teams" className="scroll-mt-36">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-sky-500 rounded-full" />
                    참가 팀 정보 ({teams.length})
                </h2>
                <Link href="/camp" className="text-primary text-sm hover:underline font-bold">팀 찾기 &rarr;</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <Card key={team.id} className="p-5" hover>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold">{team.name}</h3>
                                <Badge variant={team.isRecruiting ? "emerald" : "slate"}>
                                    {team.isRecruiting ? "모집중" : "완료"}
                                </Badge>
                            </div>
                            <p className="text-sm text-text/60 mb-4 line-clamp-2">{team.description}</p>
                            <div className="flex -space-x-2 mb-4">
                                {team.members.map((m) => (
                                    <div key={m.id} className="w-8 h-8 rounded-full border-2 border-background bg-text/10 flex items-center justify-center text-text/80 text-[10px] font-bold">
                                        {m.name.charAt(0)}
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" size="sm" className="w-full border-text/10 hover:bg-text/5 text-text">팀 상세보기</Button>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center border-2 border-dashed border-text/10 rounded-2xl bg-text/5">
                        <p className="text-text/50">아직 등록된 팀이 없습니다. 첫 번째 팀을 만들어보세요!</p>
                    </div>
                )}
            </div>
        </section>
    );
}