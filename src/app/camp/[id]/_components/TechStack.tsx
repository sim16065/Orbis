interface TechStackProps {
    requiredSkills: string[];
}

export function TechStack({ requiredSkills }: TechStackProps) {
    return (
        <section className="bg-card border border-text/10 rounded-3xl p-8">
            <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                <span className="text-2xl">🥞</span> 기술 스택
            </h2>
            <div className="space-y-6">
                <div>
                    <p className="text-xs text-text/50 font-bold mb-3">개발 스택</p>
                    <div className="flex flex-wrap gap-2">
                        {requiredSkills.map((skill) => (
                            <span key={skill} className="px-4 py-1.5 rounded-lg text-sm font-medium bg-text/5 border border-text/5 text-text/80">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-xs text-text/50 font-bold mb-3">협업 툴</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-4 py-1.5 rounded-lg text-sm font-medium bg-text/5 border border-text/5 text-text/80">GitHub</span>
                        <span className="px-4 py-1.5 rounded-lg text-sm font-medium bg-text/5 border border-text/5 text-text/80">Figma</span>
                        <span className="px-4 py-1.5 rounded-lg text-sm font-medium bg-text/5 border border-text/5 text-text/80">Notion</span>
                        <span className="px-4 py-1.5 rounded-lg text-sm font-medium bg-text/5 border border-text/5 text-text/80">Discord</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
