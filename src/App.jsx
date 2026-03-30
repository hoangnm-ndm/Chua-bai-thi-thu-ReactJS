import React from "react";
import { Link } from "react-router";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
};

export default App;
