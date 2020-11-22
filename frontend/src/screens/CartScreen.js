import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { signin, register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function CartScreen(props) {
  // get access cart from Redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userSignin;
  const { userInfoRegister } = userRegister;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);
  const checkoutHandler = () => {
    {userInfo ? (
   // props.history.push("/signin?redirect=shipping")
   props.history.push("/shipping")
    ):props.history.push("/signin?redirect=shipping")}
    {userInfoRegister ? (
     // props.history.push("/signin?redirect=shipping")
     props.history.push("/shipping")
      ):props.history.push("/signin?redirect=shipping")}
  }
  //checkoutHandler();
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li>
                <div className="cart-image">
                  <img src={'../uploads/'+item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>

                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {/* <div className="cart-price">${item.price}</div> */}
                <div className="cart-price">${item.price-(item.price*item.discountRate)/100}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          {/* {item.price-(item.price*item.discountRate)/100} */}
          Subtotal ({cartItems.reduce((a, c) => a + parseInt(c.qty), 0)} items)
          : $ {cartItems.reduce((a, c) => a + (c.price-(c.price*c.discountRate)/100) * c.qty, 0)}
          {/* Subtotal ({cartItems.reduce((a, c) => a + parseInt(c.qty), 0)} items)
          : $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} */}
        </h3>
        <button
          onClick={checkoutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}
export default CartScreen;
