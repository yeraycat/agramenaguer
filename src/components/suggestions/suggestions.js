import PropTypes from "prop-types";

import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./suggested-profile";
import { useSuggestions } from "./useSuggestions";

export default function Suggestions({ userId, userProfileId }) {
  const { profiles } = useSuggestions(userId);

  return (
    <>
      {!profiles && <Skeleton count={1} height={150} className="mt-5" />}
      {profiles?.length && (
        <div className="rounded flex flex-col">
          <div className="text-sm flex items-center align-items justify-between mb-2">
            <p className="font-bold text-grey-base">Suggestions for you</p>
          </div>
          <div>
            {profiles.map((prof) => (
              <SuggestedProfile
                key={prof.id}
                username={prof.username}
                profileId={prof.id}
                activeUsersProfileId={userProfileId}
                avatar={prof.avatar}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

Suggestions.propTypes = {
  userId: PropTypes.string.isRequired,
  userProfileId: PropTypes.string.isRequired,
};
