import React from 'react';
import Navbar from './Navbar';
import "../styles/About.css";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function About() {

  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("uname")){
      navigate("/", {replace: true});
    }
  },[navigate])

  return (
    <div
    
    id='about_body'>
      <div className="about-opacity">
        <Navbar/>
        <motion.div
        animate={{opacity: 1}}
    initial={{opacity: 0}}
    exit={{opacity: 0}}
    transition={{type: "tween", delay: 0.3}}
        className="about-wrapper">
          <h1>About JOGO</h1>
          <hr />
          <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat eligendi odit doloremque sequi nesciunt tempore, similique libero eius excepturi atque vero sed! Dolore aut repellendus voluptas, perspiciatis eius ex delectus laborum, itaque nostrum debitis eaque similique officia! Quasi eum voluptatum totam eius accusantium laboriosam repellat rem quam ab nisi maiores autem cupiditate sint expedita vitae dolorum soluta, enim iste porro ut. Tenetur ut facere amet illo numquam ipsum iste harum totam tempore officia, vero debitis qui nisi hic voluptatem explicabo, ab ullam. Incidunt nisi eaque recusandae, nemo voluptatem commodi excepturi cupiditate quam. Placeat aliquam, obcaecati sequi pariatur veritatis aliquid voluptatibus?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat eligendi odit doloremque sequi nesciunt tempore, similique libero eius excepturi atque vero sed! Dolore aut repellendus voluptas, perspiciatis eius ex delectus laborum, itaque nostrum debitis eaque similique officia! Quasi eum voluptatum totam eius accusantium laboriosam repellat rem quam ab nisi maiores autem cupiditate sint expedita vitae dolorum soluta, enim iste porro ut. Tenetur ut facere amet illo numquam ipsum iste harum totam tempore officia, vero debitis qui nisi hic voluptatem explicabo, ab ullam. Incidunt nisi eaque recusandae, nemo voluptatem commodi excepturi cupiditate quam. Placeat aliquam, obcaecati sequi pariatur veritatis aliquid voluptatibus?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat eligendi odit doloremque sequi nesciunt tempore, similique libero eius excepturi atque vero sed! Dolore aut repellendus voluptas, perspiciatis eius ex delectus laborum, itaque nostrum debitis eaque similique officia! Quasi eum voluptatum totam eius accusantium laboriosam repellat rem quam ab nisi maiores autem cupiditate sint expedita vitae dolorum soluta, enim iste porro ut. Tenetur ut facere amet illo numquam ipsum iste harum totam tempore officia, vero debitis qui nisi hic voluptatem explicabo, ab ullam. Incidunt nisi eaque recusandae, nemo voluptatem commodi excepturi cupiditate quam. Placeat aliquam, obcaecati sequi pariatur veritatis aliquid voluptatibus?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat eligendi odit doloremque sequi nesciunt tempore, similique libero eius excepturi atque vero sed! Dolore aut repellendus voluptas, perspiciatis eius ex delectus laborum, itaque nostrum debitis eaque similique officia! Quasi eum voluptatum totam eius accusantium laboriosam repellat rem quam ab nisi maiores autem cupiditate sint expedita vitae dolorum soluta, enim iste porro ut. Tenetur ut facere amet illo numquam ipsum iste harum totam tempore officia, vero debitis qui nisi hic voluptatem explicabo, ab ullam. Incidunt nisi eaque recusandae, nemo voluptatem commodi excepturi cupiditate quam. Placeat aliquam, obcaecati sequi pariatur veritatis aliquid voluptatibus.
          </p>          
        </motion.div>
      </div>
    </div>
  )
}

export default About