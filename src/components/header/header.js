import { useContext } from "react";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { FILES_URL } from "../../constants/pocketbase";

import UserContext from "../../context/user";

import { logout } from "../../lib/pocketbase";

import { LogoutIconOutlined } from "../icons/logout";
import Logo from "../logo";
import {
  CreatePostNavLink,
  HomeNavLink,
  UserProfileNavLink,
} from "./nav-links";

export default function Header() {
  let { pathname } = useResolvedPath();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const avatarUrl = `${FILES_URL}systemprofiles0/${user.profile.id}/${user.profile.avatar}`;

  return (
    <header className="h-16 bg-white border-b border-grey-primary mb-8 sticky top-0 left-0 z-10">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full px-2">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to="/">
                <Logo />
              </Link>
            </h1>
          </div>

          <nav className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            {user ? (
              <>
                <HomeNavLink currentPath={pathname} />
                <CreatePostNavLink currentPath={pathname} />
                <UserProfileNavLink
                  currentPath={pathname}
                  username={user.profile.username}
                  imageUrl={avatarUrl}
                />

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <LogoutIconOutlined />
                </button>
              </>
            ) : (
              <></>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
