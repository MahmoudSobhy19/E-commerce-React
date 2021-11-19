import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import { UserContext } from "../Context/UserContext";

export default function Navbar() {
  
  const {logout, token } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState("");

  return (
    <nav className="navbar">
      <ul>
        <img src="/img/ArabShop.png"/>  
        <div className="right">
          <li><Link to="/"><AiOutlineHome className="icon"/></Link></li>
          <li><Link to="/cart"><AiOutlineShoppingCart className="icon"/></Link></li>
          {!token && <li><Link to="/signin"><FaSignInAlt id="login" className="icon"/></Link></li>}
          {token && <li><FaSignOutAlt onClick={logout} id="logout" className="icon"/></li>}
        </div>
      </ul>
    </nav>
  )
}
