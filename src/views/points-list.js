import { FILTERS } from '../models/points-model';
import AbstractComponent from './abstract-component';

// Значение отображаемого текста зависит от выбранного фильтра:
// * Everthing – 'Click New Event to create your first point'
// * Past — 'There are no past events now';
// * Future — 'There are no future events now'.
//
const getPointsListTemplate = (data = { isEmpty: true, isLoading: false, choosenFilter: FILTERS.EVERYTHING }) => {

  const { isEmpty, isLoading, choosenFilter } = data;

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

export default class PointsListComponent extends AbstractComponent {
  constructor(data) {
    super(...arguments);
    this._data = data;
  }

  _recoveryListeners(){}

  _getTemplate() {
    return getPointsListTemplate(this._data);
  }
}
