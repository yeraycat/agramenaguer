import { useContext, useEffect, useState } from "react";
import FollowingContext from "../../context/following";
import { getSuggestedProfiles } from "../../lib/pocketbase";

export function useSuggestions(userId) {
  const { following } = useContext(FollowingContext);
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    if (userId && following) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return {
    profiles,
  };
}
