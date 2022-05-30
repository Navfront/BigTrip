import PointsListComponent from '../views/points-list';
import SortComponent from '../views/sort';
import { SORTS } from '../mock/sorts';
import { sortPointsData } from '../utils/sort-utils';
import PointController from './point-controller';
import { findUpdatePoint } from './../utils/utils';
import AbstractController from './abstract-controller';

function renderCounter() {
  let c = 0;
  return (() => { c += 1;
    return c;});
}
const rC = renderCounter();

export default class TripController extends AbstractController {
  constructor() {
    super(...arguments);
    this._sorts = SORTS.slice();
    this._isLoading = null;
    this._currentSortType = null;
    this._pointsData = this._dataModel.getPoints();
    this._sort =  new SortComponent(SORTS);
    this._pointControllers = new Map();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    //подписываемся на изменение фильтра
    this._dataModel.setFilterChangeHandler(this._onFilterChange);
  }

  _onDataChange(newDataPoint) {
    this._pointsData = findUpdatePoint(this._pointsData, newDataPoint);
    this._pointControllers.get(newDataPoint.id).render(newDataPoint);
  }

  _onViewChange() {
    this._pointControllers.forEach((controller) => controller.resetMode());
  }

  _onFilterChange() {
    this._pointsData = this._dataModel.getPoints();
    this.render();
  }

  _cleanBeforeRender() {
    this._pointControllers.forEach((it) => { it.destroy(); });
    this._sort.rerender();
  }


  render(isLoading = false, currentSortType = 'day') {

    // this._container.innerHTML = '';
    this._cleanBeforeRender();

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
        this._pointsData = sortPointsData( this._pointsData, sortType);

        // второй ререндер
        this.render( false, sortType);
      }
    };


    //рендерим сортировку

    this._renderComponent(this._container, this._sort.getElement());
    this._sort.setOnSortClickHandler(onSortClickHandler);

    //рендерим point-list с точками
    const pointsList = new PointsListComponent(isEmpty, isLoading);
    this._renderComponent(this._container, pointsList.getElement());

    console.log(rC());

    //рендерим все точки если pointsData не пустой
    this._pointControllers.clear();
    if (!isEmpty) {
      this._pointsData.forEach((it) => {
        const pointController = new PointController(
          pointsList.getElement(),
          this._dataModel,
          this._onDataChange,
          this._onViewChange
        );
        this._pointControllers.set(it.id, pointController);
        pointController.render(it);
      });
    }
  }
}
