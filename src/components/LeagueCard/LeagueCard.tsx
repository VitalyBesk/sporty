import React from "react";
import type { League } from "../../types";

interface LeagueCardProps {
  league: League;
  onClick: (leagueId: string) => void;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 m-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex flex-col justify-between"
      onClick={() => onClick(league.idLeague)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(league.idLeague);
        }
      }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {league.strLeague}
      </h3>
      <p className="text-gray-600 text-sm mb-1">
        Sport: <span className="font-medium">{league.strSport}</span>
      </p>
      {league.strLeagueAlternate && (
        <p className="text-gray-500 text-xs italic">
          Alternate name: {league.strLeagueAlternate}
        </p>
      )}
    </div>
  );
};

export default LeagueCard;
