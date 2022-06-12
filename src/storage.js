const version = 'v1';
const pointsName = 'points';
const eventsName = 'events';
const destinationsName = 'destinations';

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
    window.localStorage.setItem(this._namePointsKey(),JSON.stringify(points));
  }

  setEvents(events) {
    window.localStorage.setItem(this._nameEventsKey(),JSON.stringify(events));
  }

  setDestinations(destinations) {
    window.localStorage.setItem(this._nameDestinationsKey(),JSON.stringify(destinations));
  }

  getPoints() {
    return JSON.parse(window.localStorage.getItem(this._namePointsKey()));
  }

  getEvents() {
    return JSON.parse(window.localStorage.getItem(this._nameEventsKey()));
  }

  getDestinations() {
    return JSON.parse(window.localStorage.getItem(this._nameDestinationsKey()));
  }
}
