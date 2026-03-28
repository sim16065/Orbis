type ScheduleSectionProps = {
    registrationDeadline: string;
    startDate: string;
    endDate: string;
};

export function ScheduleSection({
    registrationDeadline,
    startDate,
    endDate,
}: ScheduleSectionProps) {
    const now = new Date().getTime();

    // 타임라인 기준점 계산
    const regEnd = new Date(registrationDeadline).getTime();
    const mainStart = new Date(startDate).getTime(); // 본선 시작
    const mainEnd = new Date(endDate).getTime();     // 최종 제출
    const finalEnd = mainEnd + 18 * 3600 * 1000;     // 결과 발표 준비 기준

    // 현재 상태 판별 
    const isRegistration = now < regEnd; // 1단계: 접수 중

    // 2단계: 본선 진행 중 (세션 진행 또는 최종 제출 단계)
    const isMainSession = !isRegistration && now < mainEnd;
    const isSubmission = !isRegistration && !isMainSession && now < finalEnd;
    const isMainActive = isMainSession || isSubmission; // 본선 전체 활성화 여부

    const isResultAnnounced = !isRegistration && !isMainActive; // 3단계: 결과 발표

    // 시각 요소 클래스 제너레이터 
    const getBlockClass = (active: boolean) =>
        active
            ? "bg-text/[0.03] border-secondary shadow-[0_8px_20px_rgba(0,0,0,0.04)] ring-[4px] ring-secondary/10 scale-[1.03]"
            : "bg-text/[0.015] border-text/5 opacity-[0.85] scale-100 z-0";

    const getInnerCircleClass = (active: boolean, topLevelActive: boolean) => {
        if (!topLevelActive) return "bg-background border-text/[0.06] shadow-sm"; // 부모가 비활성화일 땐 모두 기본 형태
        return active
            ? "bg-background border-text/20 shadow-[0_4px_16px_rgba(0,0,0,0.04)] ring-4 ring-text/[0.02] scale-[1.03] z-10"
            : "bg-background border-text/5 opacity-60 scale-95 z-0";
    };

    const getTitleClass = (active: boolean) =>
        active ? "text-text font-black" : "text-text/70 font-bold";

    const getDateClass = (active: boolean) =>
        active ? "text-text/70 font-bold" : "text-text/40 font-medium";

    return (
        <section id="schedule" className="scroll-mt-36 max-w-[800px]">
            <div className="mb-10">
                {/* Eyebrow */}
                <span className="text-[12px] font-semibold tracking-widest text-text/40 block mb-2 uppercase">
                    SCHEDULE
                </span>

                {/* Title */}
                <div className="flex items-center gap-3 mb-10">
                    <span className="w-1 h-6 bg-primary rounded-full block" />
                    <h2 className="text-[28px] font-bold text-text leading-tight">일정</h2>
                </div>

                {/* 참가 접수 */}
                <div className="w-full overflow-x-auto hide-scrollbar pb-8 pt-6 -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="flex flex-row items-center gap-3 md:gap-5 min-w-max md:min-w-0 mx-auto w-fit transition-all">

                        {/* 1. Left Circle (Start) */}
                        <div className={`w-[140px] h-[140px] shrink-0 rounded-[32px] md:rounded-full border flex flex-col justify-center items-center text-center p-3 transition-all duration-300 ${getBlockClass(isRegistration)}`}>
                            <span className={`text-[15px] leading-snug break-keep ${getTitleClass(isRegistration)}`}>참가 접수 및<br />팀 빌딩</span>
                            <span className={`text-[12px] mt-2 ${getDateClass(isRegistration)}`}>{registrationDeadline}</span>
                        </div>

                        {/* Line Connector */}
                        <div className={`w-5 md:w-10 h-[2px] shrink-0 transition-colors duration-300 ${isRegistration || isMainActive ? "bg-text/20" : "bg-text/10"}`} />

                        {/* 2. Middle Capsule  */}
                        <div className="relative flex flex-col items-center shrink-0">
                            <div className={`rounded-full p-2 flex flex-row items-center gap-2 border transition-all duration-300 ${getBlockClass(isMainActive)}`}>
                                {/* Core Dev Step 1 */}
                                <div className={`w-[140px] h-[140px] rounded-full border flex flex-col justify-center items-center text-center p-3 transition-all duration-500 ease-out ${getInnerCircleClass(isMainSession, isMainActive)}`}>
                                    <span className={`text-[14px] leading-tight break-keep ${getTitleClass(isMainSession || !isMainActive)}`}>본선 세션 진행<br />및 스케일업</span>
                                    <span className={`text-[12px] mt-1.5 ${getDateClass(isMainSession || !isMainActive)}`}>{startDate} ~</span>
                                </div>
                                {/* Core Dev Step 2 */}
                                <div className={`w-[140px] h-[140px] rounded-full border flex flex-col justify-center items-center text-center p-3 transition-all duration-500 ease-out ${getInnerCircleClass(isSubmission, isMainActive)}`}>
                                    <span className={`text-[14px] leading-tight break-keep ${getTitleClass(isSubmission || !isMainActive)}`}>프로젝트<br />최종 제출</span>
                                    <span className={`text-[12px] mt-1.5 ${getDateClass(isSubmission || !isMainActive)}`}>{endDate} 18:00</span>
                                </div>
                            </div>
                        </div>

                        {/* Arrow Connector */}
                        <div className={`shrink-0 flex justify-center items-center w-5 md:w-10 transition-colors duration-300 ${isMainActive || isResultAnnounced ? "text-text/30" : "text-text/15"}`}>
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>

                        {/* 3. Right Circle (End) */}
                        <div className={`w-[140px] h-[140px] shrink-0 rounded-[32px] md:rounded-full border flex flex-col justify-center items-center text-center p-3 transition-all duration-300 ${getBlockClass(isResultAnnounced)}`}>
                            <span className={`text-[15px] leading-snug break-keep ${getTitleClass(isResultAnnounced)}`}>결과 발표 및<br />시상식</span>
                            <span className={`text-[12px] mt-2 ${getDateClass(isResultAnnounced)}`}>심사 후 공지</span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}