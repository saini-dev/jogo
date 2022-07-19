import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { IoGameController } from "react-icons/io5";
import "../styles/Home.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { motion } from "framer-motion";

function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("uname")){
      navigate("/products", {replace: true})
    }
  })

  return (
    <div id="home_body">
      <div className="home-navbar">
        <motion.div
          whileTap={{scale: 1.2}}
          initial={{scale: 1}}
         className="title-container">
          <IoGameController class="nav-icon" />
          <h2>JOGO</h2>
        </motion.div>
        <div className="button-container">
          <button><Link to="login">Login</Link></button>
          <button><Link to="signup">Sign up</Link></button>
        </div>
      </div>
      <div
        className="home-main">
        <motion.div animate={{opacity: 1}} initial={{opacity: 0}} transition={{delay: 0.7}} className="main-text">
          <h2 >Welcome To JOGO</h2>
          <h2>Your marketplace for buying online games</h2>
          <button><Link to="signup">Get Started</Link></button>
        </motion.div>
        <motion.div animate={{opacity: 1}} initial={{opacity: 0}} transition={{delay: 0.7}} className="img-slider">
          <Splide className="splider"
            options={{
              lazyLoad: "sequential",
              width: 450,
              height: 500,
              arrows: false,
              pagination: false,
              gap: "5rem",
              autoplay: true,
              type: "loop",
              interval: 2000,
            }}
          >
            <SplideSlide>
              <img src="/assests/valorant.jpg" alt="Valorant" />
            </SplideSlide>
            <SplideSlide>
              <img
                src="/assests/csgo.png"
                alt="CSGO"
              />
            </SplideSlide>
            <SplideSlide>
              <img
                src="/assests/pubg.jpg"
                alt="PUBG"
              />
            </SplideSlide>
            <SplideSlide>
              <img
                src="/assests/gta.jpg"
                alt="GTA V"
              />
            </SplideSlide>
            <SplideSlide>
              <img
                src="/assests/as_odessey.jpg"
                alt="Assasin's Creed Odessey"
              />
            </SplideSlide>
          </Splide>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
