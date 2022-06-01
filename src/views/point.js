import AbstractComponent from './abstract-component';
import {
  getDiffTime,
  humanizeDateDueDate,
  humanizeFromDueDate,
  humanizeToDueDate,
} from '../utils/utils';


const getEventOffer = (offer) => {
  const { title, price } = offer;
  return `
  <li class="event__offer">
    <span class="event__offer-title">${title ? title : ''}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price ? price : '0'}</span>
  </li>
`;
};

const getPointTemplate = (pointData = {}) => {
  const { type, basePrice, isFavorite, dateFrom, dateTo, destination, offers } =
    pointData;

  return `<div class="event">
    <time class="event__date" datetime="${dateFrom}">${humanizeDateDueDate(
  dateFrom
)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${
  type ? type : 'taxi'
}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type ? type : '?'} ${
  destination ? destination : '???'
}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom}">${
  dateFrom ? humanizeFromDueDate(dateFrom) : ''
}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateTo}">${
  dateTo ? humanizeToDueDate(dateTo) : ''
}</time>
      </p>
      <p class="event__duration">${getDiffTime(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${
  basePrice ? basePrice : ''
}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${
  offers && offers.length > 0
    ? '<ul class="event__selected-offers">'
    : ''
}
    ${
  offers &&
      offers
        .map((it) => getEventOffer(it))
        .join('')
}
      ${offers && offers.length > 0 ? '</ul>' : ''}
    <button class="event__favorite-btn ${
  isFavorite ? 'event__favorite-btn--active' : ''
} " type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path
          d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
`;
};

export default class PointComponent extends AbstractComponent {
  constructor(data) {
    super(...arguments);
    this._data = data;
    this._onRollUpHandler = null;
    this._onFavoriteHandler = null;
  }

  _getTemplate() {
    return getPointTemplate(this._data);
  }

  _recoveryListeners() {
    this.setOnFavoriteHandler(this._onFavoriteHandler);
    this.setOnRollUpHandler(this._onRollUpHandler);
  }

  setOnRollUpHandler(callback) {
    this._onRollUpHandler = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._onRollUpHandler);
  }

  setOnFavoriteHandler(callback) {
    this._onFavoriteHandler = callback;
    this.getElement()
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this._onFavoriteHandler);
  }
}
