"use client";

import { Search, Users, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { hackathons } from "@/data/hackathons";

export default function HomePage() {
  const totalParticipants = hackathons.reduce((acc, h) => acc + h.participants, 0);
  const totalHackathons = hackathons.length;
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-text selection:bg-primary/30">
      {/* ── 배경 효과 ── */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--primary)_0%,var(--background)_100%)] opacity-20" />
      <div className="fixed inset-0 -z-10 opacity-[0.03] noise-bg pointer-events-none" />

      {/* ── 메인 섹션 ── */}
      <main className="w-full max-w-[1440px] mx-auto px-6 pt-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* 왼쪽 콘텐츠 */}
          <div className="flex flex-col items-start space-y-8 animate-fade-in">
            {/* 뱃지 */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] md:text-xs font-bold tracking-wider uppercase">
              {currentYear} Tech Hackathon Platform
            </div>

            {/* 메인 타이틀 */}
            <h1 className="text-4xl md:text-6xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              해커톤의 모든 것을<br />
              <span className="text-primary text-primary">한 곳에서 완성</span>하세요
            </h1>

            {/* 서브텍스트 */}
            <p className="opacity-70 text-lg max-w-xl leading-relaxed">
              탐색부터 팀빌딩, 제출, 랭킹까지 - 당신의 해커톤 여정을 <span className="text-text font-semibold">ORBIS</span>가 함께합니다
            </p>

            {/* 피처 카드 그룹: gap을 줄여서 더 촘촘하고 세련되게 변경 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-4">
              {/* 카드 스타일: p-6 -> p-5로 살짝 축소 */}
              {[
                { label: "스마트 탐색", desc: "원하는 해커톤을 빠르게", color: "primary", Icon: Search },
                { label: "팀 매칭", desc: "완벽한 팀원을 찾으세요", color: "secondary", Icon: Users },
                { label: "실시간 랭킹", desc: "리더보드 순위 확인", color: "accent", Icon: Trophy }
              ].map((feature, i) => (
                <div key={i} className="bg-text/[0.03] border border-text/5 p-5 rounded-2xl hover:bg-text/[0.06] transition-all group cursor-default">
                  <div className={`w-9 h-9 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <feature.Icon className={`w-4 h-4 text-${feature.color}`} />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{feature.label}</h3>
                  <p className="text-[11px] opacity-50 leading-tight">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* 버튼들 */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Link
                href="/hackathons"
                className="px-8 py-4 rounded-full bg-primary text-background font-black hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group"
              >
                지금 시작하기
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/hackathons"
                className="px-8 py-4 rounded-full border border-text/20 hover:bg-text/5 transition-all font-bold"
              >
                둘러보기
              </Link>
            </div>
          </div>

          {/* 오른쪽 대시보드 카드 */}
          <div className="relative lg:block hidden animate-fade-in-up delay-200">
            {/* 장식용 글로우 */}
            <div className="absolute -inset-10 bg-primary/3 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative bg-text/[0.02] border border-text/10 rounded-[40px] p-10 shadow-2xl backdrop-blur-3xl overflow-hidden">
              {/* 프로그레스 바 영역 */}
              <div className="space-y-6 mb-12">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold opacity-50 uppercase tracking-widest">
                    <span>Performance</span>
                    <span className="text-primary">88%</span>
                  </div>
                  <div className="h-3 w-full bg-text/5 rounded-full overflow-hidden">
                    <div className="h-full w-[88%] bg-gradient-to-r from-primary to-accent rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold opacity-50 uppercase tracking-widest">
                    <span>Active Teams</span>
                    <span className="text-secondary">72%</span>
                  </div>
                  <div className="h-3 w-full bg-text/5 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-secondary to-accent rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold opacity-50 uppercase tracking-widest">
                    <span>Success Rate</span>
                    <span className="text-primary">94%</span>
                  </div>
                  <div className="h-3 w-full bg-text/5 rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-primary rounded-full shadow-[0_0_15px_var(--primary)]" />
                  </div>
                </div>
              </div>

              {/* 통계 그리드 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-text/5 border border-text/5 rounded-2xl p-6">
                  <div className="text-3xl font-black text-primary mb-1 tracking-tight">{totalParticipants.toLocaleString()}</div>
                  <div className="text-xs font-bold opacity-50 uppercase">누적 참가자</div>
                </div>
                <div className="bg-text/5 border border-text/5 rounded-2xl p-6">
                  <div className="text-3xl font-black mb-1 tracking-tight">{totalHackathons.toLocaleString()}</div>
                  <div className="text-xs font-bold opacity-50 uppercase">개최된 해커톤</div>
                </div>
              </div>

              {/* 하단 장식용 원 */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-text/5 rounded-full pointer-events-none" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

