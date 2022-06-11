import { FILTERS, SORTS } from '../utils/const';
import { sortPointsData } from '../utils/sort-utils';
import uniqid from 'uniqid';


export default class DataModel {
  constructor(api) {
    this._api = api;
    this._events = [];
    this._pointsData = [];
    this._destinations = [];
    this._currentFilter = FILTERS.EVERYTHING;
    this._sortsData = null;
    this._isSortDirectionUp = false;
    this._prevSortType = null;
    this._listIsLoading = true;
    //Подписчики
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortsDataChangeHandlers = [];
    this._loadingWhatchHandlers = [];


  }

  init() {
    const points = this._api.getAllPoints();
    const events = this._api.getEvents();
    const destinations = this._api.getDestinations();

    Promise.all([points, events, destinations]).then((datas) =>
    {
      this._events = datas[1].message;
      this._destinations = datas[2].message;
      this.setPoints(datas[0].message);
    }
    );
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
   * Включить все sorts
   */
  enableSorts() {
    this.getSorts().forEach((it) => { it.isDisabled = false;});
  }

  /**
   *
   * @returns Возвращает отфильтрованные и отсортированные данные всех точек
   */
  getPoints() {
    return sortPointsData(this._filterPointsData(this._pointsData), this.getCurrentSort(), this._isSortDirectionUp);
  }

  getPointById(pointId) {
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
    const result = this._pointsData.find((it) => it.id === String(pointId));
    return result? Object.assign({}, result, {destinationsByType: this.getDestinationsByType(this.getTypeById(pointId))}): newPoint;
  }

  getTypeById(pointId) {
    return this._pointsData.find((it)=>it.id===pointId)?.type;
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
    if (this._pointsData) {
      this._setLoading(false);
    }
  }

  /**
   * Boolean показ loading..
   * @param {boolean} state
   */
  _setLoading(state) {
    this._listIsLoading = state;
    this._callHandlers(this._loadingWhatchHandlers);
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

    this._api.updatePoint(newPoint);
    //notify all data change
    this._callHandlers(this._dataChangeHandlers);
    return index;
  }

  createPoint(newPoint) {
    const newData = { ...newPoint, id: uniqid() };
    this._pointsData.push(newData);
    this._api.createPoint(newData);
  }

  deletePoint(deletePointId) {
    const index = this._pointsData.findIndex((it) => it.id === String(deletePointId));
    if (index !== -1)
    {
      this._pointsData.splice(index, 1);
      this._api.deletePoint(String(deletePointId));
    }
  }

  /**
   * Установить все доступные варианты эвентов \\ не маршруты!
   * @param {array} events
   */
  setEvents(events) {
    this._events = events;
  }


  getEventTypes() {
    return Object.keys(this._events);
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
   * Устанавливает дефолтный фильтр
   */
  setActiveFilterDefault() {
    this._currentFilter = FILTERS.EVERYTHING;
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
    return { isEmpty: !this._pointsData || this._pointsData.length<1, isLoading: this._listIsLoading, choosenFilter: this._currentFilter };
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

  setLoadingWatchHandler(handler){
    this._loadingWhatchHandlers.push(handler);
  }

  /**
    * Массив колбэков
    * @param {Array} Handlers
    */
  _callHandlers(handlers) {
    if(handlers.length>0){handlers.forEach((it) => it());}
  }

}
