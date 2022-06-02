
import { FILTERS } from '../utils/const';
import AbstractComponent from './abstract-component';

const getEmptyTemplate = (data = { isEmpty: true, isLoading: false, choosenFilter: FILTERS.EVERYTHING }) => {

  let result = '';
  switch (data?.choosenFilter) {
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

  if (!data?.isEmpty && !data?.isLoading) {
    result = 'no data in EmptyCompont';
  }

  if (data?.isLoading) {
    result = '<p class="trip-events__msg">Loading...</p>';
  }

  return `${result}`;
};

export default class EmptyComponent extends AbstractComponent {
  constructor(data) {
    super(...arguments);
    this._data = data;
  }

  _recoveryListeners() { }

  _getTemplate() {
    return getEmptyTemplate(this._data);
  }
}
