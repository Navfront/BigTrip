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
    this._filterContainer = document.querySelector('.trip-controls__filters');
    this._filterComponent = new FilterComponent(Object.values(FILTERS));
    this._sortsComponent = new SortComponent(this._dataModel.getSorts());
  }

  renderFilter() {
    //ставим обработчик клика на фильтр
    this._filterComponent.setOnFiltersClickHandler((element) => {
      this._dataModel.setActiveFilter(element.value);
    });
    //подписываемся на изменение модели
    this._dataModel.setFilterChangeHandler(this._onFilterChange.bind(this));
    //рисуем компонент
    addComponent(this._filterContainer, this._filterComponent.getElement());
  }

  renderSorts() {
    //ставим обработчик
    this._sortsComponent.setOnSortClickHandler((element) => {
      this._dataModel.changeCurrentSort(element.dataset.sortName);
    });
    //подписываемся на изменение модели
    this._dataModel.setSortsChangeHandler(this._onSortChange.bind(this));
    //рисуем компонент
    addComponent(this._container, this._sortsComponent.getElement());

  }

  renderPoints() {
    //если это повторный рендер и уже есть контроллеры то удаляем pointItems
    if (this._pointPresenters.size > 0) {
      this._pointPresenters.forEach((presenter) => {
        presenter.destroyItem();
      });
    }
    if (this._dataModel.getPoints().length > 0) {
      this._sortsComponent.show();
      this._emptyComponent.destroy();
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
      this._emptyComponent.rerender(this._dataModel.getListData());
      this._sortsComponent.hide();
    }
  }

  _onSortChange() {
    //ререндер всех поинтов
    this.renderPoints();
  }

  _onDataChange() {
    console.log('dataChange!');
  }

  _onViewChange() {
  }

  _onFilterChange() {
    //сбрасываем сортировку в модели
    this._dataModel.restoreSorts();
    //ререндерим компонент сортировки
    this._sortsComponent.rerender(this._dataModel.getSorts());
    //ререндер всех поинтов
    this.renderPoints();
  }


}
