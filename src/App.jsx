import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes"; // Import your routes component
import "./App.css";
import MyRoute from "./vaibhavsRoutes/MyRoute";
import BookPlace from "./pages/BookPlace";
import About from "./components/About";
import PopularCity from "./components/PopularCity";

const App = () => {
  const location = useLocation();
  const hideNavbarPages = ["/user/settings"]; // Add paths where Navbar should be hidden

  return (
    <>
      {!hideNavbarPages.includes(location.pathname) && <Navbar />}

      <AppRoutes />
      <MyRoute />
    </>
  );
};

export default App;
