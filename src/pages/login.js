import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LoginInput from "../components/LoginInput";
import Logo from "../components/logo";

import { pocketbaseClient } from "../lib/pocketbase";

const MemoizedLoginInput = React.memo(LoginInput);

function Login() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      async function login() {
        try {
          await pocketbaseClient.users.authViaEmail(emailAddress, password);
          navigate("/");
          // if (user?.isVerified || user?.id === "9kbtql88nuroa8y") {
          //   dispatch({ type: "auth", payload: { token, user } });
          //   setError("");
          //   navigate("/");
          // } else {
          //   setError("User not verified. Check your inbox.");
          // }
        } catch (e) {
          setError("Error when login");
        }
      }
      login();
    },
    [emailAddress, password, navigate]
  );

  const updateEmail = useCallback((email) => setEmailAddress(email), []);
  const updatePassword = useCallback((password) => setPassword(password), []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-7/12">
        <img
          className="max-w-full"
          src="/images/iphone-with-app.jpg"
          alt="iPhone with Instagram App"
        />
      </div>
      <div className="flex flex-col w-6/12 pr-4">
        <div className="flex flex-col items-center bg-white p-4 border border-grey-primary mb-4 rounded">
          <h1 className="flex justify-center w-full h-16">
            {/* <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            /> */}
            <Logo />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />

            <MemoizedLoginInput
              id="email-address"
              label="Email address"
              ariaLabel="Enter your email address"
              name="email"
              type="email"
              autoComplete="email"
              required={false}
              placeholder="Email address"
              value={emailAddress}
              onChange={updateEmail}
            />
            <MemoizedLoginInput
              id="password"
              label="Email address"
              name="password"
              type="password"
              ariaLabel="Enter your password"
              autoComplete="current-password"
              required={true}
              placeholder="Password"
              onChange={updatePassword}
              value={password}
            />

            <div>
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                  isInvalid ? "opacity-50" : ""
                }`}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white mt-5 p-4 border border-grey-primary rounded">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
