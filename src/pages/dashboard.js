import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import UserContext from "../context/user";

export default function Dashboard() {
  const { user } = useContext(UserContext);
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
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
