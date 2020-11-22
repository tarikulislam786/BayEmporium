import React, { useEffect, useState } from "react";
// import data from "../data";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
function ShippingScreen(props) {
  // const userRegister = useSelector((state) => state.userRegister);
  // const { userInfoRegister } = userRegister;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h1>Shipping Address</h1>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              ></input>
            </li>

            <li>
              <label htmlFor="address">Address</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                value={address}
                name="address"
                id="address"
              />
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                value={city}
                name="city"
                id="city"
              />
            </li>
            <li>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                onChange={(e) => setPostalCode(e.target.value)}
                type="text"
                value={postalCode}
                name="postalCode"
                id="postalCode"
              />
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                name="country"
                value={country}
                id="country"
              />
            </li>
            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default ShippingScreen;
