import React, { useState } from "react";
import Layout from "./components/Layout/Layout";
import SearchBar from "./components/SearchBar/SearchBar";
import Dropdown from "./components/Dropdown/Dropdown";
import LeagueCard from "./components/LeagueCard/LeagueCard";
import SeasonBadgeModal from "./components/SeasonBadgeModal/SeasonBadgeModal";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { useLeagues } from "./hooks/useLeagues";

const App: React.FC = () => {
  const {
    filteredLeagues,
    searchTerm,
    setSearchTerm,
    selectedSport,
    setSelectedSport,
    uniqueSports,
    isLoading,
    error,
    fetchSeasonBadge,
  } = useLeagues();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBadgeUrl, setCurrentBadgeUrl] = useState<string | null>(null);
  const [isBadgeLoading, setIsBadgeLoading] = useState(false);
  const [badgeError, setBadgeError] = useState<string | null>(null);

  const handleLeagueClick = async (leagueId: string) => {
    setIsModalOpen(true);
    setIsBadgeLoading(true);
    setBadgeError(null);
    setCurrentBadgeUrl(null);

    try {
      const url = await fetchSeasonBadge(leagueId);
      setCurrentBadgeUrl(url || null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setBadgeError(err.message);
      } else if (typeof err === "string") {
        setBadgeError(err);
      } else {
        setBadgeError("Failed to fetch badge.");
      }
    } finally {
      setIsBadgeLoading(false);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBadgeUrl(null);
    setBadgeError(null);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Dropdown
          options={uniqueSports}
          selectedValue={selectedSport}
          onValueChange={setSelectedSport}
          label="Filter by sport"
        />
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && filteredLeagues.length === 0 && (
        <p className="text-center text-gray-600 text-lg mt-8">
          No leagues found matching your criteria.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {!isLoading &&
          !error &&
          filteredLeagues.map((league) => (
            <LeagueCard
              key={league.idLeague}
              league={league}
              onClick={handleLeagueClick}
            />
          ))}
      </div>

      <SeasonBadgeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        badgeUrl={currentBadgeUrl}
        isLoading={isBadgeLoading}
        error={badgeError}
      />
    </Layout>
  );
};

export default App;
