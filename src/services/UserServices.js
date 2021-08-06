import { authHeader } from "../helpers/authHeader";
import axios from "axios";

const BASE_URL = "https://api.worldscipubl.com/v1";
// const REG_URL = "/users/registration";
const REG_URL = "/users/exist?email=eee@mail.ru";

export const userServices = {
  registration,
  login,
  logout,
  getAll,
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${BASE_URL}${REG_URL}`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ":" + password);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

function registration(name, email) {
  const requestOptions = {
    // method: "POST",
    method: "GET",
    withCredentials: false,
    // headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ name, email }),
  };

  return fetch(`${BASE_URL}${REG_URL}`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(name + ":" + email);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${BASE_URL}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
