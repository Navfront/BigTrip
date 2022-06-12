const isOnline = () => navigator.onLine;

export default class Provider{
  constructor(api, storage) {
    this._api = api;
    this._storage = storage;
  }

  getAllPoints() {
    if (isOnline()) {
      return this._api.getAllPoints().then((response) => {
        this._storage.setPoints(response.message);
        return response.message;
      });
    }
    return  Promise.resolve(this._storage.getPoints());
  }

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents().then((response) => {
        this._storage.setEvents(response.message);
        return response.message;
      });
    }
    return  Promise.resolve(this._storage.getEvents());
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations().then((response) => {
        this._storage.setDestinations(response.message);
        return response.message;
      });
    }
    return Promise.resolve(this._storage.getDestinations());
  }

  createPoint(pointData) {
    this._storage.updatePoint(pointData);
    if (isOnline()) {
      return this._api.createPoint(pointData);
    }
    return Promise.resolve(this._storage.getDestinations());
  }

  updatePoint(pointData) {
    this._storage.updatePoint(pointData);
    if (isOnline()) {
      return this._api.updatePoint(pointData);
    }
    return Promise.resolve(this._storage.getDestinations());
  }

  deletePoint(id) {
    this._storage.deletePoint(id);
    if (isOnline()) {
      return this._api.deletePoint(id);
    }
    return Promise.resolve(this._storage.getDestinations());
  }

  sync() {
    const points = this._storage.getPoints();
    if (points?.length) {
      this._api.sync(points);
    }
  }
}
