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
      body: JSON.stringify({ email, password })
    })

  }

  getData = (jwt) => {

    return this._request('users/me', {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${jwt}`
      }
    });

  }

}

export const auth = new Auth({
  url: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  }
});