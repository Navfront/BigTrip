import { FILTERS } from "./mock/filters";
import { TEST_POINTS } from "./mock/events";
import { POSITION_TYPES } from "./utils/render";
import InfoComponent from "./components/info";
import NavComponent from "./components/nav";
import FilterComponent from "./components/filter";
import { renderComponent } from "./utils/render";
import PointListController from "./controllers/PointListController";

const tripMain = document.querySelector(".trip-main");
const tripControls = document.querySelector(".trip-controls__filters");
const tripEvents = document.querySelector(".trip-events");

const tripInfo = new InfoComponent();
renderComponent(tripMain, tripInfo.getElement(), POSITION_TYPES.PREPEND);

const navigation = new NavComponent();
renderComponent(tripControls, navigation.getElement());

const filter = new FilterComponent(FILTERS);
renderComponent(tripControls, filter.getElement());

const pointsList = new PointListController(tripEvents);
pointsList.render(TEST_POINTS);
