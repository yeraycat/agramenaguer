import { useContext, useEffect, useState } from "react";
import FollowingContext from "../../context/following";
import UserContext from "../../context/user";

import {
  getLikesNumForPosts,
  getSelfLikesForPosts,
  getTimeline,
} from "../../lib/pocketbase";

export function useTimeline() {
  const { user } = useContext(UserContext);
  const { following } = useContext(FollowingContext);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function timeline() {
      const paginatedTimeline = await getTimeline(following);

      const timelinePostsIds = paginatedTimeline.items.map((e) => e.id);
      const liked = await getSelfLikesForPosts(
        user.profile.id,
        timelinePostsIds
      );
      const likes = await getLikesNumForPosts(timelinePostsIds);
      const timelinePosts = [
        ...paginatedTimeline.items.map((post) => {
          post["liked"] =
            liked.find((like) => like.post === post.id)?.id || null;
          post["@expand"]["likes"] = likes.filter(
            (like) => like.post === post.id
          );
          return post;
        }),
      ];
      setPosts(timelinePosts);
    }
    if (user && following) {
      timeline();
    }
  }, [user, following]);

  return { posts };
}
