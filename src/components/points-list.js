import { FILTERS } from "../mock/filters";
import { createElement } from "./../utils/utils";

// Значение отображаемого текста зависит от выбранного фильтра:
// * Everthing – 'Click New Event to create your first point'
// * Past — 'There are no past events now';
// * Future — 'There are no future events now'.

const getPointsListTemplate = (isEmpty, isLoading, choosenFilter) => {
  let result = "";
  switch (choosenFilter) {
    case FILTERS[1]:
      result = `<p class="trip-events__msg">There are no future events now</p>`;
      break;

    case FILTERS[2]:
      result = `<p class="trip-events__msg">There are no past events now</p>`;
      break;

    default:
      result = `<p class="trip-events__msg">Click New Event to create your first point</p>`;
      break;
  }

  if (!isEmpty && !isLoading) {
    result = `<ul class="trip-events__list"></ul>`;
  }

  if (isLoading) {
    result = `<p class="trip-events__msg">Loading...</p>`;
  }

  return `${result}`;
};

export default class PointsListComponent {
  constructor(isEmpty = false, isLoading = false, choosenFilter = FILTERS[0]) {
    this._isEmpty = isEmpty;
    this._isLoading = isLoading;
    this._choosenFilter = choosenFilter;
    this._element = null;
  }

  getTemplate() {
    return getPointsListTemplate(
      this._isEmpty,
      this._isLoading,
      this._choosenFilter
    );
  }

  getElement() {
    if (!this._element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
