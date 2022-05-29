import PointsListComponent from '../views/points-list';
import SortComponent from '../views/sort';
import { SORTS } from '../mock/sorts';
import { renderComponent } from '../utils/render';
import { sortPointsData } from '../utils/sort-utils';
import PointController from './point-controller';
import { findUpdatePoint } from './../utils/utils';

export default class TripController {
  constructor(container, dataModel) {
    this._container = container;
    this._sorts = SORTS.slice();
    this._isLoading = null;
    this._currentSortType = null;
    this._pointsData = dataModel.getPoints();
    this._sortedData = this._pointsData;
    this._pointControllers = new Map();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onDataChange(newDataPoint) {
    this._sortedData = findUpdatePoint(this._sortedData, newDataPoint);
    this._pointControllers.get(newDataPoint.id).render(newDataPoint);
  }


  _onViewChange() {
    this._pointControllers.forEach((controller) => controller.resetMode());
  }

  render(isLoading = false, currentSortType = 'day') {
    let isEmpty = true;
    if ( this._pointsData) {
      if (this._pointsData.length > 0) {
        isEmpty = false;
      }
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
        this._sortedData = sortPointsData( this._sortedData, sortType);

        this._container.innerHTML = '';
        // второй ререндер
        this.render(this._sortedData, false, sortType);
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
      this._pointsData.forEach((it) => {
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
