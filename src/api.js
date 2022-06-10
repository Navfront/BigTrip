export default class Api {
  constructor(adress) {
    this._url = adress.URL;
    this._points = adress.POINTS;
    this._pointById = adress.POINT_BY_ID;
    this._events = adress.EVENTS;
    this._destinations = adress.DESTINATIONS;
    this._create = adress.CREATE;
    this._update = adress.UPDATE;
    this._delete = adress.DELETE;
  }

  getAllPoints() {
    return fetch(this._url + this._points);
  }
}
