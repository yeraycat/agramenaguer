import { useContext } from "react";
import UserContext from "../context/user";
import User from "./user";

export default function Sidebar() {
  const { user } = useContext(UserContext);
  console.log({ user });
  return (
    <div className="relative w-2/5 hidden md:block">
      <div className="absoulte">
        <div className="fixed w-[40%] lg:w-[400px] p-2">
          <User
            username={user.profile.username}
            fullName={user.profile.name}
            imageUrl={`/api/files/systemprofiles0/${user.profile.id}/${user.profile.avatar}`}
          />
          <p className="mt-2">
            This is the sidebar. Some users to follow will be suggested here,
            but the feature isn't ready yet.
          </p>
        </div>
      </div>
    </div>
  );
}
