import PointsListComponent from '../views/points-list';
import AbstractPresenter from './abstract-presenter';
import PointPresenter from './point-presenter';
import { addComponent } from '../utils/render';
import EmptyComponent from '../views/empty';
import FilterComponent from './../views/filter';
import { FILTERS } from '../utils/const';
import SortComponent from './../views/sort';
import AddButtonComponent from '../views/add-button';
import InfoComponent from '../views/info';
import NavComponent from '../views/nav';
import { POSITION_TYPES } from './../utils/render';


export default class TripPresenter extends AbstractPresenter {
  constructor(headerContainer, filterContainer, eventsContainer, dataModel) {
    super(...arguments);
    this._headerContainer = headerContainer;
    this._eventsContainer = eventsContainer;
    this._filterContainer = filterContainer;
    this._dataModel = dataModel;
    this._pointPresenters = new Map();
    this._infoComponent = new InfoComponent();
    this._navComponent = new NavComponent();
    this._pointsList = new PointsListComponent();
    this._emptyComponent = new EmptyComponent();
    this._addButtonComponent = new AddButtonComponent();
    this._filterComponent = new FilterComponent(Object.values(FILTERS));
    this._sortsComponent = new SortComponent(this._dataModel.getSorts());

    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
  }

  renderInfo() {
    addComponent(this._headerContainer, this._infoComponent.getElement(), POSITION_TYPES.PREPEND);
  }

  renderNavigation() {
    addComponent(this._filterContainer, this._navComponent.getElement());
  }

  renderAddButton() {
    addComponent(this._headerContainer, this._addButtonComponent.getElement());
  }

  renderFilter() {
    //ставим обработчик клика на фильтр
    this._filterComponent.setOnFiltersClickHandler((element) => {
      this._dataModel.setActiveFilter(element.value);
    });
    //подписываемся на изменение модели
    this._dataModel.setFilterChangeHandler(this._onFilterChange);
    //рисуем компонент
    addComponent(this._filterContainer, this._filterComponent.getElement());
  }

  renderSorts() {
    //ставим обработчик
    this._sortsComponent.setOnSortClickHandler((element) => {
      this._dataModel.changeCurrentSort(element.dataset.sortName);
    });
    //подписываемся на изменение модели
    this._dataModel.setSortsChangeHandler(this._onSortChange);
    //рисуем компонент
    addComponent(this._eventsContainer, this._sortsComponent.getElement());

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
      addComponent(this._eventsContainer, this._pointsList.getElement());
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
      addComponent(  this._eventsContainer, this._emptyComponent.getElement());
      this._emptyComponent.rerender(this._dataModel.getListData());
      this._sortsComponent.hide();
    }
  }

  _onSortChange() {
    //ререндер всех поинтов
    this.renderPoints();
  }


  _onDataChange(newData) {
    if (!newData) {
      console.log('deleting data');
      return;
    }
    switch (typeof newData.id) {
      //id is null
      case 'object':
        console.log('creating data');
        break;
        //id is string
      default:
        console.log('updating data');
        this._dataModel.updatePoint(newData);
        break;
    }
  }

  _onViewChange() {
    console.log(this._pointPresenters);
    this._pointPresenters.forEach((presenter) => { presenter.closeEditor();
      //resetDataDefault
    });
    console.log('onViewChange');
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
