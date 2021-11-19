import React , { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import { CartProvider } from "./Context/CartContext";
import { UserProvider } from "./Context/UserContext";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <div>
      <UserProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <ToastContainer />
            <Switch>
              <Route path="/" exact component={Shop} />
              <Route path="/cart" component={Cart} />
              <Route path="/prodcut/:id" component={Product} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
