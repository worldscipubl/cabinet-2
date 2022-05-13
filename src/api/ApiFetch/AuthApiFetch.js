import {BASE_URL} from '../../utils/constants'

class AuthApiFetch {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _currentToken = '';

  set currentToken(value) {
    this._currentToken = value;
  }

  set test(value) {
    this._test = value;
    console.log(this._test)
  }

  handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  loginUser(token) {
    return  fetch(`${this._baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${token}`
      },
    })
      .then((res) => this.handleResponse(res));



    // return fetch(`${this._baseUrl}/users/login`, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Basic ${token}`
    //   },
    // })
    //   .then((res) => this.handleResponse(res));
  }

  getCurrentUser(token) {
    return fetch(`${this._baseUrl}/users/self`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${token}`
      },
    })
      .then((res) => this.handleResponse(res));
  }

}

const authApiFetch = new AuthApiFetch(BASE_URL, localStorage.getItem("user_token"));
export default authApiFetch;

