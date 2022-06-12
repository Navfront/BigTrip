const POINTS = require('./mocks-points.js')
const EVENTS = require('./mock-events.js')
const EVENT_DESTINATIONS = require('./mock-destinations.js')
const uniqid = require('uniqid')

class ServerModel {
  constructor() {
    this._points = POINTS;
    this._events = EVENTS;
    this._destinations = EVENT_DESTINATIONS;
    this._eventTypes = Object.keys(this._events);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(newPoint) {
    const index = this._points.findIndex((it) => it.id === newPoint.id);
    if (index === -1) {
      return false;
    }
    this._points = [].concat(this._points.slice(0, index), newPoint, this._points.slice(index + 1));
    return index;
  }

  deletePoint(deletePointId) {
    const index = this._points.findIndex((it) => it.id === String(deletePointId));
    if (index !== -1)
    {
      this._points.splice(index, 1);
      return index
    } else {
      return false
      }

  }

  createPoint(newPoint) {
    if (!newPoint) {
      return false
    }
    this._points.push({ ...newPoint, id: uniqid() });
    return true
  }

  getEvents() {
    return this._events;
  }

  getDestinations() {
    return this._destinations;
  }

  getEventTypes() {
    return this._eventTypes;
  }

  getPointById(pointId) {
    console.log('point id = ', pointId || "null");
    const defaultType = 'transport';
    const newPoint = {
      id: null,
      isFavorite: false,
      basePrice: 0,
      dateFrom: new Date().toISOString(),
      dateTo: null,
      destination: {
        name: null,
        description: null,
        pictures: []
      },
      destinationsByType: this.getDestinationsByType(defaultType),
      offers: [],
      type: defaultType,
    };
    const result = this._points.find((it) => it.id === String(pointId));
    return result? Object.assign({}, result, {destinationsByType: this.getDestinationsByType(this.getTypeById(pointId))}): newPoint;
  }

  getTypeById(pointId) {
    return this._points.find((it)=>it.id===pointId)?.type;
  }

  getDestinationsByType(eventType) {
    const result = this._events.find((it)=>it.type===eventType)?.destinations;
    return result;
  }

  getOffersByType(eventType) {
    const result = this._events.find((it) => it.type === eventType)?.offers;
    return result;
  }

  getEventDestinationData(destinationName) {
    const result = this._destinations.find((it) => it.name.toLowerCase() === destinationName.toLowerCase()) || {
      name: null,
      description: null,
      pictures: []
    };
    return result;
  }

  syncPoints(points) {
    //v.0.0.0.0.1
    this._points = points;
  }
}

module.exports = ServerModel
