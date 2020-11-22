import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
function PlaceOrderScreen(props) {
  // get access cart from Redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;
  if (!shipping) {
    // if (!shipping.adress) {
    props.history.push("/shipping");
  } else if (!payment) {
    // else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  // a - accumulator, c - current items, 0- default vaue
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    // create an order
  };
  useEffect(() => {}, []);
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
          </div>
          <div>
            {cart.shippingAddress.address},{cart.shippingAddress.city},
            {cart.shippingAddress.postalCode},{cart.shippingAddress.country},
          </div>
          <div>
            <h3>Payment</h3>
            <strong>Method:</strong> {cart.paymentMethod}
          </div>
          <div>
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
                      <img src={"uploads/" + item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>

                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>

          <button onClick={checkoutHandler} disabled={cartItems.length === 0}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
export default PlaceOrderScreen;
