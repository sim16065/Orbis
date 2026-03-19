import { Card } from "../ui";

export function EvaluationSection() {
    return (
        <section id="eval" className="scroll-mt-36">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-secondary rounded-full" />
                평가 기준
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-5 border-l-4 border-l-emerald-500">
                    <h3 className="font-black text-lg mb-2">혁신성 (30%)</h3>
                    <p className="text-sm text-text/60">기존에 없던 새로운 접근 방식인가? 문제 해결을 위한 창의적인 아이디어를 평가합니다.</p>
                </Card>
                <Card className="p-5 border-l-4 border-l-violet-500">
                    <h3 className="font-black text-lg mb-2">기술성 (30%)</h3>
                    <p className="text-sm text-text/60">제시된 기술 스택을 적절히 활용하였으며, 시스템 아키텍처와 코드 퀄리티가 우수한지 평가합니다.</p>
                </Card>
                <Card className="p-5 border-l-4 border-l-amber-500">
                    <h3 className="font-black text-lg mb-2">실용성 (20%)</h3>
                    <p className="text-sm text-text/60">실제 사용자 또는 시장에 가치를 제공할 수 있으며, 비즈니스 모델로의 발전 가능성을 살펴봅니다.</p>
                </Card>
                <Card className="p-5 border-l-4 border-l-sky-500">
                    <h3 className="font-black text-lg mb-2">기획 및 완성도 (20%)</h3>
                    <p className="text-sm text-text/60">문제 정의의 명확성, UI/UX 편의성, 그리고 최종 결과물(프로토타입)의 완성도를 종합적으로 평가합니다.</p>
                </Card>
            </div>
        </section>
    );
}