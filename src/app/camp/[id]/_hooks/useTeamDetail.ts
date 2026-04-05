import { useState } from "react";
import { useTeamApplications } from "@/lib/hooks";

export function useTeamDetail(teamId: string) {
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const { isApplied, applyToTeam } = useTeamApplications();

    const applied = isApplied(teamId);

    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    const openInquiryModal = () => setIsChatModalOpen(true);
    const closeInquiryModal = () => setIsChatModalOpen(false);
    const openApplyModal = () => setIsApplyModalOpen(true);
    const closeApplyModal = () => setIsApplyModalOpen(false);

    return {
        isChatModalOpen,
        openInquiryModal,
        closeInquiryModal,
        isApplyModalOpen,
        openApplyModal,
        closeApplyModal,
        applied,
        applyToTeam
    };
}
