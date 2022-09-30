import PocketBase from "pocketbase";
import { inFilter } from "../helpers/filter";

export const pocketbaseClient = new PocketBase("http://127.0.0.1:8090");

export async function getTimeline(following) {
  try {
    return await pocketbaseClient.records.getList("posts", 1, 10, {
      sort: "-created",
      filter: inFilter("userprofile", following),
      expand: "userprofile",
    });
  } catch (e) {
    console.error({ e });
    throw new Error("Error when building timeline");
  }
}

export async function getFollowing(userId) {
  try {
    const following = await pocketbaseClient.records.getFullList(
      "follows",
      undefined,
      {
        filter: `follower.userId = "${userId}"`,
      }
    );
    console.log({ following });
    return following.map((follow) => follow.followed);
  } catch (e) {
    console.error({ e });
    throw new Error("Error when getting suggestions");
  }
}

export async function getSuggestedProfiles(userId, following) {
  try {
    const result = await pocketbaseClient.records.getFullList("profiles", 10, {
      filter: `userId != "${userId}"`,
    });

    return result.filter(
      (profile) => profile.userId !== userId && !following.includes(profile.id)
    );
  } catch (e) {
    console.error({ e });
  }
  return null;
}

export async function follow(followerId, followedId) {
  try {
    const response = await pocketbaseClient.records.create("follows", {
      follower: followerId,
      followed: followedId,
    });
    console.logo(response);
  } catch (e) {
    console.error({ e });
  }
}
