import AbstractController from './abstract-controller';

export default class TripController extends AbstractController {
  constructor(container, dataModel) {
    super(...arguments);
    this._container = container;
    this._dataModel = dataModel;
    this._isLoading = true;
    this._pointControllers = new Map();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  init() {

  }

  _onSortChange() {

  }

  _onDataChange() {
  }

  _onViewChange() {
  }

  _onFilterChange() {
  }

  _onSortClickHandler() {
    // cant evt
    // this._dataModel.changeCurrentSort(evt.currentTarget.dataset.sortName);
  }


}
