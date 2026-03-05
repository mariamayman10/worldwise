import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import Button from "../components/button";
import Navbar from "../components/navbar";
import styles from "./login.module.css";
import SpinnerFullPage from "../components/spinnerFull";
function Login() {
  const { isAuth, loginFailed, authenticating, login } = useAuth();
  const [email, setEmail] = useState("mariam@gmail.com");
  const [password, setPassword] = useState("mariam");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/app", {replace:true});
  }, [isAuth, navigate]);

  function handleClick(e) {
    e.preventDefault();
    if(email&& password)login(email, password);
  }
  if (authenticating) return <SpinnerFullPage />;

  return (
    <main className={styles.login}>
      <Navbar />

      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loginFailed && (
          <p className={styles.errpr}>Invalid email or password</p>
        )}

        <div>
          <Button type="primary" onClick={handleClick}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
