import React from "react";

interface SeasonBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badgeUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const SeasonBadgeModal: React.FC<SeasonBadgeModalProps> = ({
  isOpen,
  onClose,
  badgeUrl,
  isLoading,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 relative max-w-lg w-full mx-auto">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Season Badge
        </h2>
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {badgeUrl && !isLoading && !error && (
          <div className="flex justify-center items-center">
            <img
              src={badgeUrl}
              alt="Season Badge"
              className="max-w-full h-auto rounded-md"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/200x200/cccccc/333333?text=No+Image";
              }}
            />
          </div>
        )}
        {!badgeUrl && !isLoading && !error && (
          <p className="text-gray-600 text-center">
            No badge available for this league.
          </p>
        )}
      </div>
    </div>
  );
};

export default SeasonBadgeModal;
