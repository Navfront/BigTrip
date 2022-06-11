export default class Api {
  constructor(endpoints) {
    this._endpoints = endpoints;
  }

  _getFetch(endpoint, body) {
    return fetch(this._endpoints.URL + endpoint, {
      method: body ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: body ? JSON.stringify(body) : undefined,
    }).then((response) => {
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

  getDestinations() {
    return this._getFetch(this._endpoints.DESTINATIONS);
  }

  createPoint(pointData) {
    return this._getFetch(this._endpoints.CREATE, pointData);
  }

  updatePoint(pointData) {
    return this._getFetch(this._endpoints.UPDATE, pointData);
  }

  deletePoint(id) {
    return this._getFetch(this._endpoints.DELETE, { id });
  }
}
