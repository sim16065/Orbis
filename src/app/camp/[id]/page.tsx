"use client";

import { use } from "react";
import { teams } from "@/data/teams";
import { hackathons } from "@/data/hackathons";
import Link from "next/link";
import { TeamHeader } from "./_components/TeamHeader";
import { ProjectIdea } from "./_components/ProjectIdea";
import { TechStack } from "./_components/TechStack";
import { RequiredRoles } from "./_components/RequiredRoles";
import { CommunicationRules } from "./_components/CommunicationRules";
import { MemberSidebar } from "./_components/MemberSidebar";
import { InquiryModal } from "./_components/InquiryModal";
import { useTeamDetail } from "./_hooks/useTeamDetail";

export default function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { isChatModalOpen, openInquiryModal, closeInquiryModal, applied, applyToTeam } = useTeamDetail(id);
    const team = teams.find((t) => t.id === id);

    if (!team) {
        return <div className="min-h-screen flex items-center justify-center text-text text-xl font-bold">팀을 찾을 수 없습니다.</div>;
    }

    const hackathon = hackathons.find(h => h.id === team.hackathonId);

    return (
        <div className="min-h-screen bg-background text-text transition-colors duration-300">
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
                <TeamHeader team={team} hackathon={hackathon} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* 메인 뷰 (좌측) */}
                    <div className="xl:col-span-2 space-y-6">
                        <ProjectIdea description={team.description} />
                        <TechStack requiredSkills={team.requiredSkills} />
                        <RequiredRoles team={team} />
                        <CommunicationRules />
                    </div>

                    {/* 사이드바 (우측) 액션 카드 */}
                    <div className="xl:col-span-1">
                        <MemberSidebar 
                            team={team} 
                            applied={applied} 
                            applyToTeam={applyToTeam} 
                            openInquiryModal={openInquiryModal} 
                        />
                    </div>
                </div>
            </div>

            <InquiryModal isOpen={isChatModalOpen} onClose={closeInquiryModal} />
        </div>
    );
}
