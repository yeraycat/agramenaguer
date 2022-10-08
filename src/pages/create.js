import { useContext } from "react";
import CreatePost from "../components/create-post";
import Header from "../components/header";
import UserContext from "../context/user";

export default function Create() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-screen-lg h-full px-2 md:px-8">
        <CreatePost
          userId={user.id}
          profileId={user.profile.id}
          username={user.profile.username}
        />
      </div>
    </>
  );
}
