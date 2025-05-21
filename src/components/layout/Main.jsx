import React from "react";
import Home from "../Home/Home";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="">
      <Header></Header>
      <Outlet />
    </div>
  );
};

export default Main;
