const version = 'v1';
const pointsName = 'points';
const eventsName = 'events';
const destinationsName = 'destinations';

const arrayToObject = (arr) => arr.reduce((acc, current) => {
  acc[String(current.id)] = current;
  return acc;
}, {});

const objectToArray = (obj) => {
  if (obj) {
    return Object.values(obj);
  }
};

export default class Storage{
  _namePointsKey() {
    return `${pointsName}-${version}`;
  }

  _nameEventsKey() {
    return `${eventsName}-${version}`;
  }

  _nameDestinationsKey() {
    return `${destinationsName}-${version}`;
  }

  setPoints(points) {
    window.localStorage.setItem(this._namePointsKey(),JSON.stringify(arrayToObject(points)));
  }

  setEvents(events) {
    window.localStorage.setItem(this._nameEventsKey(),JSON.stringify(events));
  }

  setDestinations(destinations) {
    window.localStorage.setItem(this._nameDestinationsKey(),JSON.stringify(destinations));
  }

  getPoints() {
    const result = objectToArray(JSON.parse(window.localStorage.getItem(this._namePointsKey())));
    return result?.length? result : [];
  }

  updatePoint(data) {
    const points = JSON.parse(window.localStorage.getItem(this._namePointsKey()));
    points[data.id] = data;
    window.localStorage.setItem(this._namePointsKey(), JSON.stringify(points));
  }

  deletePoint(id) {
    const points = JSON.parse(window.localStorage.getItem(this._namePointsKey()));
    delete points[String(id)];
    window.localStorage.setItem(this._namePointsKey(), JSON.stringify(points));
  }

  getEvents() {
    return JSON.parse(window.localStorage.getItem(this._nameEventsKey()));
  }

  getDestinations() {
    return JSON.parse(window.localStorage.getItem(this._nameDestinationsKey()));
  }
}
