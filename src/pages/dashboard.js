import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/sidebar";
import Timeline from "../components/timeline/timeline";
import FollowingContext from "../context/following";
import UserContext from "../context/user";
import useFollowing from "../hooks/useFollowing";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const { following } = useFollowing(user?.id);

  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Agramenagüer";
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="bg-grey-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full px-2 md:px-8">
          <FollowingContext.Provider value={{ following }}>
            <Timeline />
            <Sidebar />
          </FollowingContext.Provider>
        </div>
      </div>
    </div>
  );
}
