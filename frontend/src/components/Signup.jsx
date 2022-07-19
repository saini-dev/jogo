import React, {useState, useEffect} from 'react'
import "../styles/Signup.css"
import {Link, useNavigate} from "react-router-dom";
import { motion } from "framer-motion";

function Signup(props) {
  const [confirm, setConfirm] = useState(1);
  const [mail, setMail] = useState(1);
  const [pass, setPass] = useState(1);
  const [user, setUser] = useState({name : "", email: "", Uname: "", password: ""});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jogo-server.herokuapp.com/users/exists/uname/${user.Uname}`)
    .then(res => res.json())
    .then(res => {
      if(res.message === "yes"){
        setConfirm(0);
      }
      else{
        setConfirm(1);
      }
    })
  },[user.Uname])

  useEffect(() => {
    fetch(`https://jogo-server.herokuapp.com/users/exists/email/${user.email}`)
    .then(res => res.json())
    .then(res => {
      if(res.message === "yes"){
        setMail(0);
      }
      else{
        setMail(1);
      }
    })
  },[user.email])

  useEffect(() => {
    if(user.password.length <= 4 && user.password.length > 0){
      setPass(0);
    }
    else{
      setPass(1);
    }
  },[user.password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(confirm === 0){
      alert("Take another username");
    }
    else{
      if(mail === 0){
        alert("take another username");
      }
      else{
        try{
          await fetch("https://jogo-server.herokuapp.com/users" , {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
          })
          localStorage.setItem("uname",user.Uname);
          navigate("/products", {replace: true});
        }
        catch(e){
          console.log(e.message);
        }
      }
    }
  }

  return (
    <div id='signup-body'>
        <motion.div animate={{opacity:1}} initial={{opacity: 0}} transition={{duration: 0.5}} className="signup-main-text">
            <Link to="/"><span>Go Back</span></Link>
            <h3>Online gaming made easy<br/>Join thousands of gamer<br/>Make an account today!</h3>
        </motion.div>
        <motion.form animate={{scale:1}} initial={{scale:0}} transition={{type: "spring", stiffness: 100, delay:0.5}} onSubmit={handleSubmit} className='signup-form'>
            <h1>Signup</h1>
            <input className='signup-input' type="text" placeholder='Full name' value={user.name} onChange={e => {setUser({...user, name: e.target.value})}} required/>
            <input style={mail === 0 ? {border: "1px solid red"} : null} className='signup-input' type="email" placeholder='Email' value={user.email} onChange={e => {setUser({...user, email: e.target.value})}} required/>
            {mail === 0 ? <label className='label'>Email already registered</label> : null}
            <input style={confirm === 0 ? {border: "1px solid red"} : null} className='signup-input' type="text" placeholder='Username' value={user.Uname} onChange={e => {setUser({...user, Uname: e.target.value})}} required/>
            {confirm === 0 ? <label className='label'>Username already taken</label> : null}
            <input style={pass === 0 ? {border: "1px solid red"} : null} className='signup-input' type="password" placeholder='Password' value={user.password} onChange={e => {setUser({...user, password: e.target.value})}} required/>
            {pass === 0 ? <label style={{marginLeft: "30px"}} className='label'>Type atleast 5 digit password</label> : null}
            <div className="signup-checkbox"><input type="checkbox" required/><label> I agree to the <Link target="_blank" to="/terms-conditions">terms & conditions</Link></label></div>
            <button type='submit'>Submit</button>
            <h3>Already have an account? <Link to="/login">Login</Link></h3>
        </motion.form>
        </div>
  )
}

export default Signup