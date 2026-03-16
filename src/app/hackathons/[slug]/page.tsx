"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hackathons } from "@/data/hackathons";
import { teams } from "@/data/teams";
import { Badge, Button, Card } from "@/components/ui";
import { useBookmarks } from "@/lib/hooks";

export default function HackathonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const hackathon = hackathons.find((h) => h.slug === slug);
    const { isBookmarked, toggleBookmark } = useBookmarks();

    if (!hackathon) {
        notFound();
    }

    const relatedTeams = teams.filter((t) => t.hackathonId === hackathon.id);

    return (
        <div className="min-h-screen pb-20 bg-background text-text">
            {/* 히어로/배너 */}
            <div className="relative h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-secondary/60 to-background z-10" />
                <div
                    className="absolute inset-0 bg-center bg-cover scale-105 blur-sm"
                    style={{ backgroundImage: `url(${hackathon.imageUrl || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000'})` }}
                />

                <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="violet">{hackathon.status === 'upcoming' ? '모집중' : hackathon.status === 'ongoing' ? '진행중' : '종료'}</Badge>
                        <Badge variant="sky">{hackathon.mode === 'online' ? '온라인' : hackathon.mode === 'offline' ? '오프라인' : '하이브리드'}</Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        {hackathon.title}
                    </h1>
                    <div className="flex items-center gap-4 text-text/70">
                        <span className="flex items-center gap-1.5">
                            <span className="text-primary font-bold">주최</span> {hackathon.organizer}
                        </span>
                        <span className="text-text/40">|</span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-primary font-bold">상금</span> {hackathon.prize}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 메인 콘텐츠 */}
                <div className="lg:col-span-2 space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full" />
                            해커톤 정보
                        </h2>
                        <div className="prose prose-invert max-w-none text-text/70 leading-relaxed">
                            <p className="whitespace-pre-wrap">{hackathon.longDescription}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-secondary rounded-full" />
                            기술 스택
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {hackathon.tags.map((tag) => (
                                <span key={tag} className="px-4 py-2 rounded-xl bg-text/5 border border-text/10 font-medium text-text/90">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <span className="w-1 h-6 bg-accent rounded-full" />
                                이 대회의 팀 모집 ({relatedTeams.length})
                            </h2>
                            <Link href="/camp" className="text-primary text-sm hover:underline">더 보기</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {relatedTeams.length > 0 ? (
                                relatedTeams.map((team) => (
                                    <Card key={team.id} className="p-5" hover>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold">{team.name}</h3>
                                            <Badge variant={team.isRecruiting ? "emerald" : "slate"}>
                                                {team.isRecruiting ? "모집중" : "완료"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-text/60 mb-4 line-clamp-2">{team.description}</p>
                                        <div className="flex -space-x-2 mb-4">
                                            {team.members.map((m, i) => (
                                                <div key={m.id} className="w-8 h-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-background text-[10px] font-bold">
                                                    {m.name.charAt(0)}
                                                </div>
                                            ))}
                                        </div>
                                        <Button variant="secondary" size="sm" className="w-full bg-text/5 hover:bg-text/10 text-text">팀 상세보기</Button>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-full py-10 text-center border-2 border-dashed border-text/5 rounded-2xl bg-text/5">
                                    <p className="text-text/50">아직 등록된 팀이 없습니다. 첫 번째 팀을 만들어보세요!</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* 사이드바 정보 */}
                <div className="space-y-6">
                    <Card className="p-6 sticky top-24">
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs text-text/50 uppercase tracking-wider font-bold mb-1">참가비</p>
                                <p className="text-xl font-bold">무료</p>
                            </div>

                            <div>
                                <p className="text-xs text-text/50 uppercase tracking-wider font-bold mb-1">접수 마감</p>
                                <p className="text-xl font-bold">
                                    {new Date(hackathon.registrationDeadline).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            <div className="pt-2">
                                <p className="text-xs text-text/50 uppercase tracking-wider font-bold mb-1">진행 기간</p>
                                <p className="text-text/70">
                                    {hackathon.startDate} ~ {hackathon.endDate}
                                </p>
                            </div>

                            {hackathon.location && (
                                <div>
                                    <p className="text-xs text-text/50 uppercase tracking-wider font-bold mb-1">장소</p>
                                    <p className="text-text/70">{hackathon.location}</p>
                                </div>
                            )}

                            <div className="space-y-3 pt-6 border-t border-text/10">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-background" size="lg">참가하기</Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-text/10 hover:bg-text/5 text-text"
                                    size="lg"
                                    onClick={() => toggleBookmark(hackathon.id)}
                                >
                                    {isBookmarked(hackathon.id) ? "관심 목록에서 제거" : "관심 목록에 추가"}
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-primary/20">
                        <h3 className="font-bold mb-2">팀이 없으신가요?</h3>
                        <p className="text-sm text-text/60 mb-4">
                            참가하고 싶지만 팀원이 없다면, 팀 빌딩 게시판에서 함께할 동료를 찾아보세요.
                        </p>
                        <Link href="/camp">
                            <Button variant="ghost" className="w-full bg-background/50 hover:bg-background/80 text-text">팀원 찾으러 가기</Button>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    );
}
