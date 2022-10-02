export default function ProfileActions({
  activeProfileId,
  profileId,
  following,
}) {
  console.log({ activeProfileId, profileId });
  return (
    <div className="">
      {activeProfileId !== profileId && following?.includes(profileId) && (
        <button className="w-28 border-2  border-black-light hover:text-white hover:bg-black-light w-full rounded h-8 font-bold px-2">
          Unfollow
        </button>
      )}
      {activeProfileId !== profileId && !following?.includes(profileId) && (
        <button className="w-28 border-2  border-black-light hover:text-white hover:bg-black-light w-full rounded h-8 font-bold px-2">
          Follow
        </button>
      )}
    </div>
  );
}
