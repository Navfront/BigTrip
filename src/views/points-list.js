

import { FILTERS } from '../models/points-model';
import AbstractSmartComponent from './abstract-smart-component';

// Значение отображаемого текста зависит от выбранного фильтра:
// * Everthing – 'Click New Event to create your first point'
// * Past — 'There are no past events now';
// * Future — 'There are no future events now'.

const getPointsListTemplate = (isEmpty, isLoading, choosenFilter) => {
  let result = '';
  switch (choosenFilter) {
    case FILTERS.FUTURE:
      result = '<p class="trip-events__msg">There are no future events now</p>';
      break;

    case FILTERS.PAST:
      result = '<p class="trip-events__msg">There are no past events now</p>';
      break;

    default:
      result = '<p class="trip-events__msg">Click New Event to create your first point</p>';
      break;
  }

  if (!isEmpty && !isLoading) {
    result = '<ul class="trip-events__list"></ul>';
  }

  if (isLoading) {
    result = '<p class="trip-events__msg">Loading...</p>';
  }

  return `${result}`;
};

export default class PointsListComponent extends AbstractSmartComponent {
  constructor(isEmpty = false, isLoading = false, choosenFilter = FILTERS[0]) {
    super();
    this._isEmpty = isEmpty;
    this._isLoading = isLoading;
    this._choosenFilter = choosenFilter;
  }

  recoveryListeners() {

  }

  getTemplate() {
    return getPointsListTemplate(
      this._isEmpty,
      this._isLoading,
      this._choosenFilter
    );
  }
}
