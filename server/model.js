const POINTS = require('./mocks-points.js')
const uniqid = require('uniqid')

class ServerModel {
  constructor() {
    this._points = POINTS;
  }

  get getPoints() {
    return this._points;
  }

  updatePoint(newPoint) {
    const index = this._pointsData.findIndex((it) => it.id === newPoint.id);
    if (index === -1) {
      return false;
    }
    this._pointsData = [].concat(this._pointsData.slice(0, index), newPoint, this._pointsData.slice(index + 1));
    return index;
  }

  deletePoint(deletePointId) {
    const index = this._pointsData.findIndex((it) => it.id === String(deletePointId));
    if (index !== -1)
    { this._pointsData.splice(index,1); }
  }

  createPoint(newPoint) {
    this._pointsData.push({ ...newPoint, id: uniqid() });
  }
}

module.exports = ServerModel
