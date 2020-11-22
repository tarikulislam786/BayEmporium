import React from "react";
//import logo from "./logo.svg";
// import data from "./data";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductsScreen from "./screens/ProductsScreen";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import { createBrowserHistory as createHistory } from "history";
import { photosStore } from "./store";
//import PhotoForm from "./PhotoForm";
//import { getPhotos, deletePhoto, APIURL } from "./requests";
const history = createHistory();
function App() {
  // get access cart from Redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button class="open-sidebar" onClick={openMenu}>
              <i className="fa fa-bars"></i>
            </button>
            <Link to="/">bayemporium</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">
              <div id="ex4">
                <span
                  class="p1 fa-stack fa-2x has-badge"
                  data-count={cartItems.reduce(
                    (a, c) => a + parseInt(c.qty),
                    0
                  )}
                >
                  <i
                    class="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse"
                    data-count="4b"
                  ></i>
                </span>
              </div>
            </Link>
            {/* <Link to="/cart">Cart</Link> <i class="fa fa-badge"></i> */}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  {/* <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li> */}
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {/* {userInfoRegister ? (
              <Link to="/profile">{userInfoRegister.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )} */}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <Link to="/category/Shirts">Shirts</Link>
            </li>
            <li>
              <Link to="/category/Bags">Bags</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
  //  photo upload
  var createError = require("http-errors");
  var express = require("express");
  var path = require("path");
  var cookieParser = require("cookie-parser");
  var logger = require("morgan");
  var cors = require("cors");
  //var indexRouter = require("./routes/productRoute");
  //var photosRouter = require("./routes/photos");
  var app = express();

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");
  app.use(cors());

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, "uploads")));

  //app.use("/", indexRouter);
  //app.use("/photos", photosRouter);
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
  // end photo upload
}

export default App;
