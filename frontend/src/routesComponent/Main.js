import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "../components/About";
import { AnimatePresence } from "framer-motion";
import Confirmed from "../components/Confirmed";
import Home from "../components/Home";
import Library from "../components/Library";
import Login from "../components/Login";
import Products from "../components/Products";
import Signup from "../components/Signup";
import Terms from "../components/Terms";

function Main() {
  const [data, setData] = useState([]);

  const location = useLocation();

  const handleData = async (e) => {
    await setData(e);
  };

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="products" element={<Products value={handleData} />} />
          <Route path="library" element={<Library />} />
          <Route path="about" element={<About />} />
          <Route path="order-placed" element={<Confirmed value={data} />} />
          <Route path="terms-conditions" element={<Terms />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default Main;
