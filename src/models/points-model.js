import { SORTS } from '../mock/sorts';

export const FILTERS = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export default class PointsModel {
  constructor() {
    this._pointsData = null;
    this._currentFilter = FILTERS.EVERYTHING;
    this._sortsData = null;
    //Подписчики
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortsDataChangeHandlers = [];
  }

  /**
   * Восстанавливает оригинал sortsData
   */
  restoreSorts() {
    this._sortsData = JSON.parse(JSON.stringify(SORTS));
    return this._sortsData;
  }

  /**
   *Возавращает SortsData
   * @returns object
   */
  getSorts() {
    if (this._sortsData) {
      return this._sortsData;
    }
    else {
      return this.restoreSorts();
    }
  }

  /**
   * Принимает новый тип сортировки
   * @param {string} newSortType
   */
  changeCurrentSort(newSortType) {
    this.getSorts().forEach((it) => {
      it.isChecked = false;
      if (it.sortName === newSortType) {
        it.isChecked = true;
      }
    });
    // Notify
    this._callHandlers(this._sortsDataChangeHandlers);
  }

  /**
   * Возвращает тип текущей сортировки
   * @returns string
   */
  getCurrentSort() {
    const sort = this.getSorts().find((it)=>it.isChecked===true);
    return sort.sortName;
  }

  /**
   * Отключить все sorts
   */
  disableSorts() {
    this.getSorts().forEach((it) => { it.isDisabled = true;});
  }

  /**
   *
   * @returns Возвращает отфильтрованные данные всех точек
   */
  getPoints() {
    return  this._filterPointsData(this._pointsData);
  }

  getPointById(pointId) {
    return this._pointsData.find((it)=>it.id === pointId);
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
  setPoints(newPointsData) {
    this._pointsData = newPointsData;
  }

  /**
   *
   * @param {Object} newPoint
   * @returns Возвращает index поинта если ок и false если не нашел
   */
  updatePoint(newPoint) {
    const index = this._pointsData.findIndex((it) => it.id === newPoint.id);
    if (index === -1) {
      return false;
    }
    this._pointsData = [].concat(this._pointsData.slice(0, index), newPoint, this._pointsData.slice(index + 1));

    //notify all data change
    this._callHandlers(this._dataChangeHandlers);
    return index;
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

  setSortsChangeHandler(handler) {
    this._sortsDataChangeHandlers.push(handler);
  }

  /**
  * Массив колбэков
  * @param {Array} Handlers
  */
  _callHandlers(handlers) {
    if(handlers.length>0){handlers.forEach((it) => it());}
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
    //notify all filter change
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

  getListData() {
    return { isEmpty: !this._pointsData || this._pointsData.length<1, isLoading: false, choosenFilter: this._currentFilter };
  }

  isEmpty() {
    return !this._pointsData || this._pointsData.length<1;
  }
}
