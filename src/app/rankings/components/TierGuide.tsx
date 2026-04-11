"use client";

import { useState } from "react";
import { InfoIcon, ChevronDown, Shield, Star, Zap, ShieldCheck, Gem, Crown } from "lucide-react";
import { TIER_DETAILS } from "../constants";

function TierIcon({ type, className }: { type: string, className?: string }) {
    const iconBase = className || '';

    switch (type) {
        case 'shield':
            return <Shield className={iconBase} />;
        case 'shield-star':
            return (
                <div className={`relative inline-block ${iconBase}`}>
                    <Shield className="w-full h-full" />
                    <Star className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[45%] h-[45%] fill-current" />
                </div>
            );
        case 'shield-zap':
            return (
                <div className={`relative inline-block ${iconBase}`}>
                    <Shield className="w-full h-full" />
                    <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] fill-current" />
                </div>
            );
        case 'shield-check':
            return <ShieldCheck className={iconBase} />;
        case 'gem':
            return <Gem className={iconBase} />;
        case 'crown':
            return <Crown className={iconBase} />;
        default:
            return <Shield className={iconBase} />;
    }
}

export default function TierGuide() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTier, setActiveTier] = useState(TIER_DETAILS[0]); // Default Bronze

    return (
        <div className="mb-12">
            <div className="bg-card rounded-2xl border border-text/10 overflow-hidden transition-all">
                {/* Accordion Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-6 px-8 flex items-center justify-between hover:bg-text/5 transition-all"
                >
                    <div className="flex items-center gap-3">
                        <InfoIcon className="w-4 h-4 text-sky-500" />
                        <span className="text-sm font-bold text-text tracking-tight">랭크 티어 가이드</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-text/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="p-8 pt-2 animate-in slide-in-from-top-4 duration-300">
                        {/* Tier Tabs */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            {TIER_DETAILS.map((tier) => (
                                <button
                                    key={tier.id}
                                    onClick={() => setActiveTier(tier)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 border transition-all ${activeTier.id === tier.id
                                        ? `${tier.activeBg} text-white border-transparent shadow-lg shadow-${tier.id}/20`
                                        : `bg-transparent text-text/40 border-text/10 hover:border-text/20`
                                        }`}
                                >
                                    <TierIcon type={tier.iconType} className={`w-3.5 h-3.5 ${activeTier.id === tier.id ? 'text-white' : tier.color}`} />
                                    {tier.label}
                                </button>
                            ))}
                        </div>

                        {/* Detail Card */}
                        <div className={`p-8 rounded-2xl border ${activeTier.border} ${activeTier.bg} mb-10 transition-all duration-300`}>
                            <div className="flex items-start gap-5 mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl ${activeTier.activeBg} text-white`}>
                                    <TierIcon type={activeTier.iconType} className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className={`text-2xl font-black mb-1 ${activeTier.color}`}>{activeTier.label}</h3>
                                    <p className="text-xs font-black text-text/30 uppercase tracking-widest">{activeTier.range}</p>
                                </div>
                            </div>

                            <p className="text-text/70 text-sm font-medium mb-1 leading-relaxed">
                                {activeTier.desc}
                            </p>
                        </div>

                        {/* Range Bar */}
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-text/20 uppercase tracking-widest ml-1">포인트 구간</p>
                            <div className="relative pt-2">
                                <div className="flex h-3 w-full rounded-full overflow-hidden bg-text/5">
                                    {TIER_DETAILS.map((tier) => (
                                        <div
                                            key={tier.id}
                                            className={`${tier.activeBg} flex-1 h-full transition-all duration-300 flex items-center justify-center text-[8px] font-black text-white/0 hover:text-white/100 cursor-default ${activeTier.id === tier.id ? 'opacity-100 ring-4 ring-text/10 relative z-10' : 'opacity-40'}`}
                                        />
                                    ))}
                                </div>
                                <div className="relative h-6 mt-1.5 text-[9px] font-bold text-text/20">
                                    <span className="absolute left-0">0</span>
                                    <span className="absolute left-[16.66%]">1,000</span>
                                    <span className="absolute left-[33.33%]">2,000</span>
                                    <span className="absolute left-[50%]">3,000</span>
                                    <span className="absolute left-[66.66%]">4,500</span>
                                    <span className={`absolute left-[83.33%] ${activeTier.id === 'master' ? 'text-rose-500 font-black' : ''}`}>6,000+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Re-export icon for use in other components if needed
export { TierIcon };
