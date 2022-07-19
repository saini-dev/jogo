import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import "../styles/Library.css"
import { motion } from "framer-motion";

function Library() {

  const [games, setGames] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem("uname")){
      navigate("/", {replace: true});
    }

    fetch(`https://jogo-server.herokuapp.com/users/${localStorage.getItem("uname")}`)
    .then(res => res.json())
    .then(res => setGames(res.User.games))
    .catch(e => console.log(e.message));
  },[navigate]);

  return (
    <div
    
    id='library_body'>
      <div className="library-opacity">
        <Navbar/>
        <motion.div animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity: 0}}
    transition={{type: "tween", delay: 0.3}} className="library-wrapper">
          {games.map(item => (
            <div key={item.name} className="library-product-card">
            <img src={item.img} alt="" />
            <div className="library-card-text">
              <span>{item.name}</span>
              <button>Play</button>
            </div>
          </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Library