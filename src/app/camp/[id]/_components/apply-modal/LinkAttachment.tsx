import React, { useState } from "react";
import { LinkItem } from "./useApplyForm";

interface LinkAttachmentProps {
    links: LinkItem[];
    onAddLink: (link: LinkItem) => void;
    onRemoveLink: (index: number) => void;
}

export const LinkAttachment: React.FC<LinkAttachmentProps> = ({ links, onAddLink, onRemoveLink }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [draft, setDraft] = useState<LinkItem>({ type: "", url: "" });

    const handleAdd = () => {
        if (draft.type && draft.url) {
            onAddLink(draft);
            setDraft({ type: "", url: "" });
            setIsAdding(false);
        }
    };

    return (
        <div>
            <div className="flex items-end justify-between mb-2">
                <label className="block text-sm font-bold text-text mb-0">링크 첨부</label>
            </div>
            <div className="space-y-3 mb-3">
                {links.map((link, idx) => (
                    <div key={idx} className="flex gap-2 items-center group/linkrow">
                        <div className="px-4 py-3.5 rounded-xl bg-text/5 border border-text/10 text-sm font-bold text-text w-32 shrink-0 truncate">
                            {link.type}
                        </div>
                        <div className="relative flex-1">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                            </span>
                            <div className="w-full p-3.5 pl-10 rounded-xl bg-text/5 border border-text/10 text-sm text-text truncate">
                                {link.url}
                            </div>
                        </div>
                        <button onClick={() => onRemoveLink(idx)} className="p-3 text-text/10 hover:text-red-400 transition-colors">
                            <span className="text-xl leading-none">×</span>
                        </button>
                    </div>
                ))}

                {isAdding ? (
                    <div className="flex gap-2 animate-in slide-in-from-top-2 duration-200">
                        <input
                            type="text"
                            value={draft.type}
                            onChange={(e) => setDraft({ ...draft, type: e.target.value })}
                            className="w-32 p-3 rounded-xl bg-background border border-text/10 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder-text/30"
                            placeholder="포트폴리오"
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        />
                        <input
                            type="text"
                            value={draft.url}
                            onChange={(e) => setDraft({ ...draft, url: e.target.value })}
                            className="flex-1 p-3 rounded-xl bg-background border border-text/10 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder-text/30"
                            placeholder="https://..."
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        />
                        <button onClick={handleAdd} className="px-4 py-3 rounded-xl font-bold bg-primary/80 text-background hover:bg-primary transition-colors text-sm shrink-0">
                            추가
                        </button>
                        <button onClick={() => { setIsAdding(false); setDraft({ type: "", url: "" }); }} className="p-3 text-text/40 hover:text-text transition-colors shrink-0">
                            <span className="text-xl leading-none">×</span>
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsAdding(true)} className="flex items-center gap-1.5 text-sm text-text/60 hover:text-text font-medium transition-colors ml-1">
                        <span className="text-lg leading-none w-4 flex justify-center tracking-tight">⊕</span> 링크 추가
                    </button>
                )}
            </div>
        </div>
    );
};
