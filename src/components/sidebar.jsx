import { Outlet } from "react-router-dom";
import Logo from "./logo"
import styles from './sidebar.module.css'
import AppNav from "./appNav";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav/>
      <Outlet/>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar
