"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hackathons } from "@/data/hackathons";
import { teams } from "@/data/teams";
import { Badge, Button, Card } from "@/components/ui";
import { useBookmarks, useTeamApplications } from "@/lib/hooks";
import { FileText, Award, CalendarDays, Trophy, Users, CheckCircle, Table, ChevronLeft } from "lucide-react";
import { SubmissionSection } from "@/components/hackathon-detail/SubmissionSection";
import { ScheduleSection } from "@/components/hackathon-detail/ScheduleSection";
import { PrizeSection } from "@/components/hackathon-detail/PrizeSection";
import { TeamsSection } from "@/components/hackathon-detail/TeamsSection";
import { LeaderboardSection } from "@/components/LeaderboardSection";
import { EvaluationSection } from "@/components/hackathon-detail/EvaluationSection";

const SECTIONS = [
    { id: "overview", label: "개요", icon: <FileText size={16} className="text-gray-500" /> },
    { id: "eval", label: "평가 기준", icon: <Award size={16} className="text-gray-500" /> },
    { id: "schedule", label: "일정", icon: <CalendarDays size={16} className="text-gray-500" /> },
    { id: "prize", label: "상금", icon: <Trophy size={16} className="text-gray-500" /> },
    { id: "teams", label: "팀 정보", icon: <Users size={16} className="text-gray-500" /> },
    { id: "submit", label: "제출 안내", icon: <CheckCircle size={16} className="text-gray-500" /> },
    { id: "leaderboard", label: "리더보드", icon: <Table size={16} className="text-gray-500" /> },
];

export default function HackathonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const hackathon = hackathons.find((h) => h.slug === slug);
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const { appliedTeams } = useTeamApplications();

    const [activeSection, setActiveSection] = useState("overview");

    useEffect(() => {
        if (hackathon) {
            document.title = `${hackathon.title} | Orbis`;
        }
    }, [hackathon]);

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 200; // Offset for top sticky nav

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const element = sectionElements[i];
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(SECTIONS[i].id);
                    break;
                }
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

                <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex flex-col pt-8 pb-10">
                    {/* 뒤로가기 버튼 */}
                    <Link 
                        href="/hackathons" 
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-text/70 hover:text-text transition-colors mb-4 w-fit"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        해커톤 목록
                    </Link>
                    
                    {/* 중앙 여백을 밀어내어 타이틀을 하단에 고정 */}
                    <div className="flex-1" />

                    <div>
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
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 메인 콘텐츠 */}
                {/* 메인 콘텐츠 */}
                <div className="lg:col-span-2 space-y-16 pb-20">
                    {/* 상단 네비게이션 */}
                    <nav className="sticky top-20 z-40 bg-background/90 backdrop-blur-md border-b border-text/10 pt-4 mb-8 -mx-6 px-6 sm:mx-0 sm:px-0">
                        <ul className="flex overflow-x-auto hide-scrollbar gap-6 text-sm font-bold">
                            {SECTIONS.map((s) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className={`flex flex-row items-center gap-2 pb-4 border-b-2 whitespace-nowrap transition-colors                                            
                                            ${activeSection === s.id ? 'border-primary text-primary' : 'border-transparent text-text/50 hover:text-text/80'}`}
                                    >
                                        {/* 아이콘 렌더링: 활성화 시 색상 변경을 위해 cloneElement 사용 혹은 className 조건부 부여 가능 */}
                                        <span className={activeSection === s.id ? 'text-primary' : 'text-text/40'}>
                                            {s.icon}
                                        </span>
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <section id="overview" className="scroll-mt-36">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full" />
                            개요
                        </h2>
                        <div className="prose prose-invert max-w-none text-text/70 leading-relaxed text-[16px] bg-text/[0.02] border border-text/5 p-6 rounded-2xl">
                            <p className="whitespace-pre-wrap">{hackathon.longDescription}</p>
                        </div>
                    </section>

                    <EvaluationSection evaluation={hackathon.evaluation} />
                    <ScheduleSection
                        registrationDeadline={hackathon.registrationDeadline}
                        startDate={hackathon.startDate}
                        endDate={hackathon.endDate}
                    />
                    <PrizeSection prize={hackathon.prize} />
                    <TeamsSection teams={relatedTeams} />
                    <SubmissionSection
                        endDate={hackathon.endDate}
                        items={hackathon.submission.items}
                        notices={hackathon.submission.notices}
                    />
                    <LeaderboardSection />
                </div>

                {/* 사이드바 정보 */}
                <div className="space-y-6 sticky top-24 h-[calc(100vh-8rem)] min-h-[500px] pb-10 overflow-y-auto hide-scrollbar">
                    <Card className="p-6">
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

                    {(() => {
                        // 실제 유저가 지원한 팀 목록 중, 현재 해커톤에 속한 팀 수색
                        const myTeamData = relatedTeams.find((t) => appliedTeams.includes(t.id));
                        const hasTeam = !!myTeamData;

                        if (hasTeam) {
                            return (
                                <Card className="p-6 bg-text/[0.03] border-text/10 shadow-sm relative overflow-hidden group">
                                    <h3 className="font-bold mb-2 text-[16px] flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary ring-2 ring-primary/20" />
                                        나의 팀: {myTeamData.name}
                                    </h3>
                                    <p className="text-sm text-text/60 mb-5 font-medium">
                                        멤버: 나 외 {myTeamData.members.length - 1}명
                                    </p>
                                    <Link href={`/camp/team/${myTeamData.id}`}>
                                        <Button className="w-full bg-primary/10 hover:bg-primary/20 text-  border border-primary/20 font-bold transition-all group-hover:bg-primary group-hover:text-background">
                                            내 팀 상세페이지로 이동
                                        </Button>
                                    </Link>
                                </Card>
                            );
                        }

                        return (
                            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-primary/20 shadow-sm">
                                <h3 className="font-bold mb-2 text-[16px]">팀이 없으신가요?</h3>
                                <p className="text-sm text-text/60 mb-5">
                                    참가하고 싶지만 팀원이 없다면, 팀 빌딩 게시판에서 함께할 동료를 찾아보세요.
                                </p>
                                <Link href="/camp">
                                    <Button variant="ghost" className="w-full bg-background/50 border border-text/5 hover:bg-background/80 text-text font-bold shadow-sm">
                                        팀원 찾으러 가기
                                    </Button>
                                </Link>
                            </Card>
                        );
                    })()}
                </div>
            </div>
        </div >
    );
}
