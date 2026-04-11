"use client";

import { useState } from "react";
import { Calculator, ChevronDown, Flag, Trophy, Users, MessageSquare, MinusCircle, InfoIcon, RotateCcw } from "lucide-react";
import { POINT_CRITERIA_DATA } from "../constants";

export default function PointCalculationGuide() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('participation');

    const tabs = [
        { id: 'participation', label: '해커톤 참여', icon: <Flag className="w-4 h-4" /> },
        { id: 'awards', label: '수상 & 성과', icon: <Trophy className="w-4 h-4" /> },
        { id: 'team', label: '팀 기여', icon: <Users className="w-4 h-4" /> },
        { id: 'community', label: '커뮤니티 활동', icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'deduction', label: '감점 항목', icon: <MinusCircle className="w-4 h-4" /> },
    ];

    const current = (POINT_CRITERIA_DATA as any)[activeTab];

    return (
        <div className="bg-card rounded-2xl border border-text/10 overflow-hidden mb-12">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 px-8 flex items-center justify-between hover:bg-text/5 transition-all"
            >
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h3 className="text-sm font-bold text-text">포인트 산정 기준</h3>
                </div>
                <ChevronDown className={`w-4 h-4 text-text/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="p-8 pt-2 animate-in slide-in-from-top-4 duration-300">
                    {/* Summary Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-text/5 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <Flag className="w-4 h-4 text-emerald-500" />
                            <div>
                                <p className="text-[15px] font-black text-emerald-500">+50pts</p>
                                <p className="text-[10px] text-text/40 font-bold">참여만 해도</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-text/10 pl-4">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            <div>
                                <p className="text-[15px] font-black text-amber-500">+300pts</p>
                                <p className="text-[10px] text-text/40 font-bold">우승 시</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-text/10 pl-4">
                            <FlameIcon className="w-4 h-4 text-rose-500" />
                            <div>
                                <p className="text-[15px] font-black text-rose-500">보너스 ↑</p>
                                <p className="text-[10px] text-text/40 font-bold">연속 참여</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-text/10 pl-4">
                            <RotateCcw className="w-4 h-4 text-purple-500" />
                            <div>
                                <p className="text-[15px] font-black text-purple-500">~500pts/회</p>
                                <p className="text-[10px] text-text/40 font-bold">최대 획득</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${activeTab === tab.id
                                    ? `bg-${current.theme}-500 text-white shadow-lg shadow-${current.theme}-500/20`
                                    : 'bg-text/5 text-text/40 hover:bg-text/10'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content List */}
                    <div className={`rounded-2xl border p-1 overflow-hidden transition-all duration-300 ${activeTab === 'deduction' ? 'bg-rose-500/5 border-rose-500/20' :
                        activeTab === 'awards' ? 'bg-amber-500/5 border-amber-500/20' :
                            activeTab === 'participation' ? 'bg-emerald-500/5 border-emerald-500/20' :
                                activeTab === 'team' ? 'bg-purple-500/5 border-purple-500/20' :
                                    'bg-cyan-500/5 border-cyan-500/20'
                        }`}>
                        {current.warning && (
                            <div className="p-4 px-6 text-[11px] font-bold text-rose-500 flex items-center gap-2 opacity-60 italic">
                                <InfoIcon className="w-3.5 h-3.5" />
                                {current.warning}
                            </div>
                        )}
                        <div className="divide-y divide-text/5">
                            {current.items.map((item: any, idx: number) => (
                                <div key={idx} className="p-5 px-8 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === 'deduction' ? 'text-rose-500' : 'text-text/40'
                                            }`}>
                                            {activeTab === 'deduction' ? <MinusCircle className="w-4 h-4" /> : tabs.find(t => t.id === activeTab)?.icon}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-black text-text/80">{item.title}</p>
                                            <p className="text-[10px] font-semibold text-text/30">{item.desc}</p>
                                        </div>
                                    </div>
                                    <span className={`text-base font-black ${activeTab === 'deduction' ? 'text-rose-500' :
                                        activeTab === 'awards' ? 'text-amber-500' :
                                            'text-emerald-500'
                                        }`}>
                                        {item.pts}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-2 p-4 px-6 bg-text/5 rounded-xl text-[10px] font-bold text-text/40">
                        <InfoIcon className="w-4 h-4 text-text/20" />
                        포인트는 매주 월요일 오전 9시에 집계됩니다. 이의 신청은 해커톤 종료 후 7일 이내에 운영팀에 문의해 주세요.
                    </div>
                </div>
            )}
        </div>
    );
}

// Local helper component since Flame is common but needs custom coloring sometimes
function FlameIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
    )
}
