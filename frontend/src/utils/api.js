class Api {

  constructor(options) {
    this._baseUrl = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);

  }

  _request(url, options) {
    return fetch((`${this._baseUrl}/${url}`), options)
      .then(this._checkResponse)
  }

  getUserInfo() {

    return this._request('users/me', {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });

  }

  getInitialPlaces() {

    return this._request('cards', {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });

  }

  setUserInfo({ name, about }) {

    return this._request('users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, about })
    });

  }

  addNewCard({ name, link }) {

    return this._request('cards', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, link })
    });

  }

  deleteCard(cardID) {

    return this._request(`cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    });

  }

  putLike(cardID) {

    return this._request(`cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    });

  }

  deleteLike(cardID) {

    return this._request(`cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    });

  }

  changeLikeCardStatus(cardID, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardID);
    } else {
      return this.putLike(cardID);
    }
  }

  updateUserAvatar({ avatar }) {

    return this._request('users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ avatar })
    });

  }

}

export const api = new Api({
  url: "https://api.mesto-russia.ru",
  headers: {
    "Content-Type": "application/json",
  }
});