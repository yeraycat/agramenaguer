import { useContext } from "react";
import { FILES_URL } from "../constants/pocketbase";
import UserContext from "../context/user";
import Suggestions from "./suggestions";
import User from "./user";

export default function Sidebar() {
  const { user } = useContext(UserContext);

  return (
    <div className="relative w-2/5 hidden md:block">
      <div className="absoulte">
        <div className="fixed w-[40%] lg:w-[400px] p-2">
          {user && (
            <User
              username={user.profile.username}
              fullName={user.profile.name}
              imageUrl={`${FILES_URL}systemprofiles0/${user.profile.id}/${user.profile.avatar}`}
            />
          )}
          <div className="mt-2">
            <Suggestions userId={user?.id} userProfileId={user?.profile.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
