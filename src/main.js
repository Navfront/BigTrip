import {
  navComponent,
  filterComponent,
  sortComponent,
  pointEditorComponent,
  infoComponent,
  cardComponent,
} from "./components/components";
import { FILTERS } from "./mock/filters";
import { SORTS } from "./mock/sorts";

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
render(tripControls, filterComponent(FILTERS));
render(tripEvents, sortComponent(SORTS));
render(tripEventsList, pointEditorComponent());
render(tripEventsList, cardComponent());
