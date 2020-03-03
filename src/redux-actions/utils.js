// SELECT CONFIG
import { config } from "./config/default";
import { AUTH_ERROR } from "./types";

export const GetToken = ((next, err) = async dispatch => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(config.auth);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  try {
    const res = await fetch(
      "https://five.epicollect.net/api/oauth/token",
      requestOptions
    );
    setAuthToken((access_token = "Bearer " + res.access_token));
    dispatch(EPI_LOADED);
  } catch (err) {
    dispatch(AUTH_ERROR);
  }
});

// If we have a token, always include it in requests
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
