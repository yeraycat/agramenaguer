import Skeleton from "react-loading-skeleton";
import TimelinePost from "./timeline-post";
import { useTimeline } from "./useTimeline";

export default function Timeline() {
  const { posts: timelinePosts } = useTimeline();

  return (
    <div className="w-full md:w-3/5 md:pr-12">
      {!timelinePosts && <Skeleton count={3} height={400} />}
      {timelinePosts &&
        timelinePosts.map((post) => <TimelinePost key={post.id} post={post} />)}
    </div>
  );
}
