import AbstractSmartComponent from './abstract-smart-component.js';

const MDASH = ' &mdash; ';

const DEFAULT_DATA = {
  destinations: ['Amsterdam', 'Chamonix', 'Geneva','Saint-Petersburg'],
  month: 'Mar',
  dateFrom: 18,
  dateTo: 20,
  cost: 1390
};
//Amsterdam &mdash; Chamonix &mdash; Geneva
const getTitle = (destinations) => destinations.length > 3? `${destinations[0]+MDASH}...${MDASH}${destinations[destinations.length-1]}` : destinations.map((it)=>it).join(` ${MDASH} `);

const getInfoTemplate = (infoData = DEFAULT_DATA) => {
  const { destinations, month, dateFrom, dateTo, cost } = infoData;
  return`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTitle(destinations)}</h1>

    <p class="trip-info__dates">${month} ${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>
</section>`;};

export default class InfoComponent extends AbstractSmartComponent {
  constructor() {
    super(arguments);

  }

  _getTemplate() {
    return getInfoTemplate();
  }
}
