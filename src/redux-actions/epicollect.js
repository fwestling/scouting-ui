import axios from "axios";
import { setAlert } from "./alert";
import { USER_LOADED, AUTH_ERROR } from "./types";
import setAuthToken from "./utils/setAuthToken";

// Load user
export const loadUser = () => async dispatch => {
  // Check if there's a token, always send it in a global header
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
