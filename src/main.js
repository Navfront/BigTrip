import { FILTERS } from "./mock/filters";
import { SORTS } from "./mock/sorts";
import { TEST_POINTS } from "./mock/events";
import { createElement, POSITION_TYPES } from "./utils/utils";
import InfoComponent from "./components/info";
import NavComponent from "./components/nav";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import PointsListComponent from "./components/points-list";
import PointComponent from "./components/point";
import PointEditorComponent from "./components/point-editor";
import { getPointItemTemplate } from "./components/point-item";

const tripMain = document.querySelector(".trip-main");
const tripControls = document.querySelector(".trip-controls__filters");
const tripEvents = document.querySelector(".trip-events");

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

// функция рендера одной точки
const renderPointItem = (pointData) => {
  const tripEventsList = document.querySelector(".trip-events__list");
  const pointItem = createElement(getPointItemTemplate());
  const eventPoint = new PointComponent(pointData).getElement();
  const eventPointEditor = new PointEditorComponent().getElement();
  const rollUpButton = eventPoint.querySelector(".event__rollup-btn");
  const saveEditorButton = eventPointEditor.querySelector(".event__save-btn");

  const openEditor = () => {
    pointItem.replaceChild(eventPointEditor, eventPoint);
  };

  const saveAndCloseEditor = () => {
    pointItem.replaceChild(eventPoint, eventPointEditor);
  };

  const onEscKeyDownHandler = (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      onSaveClickHandler();
      document.removeEventListener("keydown", onEscKeyDownHandler);
    }
  };

  const onRollUpClickHandler = () => {
    document.addEventListener("keydown", onEscKeyDownHandler);
    openEditor();
  };

  const onSaveClickHandler = () => {
    saveAndCloseEditor();
    document.removeEventListener("keydown", onEscKeyDownHandler);
  };

  rollUpButton.onclick = onRollUpClickHandler;
  saveEditorButton.onclick = onSaveClickHandler;

  pointItem.append(eventPoint);
  tripEventsList.append(pointItem);
};

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
