import React,{ useState } from 'react'
import "../styles/Login.css"
import {Link, useNavigate} from "react-router-dom";
import {FaRegEyeSlash} from "react-icons/fa";
import {GoEye} from "react-icons/go";
import { motion } from "framer-motion";
import { environment } from '../environment/environment';

function Login() {

  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState(1);
  const [type, setType] = useState(0);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await fetch(`${environment.baseURL}/users/${uname}`)
    const user = await data.json();
    if(user.User === null){
      setConfirm(0);
    }
    else{
      await setConfirm(1);
      if(pass === user.User.password){
        localStorage.setItem("uname",user.User.Uname);
        navigate("/products", {replace: true});
      }
      else{
        setConfirm(0);
      }
    }
  }

  return (
    <div id='login_body'>
      <Link to="/"><span>Go Back</span></Link>
      <motion.div animate={{scale:1}} initial={{scale:0}} transition={{type: "spring", delay: 0.5}} className="login-main">
        <form id='login_form'>
            <h1>Login</h1>
            <input type="text" value={uname} onChange={e => setUname(e.target.value)} placeholder='Username' />
            <input type={type === 0 ? "password" : "text"} value={pass} onChange={e => setPass(e.target.value)} placeholder='Password'/>
            {type === 0 ? <FaRegEyeSlash onClick={() => setType(type === 0 ? 1 : 0)} className='eye' /> : <GoEye onClick={() => setType(type === 0 ? 1 : 0)} className='eye' />}
            {confirm === 0 ? <label style={{color: "red", lineHeight: "0px", marginRight: "40px", fontWeight: "500"}}>Invalid username or password</label> : null}
            <button type='submit' onClick={handleLogin}>Login</button>
            <label>Dont have an account? <Link id='login_a' to="/signup">Signup</Link></label>
        </form>
        </motion.div>
    </div>
  )
}

export default Login