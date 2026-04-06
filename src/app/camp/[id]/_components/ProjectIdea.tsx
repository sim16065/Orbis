import { CheckCircle2 } from "lucide-react";

interface ProjectIdeaProps {
    description: string;
    problem?: string;
    solution?: string;
    keyFeatures?: string[];
}

export function ProjectIdea({ description, problem, solution, keyFeatures: features }: ProjectIdeaProps) {
    return (
        <section className="bg-card border border-text/10 rounded-3xl p-8">
            <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                <span className="text-2xl">💡</span> 프로젝트 아이디어
            </h2>

            <div className="space-y-4">
                {/* Problem */}
                <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
                    <h3 className="text-red-800 dark:text-red-400 font-bold mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        Problem — 문제 정의
                    </h3>
                    <p className="text-red-900/80 dark:text-red-300/90 text-sm leading-relaxed font-bold">
                        {problem || "작성된 문제 정의가 없습니다."}
                    </p>
                </div>

                {/* Solution */}
                <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6">
                    <h3 className="text-blue-800 dark:text-blue-400 font-bold mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Solution — 해결 방안
                    </h3>
                    <p className="text-blue-900/80 dark:text-blue-300/90 text-sm leading-relaxed font-bold">
                        {solution || "작성된 해결 방안이 없습니다."}
                    </p>
                </div>

                {/* Key Features */}
                <div className="bg-teal-500/5 border border-teal-500/10 rounded-2xl p-6">
                    <h3 className="text-teal-800 dark:text-teal-400 font-bold mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Key Features — 핵심 기능
                    </h3>
                    <ul className="space-y-2 text-teal-900/80 dark:text-teal-300/90 text-sm font-bold">
                        {features && features.length > 0 && features[0] !== "" ? (
                            features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <span className="text-teal-600 dark:text-teal-400 text-[10px]">❯</span> {feature}
                                </li>
                            ))
                        ) : (
                            <li className="text-teal-500/50">등록된 핵심 기능이 없습니다.</li>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
