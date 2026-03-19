import { Card } from "../ui";

type PrizeSectionProps = {
    prize: string;
};

export function PrizeSection({ prize }: PrizeSectionProps) {
    return (
        <section id="prize" className="scroll-mt-36">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-rose-500 rounded-full" />
                상금 및 혜택
            </h2>
            <Card className="p-8 bg-gradient-to-br from-text/5 to-transparent flex flex-col items-center justify-center text-center">
                <p className="text-sm font-bold text-text/50 uppercase tracking-widest mb-2">총 상금</p>
                <h3 className="text-5xl font-black text-primary mb-8">{prize}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4 max-w-2xl mx-auto">
                    <div className="p-4 rounded-xl bg-text/5 border border-primary/20 flex flex-col items-center">
                        <span className="text-3xl mb-2">🥇</span>
                        <span className="font-bold mb-1">대상 (1팀)</span>
                        <span className="text-sm text-primary font-black">3000만원</span>
                    </div>
                    <div className="p-4 rounded-xl bg-text/5 border border-text/10 flex flex-col items-center">
                        <span className="text-3xl mb-2">🥈</span>
                        <span className="font-bold mb-1">최우수상 (2팀)</span>
                        <span className="text-sm text-text/60 font-bold">1500만원</span>
                    </div>
                    <div className="p-4 rounded-xl bg-text/5 border border-text/10 flex flex-col items-center">
                        <span className="text-3xl mb-2">🥉</span>
                        <span className="font-bold mb-1">우수상 (4팀)</span>
                        <span className="text-sm text-text/60 font-bold">500만원</span>
                    </div>
                </div>
            </Card>
        </section>
    );
}