type ScheduleSectionProps = {
    registrationDeadline: string;
    startDate: string;
    endDate: string;
};

const buildScheduleItems = ({
    registrationDeadline,
    startDate,
    endDate,
}: ScheduleSectionProps) => [
        {
            title: "참가 접수 및 팀 빌딩",
            date: `${registrationDeadline} 까지`,
            active: true,
        },
        {
            title: "해커톤 메인 세션 및 개발",
            date: `${startDate} ~ ${endDate}`,
            active: false,
        },
        {
            title: "프로젝트 제출 마감",
            date: `${endDate} 18:00 (KST)`,
            active: false,
        },
        {
            title: "결과 발표 및 시상식",
            date: "심사 후 별도 공지",
            active: false,
        },
    ];

export function ScheduleSection({
    registrationDeadline,
    startDate,
    endDate,
}: ScheduleSectionProps) {
    const items = buildScheduleItems({ registrationDeadline, startDate, endDate });
    return (
        <section id="schedule" className="scroll-mt-36">
            <div className="mb-10">
                <span className="mb-2 block text-[12px] font-semibold tracking-wider text-text/50">
                    SCHEDULE
                </span>


                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-accent rounded-full" />
                    일정
                </h2>

                <div className="relative border-l border-text/10 ml-3 space-y-8 py-4">
                    {items.map((item) => (
                        <div key={item.title} className="relative pl-8">
                            <div className={`absolute -left-[1.5px] top-1.5 h-3 w-3 -translate-x-1/2 rounded-full ${item.active
                                ? "bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                                : "bg-text/20"}`} />

                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-sm text-text/50 mt-1">{item.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}