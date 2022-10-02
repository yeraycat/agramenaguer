import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { FILES_URL } from "../constants/pocketbase";
import { getUserProfileByUsername } from "../lib/pocketbase";
import ProfileActions from "./profile-actions";
import ProfileDescription from "./profile-description";
import ProfileStats from "./profile-stats";

export default function ProfileHeader({
  username,
  activeProfileFollowing,
  activeProfileId,
  postsNum,
  followingNum,
  followersNum,
}) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    async function userProfile() {
      setProfile(await getUserProfileByUsername(username));
    }
    if (username) {
      userProfile();
    }
  }, [username]);
  return (
    <>
      {profile && (
        <div className="flex mb-8">
          <div className="flex justify-center w-1/3">
            {profile?.avatar && (
              <img
                className="rounded-full w-32 h-32 lg:w-40 lg:h-40 object-contain bg-black-light flex"
                src={`${FILES_URL}systemprofiles0/${profile.id}/${profile.avatar}`}
                alt={username}
              />
            )}
          </div>
          <div className="flex flex-col w-2/3 md:w-2/5 px-4">
            <div className="flex justify-between w-full mb-4">
              <div className="text-2xl">{username}</div>{" "}
              <ProfileActions
                activeProfileId={activeProfileId}
                profileId={profile.id}
                following={activeProfileFollowing}
              />
            </div>
            <ProfileStats
              profileId={profile.id}
              postsNum={postsNum}
              followersNum={followersNum}
              followingNum={followingNum}
            />
            <ProfileDescription description={profile.description} />
          </div>
        </div>
      )}
    </>
  );
}

ProfileHeader.propTypes = {
  activeProfileId: PropTypes.string,
  activeProfileFollowing: PropTypes.any,
  username: PropTypes.string.isRequired,
};
