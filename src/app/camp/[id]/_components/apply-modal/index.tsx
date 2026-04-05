import { useEffect, useRef } from "react";
import { Team } from "@/data/teams";
import { useApplyForm } from "./useApplyForm";
import { RoleSelector } from "./RoleSelector";
import { SkillPicker } from "./SkillPicker";
import { LinkAttachment } from "./LinkAttachment";
import { FileUploader } from "./FileUploader";

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    team: Team;
    onSubmit: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, team, onSubmit }) => {
    const { state, actions } = useApplyForm(team);
    const modalRef = useRef<HTMLDivElement>(null);

    // ESC Key support & Body Scroll Lock
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        // Scroll Lock
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    // Focus Trap (Initial focus)
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                (focusableElements[0] as HTMLElement).focus();
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Body */}
            <div
                ref={modalRef}
                className="relative w-full max-w-xl bg-card rounded-[2rem] p-10 shadow-2xl animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] overflow-y-auto overscroll-contain no-scrollbar"
                role="dialog"
                aria-modal="true"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-text/40 hover:text-text transition-colors p-2"
                    aria-label="모달 닫기"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-2xl font-bold mb-1 tracking-tight">팀 지원하기</h3>
                <p className="text-sm text-text/60 mb-8 font-medium">{team.name}에 지원합니다</p>

                <div className="space-y-8 mb-8">
                    {/* 1. 포지션 선택 섹션 */}
                    <RoleSelector
                        team={team}
                        selectedRole={state.selectedRole}
                        onSelectRole={actions.handleRoleSelect}
                    />

                    {/* 2. 보유 기술 스택 섹션 */}
                    {state.selectedRole && (
                        <SkillPicker
                            selectedSkills={state.selectedSkills}
                            onToggleSkill={actions.toggleSkill}
                        />
                    )}

                    {/* 3. 자기소개 섹션 */}
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">간단 자기소개</label>
                        <textarea
                            value={state.intro}
                            onChange={(e) => actions.setIntro(e.target.value)}
                            className="w-full h-28 p-4 rounded-xl bg-text/5 border border-text/10 text-text placeholder-text/30 focus:outline-none focus:border-primary/50 resize-none transition-colors text-sm leading-relaxed overscroll-contain"
                            placeholder="간단한 경력, 지원 동기를 적어주세요 (최대 500자)"
                            maxLength={500}
                        />
                        <div className="text-right text-xs text-text/40 mt-1 font-medium">{state.intro.length}/500</div>
                    </div>

                    {/* 4. 링크 첨부 섹션 */}
                    <LinkAttachment
                        links={state.links}
                        onAddLink={actions.addLink}
                        onRemoveLink={actions.removeLink}
                    />

                    {/* 5. 파일 첨부 섹션 */}
                    <FileUploader
                        files={state.files}
                        onAddFiles={actions.addFiles}
                        onRemoveFile={actions.removeFile}
                    />
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 rounded-xl font-bold bg-transparent text-text border border-text/10 hover:bg-text/5 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={() => {
                            alert("지원이 완료되었습니다!");
                            onSubmit();
                            actions.resetForm();
                        }}
                        disabled={!state.selectedRole}
                        className={`flex-1 py-4 rounded-xl font-bold transition-all shadow-lg ${state.selectedRole
                            ? 'bg-primary text-background hover:opacity-90 shadow-primary/20'
                            : 'bg-text/10 text-text/40 cursor-not-allowed shadow-none'
                            }`}
                    >
                        지원 제출
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplyModal;
