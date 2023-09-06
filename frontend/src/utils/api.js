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
      headers: this._headers
    });

  }

  getInitialPlaces() {

    return this._request('cards', {
      method: 'GET',
      headers: this._headers
    });

  }

  setUserInfo({ name, about }) {

    return this._request('users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    });

  }

  addNewCard({ name, link }) {

    return this._request('cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    });

  }

  deleteCard(cardID) {

    return this._request(`cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    });

  }

  putLike(cardID) {

    return this._request(`cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers
    });

  }

  deleteLike(cardID) {

    return this._request(`cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
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
      body: JSON.stringify({ avatar })
    });

  }

}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization:
      "caa9776b-e67a-468e-a1fe-7b61e8271d58",
    "Content-Type": "application/json",
  }
});