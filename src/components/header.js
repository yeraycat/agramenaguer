import { useContext } from "react";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { FILES_URL } from "../constants/pocketbase";

import UserContext from "../context/user";

import { pocketbaseClient } from "../lib/pocketbase";
import { AddIconFull, AddIconOutlined } from "./icons/add";
import { HomeIconFull, HomeIconOutlined } from "./icons/home";
import { LogoutIconOutlined } from "./icons/logout";
import Logo from "./logo";

export default function Header() {
  let { pathname } = useResolvedPath();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

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

          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            {user ? (
              <>
                <Link to="/">
                  {pathname !== "/" ? <HomeIconOutlined /> : <HomeIconFull />}
                </Link>
                <Link to="/create">
                  {pathname !== "/create" ? (
                    <AddIconOutlined />
                  ) : (
                    <AddIconFull />
                  )}
                </Link>

                <div className="flex items-center cursor-pointer mr-6">
                  <Link to={`/p/${user.profile.username}`}>
                    <img
                      className={`rounded-full h-8 w-8 flex border-2 border-grey-background ${
                        pathname === `/p/${user.profile.username}` &&
                        "border-black-light"
                      }`}
                      src={`${FILES_URL}systemprofiles0/${user.profile.id}/${user.profile.avatar}`}
                      alt="Profile"
                    />
                  </Link>
                </div>
                <button
                  onClick={() => {
                    pocketbaseClient.authStore.clear();
                    navigate("/login");
                  }}
                >
                  <LogoutIconOutlined />
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
