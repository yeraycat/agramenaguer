import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { AddIconFull, AddIconOutlined } from "../icons/add";
import { HomeIconFull, HomeIconOutlined } from "../icons/home";
import { Avatar } from "../avatar/avatar";

export function HomeNavLink({ currentPath }) {
  return (
    <Link to={ROUTES.DASHBOARD}>
      {currentPath !== ROUTES.DASHBOARD ? (
        <HomeIconOutlined />
      ) : (
        <HomeIconFull />
      )}
    </Link>
  );
}

export function CreatePostNavLink({ currentPath }) {
  return (
    <Link to={ROUTES.CREATE_POST}>
      {currentPath !== ROUTES.CREATE_POST ? (
        <AddIconOutlined />
      ) : (
        <AddIconFull />
      )}
    </Link>
  );
}

export const activeUserProfileNavLinkClass = "border-black-light";

export function UserProfileNavLink({ currentPath, username, imageUrl }) {
  return (
    <div className="flex items-center cursor-pointer mr-6">
      <Link to={`/p/${username}`}>
        <Avatar
          className={`border-2 ${
            currentPath === `/p/${username}`
              ? activeUserProfileNavLinkClass
              : "border-grey-background"
          }`}
          username={username}
          imageUrl={imageUrl}
        />
      </Link>
    </div>
  );
}
