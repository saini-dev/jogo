import React, {useState, useEffect} from 'react'
import Navbar from './Navbar';
import "../styles/Confirmed.css";
import { useNavigate } from 'react-router-dom';

function Confirmed(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("uname")){
      navigate("/", {replace: true});
    }
    if(props.value.length === 0){
      navigate("/products", {replace: true});
    }
  },[props.value.length, navigate])

  useEffect(() => {
    setData(props.value)
  },[props.value])
  
  const handleClick = () => {
    navigate("/products", {replace: true})
  }

  return (
    <div id='confirmed_body'>
      <div className="confirmed-opacity">
      <Navbar />
        <div className="confirmed-wrapper">
          <div className="confirmed-text">
            <h1>Order Successful!</h1>
            <div  className="brought-items">
            {data.map(item => (
                <img key={item.name} src={item.img} alt="" />
                ))}
                </div>
            <p>Check your library for new games</p>
            <button onClick={handleClick}>Continue shopping</button>
          </div>
          <div className="confirmed-img">
            <img src="/assests/placed.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmed