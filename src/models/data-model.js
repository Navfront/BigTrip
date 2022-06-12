import { FILTERS, SORTS } from '../utils/const';
import { sortPointsData } from '../utils/sort-utils';


export default class DataModel {
  constructor() {
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

  restoreSorts() {
    this._sortsData = JSON.parse(JSON.stringify(SORTS));
    this._isSortDirectionUp = false;
    this._prevSortType = this._sortsData[0].sortName;
    return this._sortsData;
  }

  getSorts() {
    if (this._sortsData) {
      return this._sortsData;
    }
    else {
      return this.restoreSorts();
    }
  }

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

  getCurrentSort() {
    const sort = this.getSorts().find((it)=>it.isChecked===true);
    return sort.sortName;
  }

  disableSorts() {
    this.getSorts().forEach((it) => { it.isDisabled = true;});
  }

  enableSorts() {
    this.getSorts().forEach((it) => { it.isDisabled = false;});
  }

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

  getOriginalPoints() {
    return this._pointsData;
  }

  setPoints(newPointsData) {
    this._pointsData = newPointsData;
    if (this._pointsData) {
      this._setLoading(false);
    }
  }

  setDestinations(destinationsData) {
    this._destinations = destinationsData;
  }

  _setLoading(state) {
    this._listIsLoading = state;
    this._callHandlers(this._loadingWhatchHandlers);
  }

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

  createPoint(newPoint) {
    this._pointsData.push(newPoint);
  }

  deletePoint(deletePointId) {
    const index = this._pointsData.findIndex((it) => it.id === String(deletePointId));
    if (index !== -1)
    {
      this._pointsData.splice(index, 1);
    }
  }

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

  setActiveFilterDefault() {
    this._currentFilter = FILTERS.EVERYTHING;
    this._callHandlers(this._filterChangeHandlers);
  }

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

  _callHandlers(handlers) {
    if(handlers.length>0){handlers.forEach((it) => it());}
  }

}
