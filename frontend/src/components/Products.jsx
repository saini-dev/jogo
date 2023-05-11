import React, {useState, useEffect, useRef} from 'react'
import Navbar from "./Navbar";
import "../styles/Products.css";
import {GoSearch} from "react-icons/go";
import {AiOutlineDelete} from "react-icons/ai";
import {MdAddShoppingCart, MdShoppingCart} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import { environment } from '../environment/environment';

function Products(props) {
  
  //Initializing States
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [toggle, setToggle] = useState(0);
  const [genre, setGenre] = useState([]);
  const [snack, setSnack] = useState(0);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState([]);
  const [category, setCategory] = useState([]);

  //Initializing Ref
  const ref = useRef();
  const cartRef = useRef();

  //Initializing navigation hook
  const navigate = useNavigate();
  
  //Storing genres to a genre state
  useEffect(() => {
    if(!localStorage.getItem("uname")){
      navigate("/", {replace: true});
    }
    
    const Genre = ["All", "Action", "Arcade", "Open World", "Strategy", "FPS", "Single Player", "Co-op", "Role-Playing"];
    setGenre(Genre);
  },[navigate]);

  //Storing games to a games state
  useEffect(() => {

    //fetching all the games
    fetch(`${environment.baseURL}/products`)
    .then(res => res.json())
    .then(res => {

      //fetching user owned games
      fetch(`${environment.baseURL}/users/${localStorage.getItem("uname")}`)
      .then(data => data.json())
      .then(data => {
        const userGames = data.User.games;
        for (const item of res) {
          if(!userGames.some(e => e.name === item.name)){

            //Adding the games that user does not own to states
            setGames(e => [...e, item]);
            setCategory(e => [...e, item]);
          }
        }
      })
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e.message))
  },[])

  //Closing cart when use clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setToggle(0)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef]);

  //Handling add to cart button
  const addToCart = (e) => {
    const name = e.target.parentNode.parentNode.getAttribute("id");
    fetch(`${environment.baseURL}/products/${name}`)
    .then(res => res.json())
    .then(res => {
      let yes = 0;
      if(cart.length !== 0){
        for (const item of cart) {
          if(res.name === item.name){
            yes = 1;
            alert("Already in cart")
          }
        }
      }
      if(yes === 0){
        //Snackbar animation
        setSnack(1);
        setTimeout(() => setSnack(0),2900);
        //Adding to cart and setting total price
        setCart(prev => [...prev, res]);
        setCartTotal(prev => prev + res.price);
      }
    })
    .catch(e => console.log(e.message))
  }

  //Handling toggle of cart display
  const cartToggle = () => {
    toggle === 0 ? setToggle(1) : setToggle(0);
  }

  //Handling remove item button from cart
  const removeCart = (e) => {
    const id = e.target.parentNode.parentNode.getAttribute("id");
    const newCart = cart.filter(i => i.name !== id);
    setCartTotal(0);
    setCart([]);
    for (const item of newCart) {
      setCart(prev => [...prev, item]);
      setCartTotal(prev => prev + item.price);
    }
  }

  //Handling checkout button
  const checkout = () => {
    let data = [];
    for (const item of cart) {
      data.push({img: item.img, name: item.name});
    }

    //Adding brought items to user's library
    fetch(`${environment.baseURL}/users/${localStorage.getItem("uname")}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        games: data
      })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(e => console.log(e));

    //Sending cart info and redirecting to next page 
    props.value(cart)
    navigate("/order-placed", {replace: true});
  }

  const handleSearch = () => {
    if(search === ""){
      setSearched([]);
    }
    else{
      setSearched([]);
      let confirm = 0;
      const reg = new RegExp(search.toLowerCase());
      for (const item of games) {
        const array = reg.exec((item.name).toLowerCase());
        if(array !== null){
          confirm = 1;
          setSearched(e => [...e,item]);
        }
      }
      if(confirm === 0){
        alert("No result found!");
        setSearch("");
        ref.current.focus();
      }
    }
  }

  const handleCategory = (e) => {
    if(e.target.innerText === "All"){
      setCategory(games);
    }
    else{
      setCategory([]);
      for (const item of games) {
        for (const genre of item.genre) {
          if(e.target.innerText === genre){
            setCategory(e => [...e, item]);
          }
        }
      }
    }
  }

  return (
    <div
    
    id='products_body'>
      <div className="opacity">
        <div className={snack === 0 ? "" : "show"} id="snackbar">Added to cart</div>
        {toggle === 1 ? <div ref={cartRef} className="cart">
           <table style={cart.length === 0 ? null : {borderBottom: '1px solid #9600b1'}}>
            <thead>
            <tr>
              <th colSpan={2}>Item</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
            </thead>
            {cart.map(item => (
              <tbody key={item.name}>
              <tr id={item.name}>
                <td><img src={item.img} alt="" /></td>
                <td className='cart-text'>{item.name}</td>
              <td>₹{item.price}</td>
              <td id={item.name}><AiOutlineDelete onClick={removeCart} className='remove-button'/></td>
            </tr>
            </tbody>
            ))}
          </table>
            {cart.length === 0 ? <div className='empty-cart'><img src="/assests/empty-cart.svg" alt="empty-cart"/><span>Nothing here!</span></div> : null}
          <div className="checkout">
            {cartTotal===0 ? null : <button onClick={checkout}>Buy now</button>}
            {cartTotal===0 ? null : <label>Total: ₹{cartTotal}</label>}
          </div>
        </div> : null}
          <Navbar/>
          <motion.div animate={{opacity: 1}}
          initial={{opacity: 0}}
          exit={{opacity: 0}}
          transition={{type: "tween", delay: 0.3}} className="products-main">
          <div className="products-categories">
            <h2>Categories</h2>
            <div className="products-category-type">
            {genre.map(item => (
            <label onClick={handleCategory} key={item}>{item}</label>
            ))}
            </div>
          </div>
          <div className="products-content">
            <div className="products-content-title">
              <MdShoppingCart onClick={cartToggle} className='add-to-cart'/>
              <h3>Featured & Recommended</h3>
              <div className="products-content-search">
                <input onKeyPress={e => e.key === "Enter" ? handleSearch() : null} ref={ref} type="text" placeholder='Search' value={search} onChange={e => setSearch(e.target.value)}/>
                <button onClick={handleSearch}><GoSearch/></button>
              </div>
            </div>
            
            <motion.div layout className="products-content-products">
              {searched.length === 0 ? category.map(item => (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{scale: 0}} key={item.name} layout className="products-content-product-card">
              <img src={item.img} alt="valorant" />
                <div id={item.name} className="products-product-card-text">
                  <h4>{item.name}</h4>
                  <span>₹{item.price}</span>
                  <button id={item.name} onClick={addToCart}><MdAddShoppingCart  className='products-cart-icon' /></button>
                </div>
              </motion.div>
              )) : searched.map(item => (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{scale: 0}} key={item.name} layout className="products-content-product-card">
              <img src={item.img} alt="valorant" />
                <div id={item.name} className="products-product-card-text">
                  <h4>{item.name}</h4>
                  <span>₹{item.price}</span>
                  <button id={item.name} onClick={addToCart}><MdAddShoppingCart  className='products-cart-icon' /></button>
                </div>
              </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        </div>
    </div>
  )
}

export default Products