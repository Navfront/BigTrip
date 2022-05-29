import AbstractSmartComponent from './abstract-smart-component.js';

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

export default class FilterComponent extends AbstractSmartComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return getFiltersTemplate(this._filters);
  }
}