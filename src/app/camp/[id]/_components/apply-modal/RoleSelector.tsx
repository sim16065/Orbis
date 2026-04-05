import React from "react";
import { Team } from "@/data/teams";
import { ROLE_LABELS } from "@/data/roles";

interface RoleSelectorProps {
    team: Team;
    selectedRole: string;
    onSelectRole: (roleId: string) => void;
}

const colors = [
    { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
    { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
    { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' }
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({ team, selectedRole, onSelectRole }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-text mb-2">지원 포지션</label>
            <div className="flex gap-3">
                {team.requiredRoles.map((roleId, idx) => {
                    const isSelected = selectedRole === roleId;
                    const color = colors[idx % colors.length];

                    return (
                        <button
                            key={roleId}
                            onClick={() => onSelectRole(roleId)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-bold text-sm transition-all duration-200 ${isSelected
                                ? `${color.border} ${color.bg} ${color.text} shadow-sm`
                                : 'border-text/10 bg-text/5 text-text/60 hover:bg-text/10 hover:text-text/80'
                                }`}
                        >
                            <span className={`w-2 h-2 rounded-full ${isSelected ? color.dot : 'bg-text/30'}`} />
                            {ROLE_LABELS[roleId as keyof typeof ROLE_LABELS]}
                            <span className="px-2 py-0.5 rounded bg-text/10 text-xs font-black">1명</span>
                        </button>
                    );
                })}
            </div>
            {!selectedRole && (
                <p className="mt-3 text-xs text-text/40 font-medium animate-in fade-in slide-in-from-top-1 duration-300 transition-all text-center">
                    포지션을 선택하면 관련 기술 스택이 자동으로 추천됩니다
                </p>
            )}
        </div>
    );
};
