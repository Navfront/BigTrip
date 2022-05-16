import {
  navComponent,
  filterComponent,
  sortComponent,
  editFormComponent,
  cardsListComponent,
  cardComponent,
} from './components/components';

const tripControls = document.querySelector('.trip-controls');
const tripEvents = document.querySelector('.trip-events');

const render = (container, adjHtml, position = 'beforeEnd') => {
  if (container) {
    container.insertAdjacentHTML(position, adjHtml);
  } else {
    console.log(null);
  }
};

render(tripControls, navComponent());
render(tripControls, filterComponent());
render(tripEvents, sortComponent());
render(tripEvents, editFormComponent());
render(tripEvents, cardsListComponent());

const tripEventList = document.querySelector('.trip-events__list');
render(tripEventList, cardComponent());
