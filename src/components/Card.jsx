import React, { useContext } from 'react'
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from "../Context/UserContext";
import "../css/Card.css";

export default function Card(props) {
  const { token, id } = useContext(UserContext);
  let history = useHistory();
  
  const handleClick = () => {
    if (token){
      axios.post("http://localhost:5000/cart/addToCart", {
        user_id: id,
        product_id: props.id,
        quantity: 1,
      });
    }
    else {
      history.push("/signin");
    }
  }

  return (
    <div className="card">
      <img src={`/img/${props.photo}`} alt={props.name} />
      <h3><Link to={`/prodcut/${props.id}`}>{props.name}</Link></h3>
      <p>${props.price}</p>
      <button onClick={handleClick} className="button">Add to cart</button>
    </div>
  )
}