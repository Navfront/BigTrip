import {
  navComponent,
  filterComponent,
  sortComponent,
  editFormComponent,
  infoComponent,
  cardComponent,
} from "./components/components";

const tripMain = document.querySelector(".trip-main");
const tripEventsList = document.querySelector(".trip-events__list");
const tripControls = document.querySelector(".trip-controls__filters");
const tripEvents = document.querySelector(".trip-events");

const render = (container, adjHtml, position = "beforeEnd") => {
  if (container) {
    container.insertAdjacentHTML(position, adjHtml);
  } else {
    console.log(null);
  }
};

render(tripMain, infoComponent(), "afterBegin");
render(tripControls, navComponent());
render(tripControls, filterComponent());
render(tripEvents, sortComponent());
render(tripEventsList, editFormComponent());
render(tripEventsList, cardComponent());
