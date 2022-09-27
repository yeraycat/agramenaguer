import { Link } from "react-router-dom";
import CommentButton from "./comment-button";
import LikeButton from "./like-button";
import SendButton from "./send-button";
import BookmarkButton from "./bookmark-button";
import { useContext, useState } from "react";
import { pocketbaseClient } from "../lib/pocketbase";
import UserContext from "../context/user";

export default function TimelinePost({ post }) {
  const { user } = useContext(UserContext);
  const [likesNum, setLikesNum] = useState(post["@expand"].likes.length);
  const [likeId, setLikeId] = useState(post.liked);
  const [liked, setLiked] = useState(!!post.liked);
  const userprofile = post["@expand"]?.userprofile;

  const onLike = async () => {
    if (!liked) {
      setLiked(true);
      const likeResult = await pocketbaseClient.records.create("likes", {
        userprofile: user.profile.id,
        post: post.id,
      });
      setLikeId(likeResult.id);
      setLikesNum(likesNum + 1);
    } else {
      await pocketbaseClient.records.delete("likes", likeId);
      setLikesNum(likesNum - 1);
      setLiked(false);
    }
  };

  return (
    <div className="border-2 border-grey-primary rounded py-2 mb-6 bg-white">
      <div className="flex cursor-pointer mb-2 px-2">
        <Link className="flex items-center" to={`/p/${userprofile?.username}`}>
          <img
            className={`rounded-full h-10 w-10 flex border-2 border-grey-background`}
            src={`/api/files/systemprofiles0/${userprofile?.id}/${userprofile?.avatar}`}
            alt={`${userprofile?.username}`}
          />
          <p className="ml-2 font-semibold text-black-light h-8">
            {userprofile?.username}
          </p>
        </Link>
      </div>
      {post.media_content && (
        <div className="mb-4 ">
          <img
            className="w-full max-h-[435px] lg:max-h-screen object-contain bg-black-light"
            src={`/api/files/posts/${post.id}/${post.media_content}`}
            alt={post.text_content}
          />
        </div>
      )}
      <div className="flex justify-between mb-2 px-2">
        <div className="flex">
          <LikeButton onLike={() => onLike()} liked={liked} />
          <CommentButton />
          <SendButton />
        </div>
        <BookmarkButton />
      </div>
      <div>Likes: {likesNum}</div>
      {post.text_content && (
        <div className="px-2">
          <span className="font-bold text-black-light">
            {post["@expand"].userprofile.username}
          </span>{" "}
          {post.text_content}
        </div>
      )}
    </div>
  );
}