import { useContext } from "react";
import type { LeagueContextType } from "../types";
import { LeagueContext } from "../contexts/LeagueContext";

export const useLeagues = (): LeagueContextType => {
  const context = useContext(LeagueContext);
  if (context === undefined) {
    throw new Error("useLeagues must be used within a LeagueProvider");
  }
  return context;
};
