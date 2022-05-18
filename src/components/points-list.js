// Значение отображаемого текста зависит от выбранного фильтра:
// * Everthing – 'Click New Event to create your first point'
// * Past — 'There are no past events now';
// * Future — 'There are no future events now'.

const pointsListComponent = (events, isLoading = false) => {
  let result = `
  <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
  if (events && events.length > 0 && !isLoading) {
    result = `
    <ul class="trip-events__list"></ul>
    `;
  }

  if (isLoading) {
    result = `
    <p class="trip-events__msg">Loading...</p>
    `;
  }

  return `
      ${result}
    `;
};

export default pointsListComponent;
