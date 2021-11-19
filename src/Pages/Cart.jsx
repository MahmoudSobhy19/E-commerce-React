import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from "../Context/UserContext";
import "../css/Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  let qty = 0 ;
  let price = 0 ;
  const { id } = useContext(UserContext);
  
  useEffect(() => {
    document.title = "Arab Shop | Shopping Cart";
    getData();
  }, []);

  const handelDelete = (cartId) => {
    axios.delete(`http://localhost:5000/cart/deleteItem/${cartId}`)
    .then((response) => {
      getData();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getData = () => {
    axios.get(`http://localhost:5000/cart/getCart/${id}`)
    .then((response) => {
      setCart(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="continer">
      <div className="cart">
        <h2 className="title">Shopping Cart</h2>
        {
          cart.length ===0 ?
          <div>
            Cart is Empty. 
          </div>
          :
          <div>
            <div className="item cart-action">
              {
                cart.map(el => {
                  qty = qty + el.quantity;
                  price = price + el.price * el.quantity;
                })
              }
              <h3>Subtotal ( {qty} Items )  <b>:  {price}$</b></h3>
              <button className="button buy">Proceed to Buy</button>
            </div>

            {cart.map(el => <li key={el.id}>
              <div className="item">

                <img src={`/img/${el.photo}`} alt={el.name} />
                <div>
                  <h5>{el.name}</h5>
                  <h3>{el.price}$</h3>
                  <div>
                    {
                      el.prodQty - el.sold > 0 ?
                        el.prodQty - el.sold < 5 ? 
                          <p className="status leftStock">{el.prodQty - el.sold} Left In Stock</p>
                          :
                          <p className="status inStock">In Stock</p>
                      :
                      <p className="status outStock">Out Stock</p>
                    }
                  </div>
                  <div className="btns">
                    <div className="qty">
                      <p>Qty :</p>
                      <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                    <button onClick={() => handelDelete(el.cart_id)} className="delete">Delete</button>
                  </div>
                </div>
              </div>
            </li>)}
        </div>
        }
      </div>
    </div>
  )
}
