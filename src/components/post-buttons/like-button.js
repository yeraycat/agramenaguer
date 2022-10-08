import { LikeIconFullRed, LikeIconOutlined } from "../icons/like";

export default function LikeButton({ onLike, liked }) {
  return (
    <div
      className="cursor-pointer hover:text-grey-primary mr-2"
      onClick={onLike}
    >
      {liked ? <LikeIconFullRed /> : <LikeIconOutlined />}
    </div>
  );
}
