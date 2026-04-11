import { Shield, Star, Zap, ShieldCheck, Gem, Crown } from "lucide-react";

export const TIER_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; bar: string }> = {
    master: { label: "Master", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-200", bar: "bg-rose-500" },
    diamond: { label: "Diamond", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-200", bar: "bg-purple-500" },
    platinum: { label: "Platinum", color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-200", bar: "bg-cyan-500" },
    gold: { label: "Gold", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-200", bar: "bg-amber-500" },
    silver: { label: "Silver", color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-300", bar: "bg-slate-500" },
    bronze: { label: "Bronze", color: "text-orange-600", bg: "bg-orange-600/10", border: "border-orange-200", bar: "bg-orange-600" },
};

export const TIER_DETAILS = [
    {
        id: "bronze",
        label: "Bronze",
        range: "0 ~ 999 포인트",
        desc: "해커톤 여정의 시작! 첫 발을 내딛은 용감한 참가자.",
        color: "text-orange-600",
        bg: "bg-orange-600/10",
        border: "border-orange-600/30",
        activeBg: "bg-orange-600",
        iconType: "shield"
    },
    {
        id: "silver",
        label: "Silver",
        range: "1,000 ~ 1,999 포인트",
        desc: "어느덧 익숙해진 현장. 꾸준히 성과를 쌓아가는 참가자.",
        color: "text-slate-500",
        bg: "bg-slate-500/10",
        border: "border-slate-500/30",
        activeBg: "bg-slate-500",
        iconType: "shield-star"
    },
    {
        id: "gold",
        label: "Gold",
        range: "2,000 ~ 2,999 포인트",
        desc: "숙련된 해커톤 플레이어. 탄탄한 기술력으로 팀을 승리로 이끕니다.",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        activeBg: "bg-amber-500",
        iconType: "shield-zap"
    },
    {
        id: "platinum",
        label: "Platinum",
        range: "3,000 ~ 4,499 포인트",
        desc: "탁월한 리더십과 실력. 해커톤 씬의 상위권 실력자.",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        activeBg: "bg-cyan-500",
        iconType: "shield-check"
    },
    {
        id: "diamond",
        label: "Diamond",
        range: "4,500 ~ 5,999 포인트",
        desc: "압도적인 퍼포먼스. 누구도 이들을 막을 수 없습니다.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        activeBg: "bg-purple-500",
        iconType: "gem"
    },
    {
        id: "master",
        label: "Master",
        range: "6,000+ 포인트",
        desc: "최상위 1% 전설. 해커톤 씬을 이끄는 마스터 참가자.",
        benefits: ["Master 전용 혜택 전부", "연간 해외 해커톤 초청", "커뮤니티 Ambassador 자격"],
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        border: "border-rose-500/30",
        activeBg: "bg-rose-500",
        iconType: "crown"
    }
];

export const POINT_CRITERIA_DATA = {
    participation: {
        theme: 'emerald',
        items: [
            { title: '해커톤 참여 완료', desc: '팀으로 끝까지 완주 시', pts: '+50' },
            { title: '솔로 참여 완료', desc: '1인 팀으로 완주 시', pts: '+30' },
            { title: '연속 참여 보너스', desc: '2회 이상 연속 참여마다', pts: '+20' },
            { title: '첫 참여', desc: '생애 첫 해커톤 참여', pts: '+10' },
        ]
    },
    awards: {
        theme: 'amber',
        items: [
            { title: '1등 (우승)', desc: '해커톤 최종 1위', pts: '+300' },
            { title: '2등', desc: '해커톤 최종 2위', pts: '+200' },
            { title: '3등', desc: '해커톤 최종 3위', pts: '+150' },
            { title: 'TOP 10 입상', desc: '10위 이내 입상', pts: '+80' },
            { title: '특별상 수상', desc: '심사위원 특별상 등', pts: '+100' },
        ]
    },
    team: {
        theme: 'purple',
        items: [
            { title: '팀장 역할 수행', desc: '팀 리더로 참여 시', pts: '+30' },
            { title: '팀원 모집 성공', desc: '모집글로 팀 완성 시', pts: '+15' },
            { title: '팀 리뷰 작성', desc: '팀원 상호 리뷰 완료', pts: '+10' },
        ]
    },
    community: {
        theme: 'cyan',
        items: [
            { title: '프로필 완성', desc: '스택, 링크 등 100% 작성', pts: '+20' },
            { title: '멘토링 제공', desc: '다른 팀 멘토링 1회', pts: '+25' },
            { title: '후기 작성', desc: '해커톤 참여 후기 게시', pts: '+15' },
            { title: '추천인 등록', desc: '신규 유저 초대 시', pts: '+10' },
        ]
    },
    deduction: {
        theme: 'rose',
        warning: '아래 항목은 포인트가 차감됩니다. 건전한 커뮤니티를 위해 규정을 준수해 주세요.',
        items: [
            { title: '팀 중도 이탈', desc: '해커톤 도중 팀 탈퇴', pts: '-50' },
            { title: '규정 위반', desc: '운영 규정 위반 확인 시', pts: '-100' },
            { title: '장기 미활동', desc: '3개월 이상 미참여 시 월별', pts: '-10' },
        ]
    }
};
