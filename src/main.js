import { FILTERS } from "./mock/filters";
import { SORTS } from "./mock/sorts";
import { POINT } from "./mock/events";
import { POSITION_TYPES } from "./utils/utils";
import InfoComponent from "./components/info";
import NavComponent from "./components/nav";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import PointsListComponent from "./components/points-list";
import PointComponent from "./components/point";
import PointEditorComponent from "./components/point-editor";

const tripMain = document.querySelector(".trip-main");
const tripControls = document.querySelector(".trip-controls__filters");
const tripEvents = document.querySelector(".trip-events");

// const render = (container, adjHtml, position = "beforeEnd") => {
//   if (container) {
//     container.insertAdjacentHTML(position, adjHtml);
//   } else {
//     console.log(null);
//   }
// };

const renderComponent = (container, component, position) => {
  switch (position) {
    case POSITION_TYPES.APPEND:
      container.append(component);
      break;
    case POSITION_TYPES.PREPEND:
      container.prepend(component);
      break;

    default:
      container.append(component);
      break;
  }
};
const tripInfo = new InfoComponent();
renderComponent(tripMain, tripInfo.getElement(), POSITION_TYPES.PREPEND);

const navigation = new NavComponent();
renderComponent(tripControls, navigation.getElement());

const filter = new FilterComponent(FILTERS);
renderComponent(tripControls, filter.getElement());

const sort = new SortComponent(SORTS);
renderComponent(tripEvents, sort.getElement());

const pointsList = new PointsListComponent();
renderComponent(tripEvents, pointsList.getElement());

const tripEventsList = document.querySelector(".trip-events__list");

const pointEditor = new PointEditorComponent();
renderComponent(
  tripEventsList,
  pointEditor.getElement(),
  POSITION_TYPES.PREPEND
);

const pointOne = new PointComponent(POINT);
renderComponent(tripEventsList, pointOne.getElement());
const pointTwo = new PointComponent(POINT);
renderComponent(tripEventsList, pointTwo.getElement());
