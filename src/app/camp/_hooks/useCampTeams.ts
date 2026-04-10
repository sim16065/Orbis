import { useState, useMemo, useEffect } from "react";
import { Team } from "@/data/teams";
import { RoleId } from "@/data/roles";
import { users } from "@/data/users";
import { getAllTeams, saveTeam as persistTeam } from "@/lib/team-store";

/**
 * Filter logic optimized for performance using a User Map
 */
function getFilteredTeams(
    teamsData: Team[],
    search: string,
    selectedRoles: RoleId[],
    selectedSkills: string[],
    selectedHackathon: string,
    isRecruitingOnly: boolean,
    userMap: Map<string, typeof users[0]>
) {
    if (teamsData.length === 0) return [];

    return teamsData.filter(team => {
        const query = search.toLowerCase();
        const matchesSearch = !search || 
            team.name.toLowerCase().includes(query) ||
            team.hackathonTitle.toLowerCase().includes(query) ||
            team.description.toLowerCase().includes(query);

        const matchesRoles = selectedRoles.length === 0 ||
            selectedRoles.some(roleId => team.requiredRoles.includes(roleId));

        const matchesSkills = selectedSkills.length === 0 ||
            selectedSkills.some(skill => {
                const skillQuery = skill.toLowerCase();
                // Check team required skills
                const inTeamSkills = team.requiredSkills.some(rs => rs.toLowerCase().includes(skillQuery));
                if (inTeamSkills) return true;

                // Check member skills (using pre-built Map for O(1) lookups inside the loop)
                return team.members.some(m => {
                    const user = userMap.get(m.userId);
                    return user?.skills.some(ms => ms.toLowerCase().includes(skillQuery));
                });
            });

        const matchesHackathon = selectedHackathon === "all" || team.hackathonId === selectedHackathon;
        const matchesStatus = !isRecruitingOnly || team.isRecruiting;

        return matchesSearch && matchesRoles && matchesSkills && matchesHackathon && matchesStatus;
    });
}

/**
 * Senior-level Custom Hook for Team Discovery (Camp) Page
 */
export function useCampTeams() {
    const [search, setSearch] = useState("");
    const [selectedRoles, setSelectedRoles] = useState<RoleId[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedHackathon, setSelectedHackathon] = useState("all");
    const [isRecruitingOnly, setIsRecruitingOnly] = useState(false);
    const [allTeams, setAllTeams] = useState<Team[]>([]);

    // 1. Initial Load
    useEffect(() => {
        setAllTeams(getAllTeams());
        document.title = "팀 찾기 | Orbis";
    }, []);

    // 2. Performance Optimization: Build user map once
    const userMap = useMemo(() => {
        return new Map(users.map(u => [u.id, u]));
    }, []);

    // 3. Derived State: Filtered Teams
    const filteredTeams = useMemo(() => 
        getFilteredTeams(
            allTeams, 
            search, 
            selectedRoles, 
            selectedSkills, 
            selectedHackathon, 
            isRecruitingOnly, 
            userMap
        ),
        [allTeams, search, selectedRoles, selectedSkills, selectedHackathon, isRecruitingOnly, userMap]
    );

    // 4. Mutation Handlers
    const addTeam = (newTeam: Team) => {
        persistTeam(newTeam);
        setAllTeams(prev => [newTeam, ...prev]);
    };

    const resetFilters = () => {
        setSelectedRoles([]);
        setSelectedSkills([]);
        setIsRecruitingOnly(false);
        setSelectedHackathon("all");
    };

    const toggleRole = (roleId: RoleId) => {
        setSelectedRoles(prev =>
            prev.includes(roleId) ? prev.filter(r => r !== roleId) : [...prev, roleId]
        );
    };

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    return {
        state: {
            search,
            selectedRoles,
            selectedSkills,
            selectedHackathon,
            isRecruitingOnly,
            allTeams,
            filteredTeams,
            activeFilterCount: 
                (selectedRoles.length > 0 ? 1 : 0) +
                (selectedSkills.length > 0 ? 1 : 0) +
                (isRecruitingOnly ? 1 : 0)
        },
        actions: {
            setSearch,
            toggleRole,
            toggleSkill,
            setSelectedHackathon,
            setIsRecruitingOnly,
            resetFilters,
            addTeam
        }
    };
}
