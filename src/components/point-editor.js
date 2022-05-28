import {
  EVENT_TYPES,
  getDestinationByTypes,
  getOffersByType,
  getPicturesByDestination,
  getDescriptionOfDestination,
} from '../mock/events';

import AbstractSmartComponent from './abstract-smart-component';

const eventTypes = EVENT_TYPES;

const getEventTypeItemTemplate = (eventType) => `
  <div class="event__type-item">
  <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
  <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
</div>
  `;

const getDestinationOptionTemplate = (destination) => `
  <option value="${destination}"></option>
  `;

const getOffer = (offer, isChecked = false) => {
  const offerName = offer.title.split(' ').join('-');

  return `
  <div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-1" type="checkbox" name="event-offer-${offerName}" ${
  isChecked ? 'checked' : ''
}>
  <label class="event__offer-label" for="event-offer-${offerName}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>
  `;
};

const getDestinationImage = (imgSrc) => `<img class="event__photo" src="${imgSrc}" alt="Event photo">`;

const getPointEditorTemplate = (pointData = {}) => {
  const { type, basePrice, dateFrom, dateTo, destination, offers } = pointData;
  const choosenDestination = destination || 'geneva';
  const choosenDueDateFrom = dateFrom;
  const choosenDueDateTo = dateTo;
  const choosenType = type || eventTypes[0];

  const currentPrice = basePrice || 0;
  const currentDestinationOptions = getDestinationByTypes(choosenType);
  const currentOffers = offers || getOffersByType(choosenType);
  const currentDescription = getDescriptionOfDestination(choosenDestination);

  const hasOffers = currentOffers.length > 0;
  const hasDestinations = currentDestinationOptions.length > 0;

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${choosenType}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

         ${eventTypes
    .map((it) => getEventTypeItemTemplate(it))
    .join('')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        Flight
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${choosenDestination}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${currentDestinationOptions
    .map((it) => getDestinationOptionTemplate(it))
    .join('')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${choosenDueDateFrom}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${choosenDueDateTo}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${currentPrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  ${
  hasOffers
    ? '<section class="event__details"><section class="event__section  event__section--offers"><h3 class="event__section-title  event__section-title--offers">Offers</h3><div class="event__available-offers"> '
    : ''
}


${
  hasOffers
    ? currentOffers
      .map((it, index) => getOffer(it, index === 0 || index === 1))
      .join('')
    : ''
}

  </div>
  ${hasOffers ? '</section>' : ''}

  ${
  hasDestinations
    ? '<section class="event__section  event__section--destination"><h3 class="event__section-title  event__section-title--destination">Destination</h3><p class="event__destination-description">'
    : ''
}
    ${hasDestinations ? currentDescription : ''}
      ${
  hasDestinations
    ? '</p><div class="event__photos-container"><div class="event__photos-tape">'
    : ''
}

         ${
  hasDestinations
    ? getPicturesByDestination(choosenDestination)
      .map((it) => getDestinationImage(it.src))
      .join('')
    : ''
}
         ${hasDestinations ? '</div></div></section>' : ''}
  </section>
</form>`;
};

export default class PointEditorComponent extends AbstractSmartComponent {
  constructor(
    choosenType,
    choosenDestination,
    choosenDueDateFrom,
    choosenDueDateTo,
    currentDestinationOptions,
    currentOffers,
    currentDescription
  ) {
    super();

    // handlers cb
    this._onSaveHandler = null;
    this._onCancelHandler = null;
    this._onChooseEventTypeHandler = null;
    // choosen data
    this._choosenType = choosenType;
    this._choosenDestination = choosenDestination;
    this._choosenDueDateFrom = choosenDueDateFrom;
    this._choosenDueDateTo = choosenDueDateTo;
    this._currentDestinationOptions = currentDestinationOptions;
    this._currentOffers = currentOffers;
    this._currentDescription = currentDescription;
  }

  recoveryListeners() {
    this.setOnSaveHandler(this._onSaveHandler);
    this.setOnResetHandler(this._onResetHandler);
    this.setOnChooseEventHandler(this._onChooseEventTypeHandler);
  }

  getTemplate() {
    return getPointEditorTemplate(
      this._choosenType,
      this._choosenDestination,
      this._choosenDueDateFrom,
      this._choosenDueDateTo,
      this._currentDestinationOptions,
      this._currentOffers,
      this._currentDescription
    );
  }

  rerender() {
    super.rerender();
  }

  setOnSaveHandler(callback) {
    this._onSaveHandler = callback;
    this.getElement()
      .querySelector('.event__save-btn')
      .addEventListener('click', this._onSaveHandler);
  }

  setOnCancelHandler(callback) {
    this._onCancelHandler = callback;
    this.getElement()
      .querySelector('.event__reset-btn')
      .addEventListener('click', this._onCancelHandler);
  }

  setOnChooseEventHandler(callback) {
    this._onChooseEventTypeHandler = callback;
    this.getElement()
      .querySelector('.event__type-toggle')
      .addEventListener('change', this._onChooseEventTypeHandler);
  }
}
