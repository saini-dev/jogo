import React from 'react'
import { IoGameController } from "react-icons/io5";
import {FiLogOut} from "react-icons/fi"
import {NavLink} from "react-router-dom";
import "../styles/Navbar.css"
import '@szhsin/react-menu/dist/core.css';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion";

function Navbar() {
    
  const navigate = useNavigate();
  const handleLogout = async () => {
    await localStorage.removeItem("uname");
    navigate("/", {replace: true});
  }

  return (
    <div className='nav-bar'>
        <motion.div
        whileTap={{scale: 1.2}}
        initial={{scale: 1}}
        className="title-container">
          <IoGameController class="nav-icon" />
          <h2>JOGO</h2>
        </motion.div>
        <div className="nav-links">
          <NavLink to="/products">Store</NavLink>
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
        <div className="user-info">
            <h3>{localStorage.getItem("uname")}</h3>
            <button onClick={handleLogout}><FiLogOut/></button>
        </div>
    </div>
  )
}

export default Navbar