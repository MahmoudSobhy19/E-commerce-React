import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory, useLocation } from "react-router-dom";
import "../css/Sign.css";
import { UserContext } from "../Context/UserContext";

const Signin = () => {

    const [form, setForm] = useState({
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
    document.title = "Arab Shop | Login";
    if (token) history.push("/"); // if logged in redirect to home page
    }, [token, history]);

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
        axios
            .post("http://localhost:5000/users/login", {
            email: form.email,
            password: form.password,
            })
            .then((response) => {
                login(response.data.token);
            })
            .catch((err) => {
            toast.error("Your Credentials are wrong 😔");
            setDisabled(false);
        });
    };

    return ( 
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
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
                <button className="button sign-btn" disabled={disabled}>Sign in</button>
            </form>

            <p className="p">New to Arab Shop ?</p>
            <button className="button signup"><Link to="/signup">Create account</Link></button>
        </div>
     );
}
 
export default Signin; 