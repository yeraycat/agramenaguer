import { useContext, useEffect, useState } from "react";
import FollowingContext from "../context/following";
import UserContext from "../context/user";
import { inFilter } from "../helpers/filter";
import { getFollowing, getTimeline, pocketbaseClient } from "../lib/pocketbase";
import TimelinePost from "./timeline-post";

export default function Timeline() {
  const { user } = useContext(UserContext);
  const { following } = useContext(FollowingContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function timeline() {
      const paginatedTimeline = await getTimeline(following);

      const filter = inFilter(
        "post",
        paginatedTimeline.items.map((e) => e.id),
        `userprofile="${user.profile.id}"`
      );
      const liked = await pocketbaseClient.records.getFullList("likes", 10, {
        filter,
        expand: "userprofile,post",
      });
      const likes = await pocketbaseClient.records.getFullList(
        "likes",
        undefined,
        {
          filter: inFilter(
            "post",
            paginatedTimeline.items.map((e) => e.id)
          ),
        }
      );

      setPosts([
        ...paginatedTimeline.items.map((post) => {
          post["liked"] =
            liked.find((like) => like.post === post.id)?.id || null;
          post["@expand"]["likes"] = likes.filter(
            (like) => like.post === post.id
          );
          return post;
        }),
      ]);
    }
    if (user && following) {
      console.log({ user });
      timeline();
    }
  }, [user, following]);
  return (
    <div className="w-full md:w-3/5 md:pr-12">
      {posts && posts.map((post) => <TimelinePost key={post.id} post={post} />)}
    </div>
  );
}
