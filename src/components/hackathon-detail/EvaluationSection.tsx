interface EvaluationCriterion {
    title: string;
    weight: number;
}

interface HackathonEvaluation {
    method?: string;
    criteria: EvaluationCriterion[];
}

interface EvaluationSectionProps {
    evaluation: HackathonEvaluation;
}

export function EvaluationSection({ evaluation }: EvaluationSectionProps) {
    return (
        <section id="eval" className="scroll-mt-36">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-secondary rounded-full" />
                심사 기준
            </h2>

            {evaluation.method && (
                <p className="text-base mb-4 text-text/80">
                    - 심사방식 : {evaluation.method}
                </p>
            )}

            <div className="overflow-hidden border-b border-black/80">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-t border-black/80 border-b border-black/80">
                            <th className="py-4 px-2 text-lg font-bold">심사항목</th>
                            <th className="py-4 px-2 text-lg font-bold text-right w-28">배점</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluation.criteria.map((item) => (
                            <tr key={item.title} className="border-b border-black/30">
                                <td className="py-5 px-2 text-lg">{item.title}</td>
                                <td className="py-5 px-2 text-lg text-right whitespace-nowrap">
                                    {item.weight}점
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}