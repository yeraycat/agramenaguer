import { useContext } from "react";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { FILES_URL } from "../constants/pocketbase";

import UserContext from "../context/user";

import { pocketbaseClient } from "../lib/pocketbase";
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
                  {pathname !== "/" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 mr-6 text-black-light cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-6 text-black-light cursor-pointer"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </Link>
                <Link to="/create">
                  {pathname !== "/create" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 mr-6 text-black-light cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 mr-6 text-black-light cursor-pointer"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                        clipRule="evenodd"
                      />
                    </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 text-black-light cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
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
