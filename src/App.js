import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/user";
import useAuthListener from "./hooks/useAuthListener";

const Error = lazy(() => import("./pages/error"));
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));

const fallback = "Loading...";

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={fallback}>
              <Dashboard />
            </Suspense>
          }
          errorElement={
            <Suspense fallback={fallback}>
              <Error />
            </Suspense>
          }
        />
        <Route
          path="/p/:username"
          element={
            <Suspense fallback={fallback}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={fallback}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={fallback}>
              <SignUp />
            </Suspense>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
