import { teams as staticTeams, Team } from "@/data/teams";

const LOCAL_STORAGE_KEY = "orbit_custom_teams";

export function getAllTeams(): Team[] {
    if (typeof window === "undefined") return staticTeams;
    
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const customTeams: Team[] = stored ? JSON.parse(stored) : [];
    
    // Combine static and custom, prioritizing new ones
    return [...customTeams, ...staticTeams];
}

export function saveTeam(newTeam: Team) {
    if (typeof window === "undefined") return;
    
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const customTeams: Team[] = stored ? JSON.parse(stored) : [];
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newTeam, ...customTeams]));
}
