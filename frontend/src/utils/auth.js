class Auth {

  constructor(options) {
    this._baseURL = options.url;
    this._headers = options.headers;
  }

  _checkResponse = (res) => {

  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);

  }

  _request = (url, options) => {

    return fetch((`${this._baseURL}/${url}`), options)
      .then(this._checkResponse);

  }

  register = ({ email, password }) => {

    return this._request('signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    });

  }

  authorize = ({ email, password }) => {

    return this._request('signin', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })

  }

  logout = () => {
    return this._request('signout', {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
  }

  getUserData = () => {

    return this._request('users/me', {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });

  }

}

export const auth = new Auth({
  url: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  }
});