import PointsListComponent from '../views/points-list';
import AbstractPresenter from './abstract-presenter';
import PointPresenter from './point-presenter';
import { addComponent } from '../utils/render';
import EmptyComponent from '../views/empty';
import FilterComponent from './../views/filter';
import { FILTERS } from '../utils/const';
import SortComponent from './../views/sort';


export default class TripPresenter extends AbstractPresenter {
  constructor(container, dataModel) {
    super(...arguments);
    this._container = container;
    this._dataModel = dataModel;
    this._pointPresenters = new Map();
    this._pointsList = new PointsListComponent();
    this._emptyComponent = new EmptyComponent();
    this._isLoading = true;
    this._filterContainer = document.querySelector('.trip-controls__filters');
    this._filterComponent = new FilterComponent(Object.values(FILTERS));
    this._sortsComponent = new SortComponent(this._dataModel.getSorts());
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  renderFilter() {
    addComponent(this._filterContainer, this._filterComponent.getElement());
  }

  renderSorts() {
    addComponent(this._container,this._sortsComponent.getElement());
  }

  renderPoints() {
    //если это повторный рендер и уже есть контроллеры то удаляем pointItems
    if (this._pointPresenters.size>0) {
      this._pointPresenters.forEach((controller) => {
        controller.destroyItem();
      });
    }
    if (!this._dataModel.isEmpty()) {
      //если есть маршруты - рендерим контейнер
      addComponent(this._container, this._pointsList.getElement());
      //итерируем маршруты
      for (const point of this._dataModel.getPoints()) {
        //создаем инстанс контроллера маршрута
        const pointPresenter = new PointPresenter(this._pointsList.getElement(), this._dataModel, point.id, this._onDataChange, this._onViewChange);
        //закидываем его в observer
        this._pointPresenters.set(point.id, pointPresenter);
        pointPresenter.init();
      }
    } else {
      //если нет маршрутов - рендерим emptyComponent
      addComponent(this._container, this._emptyComponent.getElement());
    }
  }

  _onSortChange() {

  }

  _onDataChange() {
  }

  _onViewChange() {
  }

  _onFilterChange() {
  }

  _onSortClickHandler() {
    // cant evt
    // this._dataModel.changeCurrentSort(evt.currentTarget.dataset.sortName);
  }


}
