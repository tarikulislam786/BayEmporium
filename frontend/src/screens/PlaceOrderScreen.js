import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
function PlaceOrderScreen(props) {
  // get access cart from Redux store
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  //const { loading, success, error, order } = orderCreate;
  // const { cartItems, shipping, payment } = cart;
  // if (!shipping) {
  //   // if (!shipping.adress) {
  //   props.history.push("/shipping");
  // } else if (!payment) {
  //   // else if (!payment.paymentMethod) {
  //   props.history.push("/payment");
  // }
  // a - accumulator, c - current items, 0- default vaue
  // const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  // const shippingPrice = itemsPrice > 100 ? 0 : 10;
  // const taxPrice = 0.15 * itemsPrice;
  // const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
   // cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    // {cartItems.reduce((a, c) => a + (c.price-(c.price*c.discountRate)/100) * c.qty, 0)}
    cart.cartItems.reduce((a, c) => a + (c.price-(c.price*c.discountRate)/100) * c.qty, 0)
    );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  // useEffect(() => {}, []);
  // const placeOrderHandler = () => {
  //   props.history.push("/signin?redirect=shipping");
  // };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={'uploads/'+item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {/* {item.qty} x ${item.price} = ${item.qty * item.price} */}
                          {/* {item.price-(item.price*item.discountRate)/100} */}
                          {item.qty} x ${item.price-(item.price*item.discountRate)/100} = ${item.qty * (item.price-(item.price*item.discountRate)/100)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              {/* {<LoadingBox></LoadingBox>}
              {<MessageBox variant="danger"></MessageBox>} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlaceOrderScreen;
