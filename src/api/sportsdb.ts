import type { AllLeaguesResponse, SeasonBadgeResponse } from "../types";

const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3/";

export const fetchAllLeagues = async (): Promise<AllLeaguesResponse> => {
  try {
    const response = await fetch(`${BASE_URL}all_leagues.php`);
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all leagues:", error);
    throw error;
  }
};

export const fetchSeasonBadgeApi = async (
  leagueId: string,
): Promise<SeasonBadgeResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}search_all_seasons.php?badge=1&id=${leagueId}`,
    );

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching season badge for league ${leagueId}:`, error);
    throw error;
  }
};
