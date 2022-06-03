import { FILTERS } from '../utils/const.js';
import AbstractComponent from './abstract-component.js';

const getFilter = (filterName, isChecked = false) => `
  <div class="trip-filters__filter">
  <input id="${
  filterName ? `filter-${  filterName}` : null
}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${
  filterName ? filterName : null
}" ${isChecked ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="${
  filterName ? `filter-${  filterName}` : null
}">${filterName ? filterName : 'noName'}</label>
  </div>
`;

const getFiltersTemplate = (filters) => `<form class="trip-filters" action="#" method="get">
  ${
  filters && filters.length > 0
    ? filters
      .map((it, index) => getFilter(it, index === 0))
      .join('\n')
    : ''
}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;

export default class FilterComponent extends AbstractComponent {
  constructor(data) {
    super(...arguments);
    this._data = data;
    this._onFilterClickHandler = null;
  }

  _getTemplate() {
    return getFiltersTemplate(this._data || Object.values(FILTERS));
  }

  _recoveryListeners() {
    this.setOnFiltersClickHandler(this._onFilterClickHandler);
  }

  setOnFiltersClickHandler(callback) {
    this._onFilterClickHandler = callback;
    this.getElement().querySelectorAll('.trip-filters__filter-input').forEach((it) => {
      it.addEventListener('click', this._onFilterClickHandler.bind(null, it));
    });
  }
}
