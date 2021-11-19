import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory, useLocation } from "react-router-dom";
import "../css/Sign.css";
import { UserContext } from "../Context/UserContext";

const Signup = () => {

  const [newUser, setnewUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  });

  const { login, token } = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const location = useLocation();

  if (token) {
    const { from } = location.state || { from: { pathname: "/" } };
    history.replace(from);
  }

  useEffect(() => {
    document.title = "Arab Shop | Register";
    if (token) history.push("/"); // if logged in redirect to home page
  }, [token, history]);

  const handleChange = (e) => {
    setnewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    axios
      .post("http://localhost:5000/users/register", {

        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        password: newUser.password,
        })
        .then((response) => {
          login(response.data.token);
        })
        .catch((err) => {
          toast.error("This Email is Exist 😔");
          setDisabled(false);
    });
  };

  return ( 
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <div>
          <label htmlFor="fname">First Name</label>
          <input
              type="text"
              name="fname"
              id="fname"
              placeholder="First Name"
              className="input"
              onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lname">Last Name</label>
          <input
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
              className="input"
              onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
              type="text"
              name="email"
              id="email"
              placeholder="E-mail"
              className="input"
              onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="input"
              onChange={handleChange}
          />
        </div>
        <button className="button sign-btn" disabled={disabled}>Sign Up</button>
      </form>
      <div className="sign-in-link">
        <p>Already have an account? </p>
        <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}
 
export default Signup;