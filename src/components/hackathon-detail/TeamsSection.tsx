import { Badge, Button, Card } from "../ui";
import Link from "next/link";
import { Team } from "@/data/teams";
import { users } from "@/data/users";

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
                        <Card key={team.id} className="p-6 transition-all hover:border-primary/30" hover>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg tracking-tight">{team.name}</h3>
                                        <Badge variant={team.isRecruiting ? "emerald" : "slate"}>
                                            {team.isRecruiting ? "모집중" : "완료"}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-primary font-bold">{team.hackathonTitle}</p>
                                </div>
                            </div>

                            <p className="text-sm text-text/60 mb-6 line-clamp-2 min-h-[40px] leading-relaxed">
                                {team.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {team.members.map((m, idx) => {
                                        const user = users.find(u => u.id === m.userId);
                                        return (
                                            <div
                                                key={m.userId || idx}
                                                className="w-8 h-8 rounded-full border-2 border-background bg-text/10 flex items-center justify-center overflow-hidden shadow-sm"
                                                title={user?.name}
                                            >
                                                {user?.avatarUrl ? (
                                                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-[10px] font-bold text-text/60">{user?.name.charAt(0)}</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <Link href={`/camp/${team.id}`}>
                                    <Button variant="outline" size="sm" className="border-text/10 hover:bg-text/5 text-text font-bold px-4">상세보기</Button>
                                </Link>
                            </div>
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