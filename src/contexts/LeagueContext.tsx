import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import type { Action, LeagueState, LeagueContextType } from "../types";
import { fetchAllLeagues, fetchSeasonBadgeApi } from "../api/sportsdb";

const initialState: LeagueState = {
  allLeagues: [],
  filteredLeagues: [],
  searchTerm: "",
  selectedSport: "All Sports",
  isLoading: true,
  error: null,
  uniqueSports: [],
};

const leagueReducer = (state: LeagueState, action: Action): LeagueState => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        allLeagues: action.payload.leagues,
        uniqueSports: ["All Sports", ...action.payload.sports],
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SELECTED_SPORT":
      return { ...state, selectedSport: action.payload };
    default:
      throw new Error("Unhandled action type");
  }
};

const LeagueContext = createContext<LeagueContextType | undefined>(undefined);

export const LeagueProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(leagueReducer, initialState);
  const cachedBadgesRef = useRef<Map<string, string>>(new Map());

  const fetchLeagues = useCallback(async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const data = await fetchAllLeagues();
      const leagues = data.leagues || [];
      const sports = Array.from(new Set(leagues.map((l) => l.strSport))).sort();
      dispatch({ type: "FETCH_SUCCESS", payload: { leagues, sports } });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error loading leagues.";
      dispatch({ type: "FETCH_FAILURE", payload: errorMessage });
    }
  }, []);

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  const filteredLeagues = useMemo(() => {
    return state.allLeagues
      .filter((league) =>
        league.strLeague.toLowerCase().includes(state.searchTerm.toLowerCase()),
      )
      .filter(
        (league) =>
          state.selectedSport === "All Sports" ||
          league.strSport === state.selectedSport,
      );
  }, [state.allLeagues, state.searchTerm, state.selectedSport]);

  const fetchSeasonBadge = useCallback(
    async (leagueId: string): Promise<string | undefined> => {
      if (cachedBadgesRef.current.has(leagueId)) {
        return cachedBadgesRef.current.get(leagueId);
      }
      try {
        const data = await fetchSeasonBadgeApi(leagueId);
        const badgeUrl = data.seasons?.[0]?.strBadge;
        if (badgeUrl) {
          cachedBadgesRef.current.set(leagueId, badgeUrl);
          return badgeUrl;
        }
      } catch (err) {
        console.error(`Error fetching badge for league ${leagueId}:`, err);
      }
      return undefined;
    },
    [],
  );

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  }, []);

  const setSelectedSport = useCallback((sport: string) => {
    dispatch({ type: "SET_SELECTED_SPORT", payload: sport });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      filteredLeagues,
      setSearchTerm,
      setSelectedSport,
      fetchLeagues,
      fetchSeasonBadge,
    }),
    [
      state,
      filteredLeagues,
      setSearchTerm,
      setSelectedSport,
      fetchLeagues,
      fetchSeasonBadge,
    ],
  );

  return (
    <LeagueContext.Provider value={contextValue}>
      {children}
    </LeagueContext.Provider>
  );
};

export { LeagueContext };
