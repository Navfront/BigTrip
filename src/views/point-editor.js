import {
  EVENT_TYPES,
  getDestinationByTypes,
  getOffersByType,
  getPicturesByDestination,
  getDescriptionOfDestination,
} from '../mock/events';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractComponent from './abstract-component';
import { humanizeForEdit } from '../utils/utils';

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

  return `<div class="event__offer-selector">
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

const getPointEditorTemplate = (data = {}, isAddMode = !data) => {
  const { id: pointId, type, basePrice, dateFrom, dateTo, destination, offers } = data;

  const choosenDestination = destination || '';
  const choosenDueDateFrom = humanizeForEdit(dateFrom);
  const choosenDueDateTo = humanizeForEdit(dateTo);
  const choosenType = type || eventTypes[0];

  const currentPrice = basePrice || 0;
  const currentDestinationOptions = getDestinationByTypes(choosenType);
  const currentOffers = offers || getOffersByType(choosenType);
  const currentDescription = getDescriptionOfDestination(choosenDestination);

  const hasOffers = currentOffers?.length > 0;
  const hasDestination = destination?.length > 0;

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
      ${choosenType}
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
    <button class="event__reset-btn" type="reset">${pointId === null?'Cancel':'Delete'}</button>
    ${pointId === null?'':`<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`}

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
  hasDestination? '<section class="event__section  event__section--destination"><h3 class="event__section-title  event__section-title--destination">Destination</h3><p class="event__destination-description">': ''
}
    ${hasDestination ? currentDescription : ''}
      ${
  hasDestination
    ? '</p><div class="event__photos-container"><div class="event__photos-tape">'
    : ''
}
         ${
  hasDestination
    ? getPicturesByDestination(choosenDestination)
      .map((it) => getDestinationImage(it.src))
      .join('')
    : ''
}
         ${hasDestination ? '</div></div></section>' : ''}
  </section>
</form>`;
};

export default class PointEditorComponent extends AbstractComponent {
  constructor(data) {
    super(...arguments);
    // handlers cb
    this._onSaveHandler = null;
    this._onCancelHandler = null;
    this._onRollDownHandler = null;
    this._onToggleEventTypeHandler = null;
    this._onChangeDestinationHandler = null;
    this._onTimeInputHandler = null;
    // choosen data
    this._data = data;
  }

  _recoveryListeners() {
    if (this._data.id !== null) {
      this.setOnRollDownHandler(this._onRollDownHandler);
    }
    this.setOnSaveHandler(this._onSaveHandler);
    this.setOnCancelHandler(this._onCancelHandler);
    this.setOnToggleEventTypeHandler(this._onToggleEventTypeHandler);
    this.setOnChangeDestinationHandler(this._onChangeDestinationHandler);
    this.setOnTimeInputHandler(this._onTimeInputHandler);
  }

  _getTemplate() {
    return getPointEditorTemplate(
      this._data,
    );
  }

  rerender() {
    super.rerender(...arguments);
  }

  _initFlatPickr() {
    return flatpickr('.event__field-group--time',{
      dateFormat: 'Y-m-d H:i',
      enableTime: true,
      minDate: 'today',
      maxDate: new Date().fp_incr(14),
      // eslint-disable-next-line camelcase
      time_24hr: true
    });
  }

  setOnSaveHandler(callback) {
    this._onSaveHandler = callback;
    this.getElement().onsubmit = this._onSaveHandler;
  }

  setOnCancelHandler(callback) {
    this._onCancelHandler = callback;
    this.getElement()
      .querySelector('.event__reset-btn')
      .addEventListener('click', this._onCancelHandler);
  }

  setOnRollDownHandler(callback) {
    this._onRollDownHandler = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._onRollDownHandler);
  }

  setOnToggleEventTypeHandler(callback) {
    this._onToggleEventTypeHandler = callback;
    const radios = this.getElement().querySelectorAll('.event__type-input');
    radios.forEach((it) => it.addEventListener('change', this._onToggleEventTypeHandler.bind(null, it)));
  }

  setOnChangeDestinationHandler(callback) {
    this._onChangeDestinationHandler = callback;
    const element = this.getElement().querySelector('.event__input--destination');
    element.addEventListener('click', (evt)=>{evt.target.value = '';});
    element.addEventListener('change', callback);
  }

  setOnTimeInputHandler(callback) {
    this._onTimeInputHandler = callback;
    const timeInputs = this.getElement().querySelectorAll('.event__input--time');
    timeInputs.forEach((it) => it.addEventListener('click', () => {
      if (it.id.includes('end')) { this._onTimeInputHandler(this._initFlatPickr(), false); } else {
        this._onTimeInputHandler(this._initFlatPickr(), true);
      }
    }));
  }

}


