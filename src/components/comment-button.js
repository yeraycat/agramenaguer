import { CommentIconOutlined } from "./icons/comment";

export default function CommentButton() {
  return (
    <div className="cursor-pointer hover:text-grey-primary mr-2">
      <CommentIconOutlined />
    </div>
  );
}
