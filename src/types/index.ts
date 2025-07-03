export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string | null;
}

export interface AllLeaguesResponse {
  leagues: League[];
}

export interface Season {
  idLeague: string;
  strBadge: string;
}

export interface SeasonBadgeResponse {
  seasons: Season[];
}

export interface LeagueState {
  allLeagues: League[];
  filteredLeagues: League[];
  searchTerm: string;
  selectedSport: string;
  isLoading: boolean;
  error: string | null;
  uniqueSports: string[];
}

export interface LeagueContextType extends LeagueState {
  setSearchTerm: (term: string) => void;
  setSelectedSport: (sport: string) => void;
  fetchLeagues: () => Promise<void>;
  fetchSeasonBadge: (leagueId: string) => Promise<string | undefined>;
}

export type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: { leagues: League[]; sports: string[] } }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_SELECTED_SPORT"; payload: string };
