import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login,isLoading, error } = useLogin()

  
  const handleSubmit = async(event) => {
    event.preventDefault();
     await login(
      email,
      password,
    );
   
  };


  return (
     <div className="flex justify-center items-center h-screen min-h-full">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:outline-none"
          />
          {error && <div className="error">{error}</div>}
          {isLoading && <div className="isLoading"> 
          <h1>
          Loading...
          </h1>
          </div>}
          <button disabled={isLoading}  className="w-50 bg-green-500 hover:bg-indigo-700 text-white font-bold mx-18 py-2 px-4 rounded">
               Login
        </button>        
        </form>
        <Link to="/register" className="mt-4 block text-center text-gray-500 hover:text-gray-700">
          Don't have an account? Register here.
        </Link>
      </div>
    </div>
  );
};

export default Login;