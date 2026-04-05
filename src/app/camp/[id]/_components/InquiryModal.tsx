interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="bg-background border border-text/10 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
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
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-xl font-bold bg-text/5 text-text/60 hover:bg-text/10 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={() => {
                            alert("문의 내용이 성공적으로 전송되었습니다!");
                            onClose();
                        }}
                        className="flex-1 py-3.5 rounded-xl font-bold bg-primary text-background hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                    >
                        메시지 보내기
                    </button>
                </div>
            </div>
        </div>
    );
}
