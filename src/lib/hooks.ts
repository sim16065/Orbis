"use client";

import { useState, useEffect, useCallback } from "react";
import {
    getBookmarks,
    toggleBookmark as toggleBookmarkStorage,
    getAppliedTeams,
    applyToTeam as applyToTeamStorage,
} from "./storage";

// 북마크 상태를 관리하는 커스텀 훅
export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<string[]>([]);

    useEffect(() => {
        setBookmarks(getBookmarks());
    }, []);

    const toggleBookmark = useCallback((hackathonId: string) => {
        const isNowBookmarked = toggleBookmarkStorage(hackathonId);
        setBookmarks(getBookmarks());
        return isNowBookmarked;
    }, []);

    const isBookmarked = useCallback(
        (hackathonId: string) => bookmarks.includes(hackathonId),
        [bookmarks]
    );

    return { bookmarks, toggleBookmark, isBookmarked };
}

// 팀 지원 상태를 관리하는 커스텀 훅
export function useTeamApplications() {
    const [appliedTeams, setAppliedTeams] = useState<string[]>([]);

    useEffect(() => {
        setAppliedTeams(getAppliedTeams());
    }, []);

    const applyToTeam = useCallback((teamId: string) => {
        applyToTeamStorage(teamId);
        setAppliedTeams(getAppliedTeams());
    }, []);

    const isApplied = useCallback(
        (teamId: string) => appliedTeams.includes(teamId),
        [appliedTeams]
    );

    return { appliedTeams, applyToTeam, isApplied };
}

// 검색/필터 상태를 관리하는 커스텀 훅
export function useFilter<T>(
    items: T[],
    filterFn: (item: T, query: string) => boolean
) {
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<T[]>(items);

    useEffect(() => {
        if (!query.trim()) {
            setFiltered(items);
        } else {
            setFiltered(items.filter((item) => filterFn(item, query.toLowerCase())));
        }
    }, [query, items, filterFn]);

    return { query, setQuery, filtered };
}

// 로컬 스토리지 값을 반응형으로 사용하는 범용 훅
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) setStoredValue(JSON.parse(item));
        } catch {
            setStoredValue(initialValue);
        }
    }, [key, initialValue]);

    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch {
                console.error("useLocalStorage setValue 실패");
            }
        },
        [key, storedValue]
    );

    return [storedValue, setValue] as const;
}
