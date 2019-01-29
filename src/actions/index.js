import axios from "axios";

export const LOGIN_POST_DATA = "login_post_data";
export const SIGNUP_POST_DATA = "signup-post-data";
export const FETCH_POST = "fetch-post";
const ROOT_URL = `http://192.168.0.204/api`;

// axios(`${ROOT_URL}/login`, {
//   method: "post",
//   data: values,
//   withCredentials: true
// })

export function loginPostData(values, callback) {
  const request = axios(`${ROOT_URL}/auth`, {
    method: "post",
    data: values,
    withCredentials: true
  })
    .then(response => {
      console.log("response", response);
      callback(response);
      return response;
    })
    .catch(error => {
      alert(error);
    });
  return {
    type: LOGIN_POST_DATA,
    payload: request
  };
}
export function signupPostData(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/users`, values)
    .then(response => {
      callback(response);
      return response;
    })
    .catch(error => {
      alert(error);
    });
  return {
    type: SIGNUP_POST_DATA,
    payload: request
  };
}

export function detailFetch(AuthStr, callback) {
  const request = axios
    .get(`${ROOT_URL}/users/me`, { headers: { "x-auth-token": AuthStr } })
    .then(response => {
      callback(response.data)
      console.log("detail", response.data);
      return response.data;
    })
    .catch(error => {
      alert(error);
    });
  return {
    type: FETCH_POST,
    payload: request
  };
}
