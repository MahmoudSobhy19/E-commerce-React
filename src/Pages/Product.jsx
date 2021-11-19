import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import "../css/Product.css";

export default function Product(props) {
  const [product, setProduct] = useState([]);
  const { token, id } = useContext(UserContext);

  const handleClick = () => {
    if (token){
      axios.post("http://localhost:5000/cart/addToCart", {
        user_id: id,
        product_id: product.id,
        quantity: 1,
      });
    }
    else {
      props.history.push("/signin");
    }
  }

  useEffect(() => {
    document.title = "Arab Shop | Product";
    axios.get("http://localhost:5000/products").then((response) => {
      setProduct(...response.data.filter(el => el.id == props.match.params.id));
    })
  }, []);
  
  return (
    <div className="product">
      <div className="img">
        <img src={`/img/${product.photo}`} alt="product.name"></img>
      </div>
      <div className="prod">
        <p>{product.name}</p>
        <p>{product.price}$ </p>
        <p>Available: {product.quantity - product.sold} Piece</p>
        <p>Seller: {product.seller}</p>
        <p>Category: {product.category}</p>
        <button onClick={handleClick} className="button">Add to cart</button>
      </div>
    </div>
  );
}
