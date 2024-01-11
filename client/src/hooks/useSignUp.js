import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {  useNavigate } from "react-router-dom";
export const useSignUp = () => {


  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const signup = async (
    name,
    phone_number,
    section,
    year,
    email,
    password,
    role,
    status
  ) => {
    setisLoading(true);
    setError(null);
    const response = await fetch("https://instructors-react-app.vercel.app/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        phone_number,
        section,
        year,
        email,
        password,
        role,
        status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setisLoading(false);
      setError(json.error);
    }
    if (response.ok) {
    

      setSuccess("Registered Suuceefully");
      setTimeout(() => {
        setError(null);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setisLoading(false);
      navigate("/evaluation_page");
      }, 500); // Delay of 5 seconds

      


    }
  };
  return { signup, isLoading, error, success };
};
