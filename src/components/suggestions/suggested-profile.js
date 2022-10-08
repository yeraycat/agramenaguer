import PropTypes from "prop-types";
import { useState } from "react";
import { FILES_URL } from "../../constants/pocketbase";
import { follow } from "../../lib/pocketbase";
import { Button } from "../buttons/button";
import { Avatar } from "../avatar/avatar";

export default function SuggestedProfile({
  username,
  profileId,
  activeUsersProfileId,
  avatar,
}) {
  const [followed, setFollowed] = useState(false);
  return !followed ? (
    <div className="flex flex-row items-center align-items, justify-between p-2">
      <div className="flex items-center justify-between">
        <Avatar
          imageUrl={
            avatar ? `${FILES_URL}systemprofiles0/${profileId}/${avatar}` : null
          }
          username={username}
        />
        <div className="mr-3">{username}</div>
      </div>
      <Button
        onClick={async () => {
          await follow(activeUsersProfileId, profileId);
          setFollowed(true);
        }}
      >
        Follow
      </Button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  activeUsersProfileId: PropTypes.string,
  avatar: PropTypes.string,
};
