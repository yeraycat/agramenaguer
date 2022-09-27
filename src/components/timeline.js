import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { inFilter } from "../helpers/filter";
import { pocketbaseClient } from "../lib/pocketbase";
import TimelinePost from "./timeline-post";

/* This is horrible, querying logic should be moved to services and used from custom hooks? maybe */
export default function Timeline() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getTimeline() {
      const followsResultList = await pocketbaseClient.records.getFullList(
        "follows",
        50,
        {
          filter: `follower.id = "${user.profile.id}"`,
        }
      );

      const following = followsResultList.map((follows) => follows.followed);
      console.log({ following });
      const resultList = await pocketbaseClient.records.getList(
        "posts",
        1,
        10,
        {
          sort: "-created",
          filter: inFilter("userprofile", following),
          expand: "userprofile",
        }
      );
      console.log(user.profile.id);
      // const liked = await pocketbaseClient.records.getFullList("likes", 10, {
      //   filter: `userprofile="${user.profile.id}" && ${inFilter(
      //     "post",
      //     resultList.items.map((e) => e.id)
      //   )}`,
      //   expand: "userprofile,post",
      // });
      const filter = inFilter(
        "post",
        resultList.items.map((e) => e.id),
        `userprofile="${user.profile.id}"`
      );
      const liked = await pocketbaseClient.records.getFullList("likes", 10, {
        filter,
        expand: "userprofile,post",
      });
      console.log({ filter, liked });
      const likes = await pocketbaseClient.records.getFullList(
        "likes",
        undefined,
        {
          filter: inFilter(
            "post",
            resultList.items.map((e) => e.id)
          ),
        }
      );

      setPosts([
        ...resultList.items.map((post) => {
          post["liked"] =
            liked.find((like) => like.post === post.id)?.id || null;
          post["@expand"]["likes"] = likes.filter(
            (like) => like.post === post.id
          );
          return post;
        }),
      ]);
    }
    if (user) {
      getTimeline();
    }
  }, [user]);
  return (
    <div className="w-full md:w-3/5 md:pr-12">
      {posts && posts.map((post) => <TimelinePost key={post.id} post={post} />)}
    </div>
  );
}
