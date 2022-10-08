import PocketBase from "pocketbase";
import { POCKETBASE_URL } from "../constants/pocketbase";
import { inFilter } from "../helpers/filter";

export const pocketbaseClient = new PocketBase(POCKETBASE_URL);

export async function getTimeline(following) {
  try {
    return await pocketbaseClient.records.getList("posts", 1, 10, {
      sort: "-created",
      filter: inFilter("userprofile", following),
      expand: "userprofile",
    });
  } catch (e) {
    if (!e.isAbort) {
      console.error({ e });
      throw new Error("Error when building timeline");
    }
    return [];
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
    return following.map((follow) => follow.followed);
  } catch (e) {
    if (!e.isAbort) {
      console.error({ e });
      throw new Error("Error when getting following list");
    }
    return [];
  }
}

export async function getFollowingByUsername(username) {
  try {
    const following = await pocketbaseClient.records.getFullList(
      "follows",
      undefined,
      {
        filter: `follower.username = "${username}"`,
        $cancelKey: `following-${username}`,
      }
    );

    return following.map((follow) => follow.followed);
  } catch (e) {
    if (!e.isAbort) {
      console.error({ e });
      throw new Error("Error when getting following list");
    }
    return [];
  }
}

export async function getFollowers(userId) {
  try {
    const following = await pocketbaseClient.records.getFullList(
      "follows",
      undefined,
      {
        filter: `followed.userId = "${userId}"`,
      }
    );
    return following.map((follow) => follow.follower);
  } catch (e) {
    if (!e.isAbort) {
      console.error({ e });
      throw new Error("Error when getting followers");
    }
    return [];
  }
}

export async function getFollowersByUsername(username) {
  try {
    const followers = await pocketbaseClient.records.getFullList(
      "follows",
      undefined,
      {
        filter: `followed.username = "${username}"`,
        $cancelKey: `followers-${username}`,
      }
    );
    return followers.map((follow) => follow.follower);
  } catch (e) {
    if (!e.isAbort) {
      console.error({ e });
      throw new Error(`Error when getting followers for ${username}`);
    }
    return [];
  }
}

export async function getSuggestedProfiles(userId, following) {
  try {
    const result = await pocketbaseClient.records.getFullList("profiles", 10, {
      filter: `userId != "${userId}"`,
      $cancelKey: `suggested-${userId}`,
    });

    return result.filter(
      (profile) => profile.userId !== userId && !following.includes(profile.id)
    );
  } catch (e) {
    if (!e.isAbort) {
      console.error({ e });
      throw new Error(`Error when getting suggested profiles`);
    }
    return null;
  }
}

export async function follow(followerId, followedId) {
  try {
    await pocketbaseClient.records.create("follows", {
      follower: followerId,
      followed: followedId,
    });
  } catch (e) {
    console.error({ e });
    throw new Error(`Error when ${followerId} tried to follow ${followedId}`);
  }
}

export async function unfollow(followsRelId) {
  try {
    await pocketbaseClient.records.delete("follows", followsRelId);
  } catch (e) {
    console.error({ e });
    throw new Error(`Error when unfollowing`);
  }
}

export async function getUserProfileByUsername(username) {
  try {
    const response = await pocketbaseClient.records.getFullList("profiles", 1, {
      filter: `username = "${username}"`,
    });
    return response && response.length ? response[0] : null;
  } catch (e) {
    console.error({ e });
    throw new Error(`Could not retrieve profile`);
  }
}

export async function getUserPostsByUsername(username) {
  try {
    return await pocketbaseClient.records.getFullList("posts", undefined, {
      sort: "-created",
      filter: `userprofile.username = "${username}"`,
    });
  } catch (e) {}
}
