"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import { teams } from "@/data/teams";
import { hackathons } from "@/data/hackathons";
import Link from "next/link";
import { useTeamApplications } from "@/lib/hooks";
import { ROLE_LABELS } from "@/data/roles";
import { Button } from "@/components/ui";

export default function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const team = teams.find((t) => t.id === id);
    const { isApplied, applyToTeam } = useTeamApplications();

    if (!team) {
        return <div className="min-h-screen flex items-center justify-center text-text text-xl font-bold">팀을 찾을 수 없습니다.</div>;
    }

    const hackathon = hackathons.find(h => h.id === team.hackathonId);
    const openSlots = team.maxMembers - team.members.length;
    const applied = isApplied(team.id);

    return (
        <div className="min-h-screen bg-background text-text transition-colors duration-300 pb-20">
            {/* 상단 네비게이션 */}
            <div className="border-b border-text/5 bg-text/[0.02]">
                <div className="max-w-[1200px] mx-auto px-6 py-4">
                    <Link href="/camp" className="inline-flex items-center gap-2 text-text/50 hover:text-text transition-colors text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        팀 빌딩 캠프로 돌아가기
                    </Link>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-12">
                {/* 헤더 (팀 인포) */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {team.isRecruiting ? (
                            <span className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">모집중</span>
                            </span>
                        ) : (
                            <span className="text-xs text-text/40 font-bold bg-text/5 px-3 py-1 rounded-full border border-text/10">
                                모집완료
                            </span>
                        )}
                        <Link href={`/hackathons/${hackathon?.slug || ''}`} className="text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors">
                            🏆 {team.hackathonTitle}
                        </Link>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-text mb-6 tracking-tight">
                        {team.name}
                    </h1>

                    <p className="text-lg text-text/70 leading-relaxed max-w-3xl whitespace-pre-line">
                        {team.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 메인 뷰 (좌측) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. 우리가 찾는 포지션 */}
                        <section className="bg-text/[0.02] border border-text/10 rounded-3xl p-8">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                🎯 모집 포지션
                            </h2>
                            {team.requiredRoles.length > 0 || team.requiredSkills.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {team.requiredRoles.map(roleId => (
                                            <span key={roleId} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-primary text-background shadow-sm">
                                                {ROLE_LABELS[roleId]}
                                            </span>
                                        ))}
                                    </div>
                                    {team.requiredSkills.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2 border-t border-text/5">
                                            {team.requiredSkills.map(skill => (
                                                <span key={skill} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-text/5 text-text/60 border border-text/10">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-text/50 font-medium">현재 정해진 필수 요건은 없습니다. 열정만 있다면 편하게 지원해 주세요!</p>
                            )}
                        </section>

                        {/* 2. 합류하면 함께할 멤버들 */}
                        <section className="bg-text/[0.02] border border-text/10 rounded-3xl p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    🤝 현재 팀원
                                </h2>
                                <p className="text-sm font-bold text-text/50">총 {team.members.length}명 참여 중</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {team.members.map((member, i) => {
                                    const avatarColors = [
                                        "from-violet-500 to-purple-600",
                                        "from-indigo-500 to-blue-600",
                                        "from-emerald-500 to-teal-600",
                                        "from-amber-500 to-orange-600",
                                        "from-rose-500 to-pink-600",
                                    ];
                                    const gradient = avatarColors[i % avatarColors.length];
                                    return (
                                        <div key={member.id} className="flex items-start gap-4 p-5 rounded-2xl bg-background border border-text/10 shadow-sm">
                                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold flex-shrink-0 text-lg shadow-md`}>
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-text mb-1">{member.name}</h4>
                                                <p className="text-xs font-black text-primary mb-2 opacity-90">{member.role}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {member.skills.map(s => (
                                                        <span key={s} className="px-2 py-0.5 rounded-md text-[10px] bg-text/5 text-text/70 border border-text/5 font-medium">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>

                    </div>

                    {/* 사이드바 (우측) 액션 카드 */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-text/[0.03] border border-text/10 rounded-3xl p-6 shadow-xl shadow-background border-t-4 border-t-primary">
                            <h3 className="font-extrabold text-xl mb-6 text-center text-text/90 tracking-tight">지금 바로 합류하세요!</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text/60 font-medium">현재 진척도</span>
                                    <span className="font-black text-primary">아이디어 빌딩 중</span>
                                </div>
                                <div className="h-px w-full bg-text/5" />
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text/60 font-medium">현재 인원</span>
                                    <span className="font-bold">{team.members.length}명</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text/60 font-medium">남은 자리</span>
                                    <span className="font-black text-emerald-500">{openSlots > 0 ? `${openSlots}명 더 찾고 있어요` : `모집 마감`}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text/60 font-medium">최대 가능 인원</span>
                                    <span className="font-bold">{team.maxMembers}명 제한</span>
                                </div>
                                <div className="w-full bg-text/10 h-2.5 rounded-full overflow-hidden mt-3 shadow-inner">
                                    <div
                                        className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${(team.members.length / team.maxMembers) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {team.isRecruiting ? (
                                <button
                                    onClick={() => applyToTeam(team.id)}
                                    disabled={applied}
                                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex justify-center items-center gap-2
                                        ${applied
                                            ? 'bg-text/5 text-text/50 border border-text/10 cursor-not-allowed hidden'
                                            : 'bg-primary text-background shadow-lg shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/40'
                                        }
                                    `}
                                >
                                    이 팀에 합류 신청하기
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="w-full py-4 rounded-xl font-bold bg-text/5 text-text/40 border border-text/10 cursor-not-allowed"
                                >
                                    모집이 종료된 팀입니다
                                </button>
                            )}

                            {applied && (
                                <div className="w-full py-4 rounded-xl font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-center flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    합류 신청이 완료되었습니다!
                                </div>
                            )}

                            <div className="mt-6 pt-6 border-t border-text/5">
                                <button
                                    onClick={() => setIsChatModalOpen(true)}
                                    className="w-full py-3.5 rounded-xl font-bold bg-background text-text border border-text/10 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 group shadow-sm"
                                >
                                    문의하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 문의 모달 */}
            {isChatModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="bg-background border border-text/10 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setIsChatModalOpen(false)}
                            className="absolute top-6 right-6 text-text/40 hover:text-text transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <h3 className="text-2xl font-bold mb-2 tracking-tight flex items-center gap-2">
                            문의하기
                        </h3>
                        <p className="text-sm text-text/60 mb-6 font-medium">
                            팀장에게 문의사항을 남겨보세요!
                        </p>

                        <textarea
                            className="w-full h-40 p-4 rounded-xl bg-text/5 border border-text/10 text-text placeholder-text/30 focus:outline-none focus:border-primary/50 resize-none transition-all text-sm mb-8"
                            placeholder="팀장에게 문의하고 싶은 점을 자유롭게 작성해주세요."
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsChatModalOpen(false)}
                                className="flex-1 py-3.5 rounded-xl font-bold bg-text/5 text-text/60 hover:bg-text/10 transition-colors"
                            >
                                취소
                            </button>
                            <button
                                onClick={() => {
                                    alert("문의 내용이 성공적으로 전송되었습니다!");
                                    setIsChatModalOpen(false);
                                }}
                                className="flex-1 py-3.5 rounded-xl font-bold bg-primary text-background hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                            >
                                메시지 보내기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
