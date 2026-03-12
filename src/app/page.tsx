import Link from "next/link";
import { hackathons } from "@/data/hackathons";
import { teams } from "@/data/teams";
import { leaderboards } from "@/data/leaderboards";
import HackathonCard from "@/components/hackathon-card";
import { Badge } from "@/components/ui";

export default function HomePage() {
  const featuredHackathons = hackathons.filter((h) => h.status !== "ended").slice(0, 3);
  const topTeams = teams.filter((t) => t.isRecruiting).slice(0, 3);
  const topRankers = leaderboards.slice(0, 5);

  const stats = [
    { label: "진행중인 해커톤", value: "12+", icon: "⚡" },
    { label: "등록된 팀", value: "340+", icon: "👥" },
    { label: "총 상금 규모", value: "5억+", icon: "💰" },
    { label: "활성 개발자", value: "8,200+", icon: "🚀" },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* ── 히어로 섹션 ── */}
      <section className="relative overflow-hidden pt-20 pb-48 w-full">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
          {/* 그리드 패턴 */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="text-center w-full max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-semibold mb-12 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            글로벌 최고 수준의 빌더들이 이곳에서 연결되고 있습니다
          </div>

          <h1 className="text-7xl md:text-[100px] font-black mb-10 leading-[1.05] tracking-tight animate-fade-in-up">
            아이디어를{" "}
            <span className="gradient-text">현실로</span>
            <br />
            만드는 공간
          </h1>

          <p className="text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100 font-light">
            최고의 해커톤을 찾고, 꿈의 팀을 꾸리고, 함께 세상을 바꾸세요.<br />
            Orbis는 당신의 기술적 성장을 위한 모든 여정을 함께합니다.
          </p>

          <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up delay-200">
            <Link
              href="/hackathons"
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xl shadow-2xl shadow-violet-500/40 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 hover:-translate-y-1"
            >
              해커톤 둘러보기
            </Link>
            <Link
              href="/camp"
              className="px-10 py-5 rounded-2xl bg-white/5 text-white font-bold text-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-md"
            >
              팀 모집 찾기
            </Link>
          </div>
        </div>
      </section>

      {/* ── 통계 섹션 ── */}
      <section className="py-32 w-full border-y border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">{stat.icon}</div>
              <div className="text-5xl font-black text-white mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-base text-slate-500 font-medium uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 추천 해커톤 ── */}
      <section className="py-48 w-full">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-16">
          <div>
            <h2 className="text-5xl font-black text-white mb-4 tracking-tight italic">🔥 NEXT CHALLENGE</h2>
            <p className="text-slate-400 text-lg">지금 바로 참여할 수 있는 최신 해커톤 리스트</p>
          </div>
          <Link
            href="/hackathons"
            className="group flex items-center gap-2 text-violet-400 font-bold text-lg hover:text-violet-300 transition-all"
          >
            전체 해커톤 보기
            <span className="transform group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredHackathons.map((h) => (
            <HackathonCard key={h.id} hackathon={h} />
          ))}
        </div>
      </section>

      {/* ── 팀 모집 ── (배경 반전 스타일) */}
      <section className="py-48 px-12 -mx-12 bg-white/[0.02] border-y border-white/5 rounded-[60px] w-[calc(100%+96px)]">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-16">
          <div>
            <h2 className="text-5xl font-black text-white mb-4 tracking-tight italic">👥 JOIN A TEAM</h2>
            <p className="text-slate-400 text-lg">나의 기술 스택과 열정을 필요로 하는 팀을 발견하세요</p>
          </div>
          <Link
            href="/camp"
            className="group flex items-center gap-2 text-indigo-400 font-bold text-lg hover:text-indigo-300 transition-all"
          >
            모든 공고 보기
            <span className="transform group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {topTeams.map((team) => (
            <div
              key={team.id}
              className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-white font-black text-xl mb-1">{team.name}</h3>
                  <p className="text-sm text-violet-400 font-medium">{team.hackathonTitle}</p>
                </div>
                <Badge variant="emerald">모집중</Badge>
              </div>
              <p className="text-slate-400 text-base mb-8 line-clamp-3 leading-relaxed">{team.description}</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {team.requiredSkills.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold border border-indigo-500/20">
                    {skill}
                  </span>
                ))}
              </div>
              <Link
                href="/camp"
                className="block text-center py-4 rounded-2xl bg-white/5 text-white font-bold text-sm tracking-widest hover:bg-white/10 transition-all border border-white/5"
              >
                상세 정보 및 지원
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── 랭킹 미리보기 ── */}
      <section className="py-48 w-full">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-16">
          <div>
            <h2 className="text-5xl font-black text-white mb-4 tracking-tight italic">🏆 HALL OF FAME</h2>
            <p className="text-slate-400 text-lg">해커톤 씬을 주도하고 있는 탑 랭커들</p>
          </div>
          <Link
            href="/rankings"
            className="text-white/40 hover:text-white font-bold transition-colors"
          >
            명예의 전당 보기
          </Link>
        </div>

        <div className="bg-slate-900/40 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-md px-4">
          {topRankers.map((ranker, i) => {
            const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
            return (
              <div
                key={ranker.userId}
                className={`flex items-center gap-6 px-10 py-10 ${i < topRankers.length - 1 ? "border-b border-white/5" : ""} hover:bg-white/[0.03] transition-all`}
              >
                <span className="w-12 text-3xl font-black text-slate-700 italic">{medal || ranker.rank}</span>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center font-black text-xl text-white shadow-xl shadow-violet-500/10">
                  {ranker.displayName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-xl mb-1">{ranker.displayName}</p>
                  <p className="text-slate-500 text-sm font-medium tracking-tight">@{ranker.username} • {ranker.badge.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white tracking-tight">
                    {ranker.totalPoints.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Points Scored</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div >
  );
}
