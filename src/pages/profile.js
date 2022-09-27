import Header from "../components/Header";
import PostsGallery from "../components/posts-gallery";
import ProfileHeader from "../components/profile-header";

export default function Profile() {
  return (
    <>
      <Header />
      <div>
        <ProfileHeader />
        <PostsGallery />
      </div>
    </>
  );
}
