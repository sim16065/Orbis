import { Card } from "./ui";

export function LeaderboardSection() {
    return (
        <section id="leaderboard" className="scroll-mt-36">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                실시간 리더보드 (예시)
            </h2>
            <Card className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-text/5 border-b border-text/10">
                            <tr>
                                <th className="p-4 font-bold text-text/50 whitespace-nowrap">순위</th>
                                <th className="p-4 font-bold text-text/50 whitespace-nowrap">팀 이름</th>
                                <th className="p-4 font-bold text-text/50">사용 기술</th>
                                <th className="p-4 font-bold text-text/50 text-right whitespace-nowrap">예상 득점</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { rank: 1, name: "Neon Builders", tech: "Next.js, Supabase, Tailwind CSS", score: 98 },
                                { rank: 2, name: "Crypto Knights", tech: "Solidity, React, Hardhat", score: 94 },
                                { rank: 3, name: "AI Rangers", tech: "Python, TensorFlow, FastAPI", score: 92 },
                                { rank: 4, name: "Eco Innovators", tech: "Flutter, Firebase, IoT", score: 87 },
                            ].map((team) => (
                                <tr key={team.rank} className="border-b border-text/5 last:border-0 hover:bg-text/[0.02] transition-colors">
                                    <td className="p-4 whitespace-nowrap">
                                        {team.rank === 1 ? <span className="text-xl">🥇</span> : team.rank === 2 ? <span className="text-xl">🥈</span> : team.rank === 3 ? <span className="text-xl">🥉</span> : <span className="px-2 text-text/50 font-bold">{team.rank}</span>}
                                    </td>
                                    <td className="p-4 font-black whitespace-nowrap">{team.name}</td>
                                    <td className="p-4 text-text/60">{team.tech}</td>
                                    <td className="p-4 text-right font-black text-primary text-lg">{team.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </section>
    );
}