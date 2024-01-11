import React, { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

const Register = () => {

  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("pending");
  const { signup, isLoading, error, success } = useSignUp()

  const handleSubmit = async (e) => {
      e.preventDefault();
      
  
    await signup(
      name,
      phone_number,
      section,
      year,
      email,
      password,
      role,
      status
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "role":
        setRole(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "section":
        setSection(value);
        break;
      case "year":
        setYear(value);
        break;
      default:
        setRole("");
        break;
    }
  };
  return (
   <div className="flex justify-center items-center h-screen min-h-full">
  <div className="grid rounded-lg shadow-md bg-white p-8 w-full max-w-md">
    <h1 className="text-center text-3xl font-bold">Sign Up</h1>
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input
            type="text"
            required
             name="name"
        placeholder="Full Name"
        onChange={handleChange}
            className="w-full px-3 py-2 
        border rounded-md border-gray-300 focus:border-indigo-500 focus:outline-none"
      />
      <input
            type="text"
             required
            placeholder="Phone"
           name="phone"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:outline-none"
      />
      <input
            type="email"
            placeholder="Email"
             required
        onChange={handleChange}
        name="email"
        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:outline-none"
      />
      <input
            type="password"
             required
            placeholder="Password"
        onChange={handleChange}
        name="password"
        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:outline-none"
      />

      <label>User : </label>
      <select onChange={handleChange} required name="role" value={role}>
        <option required value="teacher">Teacher</option>
        <option required value="student" onChange={(e) => setStatus("")}>
          Student
        </option>
      </select>
      {role === "student" && (
        <>
              <input
                required
            name="section"
            placeholder="Section"
            onChange={handleChange}
            
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:outline-none"
          />
              <input
                
            required
                name="year"
    
            placeholder="Year"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:outline-none"
          />
        </>
          )}
          <br /><br />
      <button disabled={isLoading}  className="w-50 bg-green-500 hover:bg-indigo-700 text-white font-bold mx-18 py-2 px-4 rounded">
        Sign Up
        </button>
        {error && <div className="error">{error}</div>}
        {success && <div className="error">{success}</div>}
    </form>
  </div>
</div>
  );
};

export default Register;