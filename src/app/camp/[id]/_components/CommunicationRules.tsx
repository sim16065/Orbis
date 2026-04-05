export function CommunicationRules() {
    return (
        <section className="bg-card border border-text/10 rounded-3xl p-8">
            <h2 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                <span className="text-2xl">💬</span> 커뮤니케이션 방식
            </h2>
            <p className="text-text/70 leading-relaxed text-sm font-medium">
                Discord를 주요 소통 채널로 사용하며, 매일 오전 9시 짧은 데일리 스크럼을 진행합니다. Notion으로 진행 상황을 문서화하고, 코드 리뷰는 GitHub PR을 통해 이루어집니다.
            </p>
        </section>
    );
}
