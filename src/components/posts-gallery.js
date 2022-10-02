import { FILES_URL } from "../constants/pocketbase";

export default function PostsGallery({ posts }) {
  return (
    <div className="grid gap-0 grid-cols-3">
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            {post.media_content && (
              <img
                className="w-full min-h-[150px] h-[150px] md:h-full lg:max-h-[300px] object-contain bg-black-light"
                src={`${FILES_URL}posts/${post.id}/${post.media_content}`}
                alt={post.text_content}
              />
            )}
            {!post.media_content && post.text_content && (
              <p>{post.text_content}</p>
            )}
          </div>
        ))}
    </div>
  );
}
