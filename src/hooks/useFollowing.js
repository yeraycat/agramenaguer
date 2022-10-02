import { useState, useEffect } from "react";
import { getFollowing } from "../lib/pocketbase";

export default function useFollowing(userId) {
  const [following, setFollowing] = useState(null);
  useEffect(() => {
    async function following() {
      const following = await getFollowing(userId);
      setFollowing(following);
    }
    if (userId) {
      following();
    }
  }, [userId]);

  return { following };
}
