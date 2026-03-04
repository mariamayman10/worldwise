import { useAuth } from "../features/auth/useAuth";
import Map from "../components/map";
import Sidebar from "../components/sidebar";
import User from "../components/user";
import styles from "./appLayout.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AppLayout() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, navigate]);
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
