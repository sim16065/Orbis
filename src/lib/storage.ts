// localStorage 헬퍼 유틸리티

export function getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;
    try {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
        return defaultValue;
    }
}

export function setItem<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.error("localStorage setItem 실패:", key);
    }
}

export function removeItem(key: string): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.removeItem(key);
    } catch {
        console.error("localStorage removeItem 실패:", key);
    }
}

// 북마크된 해커톤 ID 목록
export const BOOKMARKS_KEY = "orbis_bookmarks";
export const APPLIED_KEY = "orbis_applied";
export const USER_PROFILE_KEY = "orbis_user_profile";

export function getBookmarks(): string[] {
    return getItem<string[]>(BOOKMARKS_KEY, []);
}

export function toggleBookmark(hackathonId: string): boolean {
    const bookmarks = getBookmarks();
    const isBookmarked = bookmarks.includes(hackathonId);
    if (isBookmarked) {
        setItem(BOOKMARKS_KEY, bookmarks.filter((id) => id !== hackathonId));
        return false;
    } else {
        setItem(BOOKMARKS_KEY, [...bookmarks, hackathonId]);
        return true;
    }
}

export function isBookmarked(hackathonId: string): boolean {
    return getBookmarks().includes(hackathonId);
}

export function getAppliedTeams(): string[] {
    return getItem<string[]>(APPLIED_KEY, []);
}

export function applyToTeam(teamId: string): void {
    const applied = getAppliedTeams();
    if (!applied.includes(teamId)) {
        setItem(APPLIED_KEY, [...applied, teamId]);
    }
}

export function isApplied(teamId: string): boolean {
    return getAppliedTeams().includes(teamId);
}
