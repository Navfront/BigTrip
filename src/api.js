export default class Api {
  constructor(endpoints) {
    this._endpoints = endpoints;
  }

  _getFetch(endpoint) {
    return fetch(this._endpoints.URL + endpoint).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
  }

  getAllPoints() {
    return this._getFetch(this._endpoints.POINTS);
  }

  getEvents() {
    return this._getFetch(this._endpoints.EVENTS);
  }
}
