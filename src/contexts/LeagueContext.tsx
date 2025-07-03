import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { LeagueState, LeagueContextType } from "../types";
import { fetchAllLeagues, fetchSeasonBadgeApi } from "../api/sportsdb"; // Імпортуємо перейменовану функцію

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const LeagueProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<LeagueState>({
    allLeagues: [],
    filteredLeagues: [],
    searchTerm: "",
    selectedSport: "",
    isLoading: false,
    error: null,
    cachedBadges: new Map<string, string>(),
    uniqueSports: [],
  });

  const fetchLeagues = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
    try {
      const data = await fetchAllLeagues();
      const leagues = data.leagues || [];
      const sports = Array.from(new Set(leagues.map((l) => l.strSport))).sort();

      setState((prevState) => ({
        ...prevState,
        allLeagues: leagues,
        filteredLeagues: leagues,
        uniqueSports: ["All Sports", ...sports],
        isLoading: false,
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setState((prevState) => ({
          ...prevState,
          error: err.message,
          isLoading: false,
        }));
      } else if (typeof err === "string") {
        setState((prevState) => ({
          ...prevState,
          error: err,
          isLoading: false,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          error: "Unknown error loading leagues.",
          isLoading: false,
        }));
      }
    }
  }, []);

  const fetchSeasonBadge = useCallback(
    async (leagueId: string): Promise<string | undefined> => {
      if (state.cachedBadges.has(leagueId)) {
        return state.cachedBadges.get(leagueId);
      }
      try {
        const data = await fetchSeasonBadgeApi(leagueId);
        const badgeUrl = data.seasons?.[0]?.strBadge;
        if (badgeUrl) {
          setState((prevState) => {
            const newCache = new Map(prevState.cachedBadges);
            newCache.set(leagueId, badgeUrl);
            return { ...prevState, cachedBadges: newCache };
          });
          return badgeUrl;
        }
        return undefined;
      } catch (err) {
        console.error("Error fetching badge:", err);
        return undefined;
      }
    },
    [state.cachedBadges],
  );

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  useEffect(() => {
    let currentLeagues = state.allLeagues;

    if (state.searchTerm) {
      currentLeagues = currentLeagues.filter((league) =>
        league.strLeague.toLowerCase().includes(state.searchTerm.toLowerCase()),
      );
    }

    if (state.selectedSport && state.selectedSport !== "All Sports") {
      currentLeagues = currentLeagues.filter(
        (league) => league.strSport === state.selectedSport,
      );
    }
    setState((prevState) => ({
      ...prevState,
      filteredLeagues: currentLeagues,
    }));
  }, [state.allLeagues, state.searchTerm, state.selectedSport]);

  const setSearchTerm = useCallback((term: string) => {
    setState((prevState) => ({ ...prevState, searchTerm: term }));
  }, []);

  const setSelectedSport = useCallback((sport: string) => {
    setState((prevState) => ({ ...prevState, selectedSport: sport }));
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      setSearchTerm,
      setSelectedSport,
      fetchLeagues,
      fetchSeasonBadge,
    }),
    [state, setSearchTerm, setSelectedSport, fetchLeagues, fetchSeasonBadge],
  );

  return (
    <LeagueContext.Provider value={contextValue}>
      {children}
    </LeagueContext.Provider>
  );
};

export { LeagueContext };
