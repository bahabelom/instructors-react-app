import React from "react";
import { Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut"; // Import the useLogout hook
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
  
  const { logout } = useLogOut(); // Access the logout function from the hook

  const {user} =useAuthContext()
  const handleClick = () => {
    logout();
  }
  return (
    <nav className="bg-gray-200 px-4 py-2 flex justify-between items-center">
      <div>
        <Link to="/" className="text-gray-900 hover:text-gray-700 font-bold">
          My App
        </Link>
      </div>
     

      {user ? (
        <div className="flex items-center">
          <span className="px-5">  {user.name}  </span>
          <button className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300" onClick={handleClick}>
            Logout
          </button>
        </div>
      ) : (
        <ul className="flex space-x-4">
        <li>
          <Link to="/login" className="text-gray-900 hover:text-gray-700">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="text-gray-900 hover:text-gray-700">
            Register
          </Link>
        </li>
      </ul>
      )}


    </nav>
  );
};

export default Navbar;