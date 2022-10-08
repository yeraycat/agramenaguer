import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PostsGallery from "../components/posts-gallery";
import ProfileHeader from "../components/profile-header";

import UserContext from "../context/user";
import useFollowing from "../hooks/useFollowing";
import {
  getFollowersByUsername,
  getFollowingByUsername,
  getUserPostsByUsername,
} from "../lib/pocketbase";

export default function Profile() {
  const { user: activeUser } = useContext(UserContext);
  const { username } = useParams();
  const { following: activeUserFollowing } = useFollowing(activeUser.id);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadProfileInfo() {
      setPosts(await getUserPostsByUsername(username));
      const followers = await getFollowersByUsername(username);
      setFollowersCount(followers.length);
      const following = await getFollowingByUsername(username);
      setFollowingCount(following.length);
    }

    if (username) {
      loadProfileInfo();
    }
  }, [username]);

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-screen-lg h-full px-2 md:px-8">
        <ProfileHeader
          username={username}
          activeProfileId={activeUser?.profile.id}
          activeProfileFollowing={activeUserFollowing}
          postsNum={posts?.length || 0}
          followersNum={followersCount}
          followingNum={followingCount}
        />
        <PostsGallery username={username} posts={posts} />
      </div>
    </>
  );
}
