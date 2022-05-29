
export default class PointsModel {
  constructor() {
    this._pointsData = null;
    this._dataChangeHandlers = [];
  }

  /**
   *
   * @returns Возвращает данные всех точек
   */
  getPoints() {
    return this._pointsData;
  }

  /**
   * Установить массив новых данных
   * @param {Array} newPointsData
   */
  setPointsData(newPointsData) {
    this._pointsData = newPointsData;
  }


  /**
   *
   * @param {Object} newPoint
   * @returns Возвращает false если не нашел индекс, true если ок
   */
  updatePoint(newPoint) {
    const index = this._pointsData.findIndex((it) => it.id === newPoint.id);
    if (index === -1) {
      return false;
    }
    this._pointsData = [].concat(this._pointsData.slice(0, index), newPoint, this._pointsData.slice(index + 1));
    return true;
  }


  /**
   *
   * Observer. Подписка на обновление данных
   * @param {Function} handler
   */
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }


  /**
   * Notify all. Вызов функций подписчиков
   */
  _callHandlers() {
    this._dataChangeHandlers.forEach((it)=>it());
  }
}
