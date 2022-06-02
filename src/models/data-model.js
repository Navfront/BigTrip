import { FILTERS, SORTS } from '../utils/const';
import { sortPointsData } from '../utils/sort-utils';


export default class DataModel {
  constructor() {
    this._pointsData = null;
    this._currentFilter = FILTERS.EVERYTHING;
    this._sortsData = null;
    this._isSortDirectionUp = false;
    this._prevSortType = null;
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
    this._isSortDirectionUp = false;
    this._prevSortType = this._sortsData[0].sortName;
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
  changeCurrentSort(newSortType = SORTS[0].sortName) {
    if (newSortType === this._prevSortType) {
      this._isSortDirectionUp = !this._isSortDirectionUp;
    } else {
      this._isSortDirectionUp = false;
    }
    this._prevSortType = newSortType;
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
   * @returns Возвращает отфильтрованные и отсортированные данные всех точек
   */
  getPoints() {
    return sortPointsData(this._filterPointsData(this._pointsData), this.getCurrentSort(), this._isSortDirectionUp);
  }

  getPointById(pointId) {
    return this._pointsData.find((it)=>it.id === String(pointId));
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

}
