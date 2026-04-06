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
import { ApplyModal } from "./_components/apply-modal";
import { useTeamDetail } from "./_hooks/useTeamDetail";
import { getAllTeams } from "@/lib/team-store";
import { useState, useEffect } from "react";

export default function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [allTeams, setAllTeams] = useState(teams);
    const { isChatModalOpen, openInquiryModal, closeInquiryModal, isApplyModalOpen, openApplyModal, closeApplyModal, applied, applyToTeam } = useTeamDetail(id);

    useEffect(() => {
        setAllTeams(getAllTeams());
    }, []);

    const team = allTeams.find((t) => t.id === id);

    useEffect(() => {
        if (team) {
            document.title = `${team.name} | Orbis`;
        }
    }, [team]);

    if (!team) {
        return <div className="min-h-screen flex items-center justify-center text-text text-xl font-bold">팀을 찾을 수 없습니다.</div>;
    }

    const hackathon = hackathons.find(h => h.id === team.hackathonId);

    return (
        <div className="min-h-screen bg-background text-text transition-colors duration-300">
            {/* 상단 네비게이션 */}
            <div className="border-b border-text/5 bg-text/[0.02]">
                <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-end">
                    <Link href="/camp" className="inline-flex items-center gap-2 text-text/50 hover:text-text transition-colors text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        팀 찾기
                    </Link>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-12">
                <TeamHeader team={team} hackathon={hackathon} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* 메인 뷰 (좌측) */}
                    <div className="xl:col-span-2 space-y-6">
                        <ProjectIdea
                            description={team.description}
                            problem={team.problem}
                            solution={team.solution}
                            keyFeatures={team.keyFeatures}
                        />
                        <TechStack requiredSkills={team.requiredSkills} />
                        <RequiredRoles team={team} />
                        <CommunicationRules team={team} />
                    </div>

                    {/* 사이드바 (우측) 액션 카드 */}
                    <div className="xl:col-span-1">
                        <MemberSidebar
                            team={team}
                            applied={applied}
                            openApplyModal={openApplyModal}
                            openInquiryModal={openInquiryModal}
                        />
                    </div>
                </div>
            </div>

            <InquiryModal isOpen={isChatModalOpen} onClose={closeInquiryModal} />
            <ApplyModal
                isOpen={isApplyModalOpen}
                onClose={closeApplyModal}
                team={team}
                onSubmit={() => {
                    applyToTeam(team.id);
                    closeApplyModal();
                }}
            />
        </div>
    );
}
