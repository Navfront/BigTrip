export default class Provider{
  constructor(api, storage) {
    this._api = api;
    this._storage = storage;
  }

  getAllPoints() {
    return this._api.getAllPoints().then((response) => {
      this._storage.setPoints(response.message);
      return response;
    });
  }

  getEvents() {
    return this._api.getEvents().then((response) => {
      this._storage.setEvents(response.message);
      return response;
    });
  }

  getDestinations() {
    return this._api.getDestinations().then((response) => {
      this._storage.setDestinations(response.message);
      return response;
    });
  }

  createPoint(pointData) {
    return this._api._getFetch(pointData);
  }

  updatePoint(pointData) {
    return this._api._getFetch(pointData);
  }

  deletePoint(id) {
    return this._api._getFetch(id);
  }
}
