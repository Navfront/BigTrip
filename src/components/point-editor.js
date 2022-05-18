import {
  EVENTS_TYPE,
  ALL_POINTS,
  ALL_DESTINATIONS_BY_TYPE,
  OFFERS_BY_DESTINATIONS,
  IMAGES_SRC,
} from "../mock/events";
const eventTypes = EVENTS_TYPE;
const points = ALL_POINTS;
const destinationsByType = ALL_DESTINATIONS_BY_TYPE;
const offersByDestinations = OFFERS_BY_DESTINATIONS;

const getEventTypeItemTemplate = (eventType) => {
  return `
  <div class="event__type-item">
  <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
  <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
</div>
  `;
};

const getDestinationOptionTemplate = (destination) => {
  return `
  <option value="${destination}"></option>
  `;
};

const getOffer = (offer, isChecked = false) => {
  const offerName = offer.title.split(" ").join("-");

  return `
  <div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-1" type="checkbox" name="event-offer-${offerName}" ${
    isChecked ? "checked" : ""
  }>
  <label class="event__offer-label" for="event-offer-${offerName}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>
  `;
};

const getDestinationImage = (imgSrc) => {
  return `<img class="event__photo" src="${imgSrc}" alt="Event photo">`;
};

const pointEditorComponent = () => {
  let currentType = eventTypes[5];
  let currentPoint = points[1];
  let currentDestinationsByType = destinationsByType[0];
  let currentDestination = currentDestinationsByType[currentType][1];
  let currentDueDateFrom = "19/03/19 00:00";
  let currentDueDateTo = "19/03/19 00:00";
  let currentDescription =
    "Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.";
  let hasOffers = true;
  let hasDestinations = true;

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${currentType}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

         ${eventTypes
           .map((it) => {
             return getEventTypeItemTemplate(it);
           })
           .join("")}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        Flight
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
      <datalist id="destination-list-1">
      ${currentDestinationsByType[currentType]
        .map((it) => {
          return getDestinationOptionTemplate(it);
        })
        .join("")}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${currentDueDateFrom}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${currentDueDateTo}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${
        currentPoint.base_price
      }">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  ${
    hasOffers
      ? '<section class="event__details"><section class="event__section  event__section--offers"><h3 class="event__section-title  event__section-title--offers">Offers</h3><div class="event__available-offers"> '
      : ""
  }


${
  hasOffers
    ? OFFERS_BY_DESTINATIONS.find((it) => typeof it["geneva"] !== "undefined")
        ["geneva"].map((it, index) => {
          return getOffer(it, index === 0 || index === 1);
        })
        .join("")
    : ""
}

  </div>
  ${hasOffers ? "</section>" : ""}

  ${
    hasDestinations
      ? '<section class="event__section  event__section--destination"><h3 class="event__section-title  event__section-title--destination">Destination</h3><p class="event__destination-description">'
      : ""
  }
    ${hasDestinations ? currentDescription : ""}
      ${
        hasDestinations
          ? '</p><div class="event__photos-container"><div class="event__photos-tape">'
          : ""
      }

         ${
           hasDestinations
             ? IMAGES_SRC.map((it) => getDestinationImage(it))
             : ""
         }
         ${hasDestinations ? "</div></div></section>" : ""}
  </section>
</form>`;
};

export default pointEditorComponent;
