import React, { useState } from "react";
import Main from "../layOut/Main";
import { Link } from "react-router-dom";

const Header = () => {
  const [colorToggle, setColorToggle] = useState("Home");
  const colorToggleHandle = (c) => {
    setColorToggle(c);
  };
  const hello = "<>";
  return (
    <div className="mt-3">
      <nav className="flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="h-9 w-9 rounded-full flex justify-center items-center text-white font-bold bg-green-600">
            {hello}
          </h1>
          <h1 className="text-2xl font-bold text-green-500">siFat</h1>
        </div>
        <div className="hidden md:flex">
          <div className="flex items-center gap-5 font-semibold ">
            <Link
              onClick={() => colorToggleHandle("Home")}
              className={`hover:text-green-700 ${
                colorToggle === "Home" ? "text-green-700" : "text-black"
              }`}
              to="/"
            >
              Home
            </Link>

            <Link
              onClick={() => colorToggleHandle("login")}
              className={`hover:text-green-700 ${
                colorToggle === "login" ? "text-green-700" : "text-black"
              }`}
              to="/login"
            >
              Login
            </Link>

            <Link
              onClick={() => colorToggleHandle("register")}
              className={`hover:text-green-700 ${
                colorToggle === "register" ? "text-green-700" : "text-black"
              }`}
              to="/register"
            >
              Register
            </Link>

            <Link
              onClick={() => colorToggleHandle(" Sign Up")}
              className={`hover:text-green-700 ${
                colorToggle === " Sign Up" ? "text-green-700" : "text-black"
              }`}
              to="/signUp"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-5 ">
          <input
            className="border-2 pl-5 rounded-3xl py-1 hover:border-green-600 focus:outline-2 focus:outline-green-700 focus:shadow-lg"
            type="text"
            name=""
            placeholder="Search"
            id=""
          />

          <img
            className="h-14  cursor-pointer border-white duration-300 border-[10px]  hover:border-green-500 hover:border-[10px] rounded-full w-14"
            src="Mr.Bean.jpg"
            alt=""
          />
        </div>
      </nav>
    </div>
  );
};

export default Header;
