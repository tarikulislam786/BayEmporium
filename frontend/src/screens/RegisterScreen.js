import React, { useEffect, useState } from "react";
// import data from "../data";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  
  
  
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
    const userRegister = useSelector((state) => state.userRegister);
   // const { userInfo, userInfoRegister, loading, error } = userRegister;
   const { userInfoRegister, loading, error } = userRegister;
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      if (password != rePassword) {
        console.log("pass " + password);
        console.log("conf " + rePassword);
        window.alert("password dont match");
        return false;
      } else {
        dispatch(register(name, email, password));
      }
      
    };
    
   /* useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
    }, [props.history, redirect, userInfo]); */
  useEffect(() => {
    if (userInfoRegister) {
      props.history.push(redirect);
    }
    return () => {};
  }, [userInfoRegister]);
 
  
  
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Register</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
            />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
            />
          </li>
          <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              onChange={(e) => setRePassword(e.target.value)}
              type="password"
              name="rePassword"
              id="rePassword"
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Register
            </button>
          </li>
          <li>
            Already have an account ?{" "}
            {/* <Link
              to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
              className="button secondary text-center"
            >
              Sign-in
            </Link> */}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
