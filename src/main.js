import { FILTERS } from "./mock/filters";
import { SORTS } from "./mock/sorts";
import { TEST_POINTS } from "./mock/events";
import { POSITION_TYPES } from "./utils/render";
import InfoComponent from "./components/info";
import NavComponent from "./components/nav";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import PointsListComponent from "./components/points-list";
import { renderComponent, renderPointItem } from "./utils/render";

const tripMain = document.querySelector(".trip-main");
const tripControls = document.querySelector(".trip-controls__filters");
const tripEvents = document.querySelector(".trip-events");

// функция рендера одной точки

// функция рендера всех точек
const renderAllPointItems = (pointsData, isLoading = false) => {
  let isEmpty = true;
  if (pointsData) {
    if (pointsData.length > 0) isEmpty = false;
  }
  const pointsList = new PointsListComponent(isEmpty, isLoading);
  renderComponent(tripEvents, pointsList.getElement());
  if (!isEmpty) {
    pointsData.forEach((it) => renderPointItem(it));
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

renderAllPointItems(TEST_POINTS);
