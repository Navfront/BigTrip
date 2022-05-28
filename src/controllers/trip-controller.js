import PointsListComponent from "../components/points-list";
import SortComponent from "../components/sort";
import { TEST_POINTS } from "../mock/events";
import { SORTS } from "../mock/sorts";
import { renderComponent } from "../utils/render";
import { sortPointsData } from "../utils/sort-utils";
import PointController from "./point-controller";

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sorts = SORTS.slice();
    this._pointData = TEST_POINTS;
    this._sortedData = this._pointData;
    this._pointControllers = new Map();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onDataChange(oldData, newData) {
    const index = this._sortedData.indexOf(oldData);
    if (index >= 0) this._sortedData[index] = { ...newData };
  }

  _onViewChange() {
    this._pointControllers.forEach((controller) => controller.resetMode());
  }

  render(pointsData, isLoading = false, currentSortType = "day") {
    let isEmpty = true;
    if (pointsData) {
      if (pointsData.length > 0) isEmpty = false;
    }

    //обработчик клика по сортировке
    const onSortClickHandler = (evt) => {
      const sortType = evt.currentTarget.dataset.sortName;

      if (currentSortType !== sortType) {
        this._sorts.forEach((it) => {
          if (it.sortName === currentSortType) {
            it.isChecked = false;
          }
          if (it.sortName === sortType) {
            it.isChecked = true;
          }
        });
        const sortedData = sortPointsData(pointsData, sortType);

        this._container.innerHTML = "";
        // второй ререндер
        this.render(sortedData, false, sortType);
      }
    };

    //рендерим сортировку
    const sort = new SortComponent(this._sorts);
    renderComponent(this._container, sort.getElement());
    sort.setOnSortClickHandler(onSortClickHandler);

    //рендерим point-list с точками
    const pointsList = new PointsListComponent(isEmpty, isLoading);
    renderComponent(this._container, pointsList.getElement());

    //рендерим все точки если pointsData не пустой
    this._pointControllers.clear();
    if (!isEmpty) {
      pointsData.forEach((it) => {
        const pointController = new PointController(
          pointsList.getElement(),
          this._onDataChange,
          this._onViewChange
        );
        this._pointControllers.set(it.id, pointController);
        pointController.render(it);
      });
    }
  }
}
