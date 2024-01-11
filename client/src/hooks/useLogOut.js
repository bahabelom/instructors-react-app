import { useAuthContext } from "../hooks/useAuthContext";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
