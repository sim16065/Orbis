import Link from "next/link";
import { hackathons } from "@/data/hackathons";
import { teams } from "@/data/teams";
import { leaderboards } from "@/data/leaderboards";
import HackathonCard from "@/components/hackathon-card";

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
    <div className="w-full">
      {/* ── 히어로 섹션 ── */}
      <section className="relative overflow-hidden pt-12 pb-32 w-full">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-3xl" />
          {/* 그리드 패턴 */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="text-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            지금 12개의 해커톤이 진행 중입니다
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight tracking-tight animate-fade-in-up">
            아이디어를{" "}
            <span className="gradient-text">현실로</span>
            <br />
            만드는 공간
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            최고의 해커톤을 찾고, 꿈의 팀을 꾸리고, 함께 세상을 바꾸세요.
            <br />
            Orbis에서 당신의 다음 도전이 시작됩니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200">
            <Link
              href="/hackathons"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg shadow-xl shadow-violet-500/30 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>⚡</span>
              해커톤 둘러보기
            </Link>
            <Link
              href="/camp"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>👥</span>
              팀 모집 보기
            </Link>
          </div>
        </div>
      </section>

      {/* ── 통계 섹션 ── */}
      <section className="pb-16 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-violet-500/30 transition-colors"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 추천 해커톤 ── */}
      <section className="pb-20 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">🔥 지금 인기 해커톤</h2>
            <p className="text-slate-400">놓치면 후회할 해커톤들</p>
          </div>
          <Link
            href="/hackathons"
            className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHackathons.map((h) => (
            <HackathonCard key={h.id} hackathon={h} />
          ))}
        </div>
      </section>

      {/* ── 팀 모집 ── */}
      <section className="pb-20 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">👥 팀원 모집 중</h2>
            <p className="text-slate-400">나를 기다리는 팀을 찾아보세요</p>
          </div>
          <Link
            href="/camp"
            className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topTeams.map((team) => (
            <div
              key={team.id}
              className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold text-base">{team.name}</h3>
                  <p className="text-xs text-violet-400 mt-0.5">{team.hackathonTitle}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  모집중
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-3 line-clamp-2">{team.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {team.requiredSkills.slice(0, 2).map((skill) => (
                  <span key={skill} className="px-2 py-0.5 rounded-md bg-violet-500/15 text-violet-300 text-xs border border-violet-500/25">
                    {skill}
                  </span>
                ))}
              </div>
              <Link
                href="/camp"
                className="block text-center py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all"
              >
                팀 합류 신청
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── 랭킹 미리보기 ── */}
      <section className="pb-20 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">🏆 이번 달 TOP 랭커</h2>
            <p className="text-slate-400">해커톤을 정복한 최고의 개발자들</p>
          </div>
          <Link
            href="/rankings"
            className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          {topRankers.map((ranker, i) => {
            const medalEmoji = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
            const badgeColors: Record<string, string> = {
              diamond: "text-cyan-400",
              platinum: "text-violet-400",
              gold: "text-amber-400",
              silver: "text-slate-300",
              bronze: "text-amber-700",
            };
            return (
              <div
                key={ranker.userId}
                className={`flex items-center gap-4 px-6 py-4 ${i < topRankers.length - 1 ? "border-b border-white/5" : ""
                  } ${i === 0 ? "bg-gradient-to-r from-amber-500/5 to-transparent" : ""} hover:bg-white/5 transition-colors`}
              >
                <span className="w-8 text-center">{medalEmoji || ranker.rank}</span>
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">{ranker.displayName.charAt(0)}</div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{ranker.displayName}</p>
                  <p className="text-slate-500 text-xs">@{ranker.username}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${badgeColors[ranker.badge]}`}>
                    {ranker.totalPoints.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">포인트</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
