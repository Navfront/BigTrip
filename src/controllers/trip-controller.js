import PointComponent from "../components/point";
import PointEditorComponent from "../components/point-editor";
import { getPointItemTemplate } from "../components/point-item";
import PointsListComponent from "../components/points-list";
import SortComponent from "../components/sort";
import { SORTS } from "../mock/sorts";
import { renderComponent } from "../utils/render";
import { createElement } from "../utils/render";
import { sortPointsData } from "../utils/sort-utils";

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sorts = SORTS.slice();
    this._points = [];
  }

  _renderPointItem(container, pointData) {
    const tripEventsList = container;
    const pointItem = createElement(getPointItemTemplate());
    const point = new PointComponent(pointData);
    const pointElement = point.getElement();
    const pointEditor = new PointEditorComponent(pointData);
    const editorElement = pointEditor.getElement();

    const openEditor = () => {
      pointItem.replaceChild(editorElement, pointElement);
    };

    const saveAndCloseEditor = () => {
      pointItem.replaceChild(pointElement, editorElement);
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

    // устанавливаем cb в обработчики
    point.setOnRollUpHandler(onRollUpClickHandler);
    pointEditor.setOnSaveHandler(onSaveClickHandler);

    pointItem.append(pointElement);
    tripEventsList.append(pointItem);
  }

  render(pointsData, isLoading = false, currentSortType = "day") {
    let isEmpty = true;
    if (pointsData) {
      if (pointsData.length > 0) isEmpty = false;
    }

    //обработчик клика по сортировке
    const onSortClickHandler = (evt) => {
      const sortType = evt.currentTarget.dataset.sortName;
      let sortedPointsData = pointsData;
      if (currentSortType !== sortType) {
        this._sorts.forEach((it) => {
          if (it.sortName === currentSortType) {
            it.isChecked = false;
          }
          if (it.sortName === sortType) {
            it.isChecked = true;
          }
        });
        sortedPointsData = sortPointsData(pointsData, sortType);
        this._container.innerHTML = "";
        // второй ререндер
        this.render(sortedPointsData, false, sortType);
      }
    };

    //рендерим сортировку
    const sort = new SortComponent(this._sorts);
    renderComponent(this._container, sort.getElement());
    sort.setOnSortClickHandler(onSortClickHandler);

    //рендерим point-list с точками
    const pointsList = new PointsListComponent(isEmpty, isLoading);
    renderComponent(this._container, pointsList.getElement());
    if (!isEmpty) {
      pointsData.forEach((it) =>
        this._renderPointItem(pointsList.getElement(), it)
      );
    }
  }
}
