import { FileText, Code2, Shield, PlayCircle, Check } from "lucide-react";

type SubmissionItem = {
    title: string;
    required: boolean;
    description: string;
    caption?: string;
    icon?: "code" | "shield" | "video" | "file";
};

type SubmissionSectionProps = {
    endDate: string;
    items: SubmissionItem[];
    notices: string[];
};

const iconMap = {
    code: Code2,
    shield: Shield,
    video: PlayCircle,
    file: FileText,
};

export function SubmissionSection({ endDate, items, notices }: SubmissionSectionProps) {
    return (
        <section id="submit" className="scroll-mt-36 max-w-[760px]">
            <div className="mb-10">
                <span className="mb-2 block text-[12px] font-semibold tracking-wider text-text/50">
                    SUBMISSION GUIDE
                </span>

                {/* Header */}
                <div className="mb-3 flex items-center gap-3">
                    <span className="block h-7 w-1 rounded-full bg-primary" />
                    <h2 className="text-2xl font-bold leading-tight text-text">제출 안내</h2>
                </div>

                <p className="text-[15px] text-text/70 mb-5 font-normal leading-relaxed">
                    프로젝트 최종 제출 전, 아래 항목과 제출 조건을 확인해주세요.<br />
                    필수 항목이 모두 제출되어야 정상 접수됩니다.
                </p>

                <div className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-rose-500/10 border border-rose-500/20 text-[13px] font-bold text-rose-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    제출 마감 {endDate} 23:59
                </div>
            </div>

            {/* Section 1: 제출 항목 */}
            <div className="mb-8">
                <h2 className="text-[20px] font-bold text-text mb-3">제출 항목</h2>

                <div className="bg-background border border-text/10 rounded-[16px] flex flex-col pt-1 pb-1">
                    {items.map((item, index) => {
                        const Icon = item.icon ? iconMap[item.icon] : FileText;

                        return (
                            <div
                                key={item.title}
                                className={`flex gap-4 p-[18px] px-4 ${index !== items.length - 1 ? "border-b border-text/5" : ""
                                    }`}
                            >
                                <div className="w-[36px] h-[36px] rounded-[10px] bg-text/[0.04] flex items-center justify-center shrink-0">
                                    <Icon className="w-[18px] h-[18px] text-text/60" strokeWidth={1.5} />
                                </div>

                                <div className="flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-1.5 mt-1">
                                        <span className="text-[16px] font-semibold text-text">{item.title}</span>
                                        <span
                                            className={`flex h-[22px] items-center justify-center rounded-full px-2 text-[12px] font-bold tracking-wide ${item.required
                                                ? "bg-rose-500/10 text-rose-600"
                                                : "bg-text/10 text-text/60"
                                                }`}
                                        >
                                            {item.required ? "필수" : "선택"}
                                        </span>
                                    </div>

                                    <p className="text-[15px] text-text/60 leading-relaxed">{item.description}</p>


                                    {item.caption ? (
                                        <p className="mt-1 text-[13px] font-medium text-text/40">
                                            {item.caption}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            {/* Section 2: 제출 형식 및 유의사항 */}
            <div className="mb-8">
                <h3 className="text-[20px] font-bold text-text mb-3">제출 형식 및 유의사항</h3>
                <div className="bg-text/[0.02] border border-text/10 rounded-[16px] p-5">
                    <ul className="space-y-[14px]">
                        {notices.map((notice) => (
                            <li key={notice} className="flex items-start gap-3">
                                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <Check className="h-[10px] w-[10px]" strokeWidth={3} />
                                </span>
                                <span className="text-[15px] leading-relaxed text-text/80">
                                    {notice}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Section 3: 제출 마감 */}
            <div>
                <div className="bg-rose-500/[0.08] border border-rose-500/20 rounded-[16px] p-5 flex items-start gap-3">
                    <div className="w-[36px] h-[36px] rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
                        <svg className="w-[16px] h-[16px] text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>

                    <div className="flex flex-col mt-0.5">
                        <h4 className="text-[16px] font-semibold text-rose-600 mb-1 leading-tight tracking-tight">제출 마감</h4>
                        <p className="text-[14px] font-medium text-rose-700/80 mb-0.5 leading-snug">{endDate} 23:59까지 제출 가능합니다.</p>
                        <p className="text-[14px] font-normal text-rose-700/60 leading-snug">마감 이후에는 수정 및 추가 제출이 제한될 수 있습니다.</p>
                    </div>
                </div>
            </div>
        </section >
    );
}