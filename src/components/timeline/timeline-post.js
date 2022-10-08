import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { pocketbaseClient } from "../../lib/pocketbase";
import UserContext from "../../context/user";
import { FILES_URL } from "../../constants/pocketbase";
import LikeButton from "../post-buttons/like-button";
import CommentButton from "../post-buttons/comment-button";
import SendButton from "../post-buttons/send-button";
import BookmarkButton from "../post-buttons/bookmark-button";

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
            src={`${FILES_URL}systemprofiles0/${userprofile?.id}/${userprofile?.avatar}`}
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
            src={`${FILES_URL}posts/${post.id}/${post.media_content}`}
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
      <div className="px-2 text-sm mb-2">
        {!!likesNum && likesNum === 1 && `1 person liked this post`}
        {!!likesNum && likesNum > 1 && `${likesNum} people liked this post`}
      </div>
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
