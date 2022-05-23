import {BASE_URL} from '../../utils/constants'

class UserApiFetch {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
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

  setCurrentUser(token, data) {
    console.log(data)
    return fetch(`${this._baseUrl}/users/self`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${token}`
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        console.log(res)
      })
  }

}

const userApiFetch = new UserApiFetch(BASE_URL, localStorage.getItem("user_token"));
export default userApiFetch;
