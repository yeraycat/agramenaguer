import { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import FollowingContext from "../context/following";
import { getSuggestedProfiles } from "../lib/pocketbase";
import SuggestedProfile from "./suggested-profile";

export default function Suggestions({ userId, userProfileId }) {
  const [profiles, setProfiles] = useState(null);
  const { following } = useContext(FollowingContext);
  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    if (userId && following) {
      suggestedProfiles();
    }
  }, [userId, following]);

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
