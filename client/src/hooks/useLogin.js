import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {   useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const login = async (email, password) => {
    setisLoading(true);
    setError(null);
    const response = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();

    if (!response.ok) {
      setisLoading(false);
      setError(user.error);
    }
    if (response.ok) {

      setisLoading(true);
      setTimeout(() => {
        setError(null);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      setisLoading(false);
      // Navigate based on role directly after successful login
      if (user.role === "admin") {
        navigate("/admindashboard");
      } else if (user.role === "teacher") {
        navigate("/instructor_dashboard");
      } else {
        navigate("/evaluation_page");
      }
      }, 500); // Delay of 5 seconds
    }
  };
  return { login, isLoading, error };
};
