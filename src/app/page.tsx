"use client";

import { Search, Users, Trophy, ArrowRight, Sparkles, Zap, Target, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { hackathons } from "@/data/hackathons";
import { teams } from "@/data/teams";

export default function HomePage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setMounted(true);
  }, []);

  // 실제 데이터 기반 통계
  const stats = {
    totalHackathons: hackathons.length,
    ongoingHackathons: hackathons.filter(h => h.status === "ongoing").length,
    upcomingHackathons: hackathons.filter(h => h.status === "upcoming").length,
    totalTeams: teams.length,
    recruitingTeams: teams.filter(t => t.isRecruiting).length,
    totalParticipants: hackathons.reduce((acc, h) => acc + h.participants, 0),
  };

  const features = [
    { 
      label: "스마트 탐색", 
      desc: "원하는 해커톤을 빠르게 찾아보세요", 
      Icon: Search,
      colorClass: "bg-primary/10 text-primary"
    },
    { 
      label: "팀 매칭", 
      desc: "완벽한 팀원을 만나보세요", 
      Icon: Users,
      colorClass: "bg-secondary/10 text-secondary"
    },
    { 
      label: "실시간 랭킹", 
      desc: "리더보드에서 순위를 확인하세요", 
      Icon: Trophy,
      colorClass: "bg-accent/10 text-accent"
    }
  ];

  const recentHackathons = hackathons
    .filter(h => h.status !== "ended")
    .slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-background text-text selection:bg-primary/30">
      {/* 배경 효과 */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_50%)] opacity-10" />
      <div className="fixed inset-0 -z-10 opacity-[0.02] noise-bg pointer-events-none" />

      {/* 히어로 섹션 */}
      <section className="w-full max-w-[1440px] mx-auto px-6 pt-8 md:pt-16 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 왼쪽 콘텐츠 */}
          <div className="flex flex-col items-start space-y-6 md:space-y-8 animate-fade-in">
            {/* 뱃지 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              {currentYear} Tech Hackathon Platform
            </div>

            {/* 메인 타이틀 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-balance">
              해커톤의 모든 것을{" "}
              <span className="text-primary">한 곳에서 완성</span>하세요
            </h1>

            {/* 서브텍스트 */}
            <p className="text-text/60 text-base md:text-lg max-w-xl leading-relaxed">
              탐색부터 팀빌딩, 제출, 랭킹까지 - 당신의 해커톤 여정을{" "}
              <span className="text-text font-semibold">ORBIS</span>가 함께합니다
            </p>

            {/* 피처 카드 그룹 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-2">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="bg-text/[0.03] border border-text/5 p-4 md:p-5 rounded-2xl hover:bg-text/[0.06] hover:border-text/10 transition-all group cursor-default"
                >
                  <div className={`w-10 h-10 rounded-xl ${feature.colorClass} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <feature.Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{feature.label}</h3>
                  <p className="text-xs text-text/50 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA 버튼들 */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                href="/hackathons"
                className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-primary text-background font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group"
              >
                지금 시작하기
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/camp"
                className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-text/20 hover:bg-text/5 transition-all font-bold flex items-center gap-2"
              >
                팀 찾아보기
              </Link>
            </div>
          </div>

          {/* 오른쪽 대시보드 카드 */}
          <div className="relative animate-fade-in-up delay-200">
            {/* 글로우 효과 */}
            <div className="absolute -inset-10 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative bg-card/50 border border-text/10 rounded-3xl md:rounded-[40px] p-6 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* 프로그레스 바 영역 */}
              <div className="space-y-5 md:space-y-6 mb-8 md:mb-12">
                <ProgressBar 
                  label="진행중 해커톤" 
                  value={stats.ongoingHackathons} 
                  max={stats.totalHackathons}
                  color="primary"
                />
                <ProgressBar 
                  label="모집중인 팀" 
                  value={stats.recruitingTeams} 
                  max={stats.totalTeams}
                  color="secondary"
                />
                <ProgressBar 
                  label="전체 참가율" 
                  value={94} 
                  max={100}
                  color="accent"
                  isPercent
                />
              </div>

              {/* 통계 그리드 */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <StatCard 
                  value={stats.totalParticipants} 
                  label="총 참가자" 
                  highlight 
                />
                <StatCard 
                  value={stats.totalHackathons} 
                  label="해커톤" 
                />
              </div>

              {/* 장식 */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-text/5 rounded-full pointer-events-none" />
              <div className="absolute -top-5 -left-5 w-20 h-20 border border-text/5 rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 최근 해커톤 섹션 */}
      <section className="w-full bg-text/[0.02] border-y border-text/5">
        <div className="max-w-[1440px] mx-auto px-6 py-16 md:py-20">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-2">🔥 지금 뜨는 해커톤</h2>
              <p className="text-text/50 text-sm md:text-base">놓치지 마세요! 현재 진행 중인 해커톤들</p>
            </div>
            <Link 
              href="/hackathons" 
              className="hidden md:flex items-center gap-1 text-primary font-bold text-sm hover:gap-2 transition-all"
            >
              전체 보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {recentHackathons.map((hackathon) => (
              <Link
                key={hackathon.id}
                href={`/hackathons/${hackathon.slug}`}
                className="group relative bg-card/50 border border-text/10 rounded-2xl overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img 
                    src={hackathon.imageUrl} 
                    alt={hackathon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                      hackathon.status === "ongoing" 
                        ? "bg-violet-600/80 text-white" 
                        : "bg-emerald-600/80 text-white"
                    }`}>
                      {hackathon.status === "ongoing" ? "진행중" : "모집중"}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold text-text/40 uppercase tracking-wider mb-1">
                    {hackathon.organizer}
                  </p>
                  <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {hackathon.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-text/50">
                    <span>💰 {hackathon.prize}</span>
                    <span>👥 {hackathon.participants}팀</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link 
            href="/hackathons" 
            className="md:hidden flex items-center justify-center gap-1 text-primary font-bold text-sm mt-6 py-3 border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors"
          >
            전체 해커톤 보기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why Orbis 섹션 */}
      <section className="w-full max-w-[1440px] mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-black mb-3">왜 ORBIS인가요?</h2>
          <p className="text-text/50 max-w-lg mx-auto">
            해커톤 참가자들을 위해 설계된 올인원 플랫폼
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: Target,
              title: "맞춤형 해커톤 추천",
              desc: "관심 분야와 기술 스택에 맞는 해커톤을 빠르게 찾아보세요",
              color: "primary"
            },
            {
              icon: Users,
              title: "스마트 팀 매칭",
              desc: "필요한 역할과 스킬을 가진 완벽한 팀원을 찾을 수 있어요",
              color: "secondary"
            },
            {
              icon: Zap,
              title: "실시간 랭킹 시스템",
              desc: "참여와 성과를 기반으로 한 공정한 랭킹 시스템",
              color: "accent"
            }
          ].map((item, i) => (
            <div 
              key={i}
              className="text-center p-6 md:p-8 rounded-2xl bg-text/[0.02] border border-text/5 hover:border-text/10 transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-${item.color}/10 flex items-center justify-center mx-auto mb-5`} style={{
                backgroundColor: `var(--${item.color})`,
                opacity: 0.1
              }}>
                <item.icon className="w-7 h-7" style={{ color: `var(--${item.color})` }} />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-text/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="w-full max-w-[1440px] mx-auto px-6 pb-16 md:pb-24">
        <div className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-text/10 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-5" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              지금 바로 시작하세요
            </h2>
            <p className="text-text/60 mb-6 max-w-md mx-auto">
              ORBIS와 함께 다음 해커톤에서 멋진 성과를 만들어보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/hackathons"
                className="px-8 py-4 rounded-full bg-primary text-background font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 inline-flex items-center justify-center gap-2"
              >
                해커톤 찾아보기
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/camp"
                className="px-8 py-4 rounded-full border border-text/20 hover:bg-text/5 transition-all font-bold inline-flex items-center justify-center"
              >
                팀 매칭하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// 프로그레스 바 컴포넌트
function ProgressBar({ 
  label, 
  value, 
  max, 
  color,
  isPercent = false 
}: { 
  label: string; 
  value: number; 
  max: number; 
  color: "primary" | "secondary" | "accent";
  isPercent?: boolean;
}) {
  const percentage = Math.round((value / max) * 100);
  const displayValue = isPercent ? `${value}%` : `${value}/${max}`;
  
  const colorClasses = {
    primary: "from-primary to-accent text-primary",
    secondary: "from-secondary to-accent text-secondary", 
    accent: "from-accent to-primary text-accent"
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold text-text/50 uppercase tracking-widest">
        <span>{label}</span>
        <span className={colorClasses[color].split(" ").pop()}>{displayValue}</span>
      </div>
      <div className="h-2.5 md:h-3 w-full bg-text/5 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colorClasses[color].split(" ").slice(0, 2).join(" ")} rounded-full transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// 통계 카드 컴포넌트
function StatCard({ 
  value, 
  label, 
  highlight = false 
}: { 
  value: number; 
  label: string; 
  highlight?: boolean;
}) {
  return (
    <div className="bg-text/5 border border-text/5 rounded-xl md:rounded-2xl p-4 md:p-6">
      <div className={`text-2xl md:text-3xl font-black mb-1 tracking-tight ${highlight ? "text-primary" : ""}`}>
        {value.toLocaleString()}
      </div>
      <div className="text-[10px] md:text-xs font-bold text-text/50 uppercase">{label}</div>
    </div>
  );
}
