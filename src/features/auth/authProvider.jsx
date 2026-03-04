import { useReducer } from "react";
import { AuthContext } from "./authContext";
const user_email = import.meta.env.VITE_USER;
const user_password = import.meta.env.VITE_PASSWORD;
const user_profile = import.meta.env.VITE_AVATAR;
const user_name = import.meta.env.VITE_NAME;

const initialState = {
  user: null,
  isAuth: false,
  loginFailed: false,
  authenticating: false,
};
function reduce(state, action) {
  switch (action.type) {
    case "authenticating":
      return { ...state, authenticating: true };
    case "login":
      return {
        ...state,
        user: { avatar: user_profile, name: user_name },
        isAuth: true,
        authenticating: false,
      };
    case "logout":
      return { ...state, user: null, isAuth: false };
    case "loginFailure":
      return { ...state, loginFailed: true, authenticating: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuth, loginFailed, authenticating }, dispatch] = useReducer(
    reduce,
    initialState,
  );
  function login(email, password) {
    dispatch({ type: "authenticating" });
    if (email === user_email && password === user_password)
      dispatch({ type: "login" });
    else dispatch({ type: "loginFailure" });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuth, loginFailed, authenticating, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
