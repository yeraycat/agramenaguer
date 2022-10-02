import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import Logo from "../components/logo";
import { pocketbaseClient } from "../lib/pocketbase";

const MemoizedLoginInput = React.memo(LoginInput);

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  useEffect(() => {
    document.title = "Sign up - Instagram";
  }, []);

  const handleSignup = useCallback(
    (e) => {
      e.preventDefault();
      async function createAccount() {
        try {
          const user = await pocketbaseClient.users.create({
            email: emailAddress,
            password,
            passwordConfirm: repeatPassword,
          });
          await pocketbaseClient.users.authViaEmail(emailAddress, password);
          await pocketbaseClient.records.update("profiles", user.profile.id, {
            username,
            name: fullName,
          });
          await pocketbaseClient.users.requestVerification(user.email);
          navigate("/");
        } catch (e) {
          setError("Error signing up");
        }
      }
      createAccount();
    },
    [emailAddress, password, repeatPassword, fullName, username, navigate]
  );

  const updateEmail = useCallback((email) => setEmailAddress(email), []);
  const updatePassword = useCallback((password) => setPassword(password), []);
  const updateRepeatPassword = useCallback(
    (repeatPassword) => setRepeatPassword(repeatPassword),
    []
  );
  const updateUsername = useCallback((username) => setUsername(username), []);
  const updateFullName = useCallback((fullName) => setFullName(fullName), []);

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

          <form onSubmit={handleSignup} method="POST">
            <input type="hidden" name="remember" defaultValue="true" />

            <MemoizedLoginInput
              id="username"
              label="Username"
              ariaLabel="Enter your username"
              name="username"
              type="text"
              required={true}
              placeholder="Username"
              value={username}
              onChange={updateUsername}
            />

            <MemoizedLoginInput
              id="fullname"
              label="Full name"
              ariaLabel="Enter your full name"
              name="fullname"
              type="text"
              required={true}
              placeholder="Full name"
              value={fullName}
              onChange={updateFullName}
            />

            <MemoizedLoginInput
              id="email-address"
              label="Email address"
              ariaLabel="Enter your email address"
              name="email"
              type="email"
              autoComplete="email"
              required={true}
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
            <MemoizedLoginInput
              id="repeat-password"
              label="Type your password again"
              name="password"
              type="password"
              ariaLabel="Repeat your password"
              autoComplete="current-password"
              required={true}
              placeholder="Repeat password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
            />

            <div>
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                  isInvalid ? "opacity-50" : ""
                }`}
              >
                Create account
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white mt-5 p-4 border border-grey-primary rounded">
          <p>
            Do you already have an account?{" "}
            <Link to="/login" className="font-bold text-blue-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
