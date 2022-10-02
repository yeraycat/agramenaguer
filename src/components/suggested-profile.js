import PropTypes from "prop-types";
import { useState } from "react";
import { FILES_URL } from "../constants/pocketbase";
import { follow } from "../lib/pocketbase";

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
        {avatar && (
          <img
            className="rounded-full w-8 h-8 flex mr-3"
            src={`${FILES_URL}systemprofiles0/${profileId}/${avatar}`}
          />
        )}
        {!avatar && (
          <div className="rounded-full w-8 h-8 flex mr-3 items-center justify-center bg-grey-primary font-semibold">
            {username[0].toUpperCase()}
          </div>
        )}
        <div className="mr-3">{username}</div>
      </div>
      <button
        className="w-28 border-2 border-black-light hover:text-white hover:bg-black-light w-full rounded h-8 font-bold px-2"
        onClick={async () => {
          await follow(activeUsersProfileId, profileId);
          setFollowed(true);
        }}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  activeUsersProfileId: PropTypes.string,
  avatar: PropTypes.string,
};
