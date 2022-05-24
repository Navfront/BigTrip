import { getPointItemTemplate } from "./../components/point-item.js";
import PointComponent from "../components/point.js";
import PointEditorComponent from "../components/point-editor.js";
import PointsListComponent from "../components/points-list";

export const POSITION_TYPES = {
  APPEND: "append",
  PREPEND: "prepend",
};

export const createElement = (template) => {
  const createdElement = document.createElement("div");
  createdElement.innerHTML = template;
  return createdElement.firstChild;
};

export const renderComponent = (container, component, position) => {
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

export const renderPointItem = (pointData) => {
  const tripEventsList = document.querySelector(".trip-events__list");
  const pointItem = createElement(getPointItemTemplate());
  const point = new PointComponent(pointData);
  const eventPoint = point.getElement();
  const pointEditor = new PointEditorComponent(pointData);
  const eventPointEditor = pointEditor.getElement();
  // const rollUpButton = eventPoint.querySelector(".event__rollup-btn");
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

  point.setOnRollUpHandler(onRollUpClickHandler);
  pointEditor.setOnSaveHandler(onSaveClickHandler);

  pointItem.append(eventPoint);
  tripEventsList.append(pointItem);
};

export const renderAllPointItems = (
  container,
  pointsData,
  isLoading = false
) => {
  let isEmpty = true;
  if (pointsData) {
    if (pointsData.length > 0) isEmpty = false;
  }
  const pointsList = new PointsListComponent(isEmpty, isLoading);
  renderComponent(container, pointsList.getElement());
  if (!isEmpty) {
    pointsData.forEach((it) => renderPointItem(it));
  }
};
