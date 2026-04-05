import { useState, useCallback, useEffect } from "react";
import { Team } from "@/data/teams";
import { ROLES, RoleId } from "@/data/roles";

export interface LinkItem {
    type: string;
    url: string;
}

export const useApplyForm = (team: Team) => {
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [intro, setIntro] = useState("");
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    // Role Selection Logic
    const handleRoleSelect = useCallback((roleId: string) => {
        setSelectedRole(roleId);
        const roleData = ROLES.find(r => r.id === roleId);
        const displaySkills = team.requiredSkillsByRole?.[roleId as RoleId] || roleData?.defaultSkills || team.requiredSkills;
        setSelectedSkills(displaySkills);
    }, [team]);

    // Skill Logic
    const toggleSkill = useCallback((skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    }, []);

    // Link Logic
    const addLink = useCallback((link: LinkItem) => {
        setLinks(prev => [...prev, link]);
    }, []);

    const removeLink = useCallback((index: number) => {
        setLinks(prev => prev.filter((_, i) => i !== index));
    }, []);

    // File Logic
    const addFiles = useCallback((newFiles: File[]) => {
        setFiles(prev => {
            const filteredNewFiles = newFiles.filter(
                nf => !prev.some(ef => ef.name === nf.name)
            );
            return [...prev, ...filteredNewFiles];
        });
    }, []);

    const removeFile = useCallback((index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }, []);

    const resetForm = useCallback(() => {
        setSelectedRole("");
        setSelectedSkills([]);
        setIntro("");
        setLinks([]);
        setFiles([]);
    }, []);

    return {
        state: {
            selectedRole,
            selectedSkills,
            intro,
            links,
            files
        },
        actions: {
            setSelectedRole,
            setIntro,
            handleRoleSelect,
            toggleSkill,
            addLink,
            removeLink,
            addFiles,
            removeFile,
            resetForm
        }
    };
};
