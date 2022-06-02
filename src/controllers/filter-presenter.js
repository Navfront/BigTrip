
import { FILTERS } from '../models/points-model';
import FilterComponent from '../views/filter';
import AbstractPresenter from './abstract-presenter';


export default class FilterPresenter extends AbstractPresenter{
  constructor() {
    super(...arguments);
    this._filterMode = FILTERS.EVERYTHING;
    this._filterComponent = null;
    //handlers
    this._onFilterClickHandler = this._onFilterClickHandler.bind(this);
  }

  _onFilterClickHandler(evt) {
    this._dataModel.setActiveFilter(evt.target.value);
    this._filterMode = evt.target.value;
  }

  render() {
    this._filterComponent = new FilterComponent(Object.values(FILTERS));
    this._renderComponent(this._container, this._filterComponent.getElement());
    this._filterComponent.setOnFiltersClickHandler(this._onFilterClickHandler);
  }
}
