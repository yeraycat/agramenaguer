export default function ProfileStats({ postsNum, followersNum, followingNum }) {
  return (
    <div className="w-full flex justify-between font-semibold mb-4">
      <div>Posts: {postsNum}</div>
      <div>Followers: {followersNum}</div>
      <div>Following: {followingNum}</div>
    </div>
  );
}
