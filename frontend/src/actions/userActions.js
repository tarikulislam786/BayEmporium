import Axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";
const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
   // Cookie.set("userInfo", JSON.stringify(data));
     localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
   // Cookie.set("userInfoRegister", JSON.stringify(data));
     localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};
export const signout = (props) => (dispatch) => {
  localStorage.removeItem('userInfo');
  //localStorage.removeItem('userInfoRegister');
   localStorage.removeItem('cartItems');
   localStorage.removeItem('shippingAddress');
 // Cookie.remove("userInfo");
 // Cookie.remove("cartItems");
 // Cookie.remove("shippingAddress");
  Cookie.remove("userInfoRegister");
  //props.history.push("/signin");
  dispatch({ type: USER_SIGNOUT });
  document.location.href = '/signin';
};
export { signin, register };
