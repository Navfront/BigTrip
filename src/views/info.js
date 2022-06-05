import AbstractComponent from './abstract-component.js';

const MDASH = ' &mdash; ';

const DEFAULT_DATA = {
  destinations: ['Moscow', 'Chamonix', 'Geneva','Saint-Petersburg'],
  startMonth: 'Mar',
  endMonth: 'June',
  dateFrom: 18,
  dateTo: 20,
  cost: 1390
};

const getTitle = (destinations) => destinations.length > 3? `${destinations[0]+MDASH}...${MDASH}${destinations[destinations.length-1]}` : destinations.map((it)=>it).join(` ${MDASH} `);

const getInfoTemplate = (infoData = DEFAULT_DATA) => {
  const { destinations, startMonth, endMonth, dateFrom, dateTo, cost } = infoData;
  return`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTitle(destinations)}</h1>

    <p class="trip-info__dates">${startMonth} ${dateFrom}&nbsp;&mdash;&nbsp;${endMonth} ${dateTo}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>
</section>`;};

export default class InfoComponent extends AbstractComponent {
  constructor(data) {
    super(...arguments);
    this._data = data;
  }

  _getTemplate() {
    return getInfoTemplate(this._data);
  }
}
