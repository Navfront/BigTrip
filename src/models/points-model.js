export const FILTERS = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export default class PointsModel {
  constructor() {
    this._pointsData = null;
    this._currentFilter = FILTERS.EVERYTHING;
    //Подписчики
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  /**
   *
   * @returns Возвращает отфильтрованные данные всех точек
   */
  getPoints() {
    return  this._filterPointsData(this._pointsData);
  }

  /**
   *
   * @returns Возвращает оригинальные данные
   */
  getOriginalPoints() {
    return this._pointsData;
  }

  /**
   * Установить массив новых данных
   * @param {Array} newPointsData
   */
  setPointsData(newPointsData) {
    this._pointsData = newPointsData;
    this._filtredData = this._filterPointsData(newPointsData);
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

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  /**
  * Массив колбэков
  * @param {Array} Handlers
  */
  _callHandlers(handlers) {
    handlers.forEach((it) => it());
  }

  /**
   *'everything' || 'future' || 'past'
   * @param {string} filterType
   */
  setActiveFilter(filterType) {
    switch (filterType) {
      case FILTERS.FUTURE:
        this._currentFilter = FILTERS.FUTURE;
        break;
      case FILTERS.PAST:
        this._currentFilter = FILTERS.PAST;
        break;
      default:
        this._currentFilter = FILTERS.EVERYTHING;
        break;
    }
    this._callHandlers(this._filterChangeHandlers);
  }

  /**
   * Принимает массив данных для фильтрации
   * @param {Array} pointsData
   */
  _filterPointsData(pointsData) {
    if(!pointsData){return null;}

    switch (this._currentFilter) {
      case FILTERS.FUTURE:
        return pointsData.slice().filter((it) => (new Date(it.dateFrom).valueOf() > Date.now()));
      case FILTERS.PAST:
        return pointsData.slice().filter((it) => (new Date(it.dateFrom).valueOf() < Date.now()));
      default:
        return pointsData;
    }
  }
}
