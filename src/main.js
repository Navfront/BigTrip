import { FILTERS } from "./mock/filters";
import { SORTS } from "./mock/sorts";
import { POINT } from "./mock/events";
import infoComponent from "./components/info";
import navComponent from "./components/nav";
import filterComponent from "./components/filter";
import sortComponent from "./components/sort";
import pointsListComponent from "./components/points-list";
import pointComponent from "./components/point";
import pointEditorComponent from "./components/point-editor";

const tripMain = document.querySelector(".trip-main");
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
render(tripEvents, sortComponent(SORTS), "afterBegin");
render(tripEvents, pointsListComponent(["none"])); // props is events and loading state

const tripEventsList = document.querySelector(".trip-events__list");

render(tripEventsList, pointEditorComponent());
render(tripEventsList, pointComponent(POINT));
