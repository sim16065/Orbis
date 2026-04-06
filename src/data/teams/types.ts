import { RoleId } from "../roles";

export interface TeamMember {
    userId: string;
    role: string;
}

export interface Team {
    id: string;
    name: string;
    hackathonId: string;
    hackathonTitle: string;
    description: string;
    members: TeamMember[];
    maxMembers: number;
    requiredRoles: RoleId[];
    requiredSkills: string[];
    requiredSkillsByRole?: Partial<Record<RoleId, string[]>>;
    problem?: string;
    solution?: string;
    keyFeatures?: string[];
    timeline: { date: string; task: string }[];
    communication: string;
    isRecruiting: boolean;
    createdAt: string;
}
