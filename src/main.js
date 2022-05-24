import { FILTERS } from "./mock/filters";
import { SORTS } from "./mock/sorts";
import { TEST_POINTS } from "./mock/events";
import { POSITION_TYPES, renderAllPointItems } from "./utils/render";
import InfoComponent from "./components/info";
import NavComponent from "./components/nav";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import { renderComponent } from "./utils/render";

const tripMain = document.querySelector(".trip-main");
const tripControls = document.querySelector(".trip-controls__filters");
const tripEvents = document.querySelector(".trip-events");

const tripInfo = new InfoComponent();
renderComponent(tripMain, tripInfo.getElement(), POSITION_TYPES.PREPEND);

const navigation = new NavComponent();
renderComponent(tripControls, navigation.getElement());

const filter = new FilterComponent(FILTERS);
renderComponent(tripControls, filter.getElement());

const sort = new SortComponent(SORTS);
renderComponent(tripEvents, sort.getElement());

renderAllPointItems(tripEvents, TEST_POINTS);
